<template>
  <nav>
    <h1>{{ getToday }}</h1>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/board">게시판</router-link> |
    <router-link to="/todo">Todo</router-link> |
    <router-link to="/store">store</router-link>
  </nav>
  <router-view/>
</template>

<script>
export default {
  // mixins: [''], // 여러개의 mixins가능 (import 해서 사용)
  data() {
    return {
      rootData: 'hello' // this.data.rootData ($data : 숨겨진옵션)
    }
  },
  provide() {
    return {
      rootList: 'hello, have a good',
      rootStr: 'World',
      rootStr2: '반갑소'
    }
  },
  computed: { // methods / computed(데이터 옵션에 연결됨, 상수개념) minxins -> 함수
    getToday() {
      return this.$getToday('yyyy/MM/dd'); //$ 숨김 옵션이 아니라 minxins임!
    }
  },
  mounted() {
    console.log('App.vue mounted');
  }
}
</script>

<style>
@import url(../src/assets/style.css);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
