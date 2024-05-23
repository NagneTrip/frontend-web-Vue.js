<template>
  <div class="comment-list" v-if="comments.length">
    <CommentListItem v-for="comment in comments" :comment="comment" :key="comment.id" />
    <InfiniteLoading @infinite="loadData" v-if="showInfinity" />
  </div>
  <div class="comment-list" v-else>
    <h2 class="jua-regular">아직 댓글이 없어요!</h2>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, watch, onMounted } from "vue";
import CommentListItem from "./CommentListItem.vue";
import { useWriteStore } from "@/store/write";
import { storeToRefs } from "pinia";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const writeStore = useWriteStore();
const { getComment } = storeToRefs(writeStore);

const props = defineProps({
  articleId: {
    type: Number,
    required: true,
  }
});

const isLoading = ref(false);
const lastIndex = ref(null); // 초기값을 null로 설정합니다.
const comments = ref([]);
const noMoreData = ref(false);
const showInfinity = ref(true);

const loadData = async ($state) => {
  if (isLoading.value || noMoreData.value) {
    $state.complete();
    showInfinity.value = false;
    return;
  }

  isLoading.value = true;
  let url = import.meta.env.VITE_EC2_ADDR+`/api/comments?articleId=${props.articleId}&size=10`;
  if (lastIndex.value !== null) {
    url += `&lastIndex=${lastIndex.value}`;
  }

  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  }).then(({ data }) => {
    const commentsData = data.response.comments;
    $state.loaded();

    comments.value.push(...commentsData);

    lastIndex.value = commentsData[commentsData.length - 1].id;

  }).catch(() => {
    $state.error();
  }).finally(() => {
    isLoading.value = false;
  });
};

onMounted(async () => {
  if (props.articleId) {
    await fetchComments(props.articleId);
  }
});

const fetchComments = async (id) => {
  if (isLoading.value || noMoreData.value) return;

  isLoading.value = true;
  let url = import.meta.env.VITE_EC2_ADDR+`/api/comments?articleId=${id}&size=10`;
  if (lastIndex.value !== null) {
    url += `&lastIndex=${lastIndex.value}`;
  }

  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  }).then(({ data }) => {
    if (data.response.comments.length != 0) {
      const commentsData = data.response.comments;
      if (commentsData.length < 10) {
        noMoreData.value = true;
      }
      comments.value.push(...commentsData);

      lastIndex.value = (commentsData[commentsData.length - 1]).id;
    }
  }).finally(() => {
    isLoading.value = false;
  });
};
</script>

<style scoped>
.comment-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 35px;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
}

.comment-list h2 {
  font-weight: 400;
  color: #797979;
  letter-spacing: 2px;
  margin: 40px 0 40px 0;
}
</style>
