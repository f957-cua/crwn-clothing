import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

export const SignIn = () => {
  const handleSignIn = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
      console.log(userDocRef);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={handleSignIn}>Sign in with Google popup</button>
      <SignUpForm />
    </div>
  );
};
