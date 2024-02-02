<template>
  <table id="list">
    <tr>
      <th>글제목</th>
      <td><input type="text" v-model="title"></td>
    </tr>
    <tr>
      <td colspan="2">
        <textarea v-model="content"></textarea>
      </td>
    </tr>
  </table>
  <button style="float: right;" v-on:click="boardSave">저장</button>

</template>

<script>
  export default {
    data () {
      return {
        title: '',
        content: ''
      }
    },
    methods: {
      boardSave() {
        // 부모컨포넌트의 메소드 실행요청(이벤트와 파라미터 2개:데이터 넘기기)
        this.$emit('save-board', this.title, this.content);
      }
    }
  }
</script>
