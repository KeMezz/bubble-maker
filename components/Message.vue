<template>
  <div
    :class="{
      'bg-white self-end': senderType === 1,
      'bg-yellow-200': senderType === 2,
      'flex items-center px-4 py-2 rounded-lg w-fit': true,
    }"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
interface MessageProps {
  text: string;
  senderType: number;
}
const { text, senderType } = defineProps<MessageProps>();
</script>
