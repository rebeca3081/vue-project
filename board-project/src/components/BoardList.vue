<template>

  <div>
    <table>
      <thead>
        <tr>
          <th>글번호</th>
          <th>글제목</th>
          <th>조회수</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="board in list" v-bind:key="board.no">
          <td>{{ board.no }}</td>
          <td>{{ board.title }}</td>
          <td>{{ board.view }}</td>
          <td><button>삭제</button></td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
  export default {
    props: ['list'], // 부모의 컴포넌트의 전달값을 받는 속성 (list == 부모의<BoardList v-bind:list = "boardList" />)
    data() {

    }
  }
</script>