import { tokenize, Token } from '../../utils/JsonApiDocumentTokenizer'
import { h, FunctionalComponent } from 'vue'
import { JsonApi } from 'jsonapi-metal-client'

const Source: FunctionalComponent<
  { document: JsonApi.Specification.Document },
  { navigate: (link: string) => void }
> = (props, { emit }) => {

  const tokens = tokenize(props.document, 2)

  return h(
    'pre',
    {
      class: 'overflow-y-auto text-xs text-gray-700'
    },
    tokens.map((token: Token) => {
      switch (token.type) {
        case 'text':
          return h('span', token.value)
        case 'link':
          return h(
            'a',
            {
              href: token.value,
              onClick: (event: Event) => {
                emit('navigate', token.value)
                event.preventDefault()
              }
            },
            token.value
          )
        default:
          throw new Error('Invalid token')
      }
    })
  )
}

export default Source
