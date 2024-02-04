<template>
  <content>
    <ul id="myUL">
      <!-- li click시 class="checked" 변경해주기 -->
      <!-- 삭제 버튼 클릭 시 삭제 -->
      <li v-for="todo in list" v-bind:key="todo.no" @click="changClass(todo.no)" v-bind:class="{checked: todo.cancleFlag}">
        <span class="numbers">{{ todo.no }}</span>
        {{ todo.todo }}<span class="close" @click="deleteTodo(todo.no)">X</span>
      </li>
    </ul>
  </content>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
    }
  },
  methods: {
    // class="{checked: true | checked: false}" 추가하는 메소드
    changClass(no) {
      this.$emit('change-class', no);
    },
    // 삭제 메소드
    deleteTodo(no) {
      this.$emit('delete-todo', no);
    }
  }
}
</script>
