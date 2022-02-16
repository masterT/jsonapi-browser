<script setup lang="ts">
const props = defineProps<{
  location: string
}>()

const emit = defineEmits<{
  (e: 'navigate', url: string): void
  (e: 'update:location', url: string): void
}>()

</script>

<template>
  <div class="flex items-center">
    <form @submit.prevent="$emit('navigate', location)" class="flex-1">
      <input
        class="w-full"
        placeholder="JSON:API endpoint URL"
        type="text"
        :value="location"
        @input="$emit('update:location', ($event.target as HTMLInputElement).value)"/>
    </form>
  </div>
</template>
