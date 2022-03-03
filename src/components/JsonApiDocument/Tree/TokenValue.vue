<script setup lang="ts">
  import { JsonApi } from 'jsonapi-metal-client'
  import { TokenValue } from '../../../utils/JsonTree'
  import Key from './Key.vue'
  import { computed } from 'vue'

  const { isLinksObject, isRelationshipObjectLinks } = JsonApi.Specification.TypeGuards

  // TODO: Support `Date` in `String` formated in ISO 8601.
  // https://jsonapi.org/recommendations/#date-and-time-fields

  defineEmits<{ (e: 'navigate', link: string): void }>()
  const props = defineProps<{ token: TokenValue }>()


  const type = computed(() => {
    if (typeof props.token.value === 'number') {
      return 'number'
    } else if (props.token.value === true || props.token.value === false) {
      return 'boolean'
    } else {
      // JSON:API link
      if (props.token.parent) {
        // "links-object"
        if ((isLinksObject(props.token.parent.value) || isRelationshipObjectLinks(props.token.parent.value)) &&
            props.token.parent.key === 'links'
        ) {
          return 'link'
        // "link-object".
        } else if (JsonApi.Specification.TypeGuards.isLinkObject(props.token.parent.value)) {
          if (props.token.key && props.token.key === 'href') {
            return 'link'
          }
        }
      }
      return 'string'
    }
  })

  const computedValueClass = computed(() => {
    switch (type.value) {
      case 'number':
        return 'text-blue-900';
      case 'boolean':
        return 'text-blue-900';
      case 'link':
        return 'text-gray-500 underline'
      case 'string':
      default:
        return 'text-red-700'
    }
  })

  const computedValue = computed(() => {
    switch (type.value) {
      case 'number':
        return props.token.value
      case 'boolean':
        return props.token.value
      case 'link':
        return props.token.value
      case 'string':
      default:
        return `"${props.token.value}"`
    }
  })
</script>

<template>
  <span class="">
    <Key>{{ token.key }}</Key>: <span :class="computedValueClass">
      <template v-if="type === 'link'">
        <a href="#" @click="$emit('navigate', props.token.value)">{{ computedValue }}</a>
      </template>
      <template v-else>
        {{ computedValue }}
      </template>
    </span>
  </span>
</template>
