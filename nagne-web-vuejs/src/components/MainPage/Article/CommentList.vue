<template>
  <div class="comment-list" v-if="comments.length">
    <CommentListItem v-for="comment in comments" :comment="comment" :key="comment.id" />
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

const writeStore = useWriteStore();
const { getComment } = storeToRefs(writeStore);

const props = defineProps({
  articleid: Number,
  gencomments: Number,
});

const isLoading = ref(false);
const lastIndex = ref(1000000000);
const comments = ref([]);
const noMoreData = ref(false);

const fetchComments = async () => {
  if (isLoading.value || noMoreData.value) return;

  isLoading.value = true;
  let url = `http://localhost:8080/api/comments?articleId=${props.articleid}&size=10`;
  if (lastIndex.value !== null) {
    url += `&lastIndex=${lastIndex.value}`;
  }

  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  }).then(({ data }) => {
    const commentsData = data.response.comments;
    if (commentsData.length < 10) {
      noMoreData.value = true;
    }

    comments.value.push(...commentsData);

    if (commentsData.length > 0) {
      lastIndex.value = commentsData[commentsData.length - 1].id;
    }
  }).finally(() => {
    isLoading.value = false;
  });
};

onMounted(async () => {
  if (props.articleid) {
    await fetchComments();
  }
});

watch(() => props.articleid, async (newId) => {
  if (newId) {
    comments.value = [];
    lastIndex.value = 1000000000;
    noMoreData.value = false;
    await fetchComments();
  }
});

watch(() => props.gencomments, async (newVal) => {
  if (newVal) {
    await fetchComments();
  }
});

watch(getComment, async (newVal) => {
  if (newVal) {
    comments.value = [];
    lastIndex.value = 1000000000;
    noMoreData.value = false;
    await fetchComments();
  }
});
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
