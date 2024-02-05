// store.js
import { createStore } from 'vuex'; // 저장소 생성 함수
import createPersistedState from 'vuex-persistedstate' // 새로고침또는 브라우저를 닫았다 열어도 남아있어야하는 정보저장하는 기능

export default createStore ({ // createStore함수를 통과한 결과물이 넘어가야 함
  state() { // 함수
    return {
      cart: [
        {
          product_id: 1,
          product_name: '아이폰 거치대',
          category: 'A'
        }
      ],
      count: 0
    }
  },
  getters: { // 객체, getters: this로 접근X 매개변수로 state를 받음
    cartCount: (state) => {
      return state.cart.length;
    } 
  }, 
  mutations: { // 객체 : state를 직접불러오기 가능
    increment(state) { // 매개변수로 state를 받음
      state.count++;
    },
    addProduct(state, info) { // state 매개변수는 필수, 두번째 매개변수 선언(호출된는 곳에서 넘어오는값) -> 원하는 값을 직접 집어넣을 수 있음
      state.cart.push(info);
    }
  }, 
  actions: { // 객체
    addProduct(context, info) { // mutations, actions는 다름, 변수명이 같아도 괜츈!
      context.commit('addProduct', info); // context : 저장소 정보 전체, state + getters + mutations (state를 직접 불러오지 못함)
      // 1. 기능들을 모아서 작업할 때
      // 2. 비동기적인 작업(Promise 등등)을 위해 주로 actions를 사용함.
      setTimeout(() => {
        context.commit('increment');
      }, 3000)
    }
  },
  plugins : [ createPersistedState() ] // 보조기능의 plugins, () :defalut, 저장소에 있는 모든 데이터에 대한 정보저장
})