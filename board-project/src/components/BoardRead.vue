<template>
  <table id="list">
    <tr>
      <th style="width: 100px;">글제목</th>
      <td>{{ board.title }}</td>
    </tr>
    <tr>
      <th style="width: 100px; height: 200px;">글내용</th>
      <td>{{ board.content }}</td>
    </tr>
  </table>
  <button style="float: right;" @click="openList">목록</button>

</template>

<script>
  export default {
    props: ['board'],
    data () {
      return {
      }
    }, methods: {
      openList() {
        this.$emit('show-list');
      }
    }
  }
</script>
