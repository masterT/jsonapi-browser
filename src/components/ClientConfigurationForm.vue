<script setup lang="ts">
  import { ref, watch, nextTick, onBeforeUpdate } from 'vue'
  import ClientConfigurationFormHeaders from './ClientConfigurationFormHeaders.vue'
  import { RequestConfiguration, RequestConfigurationHeader, credentialsValues, modeValues } from '../models/RequestConfiguration'

  // TODO: Add unique valudation on header name since HTTP header are case insentitive.

  const props = defineProps<{
    modelValue: RequestConfiguration
  }>()
  const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: RequestConfiguration): void
  }>()

  const expended = ref(false)

  const onCredentialsInputChange = (event: Event) => {
    if (event.target) {
      const value = (event.target as HTMLSelectElement).value as RequestInit['credentials']
      if (credentialsValues.includes(value)) {
        emit('update:modelValue', {
          ...props.modelValue,
          credentials: value
        })
      }
    }
  }

  const onModeInputChange = (event: Event) => {
    if (event.target) {
      const value = (event.target as HTMLSelectElement).value as RequestInit['mode']
      if (modeValues.includes(value)) {
        emit('update:modelValue', {
          ...props.modelValue,
          mode: value
        })
      }
    }
  }

  const onHeadersChange = (headers: RequestConfigurationHeader[]) => {
    emit('update:modelValue', {
      ...props.modelValue,
      headers: [
        ...headers
      ]
    })
  }
</script>

<template>
  <div>
    <div class="flex items-center mb-3">
      <h1 class="font-bold">
        Configure HTTP client
      </h1>
      <!-- TODO: Button style. -->
      <button
        class="text-primary-800 hover:text-primary-900 font-semibold text-sm mx-2"
        @click="expended = !expended"
        :title="expended ? 'Hide HTTP client configuration form' : 'Show HTTP client configuration form'">
        {{ expended ? 'Hide' : 'Show' }}
      </button>
    </div>
    <div v-if="expended">
      <div class="mb-2">
        <div class="mb-1 -m-1 flex flex-wrap">
          <div class="m-1 flex items-center">
            <label class="mr-1 font-semibold" for="credentials">credentials</label>
            <select class="text-sm py-1 pl-1" id="credentials" :value="modelValue.credentials" @change="onCredentialsInputChange">
              <option v-for="value in credentialsValues" :key="value" :value="value">
                {{value}}
              </option>
            </select>
          </div>
          <div class="m-1 flex items-center">
            <label class="mr-1 font-semibold" for="mode">mode</label>
            <select class="text-sm py-1 pl-1" id="mode" :value="modelValue.mode" @change="onModeInputChange">
              <option v-for="value in modeValues" :key="value" :value="value">
                {{value}}
              </option>
            </select>
          </div>
        </div>
        <ClientConfigurationFormHeaders
          :modelValue="modelValue.headers"
          @update:modelValue="onHeadersChange" />
      </div>
    </div>
  </div>
</template>
