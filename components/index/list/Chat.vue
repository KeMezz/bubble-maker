<template>
  <li
    class="flex items-center justify-between rounded-lg bg-white shadow-sm py-3 px-5"
  >
    <div class="flex flex-col gap-1">
      <h2 class="font-bold">title</h2>
      <p class="text-sm">description...</p>
    </div>
    <div>
      <ChevronRightIcon class="text-black size-6" />
    </div>
  </li>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/24/solid";
</script>
