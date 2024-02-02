<template>
  <header>
    <div id="myDIV" class="header">
      <h2 style="margin:5px">My To Do List</h2>
      <input type="text" id="myInput" placeholder="할일을 적어주세요" v-model="todo">
      <span @click="newTodo" class="addBtn">추가</span>
      <p>{{ todo }}</p>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      todo: ''
    }
  },
  methods: {
    newTodo() {
      this.$emit('add-content', this.todo)
    }
  }
}

</script>
