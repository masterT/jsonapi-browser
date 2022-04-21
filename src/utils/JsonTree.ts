export type TokenArray = {
  type: 'array',
  parent?: Token,
  key?: string | number,
  items: Token[],
  value: any[]
}

export type TokenObject = {
  type: 'object',
  parent?: Token,
  key?: string | number,
  properties: { [key: string]: Token },
  value: { [key: string]: any }
}

export type TokenValue = {
  type: 'value',
  parent?: Token,
  key?: string | number | null,
  value: any
}

export type Token = TokenArray | TokenObject | TokenValue

/**
 * Parse JSON data into Token tree.
 * @param value raw JSON data.
 * @returns
 */
export function parse (
  value: any
): Token {
  /**
   * Recursive function that parse token.
   * @param parent The parent `Token`, this current `Token` is the root when value is `undefined`.
   * @param key The key of the current `Token` in the parent `Token`.
   * @param value The JSON raw value of the current `Token`.
   * @returns
   */
  function recursiveParseToken (parent: Token | undefined, key: string | number | undefined, value: any): Token {
    let token: any = { parent, key, value }
    // Array
    if (value instanceof Array) {
      token.type = 'array'
      token.items = []
      const length = value.length;
      for (let i = 0; i < length; i += 1) {
        token.items.push(
          recursiveParseToken(token, i, value[i])
        )
      }
      return token
    }
    // Object
    if (typeof value === 'object' && value !== null) {
      token.type = 'object'
      token.properties = {}
      for (const k in value) {
        if (Object.prototype.hasOwnProperty.call(value, k)) {
          token.properties[k] = recursiveParseToken(token, k, value[k])
        }
      }
      return token
    }
    // Value
    token.type = 'value'
    return token
  }

  return recursiveParseToken(undefined, undefined, value);
}
