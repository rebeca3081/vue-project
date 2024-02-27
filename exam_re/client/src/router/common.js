import Main from '../views/Main.vue';
import CommonMain from '../views/CommonMain.vue';
import MainChild from '../views/MainChild.vue';

export default {
  path: '/',
  name: 'home',
  component: CommonMain,
  redirect : 'main', // '/'로 진입시 실제로 보여야하는 컴포넌트로 연결
  children : [
    {
      path : 'main',
      name : 'commonMain',
      component : Main,
      children : [
        {
          path : 'list',
          name : 'MainChild',
          component : MainChild
        }
      ]
    }
  ]
}
