<script setup lang="ts">
  defineEmits<{ (e: 'update:expanded', expanded: boolean): void }>()
  defineProps<{ expanded: boolean }>()
</script>

<template>
  <button @click="$emit('update:expanded', !expanded)" :title="expanded ? 'Expand' : 'Collapse'">
    <span class="text-black mr-1">
      {{ expanded ? '-' : '+' }}
    </span>
    <slot></slot>
  </button>
</template>
