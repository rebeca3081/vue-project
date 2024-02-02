<template>
  <div class="container" v-bind:class="simpleClass">
    클래스 추가방식
  </div>

  <div class="container"
      v-bind:class="{active: activeValue, 'text-red': false}">
    객체와 변수
  </div>

  <div class="container"
      v-bind:class="[activeClass, redClass]">
    배열
  </div>

  <div style="color: red; background: yellow;">
    인라인 스타일 : 기본
  </div>

  <div v-bind:style="{color: attr1, background: attr2}">
    인라인 스타일 : 바인딩
  </div>

  <div v-bind:style="colorStyle">
    인라인 스타일 바인딩 : 변수로 선언
  </div>

</template>

<script>
export default {
  // data() 호출 시 객체반환
  data() {
    return {
      simpleClass: 'active text-red',
      activeValue: true, 
      redValue: false,
      activeClass: 'newactive',
      redClass: 'text-blue',
      attr1: 'green',
      attr2: 'black',
      // colorStyle: 'color:red; background:yellow;' // 1.방식
      colorStyle: {
        color: 'yellow',
        background: 'blue'
      }
    }
  },
  mounted() {
    console.log(this); // dataBinding4.vue
  },
  methods: { // 이벤트가 발생시 실행함수


  }
}
</script>

<style>
  .container {
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
  }
  .active {
    background-color: lightsteelblue;
    font-weight: bold;
    line-height: 50px;
  }
  .newactive {
    background-color: lightsalmon;
    font-weight: bold;
    line-height: 50px;
  }
  .text-red {
    color: red;
  }
  .text-blue {
    color: blue;
  }
</style>