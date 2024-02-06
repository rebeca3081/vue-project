<!-- UserUpdateView.vue -->
<template>
  <div class="container">
    <h1>회원 정보 수정</h1>
    <div class="row">
      <table class="table">
        <tr>
          <th>No.</th>
          <td>
            <input type="number" v-model="userInfo.user_no" readonly>
          </td>
        </tr>
        <tr>
          <th>아이디</th>
          <td>
            <input type="text" v-model="userInfo.user_id">
          </td>
        </tr>
        <tr>
          <th>비밀번호</th>
          <td>
            <input type="password" v-model="userInfo.user_pwd">
          </td>
        </tr>
        <tr>
          <th>이름</th>
          <td>
            <input type="text" v-model="userInfo.user_name">
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
            <input type="number" v-model="userInfo.user_age" min="0" max="150">
          </td>
        </tr>
        <tr>
          <th>가입날짜</th>
          <td>
            <input type="date" v-model="userInfo.join_date">
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
    // 화면이 그려지는 시점에 데이터가 필요함! -> created()에 사용
    // 라우터로 넘어온 쿼리의 userId값으로 ajax실행하기
    let searchNo = this.$route.query.userId;
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
      this.userInfo = info;
    },
    // '저장 클릭 시' 회원정보 수정
    updateInfo() {
      // console.log(this.userInfo); // 콘솔로 넘어가는 정보 확인
      // 1.유효성 체크가 필요할까? 이미 정보가 있으니까 필요 없지 않을까 싶으면서도 정보누락 방지를 위해서 필요할 것 같기도...?
      
      // 2. ajax 실행
      // 2-1. 데이터 선별
      let data = this.newSendData();
      console.log(data)
      // 2-2. axios를 통해 ajax 실행
      // PUT http://localhost:4000/users/user02
      axios.put(`/api/users/${data.param.user_id}`, data)
           .then(result => {
            console.log(result)
            // 3.결과 처리
            if(result.data.changedRows == 0) {
              alert(`수정되지 않았습니다.\n메세지를 확인해주세요.${result.data.message}`);
            } else {
              alert('정상적으로 수정되었습니다. :)');
            }
           })
           .catch(err => console.log(err));
      

      },
      newSendData() {
        let obj = this.userInfo;
        let delData = ["user_no", "join_date"]; // 가입날짜 입력시 오류나서 제외시킴
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
