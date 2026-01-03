import { FirebaseError } from "firebase/app";

export function mapFirebaseAuthError(error: unknown): string {
  if(error instanceof FirebaseError){
    
    const code = error?.code;
  
    switch (code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
        return "Invalid email or password.";
  
      case "auth/user-not-found":
        return "No account found with this email.";
  
      case "auth/email-already-in-use":
        return "This email is already registered.";
  
      case "auth/weak-password":
        return "Password must be at least 6 characters.";
  
      case "auth/invalid-email":
        return "Please enter a valid email address.";
  
      case "auth/popup-closed-by-user":
        return "Google login was cancelled.";
  
      default:
        return "Something went wrong. Please try again.";
    }
      return "Something went wrong. Please try again.";
  }
}
