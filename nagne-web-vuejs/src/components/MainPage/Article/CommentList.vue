<template>
  <div class="comment-list" v-if="comments.length">
    <CommentListItem v-for="comment in comments" :comment="comment" :key="comment.id" />
  </div>
  <div class="comment-list" v-else>
    <h2 class="jua-regular">아직 댓글이 없어요!</h2>
  </div>
</template>

<script setup>
import CommentListItem from "./CommentListItem.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

const props = defineProps({
  articleId: Number,
});

const comments = ref([]);

const fetchComments = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/api/comments?articleId=${props.articleId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
    comments.value = data.response.comments;
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchComments);

const emit = defineEmits(["updateComments"]);
emit("updateComments", true);
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