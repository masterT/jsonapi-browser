<script setup lang="ts">
import { computed } from 'vue'
import { JsonApi } from 'jsonapi-metal-client'

const props = defineProps<{ document: JsonApi.Specification.Document }>()

const raw = computed(() => {
  try {
    if (props.document) {
      return JSON.stringify(props.document, null, 2)
    } else {
      return ''
    }
  } catch (e) {
    return ''
  }
})

</script>

<template>
  <pre class="overflow-y-auto text-xs text-gray-700">{{ raw }}</pre>
</template>
