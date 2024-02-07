<template>
  <div>
    <Header />
    <router-view :key="$route.fullPath" />
    <!-- "/userForm?id=user01" -->
  </div>
</template>

<script>
import Header from './layouts/HeaderComponent.vue'

export default {
  components: {
    Header
  }
}
</script>
