<template>
  <footer>
    <div>
      <h3>2강의장 입니다.</h3>
    </div>
  </footer>
  <div v-html="data">
  </div>
  
  <slot name="header"></slot> <!-- 이름을 지정함 -->
  <slot></slot> <!-- html 템플릿을 그래로 사용 -->
  <slot name="footer"></slot>

</template>

<script>
  export default {
    props: ['data']
  }
</script>
