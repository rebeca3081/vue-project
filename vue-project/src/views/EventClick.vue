<template>
  <div>
    <!-- click 이벤트 -->
    <button v-on:click="increaseCounter">Add</button>
    
    <p>Counter is : {{ counter }}</p>

    <button v-on:click="increaseCounter2(3)">Increase</button>
    <br>

    <button v-on:click="one(), two()">다중호출</button>
    <br>

    <!-- change 이벤트 -->
    <select v-model="city" @change="changeSelect">
      <option value="1">서울</option>
      <option value="2">부산</option>
      <option value="3">제주</option>
    </select>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        counter : 5,
        city: '1'
      };
    },
    methods: { // methods는 여러개 선언이 가능-> 객체
      increaseCounter() { // 이벤트 핸들러 이름
        console.log('increaseCounter')
        this.counter = this.counter + parseInt(this.city);
      },
      increaseCounter2(num) {
        this.counter = this.counter + num;
      },
      one() {
        alert('One');
      },
      two() {
        alert('Two');
      },
      changeSelect() {
        alert(this.city)
      }
    },
    beforeUpdate() { // Event Hook
      // 변경 이전에 필요한 처리를 구현.
      console.log('beforeUpdate 발생');
    },
    updated() {
      // 변경 이후에 필요한 처리를 구현. 
      console.log('updated 발생');
    }
  }
</script>