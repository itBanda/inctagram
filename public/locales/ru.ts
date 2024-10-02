import { LocaleType } from "@/public/locales/en";

export const ru: LocaleType = {
  authPage: {
    form: {
      agree: "Я согласен с",
      and: "и",
      email: {
        email: "Почта",
        help: "Электронная почта должна соответствовать формату example@example.com",
        invalid:'Неверный адрес электронной почты',
        sent: "Отправит письмо",
        sentLink(email: string | undefined) {
          return `Мы отправили ссылку для подтверждения вашей почты на адрес ${email}`;
        },
      },
      error: 'Адрес электронной почты или пароль неверны. Попробуйте еще раз, пожалуйста',
      haveAccount: "Нет аккаунта?",
      maxCharacters(max: number) {
        return `Максимальное количество символов ${max}`;
      },
      minCharacters(min: number) {
        return `Минимальное количество символов ${min}`;
      },
      password: {
        confirmation: "Подтверждение пароля",
        createNew: "Создать новый пароль",
        forgot: "Забыли пароль",
        help: "Ваш пароль должен содержать от 6 до 20 символов",
        mismatch: "Пароли должны совпадать",
        password: "Пароль",
        regex: "Пароль должен содержать a-z, A-Z, специальные символы и цифры"
      },
      privacy: {
        noun: 'Политика конфиденциальности',
        with: 'Политикой конфиденциальности',
      },
      required: "Необходимо заполнить поле",
      terms: {
        noun: 'Условия использования',
        with: 'Условиями использования',
      },
      userName: "Имя пользователя",
      userNameRegex: "Имя пользователя может содержать только A-Z, a-z, 0-9, _ или -"
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
    ok: "Хорошо",
    yes: "Да"
  }

};

