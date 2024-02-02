<template>
  <label>선택 :<input type="checkbox" v-model="checked" true-value="yes" false-value="no" /></label>
  <p>선택값 : {{ checked }}</p>
  <br>

  <!-- v-model => value속성에 binding -->
  <label>text속성: <input type="text" v-bind:value="ival"></label>
  <p>값: {{ ival }}</p>

  <!-- v-bind(생략가능):attribute(속성)의 값을 binding -->
  <img v-bind:src="imgSrc" :width="imgWidth">

  <!-- v-model : js영역처럼 사용가능 -->
  <input type="text" v-model="textStr">
  <button v-bind:disabled="textStr == ''">Click</button>
  <!-- <button v-bind:disabled="!isTrue">Click</button> --> <!-- !변수 사용가능 -->
</template>

<script>
export default {
  // data() 호출 시 객체반환
  data() {
    return {
      checked: 'yes',
      ival: 'sample',
      imgSrc: 'https://kr.vuejs.org/images/logo.png',
      imgWidth: '100px',
      isTrue: true,
      textStr: ''
    }
  }
}
</script>