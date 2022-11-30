import { PageView } from '@/layouts';

export default [
  {
    path: '/portrait',
    redirect: '/portrait/peopleSearch',
    component: PageView,
    children: [
      {
        path: 'peopleSearch',
        name: 'peopleSearch',
        component: () => import('@/views/portrait/peopleSearch'),
        meta: { title: '人员搜索' },
        title: '人员搜索',
      },
      {
        path: 'holographicArchives',
        name: 'holographicArchives',
        component: () => import('@/views/portrait/holographicArchives'),
        meta: { title: '全息档案' },
        title: '全息档案',
      },
    ],
  },
];
