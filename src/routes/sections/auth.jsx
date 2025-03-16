import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/auth/guard';
import CompactLayout from 'src/layouts/compact';
import AuthClassicLayout from 'src/layouts/auth/classic';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// AMPLIFY
const AmplifyLoginPage = lazy( () => import( 'src/pages/byTemplate/auth/amplify/login' ) );
const AmplifyRegisterPage = lazy( () => import( 'src/pages/byTemplate/auth/amplify/register' ) );
const AmplifyVerifyPage = lazy( () => import( 'src/pages/byTemplate/auth/amplify/verify' ) );
const AmplifyNewPasswordPage = lazy( () => import( 'src/pages/byTemplate/auth/amplify/new-password' ) );
const AmplifyForgotPasswordPage = lazy( () => import( 'src/pages/byTemplate/auth/amplify/forgot-password' ) );

// JWT
export const JwtLoginPage = lazy( () => import( 'src/pages/byTemplate/auth/jwt/login' ) );
const JwtRegisterPage = lazy( () => import( 'src/pages/byTemplate/auth/jwt/register' ) );

// FIREBASE
const FirebaseLoginPage = lazy( () => import( 'src/pages/byTemplate/auth/firebase/login' ) );
const FirebaseRegisterPage = lazy( () => import( 'src/pages/byTemplate/auth/firebase/register' ) );
const FirebaseVerifyPage = lazy( () => import( 'src/pages/byTemplate/auth/firebase/verify' ) );
const FirebaseForgotPasswordPage = lazy( () => import( 'src/pages/byTemplate/auth/firebase/forgot-password' ) );

// AUTH0
const Auth0LoginPage = lazy( () => import( 'src/pages/byTemplate/auth/auth0/login' ) );
const Auth0Callback = lazy( () => import( 'src/pages/byTemplate/auth/auth0/callback' ) );

// SUPABASE
const SupabaseLoginPage = lazy( () => import( 'src/pages/byTemplate/auth/supabase/login' ) );
const SupabaseVerifyPage = lazy( () => import( 'src/pages/byTemplate/auth/supabase/verify' ) );
const SupabaseRegisterPage = lazy( () => import( 'src/pages/byTemplate/auth/supabase/register' ) );
const SupabaseNewPasswordPage = lazy( () => import( 'src/pages/byTemplate/auth/supabase/new-password' ) );
const SupabaseForgotPasswordPage = lazy( () => import( 'src/pages/byTemplate/auth/supabase/forgot-password' ) );

// ----------------------------------------------------------------------

const authAmplify = {
       path: 'amplify',
       element: (
              <Suspense fallback={ <SplashScreen /> }>
                     <Outlet />
              </Suspense>
       ),
       children: [
              {
                     path: 'login',
                     element: (
                            <GuestGuard>
                                   <AuthClassicLayout>
                                          <AmplifyLoginPage />
                                   </AuthClassicLayout>
                            </GuestGuard>
                     ),
              },
              {
                     path: 'register',
                     element: (
                            <GuestGuard>
                                   <AuthClassicLayout title="Manage the job more effectively with Minimal">
                                          <AmplifyRegisterPage />
                                   </AuthClassicLayout>
                            </GuestGuard>
                     ),
              },
              {
                     element: (
                            <CompactLayout>
                                   <Outlet />
                            </CompactLayout>
                     ),
                     children: [
                            { path: 'verify', element: <AmplifyVerifyPage /> },
                            { path: 'new-password', element: <AmplifyNewPasswordPage /> },
                            { path: 'forgot-password', element: <AmplifyForgotPasswordPage /> },
                     ],
              },
       ],
};

const authJwt = {
       path: 'jwt',
       element: (
              <Suspense fallback={ <SplashScreen /> }>
                     <Outlet />
              </Suspense>
       ),
       children: [
              {
                     path: 'login',
                     element: (
                            <GuestGuard>
                                   <AuthClassicLayout>
                                          <JwtLoginPage />
                                   </AuthClassicLayout>
                            </GuestGuard>
                     ),
              },
              {
                     path: 'register',
                     element: (
                            <GuestGuard>
                                   <AuthClassicLayout >
                                          <JwtRegisterPage />
                                   </AuthClassicLayout>
                            </GuestGuard>
                     ),
              },
       ],
};

const authFirebase = {
       path: 'firebase',
       element: (
              <Suspense fallback={ <SplashScreen /> }>
                     <Outlet />
              </Suspense>
       ),
       children: [
              {
                     path: 'login',
                     element: (
                            <GuestGuard>
                                   <AuthClassicLayout>
                                          <FirebaseLoginPage />
                                   </AuthClassicLayout>
                            </GuestGuard>
                     ),
              },
              {
                     path: 'register',
                     element: (
                            <GuestGuard>
                                   <AuthClassicLayout title="Manage the job more effectively with Minimal">
                                          <FirebaseRegisterPage />
                                   </AuthClassicLayout>
                            </GuestGuard>
                     ),
              },
              {
                     element: (
                            <CompactLayout>
                                   <Outlet />
                            </CompactLayout>
                     ),
                     children: [
                            { path: 'verify', element: <FirebaseVerifyPage /> },
                            { path: 'forgot-password', element: <FirebaseForgotPasswordPage /> },
                     ],
              },
       ],
};

const authAuth0 = {
       path: 'auth0',
       element: (
              <Suspense fallback={ <SplashScreen /> }>
                     <Outlet />
              </Suspense>
       ),
       children: [
              {
                     path: 'login',
                     element: (
                            <GuestGuard>
                                   <AuthClassicLayout>
                                          <Auth0LoginPage />
                                   </AuthClassicLayout>
                            </GuestGuard>
                     ),
              },
              {
                     path: 'callback',
                     element: (
                            <GuestGuard>
                                   <Auth0Callback />
                            </GuestGuard>
                     ),
              },
       ],
};

const authSupabase = {
       path: 'supabase',
       element: (
              <Suspense fallback={ <SplashScreen /> }>
                     <Outlet />
              </Suspense>
       ),
       children: [
              {
                     path: 'login',
                     element: (
                            <GuestGuard>
                                   <AuthClassicLayout>
                                          <SupabaseLoginPage />
                                   </AuthClassicLayout>
                            </GuestGuard>
                     ),
              },
              {
                     path: 'register',
                     element: (
                            <GuestGuard>
                                   <AuthClassicLayout title="Manage the job more effectively with Minimal">
                                          <SupabaseRegisterPage />
                                   </AuthClassicLayout>
                            </GuestGuard>
                     ),
              },
              {
                     element: (
                            <CompactLayout>
                                   <Outlet />
                            </CompactLayout>
                     ),
                     children: [
                            { path: 'verify', element: <SupabaseVerifyPage /> },
                            {
                                   path: 'forgot-password',
                                   element: <SupabaseForgotPasswordPage />,
                            },
                            { path: 'new-password', element: <SupabaseNewPasswordPage /> },
                     ],
              },
       ],
};

export const authRoutes = [
       {
              path: 'auth',
              children: [ authAmplify, authJwt, authFirebase, authAuth0, authSupabase ],
       },
];
