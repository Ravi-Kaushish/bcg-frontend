const navigation = [
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Services']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Insurances',
    to: '/insurances',
    icon: 'cil-shield-alt',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Policies',
    to: '/policies',
    icon: 'cil-list',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Customers',
    to: '/customers',
    icon: 'cil-user',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Analytics',
    to: '/analytics',
    icon: 'cil-chart-line',
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default navigation;