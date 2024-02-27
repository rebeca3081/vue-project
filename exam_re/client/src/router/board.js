import BoardList from '../views/BoardList.vue';
import BoardInfo from '../views/BoardInfo.vue';
import BoardForm from '../views/BoardForm.vue';
import BoardMain from '../views/BoardMain.vue';


export default {
  path: '/board',
  name: 'board',
  component: BoardMain,
  redirect: '/board/list', // fullpath를 붙여줘야함
  children : [
    {
      path: 'list',
      name: 'boardList',
      component: BoardList
    },
    {
      path: 'info',
      name: 'boardInfo',
      component: BoardInfo
    },
    {
      path: 'form',
      name: 'boardForm',
      component: BoardForm
    }
  ]
}
