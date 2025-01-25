import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard, GuestGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard/byValdo';

import { LoadingScreen, SplashScreen } from 'src/components/loading-screen';
import AuthClassicLayout from 'src/layouts/auth/classic';
import { JwtLoginPage } from './auth';



// PRODUCT
const ProductDetailsPage = lazy( () => import( 'src/pages/byValdo/product/details' ) );
const ProductListPage = lazy( () => import( 'src/pages/byValdo/product/list' ) );
const ProductCreatePage = lazy( () => import( 'src/pages/byValdo/product/new' ) );
const ProductEditPage = lazy( () => import( 'src/pages/byValdo/product/edit' ) );


// USER
const UserProfilePage = lazy( () => import( 'src/pages/byValdo/user/profile' ) );
const UserCardsPage = lazy( () => import( 'src/pages/byValdo/user/cards' ) );
const UserListPage = lazy( () => import( 'src/pages/byValdo/user/list' ) );
const UserAccountPage = lazy( () => import( 'src/pages/byValdo/user/account' ) );
const UserCreatePage = lazy( () => import( 'src/pages/byValdo/user/new' ) );
const UserEditPage = lazy( () => import( 'src/pages/byValdo/user/edit' ) );

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
                     {
                            path: 'annonces',
                            children: [
                                   { element: <ProductListPage />, index: true },
                                   { path: 'list', element: <ProductListPage /> },
                                   { path: ':id', element: <ProductDetailsPage /> },
                                   { path: 'new', element: <ProductCreatePage /> },
                                   { path: ':id/edit', element: <ProductEditPage /> },
                            ],
                     },
                     {
                            path: 'user',
                            children: [
                                   { element: <UserProfilePage />, index: true },
                                   { path: 'profile', element: <UserProfilePage /> },
                                   { path: 'cards', element: <UserCardsPage /> },
                                   { path: 'list', element: <UserListPage /> },
                                   { path: 'new', element: <UserCreatePage /> },
                                   { path: ':id/edit', element: <UserEditPage /> },
                                   { path: 'account', element: <UserAccountPage /> },
                            ],
                     },

              ],


       },


];


