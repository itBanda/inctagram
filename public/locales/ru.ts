import { LocaleType } from "@/public/locales/en";

export const ru: LocaleType = {
  authPage: {
      form: {
        agree: 'Я согласен с',
        and: 'и',
        email: {
          email: "Пароль",
          help: 'Электронная почта должна соответствовать формату example@example.com',
        },
        haveAccount: "Нет аккаунта?",
        maxCharacters(max: number) {
          return `"Максимальное количество символов ${max}`;
        },
        minCharacters(min: number) {
          `Минимальное количество символов ${min}`
        },
      password: {
        confirmation: "Подтверждение пароля",
        createNew: "Создать новый пароль",
        forgot: "Забыли пароль",
        help: "Ваш пароль должен содержать от 6 до 20 символов",
        mismatch: "Пароли должны совпадать",
        password: "Пароль",
        regex : "Пароль должен содержать a-z, A-Z, специальные символы и цифры"
      },
        userName : 'Имя пользователя',
    },
    signIn: "Войти",
    signUp: "Зарегистрироваться"
  },
  header: {
    en: "Английский",
    logout: "Выйти",
    logoutConfirmation(email: string | undefined) {
      return `Вы действительно хотите выйти из своей учетной записи ${email}?`;
    },
    ru: "Русский"
  },
  loading: "Загрузка",
  modal: {
    no: "Нет",
    ok: 'Хорошо',
    yes: "Да",
  }

};

