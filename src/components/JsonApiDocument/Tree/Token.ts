import { JsonApi } from 'jsonapi-metal-client'
import { h, FunctionalComponent, mergeProps } from 'vue'
import * as JsonTree from '../../../utils/JsonTree'
import TokenArray from './TokenArray.vue'
import TokenObject from './TokenObject.vue'
import TokenValue from './TokenValue.vue'

const Tree: FunctionalComponent<
  { token: JsonTree.Token }
> = (props, context) => {
  switch (props.token.type) {
    case 'array':
      return h(TokenArray, mergeProps(props, context.attrs), context.slots)
    case 'object':
      return h(TokenObject, mergeProps(props, context.attrs), context.slots)
      case 'value':
      return h(TokenValue, mergeProps(props, context.attrs), context.slots)
    default:
      return
  }
}

export default Tree
