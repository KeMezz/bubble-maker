<template>
  <div>Chat 목록 페이지에요</div>
  <button
    class="px-4 py-2 rounded-lg border-2 bg-neutral-500 text-white"
    @click="logout"
  >
    로그아웃
  </button>
  <div class="p-4">
    <ul class="flex flex-col gap-3">
      <IndexListChat
        v-for="chat in chats"
        :key="chat.id"
        :id="chat.id"
        :title="chat.title"
        :description="chat.description"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { PostLogoutResponse } from "~/server/api/logout.post";
const router = useRouter();

async function logout() {
  const response = await $fetch<PostLogoutResponse>("/api/logout", {
    method: "POST",
  });

  if (response.ok) {
    router.push({ path: "/login" });
  }
}

const { chats } = await $fetch<GetChatsResponse>("/api/chats");
</script>
