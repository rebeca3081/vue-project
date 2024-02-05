<template>
  <div>
    <Header />
    <router-view to="userList"/>
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
