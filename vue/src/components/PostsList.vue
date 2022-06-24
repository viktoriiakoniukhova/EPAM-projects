<template>
  <div v-if="posts.length > 0">
    <h3 class="h3">Available Posts:</h3>
    <post-item
        v-for="post in posts"
        v-bind:post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
    />
  </div>
  <div v-else style="color: red">
    <h3 class="h3">List of available posts is empty</h3>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  components: {PostItem},

  props:{
    posts:{
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.h3{
  margin: 5px;
}
</style>