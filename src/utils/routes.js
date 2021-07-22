import React from 'react';

const Insurances = React.lazy(() => import('../pages/Insurances/Insurances'));
const Insurance = React.lazy(() => import('../pages/Insurances/Insurance'));
const Policies = React.lazy(() => import('../pages/Policies/Policies'));
const Policy = React.lazy(() => import('../pages/Policies/Policy'));
const Customers = React.lazy(() => import('../pages/Customers/Customers'));
const Customer = React.lazy(() => import('../pages/Customers/Customer'));
const Analytics = React.lazy(() => import('../pages/Analytics/Analytics'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/insurances', exact: true, name: 'Insurances', component: Insurances },
  { path: '/insurances/:id', exact: true, name: 'Insurance Details', component: Insurance },
  { path: '/policies', exact: true, name: 'Policies', component: Policies },
  { path: '/policies/:id', exact: true, name: 'Policy Details', component: Policy },
  { path: '/customers', exact: true, name: 'Customer', component: Customers },
  { path: '/customers/:id', exact: true, name: 'Customer Details', component: Customer },
  { path: '/analytics', exact: true, name: ' Insurance Analytics', component: Analytics }
];

export default routes;