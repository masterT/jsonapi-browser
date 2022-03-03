<script setup lang="ts">
  import { ref } from 'vue'
  import { TokenObject } from '../../../utils/JsonTree'
  import Token from './Token'
  import Length from './Length.vue'
  import Key from './Key.vue'
  import Expand from './Expand.vue'

  defineEmits<{ (e: 'navigate', link: string): void }>()
  defineProps<{ token: TokenObject }>()

  const expanded = ref<boolean>(true)
</script>

<template>
  <span class="">
    <span>
      <Expand v-model:expanded="expanded">
        <Key>{{ token.key }}</Key><Length>&#123;{{ Object.keys(token.properties).length }}&#125;</Length>
      </Expand>
    </span>
    <div v-show="expanded" v-for="(value, key) in token.properties" :key="key" class="ml-4 my-1">
      <Token :token="value" @navigate="$emit('navigate', $event)"/>
    </div>
  </span>
</template>
