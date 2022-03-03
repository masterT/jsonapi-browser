<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { JsonApi, HttpAdapters } from 'jsonapi-metal-client'
import { useJsonApiBrowserHistory } from '../composables/useJsonApiBrowserHistory'
import ClientConfigurationForm from '../components/ClientConfigurationForm.vue'
import BrowserControls from '../components/BrowserControls.vue'
import JsonApiDocumentRaw from '../components/JsonApiDocument/Raw.vue'
import JsonApiDocumentTree from '../components/JsonApiDocument/Tree.vue'
import JsonApiDocumentDescription from '../components/JsonApiDocument/Description'
import { RequestConfiguration } from '../models/RequestConfiguration'

const httpAdapter = new HttpAdapters.FetchHttpAdapter(
  window.fetch.bind(window),
  {
    credentials: 'omit',
    mode: 'cors'
  }
);
const client = new JsonApi.Client(httpAdapter)

const requestConfiguration = ref<RequestConfiguration>({
  credentials: httpAdapter.defaultInit?.credentials,
  mode: httpAdapter.defaultInit?.mode,
  headers: []
})
const location = ref<string>('')
const tab = ref<string>('preview')
const requested = ref<boolean>(false)
const isSuccess = ref<boolean>(true)
const document = ref<JsonApi.Specification.Document>()
const { pushState } = useJsonApiBrowserHistory(
  (historyLocation: string) => {
    navigate(historyLocation)
  }
)

const onNavigate = (url: string) => {
  pushState(url)
  navigate(url)
}

const navigate = (url: string) => {
  location.value = url
  document.value = undefined
  client.fetch(url)
    .then((result) => {
      isSuccess.value = result.isSuccess
      requested.value = true
      document.value = result.document ? result.document : undefined
    })
    .catch(() => {
      isSuccess.value = false
      requested.value = true
      document.value = undefined
    })
}

// When request configuration change.
watch(() => requestConfiguration.value, () => {
  // Set client default headers.
  client.defaultHttpHeaders = requestConfiguration.value.headers.reduce<Record<string, string>>((headers, header) => {
    return { ...headers, [header.name]: header.value }
  }, {});
  // Set client default init.
  const { credentials, mode } = requestConfiguration.value
  httpAdapter.defaultInit = { credentials, mode }
});

</script>

<template>
  <div class="md:container md:mx-auto px-1">
    <div class="my-3">
      <div class="my-3">
        <BrowserControls
          @navigate="onNavigate"
          v-model:location="location" />
      </div>
      <div class="my-2">
        <ClientConfigurationForm v-model="requestConfiguration" />
      </div>
    </div>
      <div class="my-3">
        <template v-if="!requested">
          <p class="text-gray-400">No request made yet.</p>
        </template>
        <template v-else>
          <template v-if="!isSuccess">
              <p class="text-red-900">An error occured.</p>
          </template>
          <template v-if="document">
            <div>
              <div class="my-2">
                <JsonApiDocumentDescription :document="document" />
              </div>
              <div class="inline-flex flex-row border-2 w-auto mb-4">
                <button
                  class="p-3 border-b-3 hover:bg-gray-100 font-semibold text-sm py-1"
                  :class="{
                    'border-primary-800': tab === 'preview',
                    'border-transparent': tab !== 'preview'
                  }"
                  @click="tab = 'preview'">
                  Preview
                </button>
                <button
                  class="p-3 border-b-3 hover:bg-gray-100 font-semibold text-sm py-1"
                  :class="{
                    'border-primary-800': tab === 'raw',
                    'border-transparent': tab !== 'raw'
                  }"
                  @click="tab = 'raw'">
                  Raw
                </button>
              </div>
              <KeepAlive>
                <template v-if="tab == 'preview'">
                  <JsonApiDocumentTree :document="document" @navigate="onNavigate"/>
                </template>
                <template v-else-if="tab == 'raw'">
                  <JsonApiDocumentRaw :document="document" />
                </template>
              </KeepAlive>
            </div>
          </template>
        </template>
      </div>
  </div>
</template>
