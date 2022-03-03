<script setup lang="ts">
</script>

<template>
  <div class="md:container md:mx-auto my-6 px-1">
    <header class="flex justify-between items-baseline">
      <h1 class="sm:text-5xl text-2xl">
        JSON:API Browser
      </h1>
      <nav>
        <ul class="flex">
          <li class="mr-6 text-lg font-medium">
            <router-link class="text-primary-800 hover:text-primary-900 font-semibold" to="/">Browser</router-link>
          </li>
          <li class="mr-6 text-lg font-medium">
            <router-link class="text-primary-800 hover:text-primary-900 font-semibold" to="/about">About</router-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>
