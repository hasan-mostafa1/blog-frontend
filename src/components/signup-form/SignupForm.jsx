import { useFormContext, useWatch } from "react-hook-form";
import styles from "./SignupForm.module.css";
import Input from "../input/Input";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const SignupForm = ({ closeSignupDialog }) => {
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const { updateToken, updateAuthUser } = useContext(AuthContext);

  const passwordValue = useWatch({ name: "password", defaultValue: "" });
  const onSubmit = handleSubmit(async (data) => {
    const url = new URL(`${import.meta.env.VITE_API_URL}/auth/signup`);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.errors) {
          result.errors.forEach((error) => {
            setError(error.path, {
              message: error.msg,
            });
          });
        }
      } else {
        updateAuthUser(result.user);
        const token = result.token.replace(/^Bearer\s+/, "");
        updateToken(token);
        closeSignupDialog();
      }
    } catch (error) {
      console.error(error.message);
      setError("root.serverError", {
        message: error.message,
      });
    }
  });

  return (
    <form
      noValidate
      onSubmit={(e) => e.preventDefault()}
      className={styles.signupForm}
    >
      {errors.root?.serverError && (
        <span className={styles.error} aria-live="polite">
          Something went wrong!
        </span>
      )}
      <Input
        type="text"
        id="firstName"
        name="firstName"
        label="First Name"
        autoComplete="given-name"
        validation={{
          required: {
            value: true,
            message: "This field is required!",
          },
        }}
      />
      <Input
        type="text"
        id="lastName"
        name="lastName"
        label="Last Name"
        autoComplete="family-name"
        validation={{
          required: {
            value: true,
            message: "This field is required!",
          },
        }}
      />
      <Input
        type="email"
        id="email"
        name="email"
        label="Email"
        autoComplete="email"
        validation={{
          required: {
            value: true,
            message: "This field is required!",
          },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Invalid email address!",
          },
        }}
      />
      <Input
        type="password"
        id="password"
        name="password"
        label="Password"
        autoComplete="new-password"
        validation={{
          required: {
            value: true,
            message: "This field is required!",
          },
          min: {
            value: 8,
            message: "Password must contain at least 8 characters",
          },
        }}
      />
      <Input
        type="password"
        id="passwordConfirmation"
        name="passwordConfirmation"
        label="Password Confirmation"
        autoComplete="new-password"
        validation={{
          required: {
            value: true,
            message: "This field is required!",
          },
          validate: (val) => {
            if (passwordValue !== val) {
              return "Your passwords do not match";
            }
          },
        }}
      />

      <div className={styles.formControl}>
        <button
          className={styles.submitBtn}
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
