<template>
  <div>
    <h1>{{ `${this.firstName} - ${this.lastName}` }}</h1>
    <h1>{{ fullName }}</h1>
    <input type="text" v-model="firstName">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        firstName: 'kildong',
        lastName: 'Hong'
      }
    },
    computed: { // 복합데이터 처리.
      fullName() {
        return `${this.firstName} / ${this.lastName}`;
      }
    },
    watch: { // 변경이전, 이후.
      firstName(curr, bef) {
        console.log('변경이전 : ', curr, '변경이후 : ',bef);
      }
    }
  }
</script>