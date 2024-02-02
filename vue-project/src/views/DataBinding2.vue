<template>
  <select v-model="city">
    <option value="02">서울</option>
    <option value="03">대구</option>
    <option value="04">울산</option>
    <option value="05">제주</option>
  </select>
  <br>

  <p>{{ city }}</p> <!-- value값을 보여줌 -->
  <label>선택 :<input type="checkbox" v-model="checked" true-value="yes" false-value="no" /></label>
  <p>선택값 : {{ checked }}</p>
  <br>

  <label><input type="checkbox" v-model="checkItems" value="01">서울</label>
  <label><input type="checkbox" v-model="checkItems" value="02">부산</label>
  <label><input type="checkbox" v-model="checkItems" value="03">제주</label>
  <label><input type="checkbox" v-model="checkItems" value="04">대구</label>
  <p>선택값 : {{ checkItems }}</p>
  <br>
</template>

<script>
export default {
  // data() 호출 시 객체반환
  data() {
    return {
      city: '05',
      checked: 'yes',
      checkItems: [] // input의 value를 각각 들고오려면 배열에 값을 담아야함
    }
  }
}
</script>