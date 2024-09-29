<template>
  <button
    type="button"
    @click="emit('update:currentSender', senderId)"
    :class="{
      'px-4 py-2 rounded-lg w-24': true,
      'bg-purple-400 text-white': senderId === currentSender,
      'text-black': senderId !== currentSender,
    }"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
interface SelectPersonProps {
  text: string;
  senderId: number;
  currentSender: number;
}
const { text, senderId, currentSender } = defineProps<SelectPersonProps>();
const emit = defineEmits(["update:currentSender"]);
</script>
