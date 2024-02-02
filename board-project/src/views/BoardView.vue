<template>
  <div class="container">
    <!-- 하위 컨포넌트 -->
    <HeaderComponent />
    <BoardList v-if="listView" v-bind:list="boardList"
                @show-write="showWrite"
                @show-read="showRead"
                @board-delete="deleteBoard" />
    <BoardWrite v-if="writeView" @save-board="saveBoard" />
    <BoardRead v-if="readView" v-bind:board="board" @show-list="showList"/>
    <!-- html 태그를 전달 -->
    <FooterComponent v-bind:data="htmlData">
      <template v-slot:footer><h3>Since 2023</h3></template>
      <template v-slot:header><h3>Header에 들어갈 내용</h3></template>
      <template v-slot:default> <!-- slot인데 이름이 없음 -->
        <p>Hello, World :)</p>
      </template>
    </FooterComponent>
  </div>
</template>

<script>
import BoardList from '../components/BoardList.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import BoardWrite from '../components/BoardWrite.vue'
import BoardRead from '../components/BoardRead.vue'

export default {
  data () {
    return {
      listView: true, // 글목록은 열고
      writeView: false, // 글쓰기는 닫고
      readView: false, // 상세보기 닫고
      board: {}, // 상세화면에 사용할 데이터.
      boardList: [
        { no: 1, title: 'Vue 좋아요', content: '프레임워크입니다.', view: 1 },
        { no: 2, title: '굿모니이잉', content: '금요일이라 신난당!', view: 3 },
        { no: 3, title: '테스트', content: '테스트중입니다!', view: 4 }
      ],
      htmlData: '<p>hello</p>'
    }
  },
  components: {
    BoardList, // BoardList: BoardList 속성명과 변수명이 같으면 생략가능
    HeaderComponent,
    FooterComponent,
    BoardWrite,
    BoardRead
  },
  methods: {
    showWrite() { // 글목록의 이벤트(글쓰기 보여주는 기능)
      this.listView = false; // 글목록은 닫기
      this.writeView = true; // 글쓰기는 열기
    },
    showList() { // 글쓰기의 이벤트(글목록 보여주는 기능)
      this.listView = true; // 글목록은 열기
      this.writeView = false; // 글쓰기는 닫기
      this.readView = false; // 상세화면 닫기
    },
    showRead(board) { // 상세화면
      // console.log(board); // 글번호
      this.listView = false; // 글목록은 닫기
      this.writeView = false; // 글쓰기는 닫기
      this.readView = true; // 상세화면은 열기
      this.board = board;
      /* 글번호의 조회수(view) 올리기 */
      // 글번호의 인덱스를 찾아서 현재 조회수를 파악하고 증가하기
      let idx = -1; // 해당위치의 값을 새로운 값으로 변경하기 위해서
      let viewCnt = 0;
      for (let i = 0; i < this.boardList.length; i++) {
        if (this.boardList[i].no == board.no) {
          idx = i;
          viewCnt = this.boardList[i].view;
          break;
        }
      }
      let brd = {no: board.no, title: board.title, content: board.content, view: viewCnt+1}
      this.boardList.splice(idx, 1, brd);
    },
    saveBoard(title, content) { // 글등록
      // console.log(title, content);
      let idx = this.boardList.length - 1; // 마지막 데이터(boardList)의 idndex
      let no = parseInt(this.boardList[idx].no) + 1; // 새로운 데이터(boardList)의 no값
      let board = {no, title, content, view: 0};
      this.boardList.splice(this.boardList.length, 0, board); // 마지막에 추가
      this.showList(); // 글목록 다시 보여줌
    },
    deleteBoard(no) { // 글삭제
      // console.log(no, '클릭상위');
      this.boardList = this.boardList.filter(board => board.no == no ? false : true);
      // => 배열에 담아주면 refresh가 됨
    }
  }
}
</script>
