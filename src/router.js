import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      //默认重定向到登录路由
      path: '/',
      redirect : '/login'
    },
    {
      //登录路由
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Login.vue')
    },
    {
      // 主页路由
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children :[
        // 主页下面的子路由
        {
          // 产品页面
          path: '/home/product',
          name: 'product',
          component: () => import('./views/home/productManage/Product.vue')
        },
        {
          // 添加产品
          path: '/home/addproduct',
          name: 'addproduct',
          component: () => import('./views/home/productManage/AddProduct.vue')
        },
        {
          // 账号管理
          path: '/home/account',
          name: 'account',
          component: () => import('./views/home/accountManage/Account.vue')
        },
        {
          // 添加账号
          path: '/home/addaccount',
          name: 'addaccount',
          component: () => import('./views/home/accountManage/AddAccount.vue')
        },
        {
          // 改变密码
          path: '/home/changepwd',
          name: 'changepwd',
          component: () => import('./views/home/accountManage/Changepwd.vue')
        },
        {
          // 库存管理
          path: '/home/inventoryManage',
          name: 'inventoryManage',
          component: () => import('./views/home/inventoryManage/inventoryManage.vue')
        },
        {
          // 添加库存
          path: '/home/addInventory',
          name: 'addInventory',
          component: () => import('./views/home/inventoryManage/addInventory.vue')
        },
        {
          // 销售列表
          path: '/home/salelist',
          name: 'salelist',
          component: () => import('./views/home/Shipment/saleList.vue')
        },
        {
          // 商品出库
          path: '/home/productout',
          name: 'productout',
          component: () => import('./views/home/Shipment/productOut.vue')
        },
        {
          // 商品退货
          path: '/home/goodsreturn',
          name: 'goodsreturn',
          component: () => import('./views/home/Shipment/goodsReturn.vue')
        }
      ]
    }
  ]
})
