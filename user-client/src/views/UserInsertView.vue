<!-- UserInsertView.vue -->
<template>
  <div class="container">
    <h1>회원 정보 등록</h1>
    <div class="row">
      <table class="table">
        <tr>
          <th>No.</th>
          <td>
            <input type="number" class="form-control" v-model="userInfo.user_no" readonly>
          </td>
        </tr>
        <tr>
          <th>아이디</th>
          <td>
            <input type="text" class="form-control" v-model="userInfo.user_id">
          </td>
        </tr>
        <tr>
          <th>비밀번호</th>
          <td>
            <input type="password" class="form-control" v-model="userInfo.user_pwd">
          </td>
        </tr>
        <tr>
          <th>이름</th>
          <td>
            <input type="text" class="form-control" v-model="userInfo.user_name">
          </td>
        </tr>
        <tr>
          <th>성별</th>
          <td>
            <input type="radio" value="M" v-model="userInfo.user_gender">남
            <input type="radio" value="F" v-model="userInfo.user_gender">여
            <!-- <input type="checkbox" true-value="예" false-value="아니오" v-model="chkVal"> -->
          </td>
        </tr>
        <tr>
          <th>나이</th>
          <td>
            <input type="number" class="form-control" v-model="userInfo.user_age" min="0" max="150">
          </td>
        </tr>
        <tr>
          <th>가입날짜</th>
          <td>
            <input type="date" class="form-control" v-model="userInfo.join_date">
            <!-- yyyy-MM-dd -->
          </td>
        </tr>
      </table>
    </div>
    <div class="row">
      <button class="btn btn-secondary col-4" @click="insertInfo()">저장</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      // chkVal: "",
      // v-model="필드명" -> 서버통신을 위해 컬럼명과 같게
      userInfo: {
        user_no: null,
        user_id: "",
        user_pwd: "",
        user_name: "",
        user_gender: null,
        user_age: null,
        join_date: null
      }
    }
  },
  created() { // 초기값을 그려줘야하니까 created hook 사용
    this.userInfo.join_date = this.getToday();
  },
  methods: {
    getToday() { // 오늘날짜 셋팅
      let today = new Date();
      let year = today.getFullYear();
      let month = ('0' + (today.getMonth() + 1)).slice(-2);
      let day = ('0' + today.getDate()).slice(-2);

      return `${year}-${month}-${day}`;
    },
    insertInfo() {
      // 1) 유효성 체크
      if(!this.validation()) return;

      // 2) ajax
      // 2-1) 실제 보낼 데이터 선별
      let data = this.getSendData(); // 객체 or 배열 -> json이 인식할 수 있는 형태
      
      // 2-2) axios를 이용해 ajax : axios는 content-type 이 json 자동변환이 됨
      // path : /api/users
      axios
      .post('/api/users', data)
      // 3) 결과처리
      .then(result => {
        // console.log(result);
        let user_no = result.data.insertId; // auto-increament에서만 작동
        if(user_no == 0) {
          alert(`등록되지 않았습니다.\n메세지를 확인해주세요.${result.data.message}`);
        } else {
          alert('정상적으로 등록되었습니다.');
          this.userInfo.user_no = user_no;
        }
      })
      .catch(err => console.log(err));

    },
    validation() {
      // user_no, user_id, user_pwd, user_name
      if(this.userInfo.user_id == "") {
        alert('아이디를 입력하세요.');
        return false;
      }

      if(this.userInfo.user_pwd == "") {
        alert("비밀번호를 입력하세요.");
        return false;
      }

      if(this.userInfo.user_name == "") {
        alert("이름을 입력하세요.");
        return false;
      }
      
      return true;
    },
    getSendData() {
      let obj = this.userInfo;
      let delData = ["user_no"];
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
