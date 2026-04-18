import { useFormContext } from "react-hook-form";
import styles from "./Input.module.css";

const Input = ({
  label,
  type,
  id,
  name,
  placeholder = "",
  validation = {},
  autoComplete = "",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.formControl}>
      <label htmlFor={id} className={styles.label}>
        <span>
          {label}
          {validation.required?.value && (
            <span className={styles.requiredAsterisk}>*</span>
          )}{" "}
          {errors[name] && <InputErorr message={errors[name].message} />}
        </span>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={styles.input}
          {...register(name, validation)}
          {...(autoComplete && { autoComplete: autoComplete })}
        />
      </label>
    </div>
  );
};

const InputErorr = ({ message }) => {
  return (
    <span className={styles.error} aria-live="polite">
      ({message})
    </span>
  );
};

export default Input;
