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
  {{ users }}
  <form action="">
    <div class="bg-sky-200 p-4 h-[80vh] overflow-y-scroll">
      <div class="flex gap-4">
        <div class="bg-neutral-300 w-12 h-12 rounded-full" />
        <!-- TODO: mt-1.5 말고, 프로필 사진 사이즈의 절반으로  -->
        <div class="flex flex-col gap-3 mt-[6px]">
          <div
            class="bg-yellow-200 flex items-center px-4 py-2 rounded-lg w-fit"
          >
            반가워요!
          </div>
          <div
            class="bg-yellow-200 flex items-center px-4 py-2 rounded-lg w-fit"
          >
            뭔가 말씀을 해주세요.
          </div>
        </div>
      </div>
      <div class="flex flex-row-reverse gap-4">
        <div class="flex flex-col items-end gap-3 mt-1.5">
          <div class="bg-white flex items-center px-4 py-2 rounded-lg w-fit">
            안녕하세요.
          </div>
          <div class="bg-white flex items-center px-4 py-2 rounded-lg w-fit">
            아래 입력창을 통해 새로운 말풍선을 추가할 수 있군요!
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <div
        class="self-center mt-4 px-4 py-2 flex gap-2 bg-neutral-100 w-fit rounded-lg"
      >
        <SelectPersonButton :isActive="true" text="나" />
        <SelectPersonButton :isActive="false" text="상대방" />
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
    </div>
  </form>
</template>

<script setup lang="ts">
// TODO: 최종적으로 스크린샷 생성하는 매커니즘은 어떻게 만들건지? dom-to-image? html-to-image?

import SelectPersonButton from "~/components/select-person-button.vue";
import prisma from "~/lib/prisma";

const { data: users } = await useAsyncData("users", async () =>
  $fetch("/api/users")
);

console.log(users);
</script>
