import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import CompactLayout from 'src/layouts/compact';

import { AuthGuard, GuestGuard } from 'src/auth/guardByvaldo';
import DashboardLayout from 'src/layouts/dashboard/byValdo';

import { LoadingScreen, SplashScreen } from 'src/components/loading-screen';
import AuthClassicLayout from 'src/layouts/auth/classic';
import { JwtLoginPage } from './auth';








const Page500 = lazy(() => import('src/pages/byTemplate/500'));
const Page403 = lazy(() => import('src/pages/byTemplate/403'));
const Page404 = lazy(() => import('src/pages/byTemplate/404'));
const ComingSoonPage = lazy(() => import('src/pages/byTemplate/coming-soon'));
const MaintenancePage = lazy(() => import('src/pages/byTemplate/maintenance'));

// CATEGORY
const OrderListPage = lazy(() => import('src/pages/byValdo/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/byValdo/order/details'));


// ANNONCES
const ProductDetailsPage = lazy(() => import('src/pages/byValdo/product/details'));
const ProductListPage = lazy(() => import('src/pages/byValdo/product/list'));
const AnnoncesSignal = lazy(() => import('src/pages/byValdo/anoncesSignalUser/list'));
const ProductCreatePage = lazy(() => import('src/pages/byValdo/product/new'));
const ProductEditPage = lazy(() => import('src/pages/byValdo/product/edit'));


// ANNONCES 
const TransactionListPage = lazy(() => import('src/pages/byValdo/transaction/list'));


// USER
const UserProfilePage = lazy(() => import('src/pages/byValdo/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/byValdo/user/cards'));
const UserListPage = lazy(() => import('src/pages/byValdo/user/list'));
const UserAccountPage = lazy(() => import('src/pages/byValdo/user/account'));
const UserCreatePage = lazy(() => import('src/pages/byValdo/user/new'));
const UserEditPage = lazy(() => import('src/pages/byValdo/user/edit'));

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/byValdo/app'));

// ----------------------------------------------------------------------

export const route = [
       {
              path: 'home',
              element: (
                     <DashboardLayout show={false}>
                            <Suspense fallback={<LoadingScreen />}>
                                   <Outlet />
                            </Suspense>
                     </DashboardLayout>
              ),
              children: [
                     // INDEX PUBLIC
                     { index: true, element: <IndexPage /> },

                     // GARDE PRIVÉE
                     {
                            element: <AuthGuard><Outlet /></AuthGuard>,
                            children: [
                                   {
                                          path: 'annonces',
                                          children: [
                                                 { index: true, element: <ProductListPage /> },
                                                 { path: 'list', element: <ProductListPage /> },
                                                 { path: 'signal', element: <AnnoncesSignal /> },
                                                 // { path: 'view', element: <ProductDetailsPage /> },
                                                 { path: 'new', element: <ProductCreatePage /> },
                                                 { path: 'edit', element: <ProductEditPage /> },
                                                 { path: 'categorie', element: <OrderListPage /> },
                                          ],
                                   },
                                   {
                                          path: 'transactions',
                                          children: [
                                                 { index: true, element: <TransactionListPage /> },
                                                 { path: 'list', element: <TransactionListPage /> },
                                                 { path: 'view', element: <ProductDetailsPage /> },
                                                 { path: 'new', element: <ProductCreatePage /> },
                                                 { path: 'edit', element: <ProductEditPage /> },
                                                 { path: 'categorie', element: <OrderListPage /> },
                                          ],
                                   },
                                   {
                                          path: 'user',
                                          children: [
                                                 { index: true, element: <UserProfilePage /> },
                                                 // { path: 'profile/:id', element: <UserProfilePage /> }, // route dynamique
                                                 { path: 'profile', element: <UserProfilePage /> },
                                                 { path: 'cards', element: <UserCardsPage /> },
                                                 { path: 'list', element: <UserListPage /> },
                                                 { path: 'new', element: <UserCreatePage /> },
                                                 { path: ':id/edit', element: <UserEditPage /> },
                                                 { path: 'setting', element: <UserAccountPage /> },
                                          ],
                                   },
                            ],
                     },

                     {
                            path: 'annonces',
                            children: [
                                   { path: 'view', element: <ProductDetailsPage /> },
                            ],
                     },
                     {
                            path: 'user',
                            children: [
                                   { path: 'profile/:id', element: <UserProfilePage /> },
                            ],
                     },
              ],
       },

       {
              element: (
                     <CompactLayout>
                            <Suspense fallback={<SplashScreen />}>
                                   <Outlet />
                            </Suspense>
                     </CompactLayout>
              ),
              children: [
                     { path: 'coming-soon', element: <ComingSoonPage /> },
                     { path: 'maintenance', element: <MaintenancePage /> },
                     { path: '500', element: <Page500 /> },
                     { path: '404', element: <Page404 /> },
                     { path: '403', element: <Page403 /> },
              ],
       },



];


