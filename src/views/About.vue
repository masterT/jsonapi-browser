<script setup lang="ts">
import { ref } from 'vue'

const origin = ref('')

origin.value = window.location.origin
</script>

<template>
  <div class="md:container md:mx-auto px-1">
    <div class="my-4">
      <h1 class="text-4xl my-4">About</h1>
      <div class="my-4">
        <p>Browser for web API implementing <a class="text-primary-800 hover:text-primary-900 font-semibold" href="https://jsonapi.org/">JSON:API v1.0</a>.</p>
      </div>
      <h2 class="text-2xl my-2">Configuration</h2>
      <p>The server needs to configure <a class="text-primary-800 hover:text-primary-900 font-semibold" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">CORS</a> and allow HTTP GET request from the origin <code>{{ origin }}</code>.</p>
      <div class="my-2">
        <h3 class="text-lg my-2">Example server HTTP response headers</h3>
        <div class="my-2">
          <pre class="text-sm">Access-Control-Allow-Origin: {{ origin }}</pre>
          <pre class="text-sm">Access-Control-Allow-Methods: GET</pre>
        </div>
      </div>
      <h2 class="text-2xl my-2">Source code</h2>
      <p>The source code is available on GitHub <a class="text-primary-800 hover:text-primary-900 font-semibold" href="https://github.com/masterT/jsonapi-browser">https://github.com/masterT/jsonapi-browser</a>.</p>
    </div>
  </div>
</template>
