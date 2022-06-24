<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button"
}
</script>

<style scoped>
.btn{
  padding: 5px 15px;
  border: 2px solid cadetblue;
  background: none;
  color: cadetblue;
}
</style>