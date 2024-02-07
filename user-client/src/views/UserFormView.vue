<!-- UserFormView.vue -->
<template>
  <div class="container">
    <h3 class="text-center">{{ title }}</h3>
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
            <input type="text" class="form-control" v-model="userInfo.user_id" v-bind:readonly="isUpdated">
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
      <!-- (1)방식 :함수 내부에서 처리 -->
      <!-- <button class="btn btn-secondary col-4" @click="saveInfo(searchNo)">저장</button> -->
      <!-- (2)방식 : 함수 자체를 다르게 처리 -->
      <button class="btn btn-secondary col-4" @click="isUpdated ? updateInfo() : insertInfo()">저장</button>
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
      },
      searchNo: null, //  등록 || 수정 판별 (affective rows도 사용가능)
      isUpdated: false
    }
  },
  created() {
    // this.userInfo.join_date = this.getDate();
    this.searchNo = this.$route.query.id;
    if(this.searchNo != null && this.searchNo != undefined) { // 사용자가 누군가를 호출 == 등록 X, 수정이라는 뜻
      this.getUserInfo(); // 단건조회 실행
    } else {
      this.userInfo.join_date = this.getDate('');
    }
  },
  computed: {
    title() {
      return this.isUpdated ? '회원 정보 수정' : '회원 정보 등록';
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
    // 단건조회
    async getUserInfo() {
      let result = await axios.get(`/api/users/${this.searchNo}`)
                              .catch(err => console.log(err));
      let info = result.data;
      
      let newDate = this.getDate(info.join_date);
      info.join_date = newDate;

      this.userInfo = info;
      this.isUpdated = true;
    },
    saveInfo(id) { // (1)방식 :함수 내부에서 처리
      // 1) 서버로 보낼 데이터 산출
      let info = this.getSendInfo(id); // 등록을 기준으로 on, off 형태

      // 2) ajax로 보냄
      axios(info)
      .then(result => {
        let count = result.data.affectedRows;
        if(count == 0) {
          alert('저장되지 않았습니다. 내용을 확인해주세요.');
        } else {
          alert('저장되었습니다.');
          
          if(result.data.insertId > 0) { // 등록일 경우 추가 작업
            this.userInfo.user_no = result.data.insertId;
          } 

        }
      })
      .catch(err => console.log(err));
    },
    getSendInfo(id) {
      // method, url, data
      let method = '';
      let url = '';
      let data = null;

      // 등록
      if(id == null || id == undefined) { // 값이 변경되지 X -> 등록
        method = 'post';
        url = `/api/users`;
        data = {
          "param" : {
            user_id: this.userInfo.user_id,
            user_pwd: this.userInfo.user_pwd,
            user_name: this.userInfo.user_name,
            user_gender: this.userInfo.user_gender,
            user_age: this.userInfo.user_age,
            join_date: this.userInfo.join_date,
          }
        }

      // 수정
      } else {
        method = 'put';
        url = `/api/users/${id}`;
        data = {
          "param" : {
            user_pwd: this.userInfo.user_pwd,
            user_name: this.userInfo.user_name,
            user_gender: this.userInfo.user_gender,
            user_age: this.userInfo.user_age,
            join_date: this.userInfo.join_date,
          }
        };
      }

      return { // 변수명이 정해져있음(axios의 객체의 필드명)
        method,
        url,
        data
      }
    },
    // (2)방식 : 함수 자체를 다르게 처리
    insertInfo(){
      if(!this.validation()) return;

      let data = {
          "param" :  {
                  user_id : this.userInfo.user_id,
                  user_pwd : this.userInfo.user_pwd,
                  user_name : this.userInfo.user_name,
                  user_gender : this.userInfo.user_gender,
                  user_age : this.userInfo.user_age,
                  join_date : this.userInfo.join_date
              }
      }

      axios
      .post('/api/users', data)
      .then(result => {
          let user_no = result.data.insertId;
          if(user_no == 0){
              alert(`등록되지 않았습니다.\n내용을 확인해주세요`)
          }else{
              alert(`정상적으로 등록되었습니다.`);
              this.userInfo.user_no = user_no;
          }
      })
      .catch(err => console.log(err));        

    },
    updateInfo(){
      if(!this.validation()) return;

      let data = {
          "param" : {
                  user_pwd : this.userInfo.user_pwd,
                  user_name : this.userInfo.user_name,
                  user_gender : this.userInfo.user_gender,
                  user_age : this.userInfo.user_age,
                  join_date : this.userInfo.join_date
              }
      };

      axios
      .put(`/api/users/${this.userInfo.user_id}`, data)
      .then(result => {
          let count = result.data.changedRows;
          if(count == 0){
              alert(`수정되지 않았습니다.\n내용를 확인해주세요`)
          }else{
              alert(`정상적으로 수정되었습니다.`);
          }                   
      })
      .catch(err => console.log(err));        

    },
    validation(){
      if(this.userInfo.user_id == "" && !this.isUpdated){ // 등록일 때만 추가알림
          alert('아이디가 입력되지 않았습니다.');
          return false;
      } 

      if(this.userInfo.user_pwd == ""){
          alert('비밀번호가 입력되지 않았습니다.');
          return false;
      }

      if(this.userInfo.user_name == ""){
          alert('이름이 입력되지 않았습니다.');
          return false;
      }

      return true;
    }
  }
}
</script>
