import { auth } from '../../../../firebase-config';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export async function signInDefault(password, email){
    try{
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
    }catch(error){
        console.log("Unable to sign in user");
    }
}

//Google As Provider
export async function signInWithGoogle(){
    try{
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        const result = await signInWithPopup(auth, provider);
        const userCredentials = GoogleAuthProvider.credentialFromResult(result);
        const token = userCredentials.accessToken;
        const user = result.user;
    }catch(error){
        const errorCode = error.code;
        const message = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    }
}
