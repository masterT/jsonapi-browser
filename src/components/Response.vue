<script setup lang="ts">
import { ref } from 'vue'
import { HttpAdapter } from 'jsonapi-metal-client'

const props = defineProps<{ response: HttpAdapter.AdapterResponse }>()

let body = props.response.body
try {
  if (body) {
    body = JSON.stringify(JSON.parse(body), null, 2)
  }
} catch (e) {}

</script>

<template>
  <h3 class="text-lg">Response</h3>
  <dl>
    <dt>Status</dt>
    <dd class="mb-1">
      <pre class="overflow-y-auto text-xs text-gray-700">{{ response.status }}</pre>
    </dd>

    <dt>Headers</dt>
    <dd class="mb-1">
      <pre class="overflow-y-auto text-xs text-gray-700">{{ response.headers }}</pre>
    </dd>

    <dt>Body</dt>
    <dd class="mb-1">
      <pre class="overflow-y-auto text-xs text-gray-700">{{ body }}</pre>
    </dd>
  </dl>
</template>
