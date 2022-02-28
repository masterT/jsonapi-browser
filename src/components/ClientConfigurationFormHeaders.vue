<script setup lang="ts">
  import { ref, watch, nextTick, onBeforeUpdate } from 'vue'
  import { RequestConfigurationHeader } from '../models/RequestConfiguration'

  const props = defineProps<{
    modelValue: RequestConfigurationHeader[]
  }>()
  const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: RequestConfigurationHeader[]): void
  }>()

  const headerNameInputs = ref<HTMLInputElement[]>([])

  onBeforeUpdate(() => {
    headerNameInputs.value = []
  })

  watch(() => props.modelValue, async (newModelValue, oldModelValue) => {
    // When header is added.
    if (newModelValue.length - oldModelValue.length === 1) {
      await nextTick()
      // Focus on last header.
      const index = newModelValue.length - 1;
      headerNameInputs.value[index].focus()
    }
  })

  const onAdd = () => {
    emit('update:modelValue', [
      ...props.modelValue, { name: '', value: '' }
    ])
  }

  const onPropertyChange = (index: number, name: keyof RequestConfigurationHeader, value: string) => {
    // TODO: Add unique valudation on header name since HTTP header are case insentitive.
    emit('update:modelValue', props.modelValue.map((header, i) => {
        if (index === i) {
          return { ...header, [name]: value }
        } else {
          return header
        }
      })
    )
  }

  const onRemove = (index: number) => {
    emit('update:modelValue', props.modelValue.filter((_, i) => i !== index))
  }
</script>

<template>
  <div>
    <div class="mb-2">
      <div class="mb-2">
        <label class="mr-1 font-semibold">headers</label>
        <div v-for="(header, index) in modelValue" class="flex sm:flex-row flex-col sm:items-center space-between sm:my-1 my-2">
          <div class="flex-1 sm:mr-1 sm:mb-0 mb-1">
            <input
              class="w-full text-sm py-1 px-2"
              type="text"
              name=""
              id=""
              placeholder="Header name"
              :value="header.name"
              :ref="(element) => headerNameInputs[index] = (element as HTMLInputElement)"
              @change="onPropertyChange(index, 'name', ($event.target as HTMLInputElement).value)" />
          </div>
          <div class="sm:w-8/12 flex">
            <input
              class="w-full text-sm py-1 px-2"
              type="text"
              name=""
              id=""
              placeholder="Header value"
              :value="header.value"
              @change="onPropertyChange(index, 'value', ($event.target as HTMLInputElement).value)" />
            <!-- TODO: Button style. -->
            <button class="text-red-500 mx-2" @click="onRemove(index)" title="Remove header">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- TODO: Button style. -->
    <button class="flex items-center text-primary-800 hover:text-primary-900 font-semibold text-sm py-1" @click="onAdd" title="Add header">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Add
    </button>
  </div>
</template>
