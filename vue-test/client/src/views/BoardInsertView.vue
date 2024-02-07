<template>
  <div class="container">
    <table class="table" border="1">
      <tr>
        <th>No.</th>
        <td>
          <input type="number" class="form-control" v-model="boardInfo.no" readonly />
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
        <button class="btn btn-success" @click="insertInfo()">저장</button>
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
      }
    }
  },
  created() {
    this.boardInfo.created_date = this.getDate();
  },
  methods: {
    getDate() {
      let today = new Date();
      let year = today.getFullYear();
      let month = ('0' + (today.getMonth() + 1)).slice(-2);
      let day = ('0' + today.getDate()).slice(-2);

      return `${year}-${month}-${day}`;
    },
    insertInfo() {
      let data = this.getSendData();

      axios.post('/api/board', data)
            .then(result => {
              console.log(result.data)
              let no = result.data.insertId; // auto-increament에서만 작동
              if(no == 0) {
                alert(`등록되지 않았습니다.\n메세지를 확인해주세요.${result.data.message}`);
              } else {
                alert('정상적으로 등록되었습니다.');
                this.boardInfo.no = no;
                this.$route.push({path: '/boardList'});
              }
            })
            .catch(err => console.log(err));
    },
    getSendData() {
      let obj = this.boardInfo;
      let delData = ["no"];
      let newObj = {};
      let isTargeted = null;

      for (let field in obj) {
        isTargeted = false;
        for (let target of delData) {
          if (field == target) {
            isTargeted = true;
            break;
          }
        }
        if (!isTargeted) {
          newObj[field] = obj[field];
        }
      }
      let sendData = {
        "param" : newObj
      }
      return sendData;
    }
  }
}
</script>
