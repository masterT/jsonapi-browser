<script setup lang="ts">
import { ref } from 'vue'
import { HttpAdapter } from 'jsonapi-metal-client'

defineProps<{ request: HttpAdapter.AdapterRequest }>()

</script>

<template>
  <h3 class="text-lg">Request</h3>
  <dl>
    <dt>URL</dt>
    <dd class="mb-1">
      <pre class="overflow-y-auto text-xs text-gray-700">{{ request.url }}</pre>
    </dd>

    <dt>Headers</dt>
    <dd class="mb-1">
      <pre class="overflow-y-auto text-xs text-gray-700">{{ request.headers }}</pre>
    </dd>

    <dt>Body</dt>
    <dd class="mb-1">
      <pre class="overflow-y-auto text-xs text-gray-700">{{ request.body }}</pre>
    </dd>
  </dl>
</template>
