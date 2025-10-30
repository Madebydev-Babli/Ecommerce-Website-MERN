import { getAuth,GoogleAuthProvider } from 'firebase/auth'
import {initializeApp} from'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginwishcart.firebaseapp.com",
  projectId: "loginwishcart",
  storageBucket: "loginwishcart.firebasestorage.app",
  messagingSenderId: "393542828943",
  appId: "1:393542828943:web:9087392ed7142ee55301fa"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth,provider}


