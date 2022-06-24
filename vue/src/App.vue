<template>
  <div class="app">
    <post-form
        @addPost="addPost"
    />
    <posts-list
        v-bind:posts="posts"
        @remove="removePost"
    />
  </div>
</template>

<script>
import PostsList from '@/components/PostsList'
import PostForm from '@/components/PostForm'

export default {
  components: {
    PostsList, PostForm
  },
  data(){
    return {
      posts: [
        {id: 1, title: 'Title 1', desc: 'Description 1'},
        {id: 2, title: 'Title 2', desc: 'Description 2'},
        {id: 3, title: 'Title 3', desc: 'Description 3'}
      ]
    }
  },
  methods: {
    addPost(newPost){
      this.posts.push(newPost)
    },
    removePost(post){
      this.posts = this.posts.filter(p => p.id !== post.id)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app{
  padding: 20px;
}
</style>