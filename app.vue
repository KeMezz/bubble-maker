<template>
  <div>Hello, World!</div>
  <div>Count is {{ count }}</div>
  <button @click="addCount">Add</button>
  <button @click="subCount">Sub</button>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    addCount() {
      this.count += 1;
    },
    subCount() {
      this.count -= 1;
    },
  },
};
</script>
