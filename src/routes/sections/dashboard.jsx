import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard, GuestGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen, SplashScreen } from 'src/components/loading-screen';
import AuthClassicLayout from 'src/layouts/auth/classic';
import { JwtLoginPage } from './auth';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy( () => import( 'src/pages/byTemplate/dashboard/app' ) );
const OverviewEcommercePage = lazy( () => import( 'src/pages/byTemplate/dashboard/ecommerce' ) );
const OverviewAnalyticsPage = lazy( () => import( 'src/pages/byTemplate/dashboard/analytics' ) );
const OverviewBankingPage = lazy( () => import( 'src/pages/byTemplate/dashboard/banking' ) );
const OverviewBookingPage = lazy( () => import( 'src/pages/byTemplate/dashboard/booking' ) );
const OverviewFilePage = lazy( () => import( 'src/pages/byTemplate/dashboard/file' ) );
// PRODUCT
const ProductDetailsPage = lazy( () => import( 'src/pages/byTemplate/dashboard/product/details' ) );
const ProductListPage = lazy( () => import( 'src/pages/byTemplate/dashboard/product/list' ) );
const ProductCreatePage = lazy( () => import( 'src/pages/byTemplate/dashboard/product/new' ) );
const ProductEditPage = lazy( () => import( 'src/pages/byTemplate/dashboard/product/edit' ) );
// ORDER
const OrderListPage = lazy( () => import( 'src/pages/byTemplate/dashboard/order/list' ) );
const OrderDetailsPage = lazy( () => import( 'src/pages/byTemplate/dashboard/order/details' ) );
// INVOICE
const InvoiceListPage = lazy( () => import( 'src/pages/byTemplate/dashboard/invoice/list' ) );
const InvoiceDetailsPage = lazy( () => import( 'src/pages/byTemplate/dashboard/invoice/details' ) );
const InvoiceCreatePage = lazy( () => import( 'src/pages/byTemplate/dashboard/invoice/new' ) );
const InvoiceEditPage = lazy( () => import( 'src/pages/byTemplate/dashboard/invoice/edit' ) );
// USER
const UserProfilePage = lazy( () => import( 'src/pages/byTemplate/dashboard/user/profile' ) );
const UserCardsPage = lazy( () => import( 'src/pages/byTemplate/dashboard/user/cards' ) );
const UserListPage = lazy( () => import( 'src/pages/byTemplate/dashboard/user/list' ) );
const UserAccountPage = lazy( () => import( 'src/pages/byTemplate/dashboard/user/account' ) );
const UserCreatePage = lazy( () => import( 'src/pages/byTemplate/dashboard/user/new' ) );
const UserEditPage = lazy( () => import( 'src/pages/byTemplate/dashboard/user/edit' ) );
// BLOG
const BlogPostsPage = lazy( () => import( 'src/pages/byTemplate/dashboard/post/list' ) );
const BlogPostPage = lazy( () => import( 'src/pages/byTemplate/dashboard/post/details' ) );
const BlogNewPostPage = lazy( () => import( 'src/pages/byTemplate/dashboard/post/new' ) );
const BlogEditPostPage = lazy( () => import( 'src/pages/byTemplate/dashboard/post/edit' ) );
// JOB
const JobDetailsPage = lazy( () => import( 'src/pages/byTemplate/dashboard/job/details' ) );
const JobListPage = lazy( () => import( 'src/pages/byTemplate/dashboard/job/list' ) );
const JobCreatePage = lazy( () => import( 'src/pages/byTemplate/dashboard/job/new' ) );
const JobEditPage = lazy( () => import( 'src/pages/byTemplate/dashboard/job/edit' ) );
// TOUR
const TourDetailsPage = lazy( () => import( 'src/pages/byTemplate/dashboard/tour/details' ) );
const TourListPage = lazy( () => import( 'src/pages/byTemplate/dashboard/tour/list' ) );
const TourCreatePage = lazy( () => import( 'src/pages/byTemplate/dashboard/tour/new' ) );
const TourEditPage = lazy( () => import( 'src/pages/byTemplate/dashboard/tour/edit' ) );
// FILE MANAGER
const FileManagerPage = lazy( () => import( 'src/pages/byTemplate/dashboard/file-manager' ) );
// APP
const ChatPage = lazy( () => import( 'src/pages/byTemplate/dashboard/chat' ) );
const MailPage = lazy( () => import( 'src/pages/byTemplate/dashboard/mail' ) );
const CalendarPage = lazy( () => import( 'src/pages/byTemplate/dashboard/calendar' ) );
const KanbanPage = lazy( () => import( 'src/pages/byTemplate/dashboard/kanban' ) );
// TEST RENDER PAGE BY ROLE
const PermissionDeniedPage = lazy( () => import( 'src/pages/byTemplate/dashboard/permission' ) );
// BLANK PAGE
const BlankPage = lazy( () => import( 'src/pages/byTemplate/dashboard/blank' ) );

