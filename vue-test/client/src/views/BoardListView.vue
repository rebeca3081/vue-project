<template>
  <div class="container">
    <h1>전체조회</h1>
    <table class="table mb-5">
      <thead>
        <tr>
          <th>No.</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일자</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(board, idx) in boardList" :key="idx"
            @click="getToBoardInfo(board.no)">
          <td>{{ board.no }}</td>
          <td>{{ board.title }}</td>
          <td>{{ board.writer }}</td>
          <td>{{ board.created_date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      boardList: []
    }
  },
  async created() {
    await this.getBoardList();
  },
  methods: {
    async getBoardList() {
      let result = await axios.get('/api/board')
                              .catch(err => console.log(err));
      console.log(result.data)
      let list = result.data;
      this.boardList = list;
    },
    getToBoardInfo(boardNo) {
      this.$router.push( { path : '/boardInfo', query : { boardNo } } )
    }
  }
}
</script>
