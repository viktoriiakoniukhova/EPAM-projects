<template>
  <div class="post">
    <div>
      <p><strong>Title:</strong> {{ post.title }}</p>
      <p><strong>Description:</strong> {{ post.desc }}</p>
    </div>
    <div class="post__btns">
      <my-button class="btn" @click="$emit('remove', post)">Delete</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    post:{
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post{
  border: 2px solid lavender;
  padding: 15px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>