<template>
  <section class="flex flex-col justify-center h-screen">
    <div class="flex flex-col bg-neutral-100 p-6 m-12 rounded-lg gap-4">
      <h1 class="text-2xl font-bold pb-4">로그인</h1>
      <input
        class="border-2 px-4 py-2 rounded-lg"
        type="email"
        placeholder="이메일 입력.."
      />
      <input
        class="border-2 px-4 py-2 rounded-lg"
        type="text"
        placeholder="6자리 인증코드"
        disabled
      />
      <button
        class="px-6 py-2 bg-orange-400 text-white rounded-lg w-fit self-center text-sm"
      >
        로그인
      </button>
    </div>
  </section>
</template>

<script></script>
