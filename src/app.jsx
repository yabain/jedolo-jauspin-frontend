/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------

import Router from 'src/routes/sections';

import ThemeProvider from 'src/theme';

import { LocalizationProvider } from 'src/locales';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';

import { CheckoutProvider } from 'src/sections/byTemplate/checkout/context';

import { AuthProvider } from 'src/auth/context/jwt';
import { Provider, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import store from './store';
import { addAdminData } from './store/annonces/data/dataReducer';
// import { AuthProvider } from 'src/auth/context/auth0';
// import { AuthProvider } from 'src/auth/context/amplify';
// import { AuthProvider } from 'src/auth/context/firebase';
// import { AuthProvider } from 'src/auth/context/supabase';

// ----------------------------------------------------------------------


export default function App()
{


       const charAt = `

  ░░░    ░░░
  ▒▒▒▒  ▒▒▒▒
  ▒▒ ▒▒▒▒ ▒▒
  ▓▓  ▓▓  ▓▓
  ██      ██

  `;

       console.info( `%c${ charAt }`, 'color: #5BE49B' );

       useScrollToTop();


       return (
              <AuthProvider>
                     <LocalizationProvider>
                            <SettingsProvider
                                   defaultSettings={ {
                                          themeMode: 'light', // 'light' | 'dark'
                                          themeDirection: 'ltr', //  'rtl' | 'ltr'
                                          themeContrast: 'default', // 'default' | 'bold'
                                          themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                                          themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                                          themeStretch: false,
                                   } }
                            >
                                   <ThemeProvider>
                                          <MotionLazy>
                                                 <Provider store={ store }>
                                                        <SnackbarProvider>
                                                               <CheckoutProvider>
                                                                      <SettingsDrawer />
                                                                      <ProgressBar />
                                                                      <Router />
                                                               </CheckoutProvider>
                                                        </SnackbarProvider>
                                                 </Provider>
                                          </MotionLazy>
                                   </ThemeProvider>
                            </SettingsProvider>
                     </LocalizationProvider>
              </AuthProvider>
       );
}
