import { LocaleType } from "@/public/locales/types";

export const ru: LocaleType = {
  authPage: {
    button: {
      backToSignIn: "Вернуться ко входу",
      backToSignUp: "Вернуться к регистрации",
      resend: "Повторно отправить ссылку для подтверждения",
      sendLinkAgainBtn: "Отправить ссылку снова",
      sendLinkBtn: "Отправить ссылку",
      signIn: "Войти",
      signUp: "Зарегистрироваться"
    },
    forgotPassword: {
      enterEmail: "Введите свой адрес электронной почты и мы вышлем вам дальнейшие инструкции",
      errorNotUser: "Пользователя с таким адресом электронной почты не существует",
      linkHasBeenSent: "Ссылка была отправлена по электронной почте. Если вы не получили письмо, отправьте ссылку еще раз"
    },
    form: {
      agree(term: string, privacy: string) {
        return `Я согласен с <1>${term}</1> и <2>${privacy}</2>`;
      },
      email: {
        email: "Почта",
        help: "Электронная почта должна соответствовать формату example@example.com",
        invalid: "Неверный адрес электронной почты",
        sent: "Отправит письмо",
        sentLink(email?: string) {
          return `Мы отправили ссылку для подтверждения вашей почты на адрес ${email}`;
        }
      },
      error: "Адрес электронной почты или пароль неверны. Попробуйте еще раз, пожалуйста",
      haveAccount: "У вас есть учетная запись?",
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
        noun: "Политика конфиденциальности",
        with: "Политикой конфиденциальности"
      },
      required: "Необходимо заполнить поле",
      terms: {
        noun: "Условия использования",
        with: "Условиями использования"
      },
      userName: "Имя пользователя",
      userNameRegex: "Имя пользователя может содержать только A-Z, a-z, 0-9, _ или -"
    },
    recovery: {
      congratulations: "Поздравляем",
      message: "Похоже, что ссылка для подтверждения истекла. Не переживайте, мы можем отправить ссылку снова",
      messageCongratulations: "Ваш адрес электронной почты подтвержден",
      title: "Ссылка для подтверждения электронной почты истекла"
    }
  },
  common: {
    loading: "Загрузка",
    modal: {
      no: "Нет",
      ok: "Хорошо",
      yes: "Да"
    }
  },
  header: {
    en: "Английский",
    logout: "Выйти",
    logoutConfirmation(email: string | undefined) {
      return `Вы действительно хотите выйти из своей учетной записи ${email}?`;
    },
    ru: "Русский"

  },
  navbar: {
    create: 'Создать',
    favorites: 'Закладки',
    home: 'Главная',
    logOut: 'Выйти',
    messenger: 'Сообщения',
    profile: 'Мой Профиль',
    search: 'Поиск',
    statistic: 'Статистика',
  },
  profile: {
    addPhoto: 'Добавить фото',
    confirmationModal: {
      description: 'Вы действительно хотите удалить фото своего профиля?',
      title: 'Подтвердить удаление фото'
    },
    photoModal: {
      choosePhoto: 'Выбрать с компьютера',
      saveButton: 'Сохранить',
      title: 'Добавить фото'
    }
  }
};
