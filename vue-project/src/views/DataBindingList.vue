<template>
  <!-- DataBindingList.vue -->
  <div>
    <table border="1">
      <thead>
        <tr>
          <th>No.</th>
          <th>제품명</th>
          <th>가격</th>
          <th>카테고리</th>
          <th>배송료</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, idx) in productList"
            v-bind:key="idx"> <!-- v-bind:key -->
          <td>{{ idx + 1 }}</td>
          <td>{{ product.product_name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.delivery_price }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 랜더링문법(v-if) : 조건에 따라 태그자체를 생성하거나 삭제함 -->
  <h3 v-if="score >= 90">A</h3>
  <h3 v-else-if="score >= 80">B</h3>
  <h3 v-else>C</h3>

  <!-- display속성으로 조절함 -->
  <h3 v-show="score >= 90">90보다 큽니다.</h3>
</template>

<script>
  export default {
    data() {
      return {
        score: 80,
        productList: [
          {"product_name":"기계식키보드","price":25000,"category":"노트북/태블릿","delivery_price":5000},
          {"product_name":"무선마우스","price":12000,"category":"노트북/태블릿","delivery_price":5000},
          {"product_name":"아이패드","price":725000,"category":"노트북/태블릿","delivery_price":5000},
          {"product_name":"태블릿거치대","price":32000,"category":"노트북/태블릿","delivery_price":5000},
          {"product_name":"무선충전기","price":42000,"category":"노트북/태블릿","delivery_price":5000}
        ]
      };
    }
    /* ,
    computed: {
      formatPrice (price) {
        if (price > 999) {
          var priceAry = price.split("").reverse();
          var idx = 1;
          while(priceAry.length > idx + 3) {
            priceAry.splice(idx + 3, 0, ',');
            idx += 4;
          }
          return priceAry.reverse().join('') + '원';
        } else {
          return price + '원';
        }
      }
    }
    */
  }
</script>

<style>
  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px
  }
  tbody tr td:first-child {
    text-align: center;
    background-color: #eee;
  }
</style>
