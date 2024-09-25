<template>
  <section class="flex flex-col justify-center h-screen">
    <form
      @submit.prevent="sendToken"
      class="flex flex-col bg-neutral-100 p-6 m-12 rounded-lg gap-4 shadow-sm"
    >
      <h1 class="text-2xl font-bold pb-4">로그인</h1>
      <input
        class="border-2 px-4 py-2 rounded-lg"
        type="email"
        name="email"
        v-model="email"
        placeholder="이메일 입력.."
      />
      <input
        class="border-2 px-4 py-2 rounded-lg"
        type="text"
        v-model="token"
        placeholder="6자리 인증코드"
      />
      <button
        class="px-6 py-2 bg-orange-400 text-white rounded-lg w-fit self-center text-sm hover:bg-orange-600 transition-colors"
      >
        인증번호 받기
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
const email = ref("");
const token = ref("");

async function sendToken() {
  const response = await $fetch("/api/login", {
    method: "POST",
    body: { email: email.value },
  });
  console.log(response);
}
</script>
