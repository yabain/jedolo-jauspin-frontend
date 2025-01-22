import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import MainLayout from 'src/layouts/main';
import SimpleLayout from 'src/layouts/simple';
import CompactLayout from 'src/layouts/compact';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

export const HomePage = lazy( () => import( 'src/pages/byTemplate/home' ) );
const Page500 = lazy( () => import( 'src/pages/byTemplate/500' ) );
const Page403 = lazy( () => import( 'src/pages/byTemplate/403' ) );
const Page404 = lazy( () => import( 'src/pages/byTemplate/404' ) );
const FaqsPage = lazy( () => import( 'src/pages/byTemplate/faqs' ) );
const AboutPage = lazy( () => import( 'src/pages/byTemplate/about-us' ) );
const ContactPage = lazy( () => import( 'src/pages/byTemplate/contact-us' ) );
const PricingPage = lazy( () => import( 'src/pages/byTemplate/pricing' ) );
const PaymentPage = lazy( () => import( 'src/pages/byTemplate/payment' ) );
const ComingSoonPage = lazy( () => import( 'src/pages/byTemplate/coming-soon' ) );
const MaintenancePage = lazy( () => import( 'src/pages/byTemplate/maintenance' ) );
// PRODUCT
const ProductListPage = lazy( () => import( 'src/pages/byTemplate/product/list' ) );
const ProductDetailsPage = lazy( () => import( 'src/pages/byTemplate/product/details' ) );
const ProductCheckoutPage = lazy( () => import( 'src/pages/byTemplate/product/checkout' ) );
// BLOG
const PostListPage = lazy( () => import( 'src/pages/byTemplate/post/list' ) );
const PostDetailsPage = lazy( () => import( 'src/pages/byTemplate/post/details' ) );

// ----------------------------------------------------------------------

export const mainRoutes = [
       {
              element: (
                     <MainLayout>
                            <Suspense fallback={ <SplashScreen /> }>
                                   <Outlet />
                            </Suspense>
                     </MainLayout>
              ),
              children: [
                     { path: 'about-us', element: <AboutPage /> },
                     { path: 'contact-us', element: <ContactPage /> },
                     { path: 'faqs', element: <FaqsPage /> },
                     {
                            path: 'product',
                            children: [
                                   { element: <ProductListPage />, index: true },
                                   { path: 'list', element: <ProductListPage /> },
                                   { path: ':id', element: <ProductDetailsPage /> },
                                   { path: 'checkout', element: <ProductCheckoutPage /> },
                            ],
                     },
                     {
                            path: 'post',
                            children: [
                                   { element: <PostListPage />, index: true },
                                   { path: 'list', element: <PostListPage /> },
                                   { path: ':title', element: <PostDetailsPage /> },
                            ],
                     },
              ],
       },
       {
              element: (
                     <SimpleLayout>
                            <Suspense fallback={ <SplashScreen /> }>
                                   <Outlet />
                            </Suspense>
                     </SimpleLayout>
              ),
              children: [
                     { path: 'pricing', element: <PricingPage /> },
                     { path: 'payment', element: <PaymentPage /> },
              ],
       },
       {
              element: (
                     <CompactLayout>
                            <Suspense fallback={ <SplashScreen /> }>
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
