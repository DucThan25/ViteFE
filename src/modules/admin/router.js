import LayoutMain from '@/layouts/LayoutMain'

export default [
  {
    path: '/admin',
    name: 'admin',
    component: LayoutMain,
    redirect: '/admin/home',
    children: [
      {
        path: 'test',
        name: 'test',
        component: () => import('./Test'),
        meta: {
          title: 'UR1.1.108 - Nhóm hàm'
        }
      }
    ]
  }
]
