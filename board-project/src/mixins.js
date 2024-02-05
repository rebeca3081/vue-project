// mixins.js
// 메소드와 라이프사이클 훅

export default {
  // 컨포넌트에서 공통기능
  methods: {
    $getToday(format) { // $로 시작: 다른 컨포넌트와 충돌방지
      let today = new Date();
      let year = today.getFullYear();
      let month = ("0" + (today.getMonth() + 1)).slice(-2);
      let day = ("0" + today.getDate()).slice(-2);

      let result = format.replace('yyyy', year)
                          .replace('MM', month)
                          .replace('dd', day);
      
      return result;
      
    }
  },
  // 각 라이프사이클 훅에 공통코드
  created() {
    console.log('Component Created');
  },
  mounted() {
    console.log('DOM Mounted');
  }
}
