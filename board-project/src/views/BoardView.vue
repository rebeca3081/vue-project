<template>
  <div class="container">
    <HeaderComponent />
    <BoardList v-bind:list = "boardList" />
    <FooterComponent />
  </div>
</template>

<script>
  import BoardList from '../components/BoardList.vue'
  import HeaderComponent from '../components/HeaderComponent.vue'
  import FooterComponent from '../components/FooterComponent.vue'

  export default {
    data() {
      return {
        boardList : [
          {no: 1, title: 'Vue 좋아요', content: '프레임워크입니다.', view: 1},
          {no: 2, title: '굿모니이잉', content: '금요일이라 신난당!', view: 3},
        ]
      }
    },
    components: {
      BoardList, // BoardList: BoardList 속성명과 변수명이 같으면 생략가능
      HeaderComponent,
      FooterComponent
    }
  }
</script>
