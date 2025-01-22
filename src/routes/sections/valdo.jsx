import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard, GuestGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen, SplashScreen } from 'src/components/loading-screen';
import AuthClassicLayout from 'src/layouts/auth/classic';
import { JwtLoginPage } from './auth';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy( () => import( 'src/pages/byValdo/app' ) );

// ----------------------------------------------------------------------

export const route = [
       {
              path: 'home',
              element: (
                     // <AuthGuard>
                     <Suspense fallback={ <SplashScreen /> }>
                            <DashboardLayout show={ false }>
                                   <Suspense fallback={ <SplashScreen /> }>
                                          <Suspense fallback={ <LoadingScreen /> }>
                                                 <Outlet />
                                          </Suspense>
                                   </Suspense>
                            </DashboardLayout>
                     </Suspense>
                     // </AuthGuard>
              ),
              children: [
                     { element: <IndexPage />, index: true },

              ],
       },
];


