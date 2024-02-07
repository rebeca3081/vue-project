<template>
  <div class="container">
    <h3>{{ title }}</h3>
    <table class="table" border="1">
      <tr>
        <th>No.</th>
        <td>
          <input type="number" class="form-control" v-model="boardInfo.no" v-bind:readonly="isUpdated" />
        </td>
      </tr>
      <tr>
        <th>제목</th>
        <td>
          <input type="text" class="form-control" v-model="boardInfo.title" />
        </td>
      </tr>
      <tr>
        <th>작성자</th>
        <td>
          <input type="text" class="form-control" v-model="boardInfo.writer" />
        </td>
      </tr>
      <tr>
        <th>내용</th>
        <td>
          <textarea type="text" class="form-control" cols="100" rows="10" v-model="boardInfo.content"></textarea>
        </td>
      </tr>
      <tr>
        <th>작성일자</th>
        <td>
          <input type="date" class="form-control" v-model="boardInfo.created_date" />
        </td>
      </tr>
      <tr>
        <button class="btn btn-success" @click="saveInfo(searchNo)">저장</button>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      boardInfo: {
        no: null,
        title: "",
        writer: "",
        content: "",
        created_date: null
      },
      searchNo: null,
      isUpdated: false
    }
  },
  computed: {
    title() {
      return this.isUpdated ? '게시글 수정' : '게시글 등록';
    }
  },
  created() {
    this.searchNo = this.$route.query.no;
    console.log(this.searchNo);
    if(this.searchNo != null && this.searchNo != undefined) {
      this.getBoardInfo(); // 단건조회 실행
    } else {
      this.boardInfo.created_date = this.getDate('');
    }
  },
  methods: {
    getDate(value) {
      if(value == null) return null;

      let today = value == '' ? new Date() : new Date(value);

      let year = today.getFullYear();
      let month = ('0' + (today.getMonth() + 1)).slice(-2);
      let day = ('0' + today.getDate()).slice(-2);

      return `${year}-${month}-${day}`;
    },
    async getBoardInfo(searchNo) {
      let newPath = `/api/board/${searchNo}`;
      let result = await axios.get(newPath)
                              .catch(err => console.log(err));
      console.log(result.data);
      let info = result.data;
      this.boardInfo = info;
    },
    saveInfo(no) {
      let info = this.getSendInfo(no);

      axios(info)
      .then(result => {
        let count = result.data.affectedRows;
        if(count == 0) {
          alert('저장되지 않았습니다. 내용을 확인해주세요.');
        } else {
          alert('저장되었습니다.');
          
          if(result.data.insertId > 0) { // 등록일 경우 추가 작업
            this.boardInfo.no = result.data.insertId;
          } 
        }
      })
      .catch(err => console.log(err));
    },
    getSendInfo(no) {
      let method = '';
      let url = '';
      let data = null;
      
      // 등록
      if(no == null || no == undefined) {
        method = 'post';
        url = `/api/board`;
        data = {
          "param" : {
            no: this.boardInfo.no,
            title: this.boardInfo.title,
            writer: this.boardInfo.writer,
            content: this.boardInfo.content,
            created_date: this.boardInfo.created_date
          }
        }
        // 수정
      } else {
        method = 'put';
        url = `/api/board${no}`;
        data = {
          "param" : {
            no: this.boardInfo.no,
            title: this.boardInfo.title,
            writer: this.boardInfo.writer,
            content: this.boardInfo.content,
            created_date: this.boardInfo.created_date
          }
        }
      }

      return {
        method,
        url,
        data
      }
    }
  }
}
</script>