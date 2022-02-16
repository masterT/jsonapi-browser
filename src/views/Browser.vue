<script setup lang="ts">
import { ref } from 'vue'
import { JsonApi, HttpAdapters } from 'jsonapi-metal-client'
import { useJsonApiBrowserHistory } from '../composables/useJsonApiBrowserHistory'
import BrowserControls from '../components/BrowserControls.vue'
import JsonApiDocumentSource from '../components/JsonApiDocument/Source'
import JsonApiDocumentDescription from '../components/JsonApiDocument/Description'

const httpAdapter = new HttpAdapters.FetchHttpAdapter(window.fetch.bind(window))
const client = new JsonApi.Client(httpAdapter)

const location = ref<string>('')
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
</script>

<template>
  <div class="md:container md:mx-auto px-1">
    <div class="my-2">
      <div class="my-2">
        <BrowserControls
          @navigate="onNavigate"
          v-model:location="location" />
      </div>
    </div>
    <div class="my-2">
      <template v-if="!requested">
        <p class="text-gray-400">No request made yet.</p>
      </template>
      <template v-else>
        <template v-if="!isSuccess">
          <p class="text-red-900">An error occured.</p>
        </template>
        <template v-if="document">
          <div class="my-2">
            <JsonApiDocumentDescription :document="document" />
          </div>
          <JsonApiDocumentSource :document="document" @navigate="onNavigate" />
        </template>
      </template>
    </div>
  </div>
</template>
