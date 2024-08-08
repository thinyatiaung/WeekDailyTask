import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { DashboardLayout } from '@layouts/DashboardLayout';
import { AuthLayout } from '@layouts/AuthLayout';
import Tasks from '@pages/Tasks';
import AddTask from '@pages/AddTask';
import Login from '@pages/Auth/Login';
import NotFound from '@pages/NotFoundPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Tasks /> },
      { path: 'addTask', element: <AddTask /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: 'login',
    element: <AuthLayout />,
    children: [
      { path: '', element: <Login /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
