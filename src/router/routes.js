
const routes = [
  { 
    path: '/', 
    name: 'Home',
    component: () => import ('pages/Home.vue'),
    
  },

  {
    path: '/Main',
    name: 'MainLayout',
    props: true,
     beforeEnter: (to, from, next) => {
       if(to.params.name){
         console.log(to.params)
         next()
       }
       else{
         next( {name: 'Home'} )
       }
     },
     component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'Index', name: 'index', component: () => import('pages/Index.vue') },
      { path: 'help', name: 'Help', component: () => import('pages/Help.vue') },
      { path: 'Calendary',name: 'Calendary', component: () => import('pages/Calendary.vue') },
      
    ]
  }
  
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
