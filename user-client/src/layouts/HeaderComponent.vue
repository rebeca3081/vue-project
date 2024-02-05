<template>
  <!-- https://getbootstrap.com/docs/5.3/components/navs-tabs/#fill-and-justify -->
  <ul class="nav nav-pills nav-fill">
    <li class="nav-item">
      <router-link class="nav-link active" aria-current="page" to="/">전체조회</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="#">등록</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link disabled" aria-disabled="true">Disabled</router-link>
    </li>
  </ul>
</template>
