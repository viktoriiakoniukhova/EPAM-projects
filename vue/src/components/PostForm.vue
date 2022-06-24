<template>
  <form @submit.prevent>
    <h4>Create new post:</h4>
    <my-input
      v-model="post.title"
      type="text"
      placeholder="Title"
    />
    <my-input
        v-model="post.desc"
        type="text"
        placeholder="Description"/>
    <my-button class="btn" @click="addPost">Add post</my-button>
  </form>
</template>

<script>
export default {
  data(){
    return{
      post: {
        title: '',
        desc: ''
      }
    }
  },
  methods:{
    addPost(){
      this.post.id = Date.now()
      this.$emit('addPost', this.post)
      this.post = {
        title: '',
        desc: ''
    }
    }
  }
}
</script>

<style scoped>
form{
  display: flex;
  flex-direction: column;

  border: 2px solid cadetblue;
  padding: 5px;
}
.btn{
  align-self: flex-end;
  margin-top: 15px;
}
</style>