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

<script lang="ts">
export default {
  name: "SelectPersonButton",
  props: {
    text: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
