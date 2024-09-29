<!-- 
  TODO1: 레이아웃 만들기.
  헤더, 사이드바 만들기. 전체 설정과 구성원 설정 나누기.
  전체설정: 테마 변경, 폰트 사이즈, 배경 이미지 변경 등?
-->
<!-- 
  TODO2:  입력창 좌측에 유저 선택할 수 있도록 버튼 추가하기
-->
<!-- 
  TODO3:  구성원 추가하는 별도 페이지 만들기, 구성원 추가시 프로필사진도 설정할 수 있게 하기
-->
<template>
  <div>
    <!-- <client-only> -->
    <div
      class="bg-sky-200 p-4 min-h-[calc(100vh - 96px)] overflow-y-scroll mb-44 flex flex-col gap-4"
    >
      <Message
        v-for="message in messages"
        :key="message.id"
        :text="message.text"
        :senderType="message.senderType"
      />
    </div>
    <!-- </client-only> -->
    <form
      @submit.prevent="addMessage"
      class="flex flex-col justify-center items-center gap-6 py-6 fixed bottom-0 left-0 h-42 w-full bg-neutral-100 shadow-xl"
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
          class="bg-neutral-500 hover:bg-neutral-400 transition-colors px-4 w-20 rounded-lg text-white"
        >
          송신
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
// TODO: 최종적으로 스크린샷 생성하는 매커니즘은 어떻게 만들건지? dom-to-image? html-to-image?
const sender = ref(1);
const text = ref("");

const route = useRoute();
const chatId = route.params.id;

const {
  data: {
    value: { messages: initialMessages },
  },
  status,
  error,
  refresh,
  clear,
} = await useFetch("/api/messages", {
  method: "GET",
  params: { chatId },
});
const messages = ref(initialMessages);

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