// ----------------------------------------------------------------------

export const dashboardRoutes = [
       {
              path: 'dashboard',
              element: (
                     <AuthGuard>
                            <Suspense fallback={ <SplashScreen /> }>
                                   <DashboardLayout show>
                                          <Suspense fallback={ <SplashScreen /> }>
                                                 <Suspense fallback={ <LoadingScreen /> }>
                                                        <Outlet />
                                                 </Suspense>
                                          </Suspense>
                                   </DashboardLayout>
                            </Suspense>
                     </AuthGuard>
              ),
              children: [
                     { element: <IndexPage />, index: true },
                     { path: 'ecommerce', element: <OverviewEcommercePage /> },
                     { path: 'analytics', element: <OverviewAnalyticsPage /> },
                     { path: 'banking', element: <OverviewBankingPage /> },
                     { path: 'booking', element: <OverviewBookingPage /> },
                     { path: 'file', element: <OverviewFilePage /> },
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
                     {
                            path: 'product',
                            children: [
                                   { element: <ProductListPage />, index: true },
                                   { path: 'list', element: <ProductListPage /> },
                                   { path: ':id', element: <ProductDetailsPage /> },
                                   { path: 'new', element: <ProductCreatePage /> },
                                   { path: ':id/edit', element: <ProductEditPage /> },
                            ],
                     },
                     {
                            path: 'order',
                            children: [
                                   { element: <OrderListPage />, index: true },
                                   { path: 'list', element: <OrderListPage /> },
                                   { path: ':id', element: <OrderDetailsPage /> },
                            ],
                     },
                     {
                            path: 'invoice',
                            children: [
                                   { element: <InvoiceListPage />, index: true },
                                   { path: 'list', element: <InvoiceListPage /> },
                                   { path: ':id', element: <InvoiceDetailsPage /> },
                                   { path: ':id/edit', element: <InvoiceEditPage /> },
                                   { path: 'new', element: <InvoiceCreatePage /> },
                            ],
                     },
                     {
                            path: 'post',
                            children: [
                                   { element: <BlogPostsPage />, index: true },
                                   { path: 'list', element: <BlogPostsPage /> },
                                   { path: ':title', element: <BlogPostPage /> },
                                   { path: ':title/edit', element: <BlogEditPostPage /> },
                                   { path: 'new', element: <BlogNewPostPage /> },
                            ],
                     },
                     {
                            path: 'job',
                            children: [
                                   { element: <JobListPage />, index: true },
                                   { path: 'list', element: <JobListPage /> },
                                   { path: ':id', element: <JobDetailsPage /> },
                                   { path: 'new', element: <JobCreatePage /> },
                                   { path: ':id/edit', element: <JobEditPage /> },
                            ],
                     },
                     {
                            path: 'tour',
                            children: [
                                   { element: <TourListPage />, index: true },
                                   { path: 'list', element: <TourListPage /> },
                                   { path: ':id', element: <TourDetailsPage /> },
                                   { path: 'new', element: <TourCreatePage /> },
                                   { path: ':id/edit', element: <TourEditPage /> },
                            ],
                     },
                     { path: 'file-manager', element: <FileManagerPage /> },
                     { path: 'mail', element: <MailPage /> },
                     { path: 'chat', element: <ChatPage /> },
                     { path: 'calendar', element: <CalendarPage /> },
                     { path: 'kanban', element: <KanbanPage /> },
                     { path: 'permission', element: <PermissionDeniedPage /> },
                     { path: 'blank', element: <BlankPage /> },
              ],
       },
];

export const dashboardRoutes2 = [
       {
              path: '',
              element: (
                     //       <AuthGuard>
                     //         <DashboardLayout show>
                     //           <Suspense fallback={<LoadingScreen />}>
                     //             <Outlet />
                     //           </Suspense>
                     //         </DashboardLayout>
                     //       </AuthGuard>

                     <Suspense fallback={ <SplashScreen /> }>
                            <Outlet />

                            <GuestGuard>
                                   <AuthClassicLayout>
                                          <JwtLoginPage />
                                   </AuthClassicLayout>
                            </GuestGuard>
                     </Suspense>
              ),
       },
];
