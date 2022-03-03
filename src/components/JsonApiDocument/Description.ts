import { h, FunctionalComponent } from 'vue'
import { JsonApi } from 'jsonapi-metal-client'

const Description: FunctionalComponent<
  { document: JsonApi.Specification.Document }
> = (props) => {
  // TODO: Render slot with param.
  let description = undefined
  // Data document
  if (JsonApi.Specification.TypeGuards.isDataDocument(props.document)) {
    // Individual resource.
    if (JsonApi.Specification.TypeGuards.isFetchResourceIndividualResponse(props.document)) {
      if (props.document.data === null) {
        return h('span', 'Resource not created')
      } else {
        return h('span', [
          'Resource ',
          h('b', `${props.document.data.type} #${props.document.data.id}`)
        ])
      }
    }

    // Collection resource.
    if (JsonApi.Specification.TypeGuards.isFetchResourceCollectionResponse(props.document)) {
      const types: string[] = []
      props.document.data.forEach((resourceObject) => {
        if (!types.includes(resourceObject.type)) {
          types.push(resourceObject.type)
        }
      })
      if (types.length === 0) {
        return h('span', 'Resource collection empty')
      } else {
        return h('span', [
          'Resource collection of ',
          h('b', `${types.join(', ')}`)
        ])
      }
    }

    // Relationship to-many.
    if (JsonApi.Specification.TypeGuards.isFetchRelationshipToManyResponse(props.document)) {
      const types: string[] = []
      props.document.data.forEach((resourceIdentifierObject) => {
        if (!types.includes(resourceIdentifierObject.type)) {
          types.push(resourceIdentifierObject.type)
        }
      })
      if (types.length === 0) {
        return h('span', 'Relationship to-many empty')
      } else {
        return h('span', [
          'Relationship to-many of ',
          h('b', `${types.join(', ')}`)
        ])
      }
    }

    // Relationship to-one.
    if (JsonApi.Specification.TypeGuards.isFetchRelationshipToOneResponse(props.document)) {
      const types: string[] = []
      if (props.document.data === null) {
        return h('span', 'Relationship to-one empty')
      } else {
        return h('span', [
          'Relationship to-one of ',
          h('b', props.document.data.type)
        ])
      }
    }

    return h('span', 'Data document')
  }

  // Meta document
  if (JsonApi.Specification.TypeGuards.isMetaDocument(props.document)) {
    return h('span', 'Meta document')
  }

  // Error document
  if (JsonApi.Specification.TypeGuards.isErrorDocument(props.document)) {
    return h('span', 'Error document')
  }

  return h('span', 'Unkown JSON:API document.')
}

export default Description
