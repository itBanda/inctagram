export const en = {
  authPage: {
    backToSignUp: "Back to Sign Up",
    form: {
      agree: "I agree to the",
      and: "and",
      email: {
        email: "Email",
        help: "Email must match the format example@example.com",
        invalid: "Invalid email",
        sent: "Email sent",
        sentLink(email: string | undefined) {
          return `We have sent a link to confirm your email to ${email}`;
        }
      },
      error: "The email or password are incorrect. Try again please",
      haveAccount: "Do you have an account?",
      maxCharacters(max: number) {
        return `Maximum number of characters ${max}`;
      },
      minCharacters(min: number) {
        return `Minimum number of characters ${min}`;
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
      privacy: {
        noun: "Terms of Service",
        with: "Terms of Service"
      },
      required: "Required",
      terms: {
        noun: "Privacy Policy",
        with: "Privacy Policy"
      },
      userName: "Username",
      userNameRegex: "Username can contain only A-Z, a-z, 0-9, _ or -"
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
  },
  recovery: {
    congratulations: "Congratulations",
    message: "Looks like the verification link has expired. Not to worry, we can send the link again",
    messageCongratulations: "Your email has been confirmed",
    resend: "Resend verification link",
    title: "Email verification link expired"
  }
};

export type LocaleType = typeof en