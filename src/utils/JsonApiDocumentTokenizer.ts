// TODO: Use package.
import { JsonApi } from 'jsonapi-metal-client'

export type TokenText = { type: 'text', value: string, color?: string }
export type TokenLink = { type: 'link', value: string }
export type Token = TokenText | TokenLink
export type MaybeToken = Token | undefined

/**
 * Return tokens representing a JSON:API document.
 * @param document
 * @param space
 * @returns
 */
 export const tokenize = (document: JsonApi.Specification.Document, space: number = 2): Token[]  => {
  if (JsonApi.Specification.TypeGuards.isDataDocument(document)) {
    return renderDataDocument(document, 2, 0)
  }
  return json(document, 2, 0)
}

export const renderDataDocument = (
  document: JsonApi.Specification.DataDocument,
  space: number,
  indentation: number
): Token[] => {
  return objectMapKeys(document, space, indentation, {
    links: renderLinksObject,
    data: (data, space, indentation) => {
      if (JsonApi.Specification.TypeGuards.isResourceObject(data)) {
        return renderResourceObject(data, space, indentation)
      }
      if (Array.isArray(data)) {
        return renderDataDocumentArray(data, space, indentation)
      }
      if (JsonApi.Specification.TypeGuards.isResourceIdentifierObject(data)) {
        return renderResourceObject(data, space, indentation)
      }
      return json(data, space, indentation)
    },
    included: (included, space, indentation) => {
      return arrayMapValues(included, space, indentation, renderResourceObject)
    }
  })
}

export const renderDataDocumentArray = (
  document: (JsonApi.Specification.ResourceObject[] | JsonApi.Specification.ResourceIdentifierObject[]),
  space: number,
  indentation: number
): Token[] => {
  return arrayMapValues(document, space, indentation, (item, space, indentation) => {
    if (JsonApi.Specification.TypeGuards.isResourceObject(item)) {
      return renderResourceObject(item, space, indentation)
    }
    if (JsonApi.Specification.TypeGuards.isResourceIdentifierObject(item)) {
      return json(item, space, indentation)
    }
    return json(item, space, indentation)
  })
}

export const renderResourceObject = (
  resourceObject: JsonApi.Specification.ResourceObject,
  space: number,
  indentation: number
): Token[] => {
  return objectMapKeys(resourceObject, space, indentation, {
    relationships: renderRelationshipsObject,
    links: renderLinksObject
  })
}

export const renderLinksObject = (
  linksObject: JsonApi.Specification.LinksObject,
  space: number,
  indentation: number
): Token[] => {
  return objectMapValues(
    linksObject,
    space,
    indentation,
    (value: JsonApi.Specification.Link, space, indentation) => {
      const tokens: Token[] = []
      if (typeof value === 'string') {
        tokens.push(
          ...link(value)
        )
      } else {
        tokens.push(
          ...objectMapKeys(value, space, indentation, {
            href: (href, space, indentation) => {
              return link(href)
            }
          })
        )
      }
      return tokens
    }
  )
}

export const renderRelationshipsObject = (
  relationshipsObject: JsonApi.Specification.RelationshipsObject,
  space: number,
  indentation: number
): Token[] => {
  return objectMapValues(
    relationshipsObject,
    space,
    indentation,
    (relationshipObject: JsonApi.Specification.RelationshipObject, space, indentation) => {
      return objectMapKeys(relationshipObject, space, indentation, {
        links: renderLinksObject
      })
    }
  )
}

const spaces = (number: number): string => {
  return ' '.repeat(number)
}

const link = (value: string): Token[] => {
  return [
    text('"'),
    { type: 'link', value },
    text('"')
  ]
}

const text = (...values: string[]): TokenText => {
  return { type: 'text', value: values.join('') }
}

const json = (data: any, space: number, indentation: number): TokenText[] => {
  const lines = JSON.stringify(data, null, space).split(/\r?\n/g)
  return lines.map((line, index) => {
      // First line.
      if (index === 0) {
        // Next line.
        if (index < lines.length - 1) {
          return text(line, "\n")
        } else {
          return text(line)
        }
      // Not first line.
      } else {
        // Next line.
        if (index < lines.length - 1) {
          return text(
            spaces(indentation),
            line,
            "\n"
          )
        } else {
          return text(
            spaces(indentation),
            line
          )
        }
      }
    })
}

const objectMapKeys = <O extends { [key: string]: any }> (
  object: O,
  space: number,
  indentation: number,
  mapping: {
    [Property in keyof O]?: (
      value: Exclude<O[Property], undefined>,
      space: number,
      indentation: number
    ) => Token[]
  }
): Token[] => {
  const tokens: Token[] = []
  tokens.push(text("{\n"))
  const entries = Object.entries(object)
  const numberEntries = entries.length
  for (let index = 0; index < numberEntries; index++) {
    const [key, value] = entries[index];
    const handler = mapping[key]
    // Add key.
    tokens.push(
      text(
        spaces(indentation + space),
        `"${key}": `
      )
    )
    // Add value.
    if (typeof handler === 'function') {
      tokens.push(...handler(value, space, indentation + space))
    } else {
      tokens.push(...json(value, space, indentation + space))
    }
    // Skip for last.
    if (index < numberEntries - 1) {
      tokens.push(text(','))
    }
    tokens.push(text("\n"))
  }
  tokens.push(text(spaces(indentation), '}'))
  return tokens
}

const objectMapValues = <T, O extends { [key: string]: T }> (
  object: O,
  space: number,
  indentation: number,
  handler: (
    value: T,
    space: number,
    indentation: number
  ) => Token[]
): Token[] => {
  const tokens: Token[] = []
  tokens.push(text("{\n"))
  const entries = Object.entries(object)
  const numberEntries = entries.length
  for (let index = 0; index < numberEntries; index++) {
    const [key, value] = entries[index];
    // Add key.
    tokens.push(
      text(
        spaces(indentation + space),
        `"${key}": `
      )
    )
    // Add value.
    tokens.push(...handler(value, space, indentation + space))
    // Skip for last.
    if (index < numberEntries - 1) {
      tokens.push(text(','))
    }
    tokens.push(text("\n"))
  }
  tokens.push(text(spaces(indentation), '}'))
  return tokens
}

const arrayMapValues = <T, A extends T[]> (
  array: A,
  space: number,
  indentation: number,
  handler: (
    value: T,
    space: number,
    indentation: number
  ) => Token[]
): Token[] => {
  const tokens: Token[] = []
  tokens.push(text("[\n"))
  const numberItems = array.length
  for (let index = 0; index < numberItems; index++) {
    tokens.push(text(spaces(indentation + space)))
    const item = array[index];
    // Add value.
    tokens.push(...handler(item, space, indentation + space))
    // Skip for last.
    if (index < numberItems - 1) {
      tokens.push(text(','))
    }
    tokens.push(text("\n"))
  }
  tokens.push(text(spaces(indentation), ']'))
  return tokens
}
