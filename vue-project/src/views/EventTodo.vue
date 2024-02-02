<template>
  <div>
    <input type="text" v-model="todo">
    <button @click="addTodo">추가</button>
    <p>{{ todo }}</p>
  </div>

  <div>
    <ul>
      <li v-bind:key="todos.no" v-for="todos in todoList">
        {{ `${todos.no} - ${todos.text}` }}
        <button v-on:click="delTodo(todos.no)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        todo: '다음할일', // {no: 3, text: '다음할일'},
        todoList: [{no: 1, text: '드라마보기'}, {no: 2, text: '스트레칭하기'}]
      }
    },
    methods: {
      addTodo() {
        /*
        let newNo = this.todoList.length + 1;
        let newTodo = this.todo;
        this.todoList.push({no: newNo, text: newTodo});
        this.todo = '';
        */
        let no, text;
        // no = this.todoList.length + 1;
        no = this.todoList[this.todoList.length - 1].no + 1;
        text = this.todo;
        // splice() : 배열에 추가 
        this.todoList.splice(this.todoList.length, 0, {no, text});
        this.todo = '';
      },
      delTodo(num) {
        // console.log('no: ', num);
        this.todoList = this.todoList.filter(todo => todo.no == num ? false : true);
      }
    }
  }
</script>

<style>
  ul {
    list-style: none;
  }
</style>