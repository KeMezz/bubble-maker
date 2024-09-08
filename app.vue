<template>
  <form action="">
    <div class="bg-sky-200 p-4">
      <div class="flex gap-4">
        <div class="bg-neutral-300 w-12 h-12 rounded-full" />
        <div class="flex flex-col gap-3 mt-1.5">
          <div
            class="bg-yellow-200 flex items-center px-4 py-2 rounded-lg w-fit"
          >
            너 어디냐?
          </div>
          <div
            class="bg-yellow-200 flex items-center px-4 py-2 rounded-lg w-fit"
          >
            왜 연락을 안해
          </div>
        </div>
      </div>
      <div class="flex flex-row-reverse gap-4">
        <div class="flex flex-col items-end gap-3 mt-1.5">
          <div class="bg-white flex items-center px-4 py-2 rounded-lg w-fit">
            무슨 연락
          </div>
          <div class="bg-white flex items-center px-4 py-2 rounded-lg w-fit">
            언제했는데?
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-4 p-4">
      <input
        class="border-2 px-4 py-2 rounded-lg w-full"
        type="text"
        placeholder="메시지를 추가해주세요.."
      />
      <button
        class="bg-neutral-500 hover:bg-neutral-400 transition-colors px-4 w-20 rounded-lg text-white"
      >
        송신
      </button>
    </div>
  </form>
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
