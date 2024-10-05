<template>
  <div>
    <div
      ref="chatArea"
      class="bg-sky-200 p-4 min-h-screen overflow-y-scroll mb-56 flex flex-col gap-4"
    >
      <Message
        v-for="message in messages"
        :key="message.id"
        :text="message.text"
        :senderType="message.senderType"
      />
    </div>
    <section class="fixed bottom-0 left-0 w-full h-56">
      <button
        @click="takeScreenshot"
        class="w-full h-14 flex justify-center items-center bg-rose-400 gap-4"
      >
        <CameraIcon class="size-8 text-white" />
        <span class="text-white">스크린샷 저장하기</span>
      </button>
      <form
        @submit.prevent="addMessage"
        class="flex flex-col justify-center items-center gap-6 py-6 bg-neutral-100 shadow-xl"
      >
        <div
          class="self-center px-3 py-2 flex gap-2 bg-neutral-200 w-fit rounded-lg"
        >
          <ChatButtonSelectPerson
            text="나"
            :senderId="1"
            :currentSender="sender"
            @update:currentSender="(senderId) => setSender(senderId)"
          />
          <ChatButtonSelectPerson
            text="상대방"
            :senderId="2"
            :currentSender="sender"
            @update:currentSender="(senderId) => setSender(senderId)"
          />
        </div>
        <div class="flex w-full gap-4 px-4">
          <input
            class="border-2 px-4 py-2 rounded-lg w-full"
            type="text"
            v-model="text"
            placeholder="메시지를 추가해주세요.."
          />
          <button
            type="submit"
            class="bg-rose-400 hover:bg-neutral-400 transition-colors px-4 w-20 rounded-lg text-white"
          >
            송신
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CameraIcon } from "@heroicons/vue/24/solid";
import html2canvas from "html2canvas";
import type { CreateMessageResponse } from "~/server/api/message/index.post";
import type { GetMessagesResponse } from "~/server/api/messages/index.get";

const sender = ref(1);
const text = ref("");
const chatArea = ref();

const route = useRoute();
const chatId = route.params.id;

const { data } = await useFetch<GetMessagesResponse>("/api/messages", {
  method: "GET",
  params: { chatId },
});
const messages = ref(data?.value?.messages);

function setSender(senderId: number) {
  if (senderId) {
    sender.value = senderId;
  }
}

async function addMessage() {
  const { ok, message } = await $fetch<CreateMessageResponse>(`/api/message`, {
    method: "POST",
    body: { chatId, sender: sender.value, text: text.value },
  });

  if (ok) {
    messages.value = [...messages.value, message];
  }

  text.value = "";
}

function takeScreenshot() {
  console.log(chatArea.value);
  html2canvas(chatArea.value).then((canvas) => {
    const imageUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = imageUrl;
    link.download = "capture.png";

    link.click();
  });
}

function scrollToBottom() {
  nextTick(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
    });
  });
}

watch(
  messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);

onMounted(() => {
  scrollToBottom();
});
</script>
