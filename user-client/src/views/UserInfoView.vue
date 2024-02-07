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
      // this.$router.push({ path: '/userUpdate', query: { userId }}); 
      this.$router.push({ path: '/userForm', query: { "id" :userId }}); 
      // query: { userId } : 변수명 == 필드명, 변수가 가지고 있는 값이 필드의 값
    },
    deleteInfo(userId) { 
      // 서버에 해당 데이터를 삭제
      // http://localhost:4000/users/user05
      let newPath = `/api/users/${userId}`;
      axios.delete(newPath)
            .then(result => {
              if(result.data.affectedRows != 0 && result.data.changedRows == 0) {
                alert('삭제 완료되었습니다.');
                this.$router.push({ path: '/' }); // 다시 전체목록으로 돌아가기 or 페이지를 새로 그려주기
              } else {
                alert(`삭제 실패...\n메세지를 확인하세요. ${result.data.message}`);
              }
            })
            .catch(err => console.log(err));
    }
  }
}
</script>
