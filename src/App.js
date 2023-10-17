import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef } from "react";
import styles from "./app.module.css";

const fieldSchema = yup.object().shape({
  email: yup.string().matches(/@/, "Email некорректный"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
      "Пароль должен содержать минимум одну цифру, одну маленькую латинскую букву, одну большую латинскую букву и один спецсимвол"
    )
    .max(20, "Должно быть не больше 20 символов")
    .min(3, "Должно быть больше 3 символов"),
  repeatPassword: yup
    .string()
    .test("passwords-match", "Пароли должны совпадать", function (value) {
      return value === this.parent.password;
    }),
});

export const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(fieldSchema),
  });

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const repeatPasswordError = errors.repeatPassword?.message;

  const registerButtonRef = useRef(null);

  // Добавил useEffect для установки фокуса после рендеринга кнопки
  useEffect(() => {
    if (!emailError && !passwordError && !repeatPasswordError) {
      registerButtonRef.current.focus();
    }
  }, [emailError, passwordError, repeatPasswordError]);

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div className={styles.app}>
      <h1>User Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {emailError && <div className={styles.errorLabel}>{emailError}</div>}
        <div className={styles.input}>
          <input
            name="email"
            type="email"
            placeholder="Почта"
            {...register("email")}
          />
        </div>
        {passwordError && (
          <div className={styles.errorLabel}>{passwordError}</div>
        )}
        <div className={styles.input}>
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            {...register("password")}
          />
        </div>
        {repeatPasswordError && (
          <div className={styles.errorLabel}>{repeatPasswordError}</div>
        )}
        <div className={styles.input}>
          <input
            name="repeatPassword"
            type="password"
            placeholder="Повтор пароля"
            {...register("repeatPassword")}
          />
        </div>
        <div className={styles.input}>
          <button
            ref={registerButtonRef}
            type="submit"
            disabled={!!emailError || !!passwordError || !!repeatPasswordError}
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
