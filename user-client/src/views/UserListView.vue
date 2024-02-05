<!-- UserListView.vue -->
<template>
  <div class="container">
    <h1>전체 회원 조회</h1>
    <table>

    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [] // 객체 or 배열 or 문자열 등등으로 초기화해주기(undefined방지)
    }
  },
  async created() { // 랜더링되기전에 가지고 있어야할 데이터 생성
    await this.getUserList(); // 기본은 비동기작업 -> 동기
  },
  methods: {
    async getUserList() { // 동기작업 - 해당코드는 반드시 순서대로 진행이 되어야함
      console.log('Ajax로 데이터 조회');
      // then을 사용하지 않으면 await(내부코드가 동기작업임, 함수자체는 비동기) 사용
      let result = await axios.get('http://localhost:4000/users')
                              .catch(err => console.log(err));
      let list = result.data;
      this.userList = list; // 목적: userList에 확실히 데이터가 있어줘야함 
    }
  }
}
</script>
