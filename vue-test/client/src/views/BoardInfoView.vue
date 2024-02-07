<template>
  <div class="container">
    <h1>단건</h1>
    <table class="table" border="1">
      <tr>
        <th>번호</th>
        <td>{{ boardInfo.no }}</td>
        <th>작성일</th>
        <td>{{ boardInfo.created_date }}</td>
        <th>이름</th>
        <td>{{ boardInfo.writer }}</td>
      </tr>
      <tr>
        <th>제목</th>
        <td>{{ boardInfo.title }}</td>
      </tr>
      <tr>
        {{ boardInfo.content }}
      </tr>
      <tr>
        <button class="btn btn-info" @click="goToUpdate(boardInfo.no)">수정</button>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      boardInfo: {}
    }
  },
  created() {
    let searchNo = this.$route.query.boardNo;
    this.getBoardInfo(searchNo);
  },
  methods: {
    async getBoardInfo(searchNo) {
      let newPath = `/api/board/${searchNo}`;
      let result = await axios.get(newPath)
                              .catch(err => console.log(err));
      console.log(result.data);
      let info = result.data;
      this.boardInfo = info;
    },
    goToUpdate(no) {
      this.$router.push({ path: '/boardForm', query: { no } })
    }
  }
}
</script>