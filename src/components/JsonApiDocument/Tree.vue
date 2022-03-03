<script setup lang="ts">
import { JsonApi } from 'jsonapi-metal-client'
import Token from './Tree/Token'
import * as JsonTree from '../../utils/JsonTree'
import { computed } from 'vue';

defineEmits<{ (e: 'navigate', link: string): void }>()
const props = defineProps<{ document: JsonApi.Specification.Document }>()

const token = computed(() => {
  return JsonTree.parse(props.document)
})
</script>

<template>
  <div class="font-mono text-xs">
    <Token :token="token" @navigate="$emit('navigate', $event)" />
  </div>
</template>
