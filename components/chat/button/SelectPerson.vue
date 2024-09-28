<template>
  <button
    :class="{
      'px-4 py-2 rounded-lg w-24': true,
      'bg-purple-400 text-white': isActive,
      'text-black': !isActive,
    }"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
interface PropTypes {
  text: string;
  isActive: boolean;
}
const { text, isActive } = defineProps<PropTypes>();
</script>
