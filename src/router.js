import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      //默认重定向到登录路由
      path: '/',
      redirect: '/login'
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
      meta: { 'requiresAuth': true },
      children: [
        // 主页下面的子路由
        {
          // 产品页面
          path: '/home/product',
          name: 'product',
          meta: { 'requireRoleCheck': true },
          component: () => import('./views/home/productManage/Product.vue')
        },
        {
          // 添加产品
          path: '/home/addproduct',
          name: 'addproduct',
          meta: { 'requireRoleCheck': true },
          component: () => import('./views/home/productManage/AddProduct.vue')
        },
        {
          // 账号管理
          path: '/home/account',
          name: 'account',
          meta: { 'requireRoleCheck': true },
          component: () => import('./views/home/accountManage/Account.vue')
        },
        {
          // 添加账号
          path: '/home/addaccount',
          name: 'addaccount',
          meta: { 'requireRoleCheck': true },
          component: () => import('./views/home/accountManage/AddAccount.vue')
        },
        {
          // 改变密码
          path: '/home/changepwd',
          name: 'changepwd',
          meta: { 'requireRoleCheck': true },
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
          // 销售列表
          path: '/home/sale',
          name: 'sale',
          component: () => import('./views/home/Shipment/sale.vue')
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

// 添加路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {//如果需要验证，则验证
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {//不需要验证，放行
    if (to.meta.requireRoleCheck) {
      if (localStorage.getItem('role') === '1') {
        next()
      } else {
        next({ path: '/home/productout' });
      }
    } else {
      next()
    }
  }

})

export default router;