<template>
  <h3>Hello {{ msg }}</h3> <!-- Mustache -->
  <div>{{ htmlStr }}</div> <!-- 문자열로 바인딩됨 -->
  <div v-html="htmlStr"></div> <!-- v-지시자="js영역:변수로 생각해도됨" -->
  <input type="text" v-model="vmodel" />
  <p>{{ vmodel }}</p>
  <textarea cols="30" rows="10" v-model="message" placeholder="write here"></textarea>
</template>

<script>
export default {
  // data() 호출 시 객체반환
  data() {
    return {
      msg: 'This is DataBinding.vue!',
      htmlStr: '<p style = "color: red;">Hello</p>',
      vmodel: 'Nice, haha',
      message: '여러라인의 값을\n 읽습니다.'
    }
  }
}
</script>