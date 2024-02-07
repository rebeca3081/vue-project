<!-- UserListView.vue -->
<template>
  <div class="container mt-5">
    <h1>전체 회원 조회</h1>
    <table class="table">
      <caption>Total : {{ count }}</caption>
      <thead>
        <tr>
          <th>No.</th>
          <th>ID</th>
          <th>이름</th>
          <th>성별</th>
          <th>가입날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(user, i) in userList"
            @click="getToUserInfo(user.user_id)">
          <td>{{ user.user_no }}</td>
          <td>{{ user.user_id }}</td>
          <td>{{ user.user_name }}</td>
          <td>{{ user.user_gender }}</td>
          <td v-text="user.join_date" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userList: [] // 객체 or 배열 or 문자열 등등으로 초기화해주기(undefined방지)
    }
  },
  computed: { // 값, computed: data의 변경에 따라 연산 (watch와 비슷)
    count() { // 새로운 prop여서 변수명을 새롭게 해야함 (return O)
      return this.userList.length;
    }
    // 성별
    
  },
  watch: { // 프로세스, 이미 존재하는 prop의 변경을 감시
    userList(newQuestion, oldQuestion) { // 변수명이 같아야 함 (return X)
      console.log('이전: ', oldQuestion);
      // alert('데이터가 변경되었습니다.');
      console.log('이후: ', newQuestion);
    }
  },
  async created() { // 랜더링되기전에 가지고 있어야할 데이터 생성
    await this.getUserList(); // 기본은 비동기작업 -> 동기
  },
  methods: {
    async getUserList() { // 동기작업 - 해당코드는 반드시 순서대로 진행이 되어야함
      // console.log('Ajax로 데이터 조회');
      // then을 사용하지 않으면 await(내부코드가 동기작업임, 함수자체는 비동기) 사용
      let result = await axios.get('/api/users') // http://localhost:4000/users -> 상대경로로 설정해야함 /api/users
                              .catch(err => console.log(err));
      let list = result.data;
      this.userList = list; // 목적: userList에 확실히 데이터가 있어줘야함 
    },
    getToUserInfo(userId) { // ★ 라우터한테 라우팅 요청 // 무조건 get방식
      // console.log(this.$router);
      this.$router.push({ path : '/userInfo', query : { "userId" : userId } });  // push 라우터에게 요청
      // path or name -> router/index.js의 path or name 같아야함!
      // query -> 새 component에서 사용함
    }
  }
}
</script>
