<template>
  <div class="article-detail-page" @click="closeModal">
    <div class="modal-box" @click.stop>
      <div class="modal-left"></div>
      <div class="modal-right">
        <div class="right-header">
          <div class="user-info"></div>
          <div class="dot-button"></div>
        </div>
        <div class="right-content">
          <!-- 인스타처럼 게시글 내용과 댓글 모두 댓글 컴포넌트로 -->
          <!-- 이 파일에서 props로 받아온 게시글과, api로 호출한 댓글들을 처리 -->
        </div>
        <div class="right-footer">
          <div class="social-box">
            <!-- 좋아요, 댓글, 공유, ... 북마크(저장) 버튼 -->
          </div>
          <div class="write-comment-box">
            <!-- 댓글 아이콘 -->
            <div class="comment-input"></div>
            <button value="게시"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const props = defineProps({
  article: Object,
});
const article = ref({});

const emit = defineEmits([
  "closeModal"
])
const closeModal = ()=>{
  emit("closeModal");
}


</script>

<style scoped>
.article-detail-page {
  position: fixed; /* 고정된 위치 */
  top: 0; /* 상단에서 0px 위치 */
  left: 0; /* 좌측에서 0px 위치 */
  width: 100%; /* 전체 너비 */
  height: 100%; /* 전체 높이 */
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
  z-index: 1000; /* 다른 요소들 위에 표시 */
}

.modal-box {
  display : flex;
}

.modal-left {
  width: 640px;
  height: 640px;
  background-color: #eeeeee;
  border-radius: 8px 0 0 8px;
  box-shadow: 6px 0 6px 4px rgba(0, 0, 0, 0.1); /* 오른쪽과 아래쪽에 그림자 */
}

.modal-right {
  width: 480px;
  height: 640px;
  background-color: aqua;
  border-radius: 0 8px 8px 0;
  box-shadow: 6px 4px 6px 0 rgba(0, 0, 0, 0.1); /* 오른쪽과 아래쪽에 그림자 */
}
</style>
