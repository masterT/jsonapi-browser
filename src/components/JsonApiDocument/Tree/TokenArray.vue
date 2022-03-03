<script setup lang="ts">
  import { ref } from 'vue'
  import { TokenArray } from '../../../utils/JsonTree'
  import Token from './Token'
  import Expand from './Expand.vue'
  import Length from './Length.vue'
  import Key from './Key.vue'

  defineEmits<{ (e: 'navigate', link: string): void }>()
  defineProps<{ token: TokenArray }>()

  const expanded = ref<boolean>(true)
</script>

<template>
  <span class="">
    <span>
      <Expand v-model:expanded="expanded">
        <Key>{{ token.key }}</Key><Length>[{{ token.items.length }}]</Length>
      </Expand>
    </span>
    <div v-show="expanded" v-for="(item, index) in token.items" :key="index" class="ml-4 my-1">
      <Token :token="item" @navigate="$emit('navigate', $event)"/>
    </div>
  </span>
</template>
