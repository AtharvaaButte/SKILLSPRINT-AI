import {getAuth} from 'firebase/auth'

export async function getAccessToken() {
    const auth = getAuth();
    const user = auth.currentUser;
    if(user){
        const token = await user.getIdToken();
        return token;
    }else{
        return null;
    }
}


