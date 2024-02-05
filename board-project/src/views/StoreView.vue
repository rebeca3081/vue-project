<template>
  <div>
    <form>
      <label>
        제품 ID:
        <input type="text" v-model="productInfo.product_id">
      </label>
      <br>
      <label>
        제품명:
        <input type="text" v-model="productInfo.product_name">
      </label>
      <br>
      <label>
        카테고리:
        <input type="radio" value="A" v-model="productInfo.category"> A
        <input type="radio" value="B" v-model="productInfo.category"> B
      </label>
      <br>
      <button type="button" @click="addCart">추가</button>
    </form>

    <table>
      <thead>
        <caption> total : {{ total }}</caption><!-- computed안에 있는건 값으로 인식됨 메소드X -->
        <tr>
          <th>카테고리</th>
          <th>제품ID</th>
          <th>제품명</th>
        </tr>
      </thead>

      <tbody>
        <tr :key="idx" v-for="(info, idx) in productList">
          <td>{{ info.category }}</td>
          <td>{{ info.product_id }}</td>
          <td>{{ info.product_name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default{
    data() { // 가장 기본이 되는 프로퍼티, 데이터 CRUD가 가능
      return {
        productInfo: {
          product_id: '',
          product_name: '',
          category: 'A'
        }
      }
    },
    computed: { // readOnly, data 옵션이 연산된 결과를 가지고 있음
      productList() {
        return this.$store.state.cart; // productInfo와는 다름!!
      },
      total() {
        return this.$store.getters.cartCount;
      }
    },
    methods: { // 기능
      addCart() {
        let obj = { // 객체와 배열은 참조타입, 추가된 데이터는 참조타입임으로 통째로 넘기지 X, 내부값을 복사해서 새로운 값으로 넘기기!(안전함)
          product_id: this.productInfo.product_id,
          product_name: this.productInfo.product_name,
          category: this.productInfo.category
        } 
        // 1. commit() -> mutations쪽을 찾겠다 : vuesx 쪽에 정의되어있는 이름이 같아야함
        // this.$store.commit('addProduct', obj); // 명시적 commit
        // this.productInfo -> 객체 메모리 주소가 넘어감(대상이 같음) X : js의 참조타입

        // 2. dispatch() -> actions쪽을 찾겠다
        this.$store.dispatch('addProduct', obj);
      }
    }
  }
</script>

<style>
  table, th, td {
    border: 2px solid #555;
  }
</style>