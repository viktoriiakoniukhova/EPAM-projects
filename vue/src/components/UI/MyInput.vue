<template>
  <input class="input" type="text" v-bind:value="modelValue" @input="updateInput">
</template>

<script>
export default {
  name: "my-input",
  props:{
    modelValue: [String, Number]
  },
  methods:{
    updateInput(event){
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input{
  padding: 5px;
  margin-top: 15px;
  border: 1px solid cadetblue;
}
</style>