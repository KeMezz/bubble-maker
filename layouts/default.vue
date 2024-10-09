<template>
  <main>
    <header
      class="bg-white h-14 flex items-center justify-between px-4 shadow-md"
    >
      <div class="flex justify-start items-center w-12">
        <button @click="goBack">
          <ChevronLeftIcon class="size-7" />
        </button>
      </div>
      <div class="self-center">
        <h1 class="font-bold text-xl">
          <slot name="pageTitle" />
        </h1>
      </div>
      <div class="flex justify-end w-12">
        <Bars3Icon class="size-8" />
      </div>
    </header>
    <slot />
  </main>
</template>

<script setup lang="ts">
import { Bars3Icon, ChevronLeftIcon } from "@heroicons/vue/24/solid";

const router = useRouter();

function goBack() {
  router.back();
}
</script>
