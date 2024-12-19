import { useState } from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { FormInput } from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

const defaultFieldValues = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [fields, setFields] = useState(defaultFieldValues);
  const { email, password } = fields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const resetFormFields = () => {
    setFields(defaultFieldValues);
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        default:
          console.error(error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
