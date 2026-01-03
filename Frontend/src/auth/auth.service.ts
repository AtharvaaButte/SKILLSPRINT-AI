import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    User,
    onAuthStateChanged,
} from 'firebase/auth'

import {auth} from '../firebase/firebase'

export async function signupWithEmail(
    name: string,
    email: string,
    password:string
) {
    const cred = await createUserWithEmailAndPassword(auth,email,password);
    await updateProfile(cred.user,{displayName:name});
    return cred.user;
}

export async function loginWithEmail(
    email:string,
    password:string) {
    const cred = await signInWithEmailAndPassword(auth,email,password);
    return cred.user;
}

export async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth,provider);
    return cred.user;
}

export function logoutUser(){
    return signOut(auth);
}

export function subscribeToAuthChanges(
    callback: (user:User | null) => void
) {
    const unsubscribe = onAuthStateChanged(auth,callback);
    
    return unsubscribe;
}
