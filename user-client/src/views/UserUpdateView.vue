<!-- UserUpdateView.vue -->
<template>
  <div class="container">
    <h1>회원 정보 수정</h1>
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
            <input type="text" class="form-control" v-model="userInfo.user_id" readonly>
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
          </td>
        </tr>
      </table>
    </div>
    <div class="row">
      <button class="btn btn-secondary col-4" @click="updateInfo()">저장</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
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
  created() {
    // 화면이 그려지는 시점에 원데이터가 필요함! -> created()에 사용
    // 라우터로 넘어온 쿼리의 userId값으로 ajax실행하기
    let searchNo = this.$route.query.userId; // $route == request
    this.getUserInfoes(searchNo);
  },
  methods: {
    // 회원정보조회 ajax
    async getUserInfoes(userId) {
      //http://localhost:4000/users/admin
      let newPath = `/api/users/${userId}`;
      let result = await axios.get(newPath)
                              .catch(err => console.log(err));
      // console.log(result)
      let info = result.data;
      // ★가입날짜 format 덮어쓰기
      let newDate = this.dateFormat(info.join_date);
      info.join_date = newDate;
      this.userInfo = info;
    },
    dateFormat(value) {
      let result = null;

      if(value != null) {
        let date = new Date(value);
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);

        result = `${year}-${month}-${day}`;
      } 
      return result;
    },
    // '저장 클릭 시' 회원정보 수정
    updateInfo() {
      // console.log(this.userInfo); // 콘솔로 넘어가는 정보 확인
      // 1.유효성 체크가 필요할까? 공백 처리가 따로 들어가거나 유효성 체크를 해주는 것이 좋음
      if(!this.validation()) return;
      
      // 2. ajax 실행
      // 2-1. 데이터 선별
      let data = this.newSendData();
      console.log(data)
      // 2-2. axios를 통해 ajax 실행
      // PUT http://localhost:4000/users/user02
      axios.put(`/api/users/${this.userInfo.user_id}`, data)
           .then(result => {
            console.log(result)
            // 3.결과 처리
            let count = result.data.changedRows; // changedRows->수정에서 사용됨
            if(count == 0) {
              alert(`수정되지 않았습니다.\n메세지를 확인해주세요.${result.data.message}`);
            } else {
              alert('정상적으로 수정되었습니다. :)');
              this.$router.push({ path : '/userInfo', query : { "userId" : this.userInfo.user_id } }); // 다시 단건조회로 이동
            }
           })
           .catch(err => console.log(err));
      },
      validation() {
        if(this.userInfo.user_pwd == "") {
          alert('비밀번호를 입력하세요.');
          return false;
        }

        if(this.userInfo.user_name == "") {
          alert('이름을 입력하세요.');
          return false;
        }
        return true;

      },
      newSendData() {
        let obj = this.userInfo;
        let delData = ["user_no", "user_id"]; // 가입날짜 입력시 오류나서 제외시킴
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
