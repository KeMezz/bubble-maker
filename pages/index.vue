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
  <button
    class="w-14 h-14 bg-orange-400 flex justify-center items-center rounded-xl shadow-lg fixed right-8 bottom-8 hover:bg-orange-500 transition-colors"
    @click="createChat"
  >
    <PlusIcon class="size-8 text-white" />
  </button>
</template>

<script setup lang="ts">
import type { PostLogoutResponse } from "~/server/api/logout.post";
import type { CreateChatResponse } from "~/server/api/chat.post";
import { PlusIcon } from "@heroicons/vue/24/solid";
const router = useRouter();

const { chats } = await $fetch<GetChatsResponse>("/api/chats");

async function logout() {
  const response = await $fetch<PostLogoutResponse>("/api/logout", {
    method: "POST",
  });

  if (response.ok) {
    router.push({ path: "/login" });
  }
}

async function createChat() {
  const response = await $fetch<CreateChatResponse>("/api/chat", {
    method: "POST",
  });

  if (response.ok) {
    const newChatId = response.chatId;
    router.push({ path: `/chat/${newChatId}` });
  }
}
</script>
