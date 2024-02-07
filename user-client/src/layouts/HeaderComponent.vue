<template>
  <!-- https://getbootstrap.com/docs/5.3/components/navs-tabs/#fill-and-justify -->
  <ul class="nav nav-pills nav-fill mx-5">
    <li class="nav-item">
      <router-link class="nav-link active" aria-current="page" to="/">전체조회</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/userInsert">등록</router-link>
      <router-link class="nav-link" to="/userForm">등록 및 수정</router-link>
    </li>
    <li class="nav-item">
      <a class="nav-link disabled" aria-disabled="true">Disabled</a>
    </li>
  </ul>
</template>
