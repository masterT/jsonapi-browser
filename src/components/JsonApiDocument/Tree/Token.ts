import { JsonApi } from 'jsonapi-metal-client'
import { h, FunctionalComponent, mergeProps } from 'vue'
import * as JsonTree from '../../../utils/JsonTree'
import TokenArray from './TokenArray.vue'
import TokenObject from './TokenObject.vue'
import TokenValue from './TokenValue.vue'

const Tree: FunctionalComponent<
  { token: JsonTree.Token }
> = (props) => {
  switch (props.token.type) {
    case 'array':
      return h(TokenArray, { token: props.token })
    case 'object':
      return h(TokenObject, { token: props.token })
      case 'value':
      return h(TokenValue, { token: props.token })
    default:
      return
  }
}

export default Tree
