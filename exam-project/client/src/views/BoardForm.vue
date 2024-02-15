<template>
    <div class="container">
        <form @submit.prevent >

            <label for="no">No.</label>
            <input type="text" id="no" v-model="boardInfo.no" readonly>

            <label for="title">제목</label>
            <input type="text" id="title"  v-model="boardInfo.title">

            <label for="writer">작성자</label>
            <input type="text" id="writer" v-model="boardInfo.writer">    

            <label for="content">내용</label>
            <textarea id="content" style="height:200px" v-model="boardInfo.content"></textarea>

            <label for="regdate">작성일자</label>
            <input type="text" id="regdate" v-model="boardInfo.created_date" >

            <button type="button" class="btn btn-xs btn-info" 
                @click="isUpdated ? boardUpdate() : boardInsert()">저장</button>

        </form>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {         
            boardInfo: {
                no : '',
                title : '',
                writer : '',
                content : '',
                created_date : ''
            },
            isUpdated: false // 기본 수정모드 X
        };
    },
    created() {
        let searchNo = this.$route.query.boardNo;
        if(searchNo > 0){ // null과 undefined은 배제(숫자라 가능)
            // 수정
            // 1) 단건조회 선행
            this.getBoardInfo(searchNo);
            // 2) 저장버튼 -> 수정기능 변경
            this.isUpdated = true; // 수정 <-> 저장모드가 변경 될 수 있게!
        }else{
            // 등록
           this.boardInfo.created_date = this.getDate(null);
        }
    },
    methods: {
        getDate(date) {
            let dateValue = date == null ? new Date() : new Date(date);
            let year = dateValue.getFullYear();
            let month = ('0' + (dateValue.getMonth() + 1)).slice(-2);
            let day = ('0' + dateValue.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        },
        async boardInsert() { // 등록
            // body를 채울 값을 서버로 넘겨줘야 함 =>  post/ put의 두번째 매개변수
            let data = {
                param : {
                    title : this.boardInfo.title,
                    writer : this.boardInfo.writer,
                    content : this.boardInfo.content,
                    created_date : this.boardInfo.created_date
                }
            };

            let result = await axios.post('/api/boards', data)
                                    .catch(err => console.log(err));

            let info = result.data.insertId; // MySQL 에서 Auto_Increament에서 반환되는 값
            if(info > 0) {
                alert('등록되었습니다.');
                this.boardInfo.no = info;
            }
        },
        async getBoardInfo(no) { // 단건조회
            let result = await axios.get('/api/boards/' + no)
                                    .catch(err => console.log(err));

            let newDate = this.getDate(result.data.created_date); // 날짜 포맷 변환작업
            result.data.created_date = newDate;

            this.boardInfo = result.data;
        },
        async boardUpdate() { // 수정
            let data = {
                param : {
                    title : this.boardInfo.title,
                    writer : this.boardInfo.writer,
                    content : this.boardInfo.content,
                    created_date : this.boardInfo.created_date
                }
            };

            let result = await axios.put('/api/boards/' + this.boardInfo.no, data)
                                    .catch(err => console.log(err));

            let info = result.data.changedRows;
            if(info > 0) {
                alert('수정되었습니다.');
                this.$router.push({path : '/boardList'}); // 전체조회로 돌아가기
            }
        }
    }
}
</script>
<style scoped>
/* Style inputs with type="text", select elements and textareas */
input[type=text], select, textarea {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */ 
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
}

/* Style the submit button with a specific background color etc */
button[type=button] {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* When moving the mouse over the submit button, add a darker green color */
button[type=button]:hover {
  background-color: #45a049;
}

/* Add a background color and some padding around the form */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>