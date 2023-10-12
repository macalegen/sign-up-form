import { useState } from "react";
import { useRef } from "react";
import styles from "./app.module.css";

export const App = () => {
  const registerButtonRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState(null);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [repeatPasswordFocused, setRepeatPasswordFocused] = useState(false);

  const onEmailChange = ({ target }) => {
    setEmail(target.value);
    let error = null;

    if (!/@/.test(target.value)) {
      error = "Email некорректный";
    }

    setEmailError(error);
  };

  const onPasswordChange = ({ target }) => {
    setPassword(target.value);
    let error = null;

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/.test(target.value)
    ) {
      error =
        "Пароль должен содержать минимум одну цифру, одну маленькую латинскую букву, одну большую латинскую букву и один спецсимвол";
    } else if (target.value.length > 20) {
      error = "Пароль должен содержать не более 20 символов";
    }

    setPasswordError(error);
  };

  const onRepeatPasswordChange = ({ target }) => {
    setRepeatPassword(target.value);
    let error = null;

    if (password !== target.value) {
      error = "Пароли должны совпадать";
    }

    setRepeatPasswordError(error);
  };

  const onEmailBlur = () => {
    setEmailFocused(true);
  };

  const onPasswordBlur = () => {
    if (password.length < 6) {
      setPasswordError("Пароль должен содержать не менее 6 символов");
    }
    setPasswordFocused(true);
  };

  const onReapetPasswordBlur = () => {
    setRepeatPasswordFocused(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!emailError && !passwordError && !repeatPasswordError) {
      registerButtonRef.current.focus();
    }
    console.log("email:" + email, "password:" + password);
  };

  return (
    <div className={styles.app}>
      <h1>User Sign Up</h1>
      <form onSubmit={onSubmit}>
        {emailFocused && emailError && (
          <div className={styles.errorLabel}>{emailError}</div>
        )}
        <div className={styles.input}>
          <input
            name="email"
            type="email"
            placeholder="Почта"
            value={email}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
          />
        </div>
        {passwordFocused && passwordError && (
          <div className={styles.errorLabel}>{passwordError}</div>
        )}
        <div className={styles.input}>
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={onPasswordChange}
            onBlur={onPasswordBlur}
          />
        </div>
        {repeatPasswordFocused && repeatPasswordError && (
          <div className={styles.errorLabel}>{repeatPasswordError}</div>
        )}
        <div className={styles.input}>
          <input
            name="repeatPassword"
            type="password"
            placeholder="Повтор пароля"
            value={repeatPassword}
            onChange={onRepeatPasswordChange}
            onBlur={onReapetPasswordBlur}
          />
        </div>
        <div className={styles.input}>
          <button
            ref={registerButtonRef}
            type="submit"
            disabled={
              !email ||
              !!emailError ||
              !password ||
              !!passwordError ||
              !repeatPassword ||
              !!repeatPasswordError
            }
          >
            Зарегестрироваться
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
