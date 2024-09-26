<template>
  <section class="flex flex-col justify-center h-screen">
    <div
      class="flex flex-col bg-neutral-100 p-6 m-12 rounded-lg gap-4 shadow-sm"
    >
      <h1 class="text-2xl font-bold pb-4">로그인</h1>
      <form
        @submit.prevent="getToken"
        v-if="!showToken"
        class="flex flex-col gap-4"
      >
        <input
          class="border-2 px-4 py-2 rounded-lg"
          type="email"
          name="email"
          v-model="email"
          placeholder="이메일 입력.."
        />
        <button
          v-if="!showToken"
          class="px-6 py-2 bg-orange-400 text-white rounded-lg w-fit self-center text-sm hover:bg-orange-600 transition-colors"
        >
          인증번호 받기
        </button>
      </form>
      <form
        @submit.prevent="login"
        v-if="showToken"
        class="flex flex-col gap-4"
      >
        {{ email }}로 전송된 인증 번호를 입력해주세요.
        <input
          v-if="showToken"
          class="border-2 px-4 py-2 rounded-lg"
          type="text"
          v-model="token"
          placeholder="6자리 인증코드"
        />
        <button
          v-if="showToken"
          class="px-6 py-2 bg-orange-400 text-white rounded-lg w-fit self-center text-sm hover:bg-orange-600 transition-colors"
        >
          로그인
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PostLoginResponse } from "~/server/api/login.post";
import type { GetTokenResponse } from "~/server/api/token.get";

const router = useRouter();

const email = ref("");
const token = ref("");
const showToken = ref(false);

async function getToken() {
  const response = await $fetch<GetTokenResponse>("/api/token", {
    method: "GET",
    params: { email: email.value },
  });

  if (response.ok) {
    showToken.value = true;
  }
}

async function login() {
  const response = await $fetch<PostLoginResponse>("/api/login", {
    method: "POST",
    body: { email: email.value, token: token.value },
  });

  if (response.ok) {
    router.push({ path: "/" });
  }
}
</script>
