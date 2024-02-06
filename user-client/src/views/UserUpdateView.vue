<!-- UserUpdateView.vue -->
<template>
  <div class="container">
    <h1>회원 정보 등록</h1>
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
            <!-- <input type="checkbox" true-value="예" false-value="아니오" v-model="chkVal"> -->
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
            <!-- yyyy-MM-dd -->
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
    let searchNo = this.$route.query.userId;
    console.log(searchNo);
    this.getUserInfoes(searchNo);
  },
  methods: {
    async getUserInfoes(userId) {
      //http://localhost:4000/users/admin
      let newPath = `/api/users/${userId}`;
      let result = await axios.get(newPath)
                              .catch(err => console.log(err));
      console.log(result)
      let info = result.data;
      this.userInfo = info;
    },
    updateInfo() {
      console.log(this.userInfo);
    }
  }
}
</script>
