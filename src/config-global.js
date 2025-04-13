import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

const PORT = 5000
const HOST_DEV1 = 'http://localhost:5000'
const HOST_DEV2 = 'http://192.168.1.122:5000'
const HOST_DEV3 = 'http://192.168.213.1:5000'
const HOST_DEV4 = 'http://192.168.1.127:5000'
const HOST_DEV5 = 'http://192.168.58.1:5000'
export const HOST_DEV7 = 'http://192.168.1.212:3000'

export const HOST_DEV6 = 'http://localhost:3000'




const HOST_FRONT_DEV1 = 'http://localhost:3030'
const HOST_FRONT_DEV2 = 'http://192.168.1.122:3030'
const HOST_FRONT_DEV3 = 'http://192.168.213.1:3030'
const HOST_FRONT_DEV4 = 'http://192.168.1.127:3030'
const HOST_FRONT_DEV5 = 'http://192.168.58.1:5000'


export const HOST_FRONT_PROD = 'https://ndolo-backend.yaba-in.com'
// export const HOST_FRONT_PROD = 'http://192.168.1.212:3000'
const HOST_BACK_PROD = ''





export const HOST_PORT = PORT;
export const HOST_BACKEND_URL = HOST_DEV1;
export const HOST_FRONTEND_URL = HOST_FRONT_DEV1;
export const tokenUser = localStorage.getItem('accessToken');


















// ################ BY TEMPLATE ######################
export const HOST_API = import.meta.env.VITE_HOST_API;
export const ASSETS_API = import.meta.env.VITE_ASSETS_API;

export const FIREBASE_API = {
       apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
       authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
       projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
       storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
       messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
       appId: import.meta.env.VITE_FIREBASE_APPID,
       measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const AMPLIFY_API = {
       userPoolId: import.meta.env.VITE_AWS_AMPLIFY_USER_POOL_ID,
       userPoolWebClientId: import.meta.env.VITE_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID,
       region: import.meta.env.VITE_AWS_AMPLIFY_REGION,
};

export const AUTH0_API = {
       clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
       domain: import.meta.env.VITE_AUTH0_DOMAIN,
       callbackUrl: import.meta.env.VITE_AUTH0_CALLBACK_URL,
};

export const SUPABASE_API = {
       url: import.meta.env.VITE_SUPABASE_URL,
       key: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

export const MAPBOX_API = import.meta.env.VITE_MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'
