<template>

  <div class="container">
    <table id="list">
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
          <td @click="showRead(board)">
            {{ board.title }}
          </td>
          <td>{{ board.view }}</td>
          <td>
            <button v-on:click="boardDelete(board.no)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button style="float: right;" @click="showWrite">글쓰기</button>
  </div>

</template>

<script>
export default {
  props: ['list'], // 부모 컴포넌트의 전달값을 받는 속성 (list == 부모의<BoardList v-bind:list = "boardList" />)
  data () {
    return {
    }
  },
  methods: {
    showWrite() {
      // console.log(this.$parent.listView);
      // this.$parent.listView = false; // 부모컨포넌트에 직접 접근하면 유지보수가 어려워짐!! 사용(X)
      // this.$parent.writeView = true;

      // 부모컨보넌트 데이터를 변경 -> 변경을 요청함! -> .$emit('')
      this.$emit('show-write'); // 보모컴포넌트의 이벤트를 실행하기 위한 호출.
    },
    showRead(board) {
      // 상세화면 보여주는 기능
      this.$emit('show-read', board);

    },
    boardDelete(no) { // 파라미터 전달
      // console.log('삭제버튼 클릭됨/하위', no);
      this.$emit('board-delete', no);
    }
  }
}
</script>
