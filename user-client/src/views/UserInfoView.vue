<!-- UserInfoView.vue -->
<template>
  <div class="container">
    <h1>회원 정보 조회</h1>
    <div class="row">
      <table class="table">
        <tr>
          <th>No.</th>
          <td>{{ userInfo.user_no }}</td>
        </tr>
        <tr>
          <th>아이디</th>
          <td>{{ userInfo.user_id }}</td>
        </tr>
        <tr>
          <th>비밀번호</th>
          <td>{{ userInfo.user_pwd }}</td>
        </tr>
        <tr>
          <th>이름</th>
          <td>{{ userInfo.user_name }}</td>
        </tr>
        <tr>
          <th>성별</th>
          <td>{{ changeGender }}</td>
        </tr>
        <tr>
          <th>나이</th>
          <td>{{ userInfo.user_age }}</td>
        </tr>
        <tr>
          <th>가입날짜</th>
          <td>{{ changeDate }}</td>
        </tr>
      </table>
    </div>
    <div class="row">
      <button class="btn btn-primary col-4 mr-3" @click="goToUpdate(userInfo.user_id)">수정</button>
      <router-link to="/" class="btn btn-info col-4">목록</router-link>
      <button class="btn btn-secondary col-4" @click="deleteInfo(userInfo.user_id)">삭제</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // 각 컴포넌트에서 따로 불러줘야함, 전역으로 넣지 않았음

export default {
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    let searchNo = this.$route.query.userId;
    // console.log(searchNo);
    this.getUserInfo(searchNo);
  },
  computed: {
    // 성별
    changeGender() {
      let result = null;
      let gender = this.userInfo.user_gender;
      if(gender == "M") {
        result = "남";
      } else if (gender == "F") {
        result = "여";
      }
      return result;
    },
    // 가입날짜 : 년 월 일
    changeDate() {
      let result = null;
      let joinDate = this.userInfo.join_date;
      if(joinDate != null) {
        let date = new Date(joinDate);
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);

        result = `${year}년${month}월${day}일`;
      }
      return result;
    }
  },
  methods: {
    async getUserInfo(userId) {
      //http://localhost:4000/users/admin
      let newPath = `/api/users/${userId}`;
      let result = await axios.get(newPath)
                              .catch(err => console.log(err));
      let info = result.data;
      this.userInfo = info;
    },
    goToUpdate(userId) { 
      // 수정폼 컨포넌트 호출
      // console.log(userId);
      this.$router.push({ path: '/userUpdate', query: {"userId" : userId}});
    },
    deleteInfo(userId) { 
      //서버에 해당 데이터를 삭제
      console.log(userId);
    }
  }
}
</script>
