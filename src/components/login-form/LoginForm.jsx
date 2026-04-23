import { useFormContext } from "react-hook-form";
import styles from "./LoginForm.module.css";
import Input from "../input/Input";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const LoginForm = ({ closeLoginDialog }) => {
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const { updateToken, updateAuthUser } = useContext(AuthContext);

  const onSubmit = handleSubmit(async (data) => {
    const url = new URL(`${import.meta.env.VITE_API_URL}/auth/login`);
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
        } else if (!result.success && result.msg) {
          setError("root.serverError", {
            message: result.msg,
          });
        }
      } else {
        updateAuthUser(result.user);
        const token = result.token.replace(/^Bearer\s+/, "");
        updateToken(token);
        closeLoginDialog();
      }
    } catch (error) {
      console.error(error.message);
      setError("root.serverError", {
        message: "Something went wrong!",
      });
    }
  });

  return (
    <form
      noValidate
      onSubmit={(e) => e.preventDefault()}
      className={styles.loginForm}
    >
      {errors.root?.serverError && (
        <span className={styles.error} aria-live="polite">
          {errors.root.serverError.message}
        </span>
      )}
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
        autoComplete="current-password"
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

      <div className={styles.formControl}>
        <button
          className={styles.submitBtn}
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
