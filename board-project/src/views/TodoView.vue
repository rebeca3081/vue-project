<template>
  <HeadComponent @add-content="addContent"/>
  <BodyComponent v-bind:list="todoList" @change-class="changCheck"
                                        @delete-todo="deleteTodo"/>
</template>

<script>
import HeadComponent from '../components/HeadComponent.vue'
import BodyComponent from '../components/BodyComponent.vue'

export default {
  components: {
    HeadComponent,
    BodyComponent
  },
  data () {
    return {
      checked: 'checked',
      todoList: [
        {no: 1, todo: 'Hit the gym', cancleFlag: true},
        {no: 2, todo: 'Pay bills', cancleFlag: false},
        {no: 3, todo: 'Meet George', cancleFlag: false},
        {no: 4, todo: 'Buy eggs', cancleFlag: false}
      ]
    }
  },
  methods: {
    addContent(todo) { // todo 추가
      // console.log(todo);
      let idx = this.todoList.length - 1; // 마지막 인덱스 값
      let no = parseInt(this.todoList[idx].no) + 1; // 기존 배열 마지막 no 값
      let newFlag = false;
      let newTodo = {no, todo, newFlag}; // 새로운 객체 생성 {새번호, 새목록}
      // console.log(todo);
      this.todoList.splice(this.todoList.length, 0, newTodo);
      // console.log(this.todoList)
    },
    changCheck(no) { // 취소 class변경
      for(let i = 0; i < this.todoList.length; i++) {
        let thisTodo = this.todoList[i];
        if(thisTodo.no == no) {
          thisTodo.cancleFlag = !thisTodo.cancleFlag;
          break;
        }
      }
    },
    deleteTodo(no) { // todo 삭제
      for(let i = 0; i < this.todoList.length; i++) {
        if(this.todoList[i].no == no) {
          this.todoList.splice(i, 1);
        }
      }
    }

  }
}
</script>

<!-- TodoView.vue에서만 적용되는 style -->
<style>
body {
  margin: 0;
  min-width: 250px;
}

/* Include the padding and border in an element's total width and height */
* {
  box-sizing: border-box;
}

/* Remove margins and padding from the list */
ul {
  margin: 0;
  padding: 0;
}

/* Style the list items */
ul li {
  cursor: pointer;
  position: relative;
  padding: 12px 8px 12px 40px;
  list-style-type: none;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;
  
  /* make the list items unselectable */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Set all odd list items to a different color (zebra-stripes) */
ul li:nth-child(odd) {
  background: #f9f9f9;
}

/* Darker background-color on hover */
ul li:hover {
  background: #ddd;
}

/* When clicked on, add a background color and strike out text */
ul li.checked {
  background: #888;
  color: #fff;
  text-decoration: line-through;
}

/* Add a "checked" mark when clicked on */
ul li.checked::before {
  content: '';
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
}

/* Style the close button */
.close {
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 16px 12px 16px;
}

.close:hover {
  background-color: #f44336;
  color: white;
}

/* Style the header */
.header {
  background-color: #f44336;
  padding: 30px 40px;
  color: white;
  text-align: center;
}

/* Clear floats after the header */
.header:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the input */
input {
  margin: 0;
  border: none;
  border-radius: 0;
  width: 75%;
  padding: 10px;
  float: left;
  font-size: 16px;
}

/* Style the "Add" button */
.addBtn {
  padding: 10px;
  width: 25%;
  background: #d9d9d9;
  color: #555;
  float: left;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 0;
}

.addBtn:hover {
  background-color: #bbb;
}

.numbers {
  position: absolute;
  left: 30px;
  top: 0;
  padding: 12px 16px 12px 16px;
}
</style>