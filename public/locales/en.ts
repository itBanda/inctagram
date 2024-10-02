export const en = {
  authPage: {
    form: {
      agree: 'I agree to the',
      and: 'and',
      email: {
        email: "Email",
        help: "Email must match the format example@example.com"
      },
      haveAccount: "Don’t have an account?",
      maxCharacters(max: number) {
        return `Maximum number of characters ${max}`;
      },
      minCharacters(min: number) {
        `Minimum number of characters ${min}`
      },
      password: {
        confirmation: "Password confirmation",
        createNew: "Create new password",
        forgot: "Forgot Password",
        help: "Your password must be between 6 and 20 characters",
        mismatch: "The passwords must match",
        password: "Password",
        regex: "Password must contain a-z, A-Z, special characters, and numbers"
      },
      userName : 'Username',

    },
    signIn: "Sign In",
    signUp: "Sign Up"
  },
  header: {
    en: "English",
    logout: "Logout",
    logoutConfirmation(email: string | undefined) {
      return `Are you really want to log out of your account ${email}?`;
    },
    ru: "Russian"
  },
  loading: "Loading",
  modal: {
    no: "No",
    ok: "Ok",
    yes: "Yes"
  }
};

export type LocaleType = typeof en