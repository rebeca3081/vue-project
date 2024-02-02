<template>
  <content>
    <ul id="myUL">
      <!-- li click시 class="checked" 변경해주기 -->
      <!-- 삭제 버튼 클릭 시 삭제 -->
      <li v-for="todo in list" v-bind:key="todo.no" @click="changClass" v-bind:class="basic">
        <span class="numbers">{{ todo.no }}</span>
        {{ todo.todo }}<span class="close">X</span>
      </li>
    </ul>
  </content>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      active: 'checked',
      basic: ''
    }
  },
  methods: {
    // class="checked" 추가하는 메소드
    changClass() {
      this.basic = 'checked'
    }
  }
}
</script>
