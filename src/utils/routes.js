import React from 'react';

const Insurances = React.lazy(() => import('../pages/Insurances/Insurances'));
const Insurance = React.lazy(() => import('../pages/Insurances/Insurance'));
const Policies = React.lazy(() => import('../pages/Policies/Policies'));
const Customers = React.lazy(() => import('../pages/Customers/Customers'));
const Analytics = React.lazy(() => import('../pages/Analytics/Analytics'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/insurances', exact: true, name: 'Insurances', component: Insurances },
  { path: '/insurances/:id', exact: true, name: 'Insurance Details', component: Insurance },
  { path: '/policies', exact: true, name: 'Policies', component: Policies },
  { path: '/customers', exact: true, name: 'Customer', component: Customers },
  { path: '/analytics', exact: true, name: ' Insurance Analytics', component: Analytics }
];

export default routes;