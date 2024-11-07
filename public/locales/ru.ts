import { LocaleType } from "@/public/locales/types";

export const ru: LocaleType = {
  authPage: {
    button: {
      backToSignIn: "Вернуться ко входу",
      backToSignUp: "Вернуться к регистрации",
      resend: "Повторно отправить ссылку для подтверждения",
      sendLink: "Отправить ссылку",
      sendLinkAgain: "Отправить ссылку снова",
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
        sent: "Отправить письмо",
        sentLink(email?: string) {
          return `Мы отправили ссылку для подтверждения вашей почты на адрес ${email}`;
        }
      },
      error: "Адрес электронной почты или пароль неверны. Попробуйте еще раз, пожалуйста",
      haveAccount: "У вас есть учетная запись?",
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
      terms: {
        noun: "Условия использования",
        with: "Условиями использования"
      }
    },
    recovery: {
      congratulations: "Поздравляем",
      message: "Похоже, что ссылка для подтверждения истекла. Не переживайте, мы можем отправить ссылку снова",
      messageCongratulations: "Ваш адрес электронной почты подтвержден",
      title: "Ссылка для подтверждения электронной почты истекла"
    }
  },
  common: {
    alert: {
      error: "Ошибка! Сервер не доступен!",
      success: "Ваши изменения сохранены!"
    },
    language: {
      en: "Английский",
      ru: "Русский"
    },
    loading: "Загрузка"
  },
  formValidation: {
    firstLastNameRegex: "Имя пользователя может содержать только A-Z, a-z, А-Я, а-я",
    mandatory: "Обязательное поле",
    maxCharacters(max: number) {
      return `Максимальное количество символов ${max}`;
    },
    minCharacters(min: number) {
      return `Минимальное количество символов ${min}`;
    },
    required: "Необходимо заполнить поле",
    userNameRegex: "Имя пользователя может содержать только A-Z, a-z, 0-9, _ или -"
  },
  modal: {
    common: {
      no: "Нет",
      ok: "Хорошо",
      yes: "Да"
    },
    deletePhotoConfirmation: {
      description: "Вы действительно хотите удалить фото своего профиля?",
      title: "Подтвердить удаление фото"
    },
    logoutConfirmation(email: string | undefined) {
      return `Вы действительно хотите выйти из своей учетной записи ${email}?`;
    }
  },
  myProfile: {
    button: {
      profileSettings: "Настройки профиля",
      save: "Сохранить"
    },
    photo: {
      add: "Добавить фото профиля",
      choose: "Выбрать с компьютера"
    }
  },
  navbar: {
    create: "Создать",
    favorites: "Закладки",
    home: "Главная",
    logOut: "Выйти",
    messenger: "Сообщения",
    profile: "Мой Профиль",
    search: "Поиск",
    statistic: "Статистика"
  },
  profileSettings: {
    aboutMe: "Обо мне",
    backToProfileSettings: "Назад к настройкам профиля",
    city: "Город",
    country: "Страна",
    dateOfBirth: "Дата рождения",
    dateOfBirthError: "Пользователи младше 13 лет не могут создать профиль",
    firstName: "Имя",
    lastName: "Фамилия",
    saveChanges: "Сохранить изменения",
    selectYourCity: "Выбери город",
    selectYourCountry: "Выбери страну",
    userName: "Имя пользователя"
  },
  tabs: {
    accountManagement: "Управление аккаунтом",
    devices: "Устройства",
    generalInfo: "Общая информация",
    payments: "Платежи"
  }
};
