import * as yup from "yup";

export const FieldSchema = yup.object().shape({
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
