import { Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import MainLayout from 'src/layouts/main';

// import { PATH_AFTER_LOGIN } from 'src/config-global';
import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';
import { SplashScreen } from 'src/components/loading-screen';

import { authRoutes, JwtLoginPage } from './auth';
import { authDemoRoutes } from './auth-demo';
import { HomePage, mainRoutes } from './main';
import { dashboardRoutes, dashboardRoutes2 } from './dashboard';
import { componentsRoutes } from './components';
import { route } from './valdo';

// ----------------------------------------------------------------------

export default function Router()
{
       return useRoutes( [
              // SET INDEX PAGE WITH SKIP HOME PAGE
              {
                     path: '/',
                     element: <Navigate to="/home" replace />,
              },

              // Auth routes
              ...authRoutes,
              //     ...authDemoRoutes,

              // Dashboard routes
              ...dashboardRoutes,
              //     ...dashboardRoutes2,

              // Main routes
              ...mainRoutes,

              // Components routes
              ...componentsRoutes,

              // By Valdo
              ...route,

              // No match 404
              { path: '*', element: <Navigate to="/404" replace /> },
       ] );
}
