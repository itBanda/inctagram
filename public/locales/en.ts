export const en = {
  authPage: {
    button: {
      backToSignIn: "Back to Sign in",
      backToSignUp: "Back to Sign Up",
      resend: "Resend verification link",
      sendLinkAgainBtn: "Send Link Again",
      sendLinkBtn: "Send Link",
      signIn: `Sign\u00A0In`,
      signUp: `Sign\u00A0Up`
    },
    forgotPassword: {
      enterEmail: "Enter your email address and we will send you further instructions",
      errorNotUser: "User with this email doesn't exist",
      linkHasBeenSent: "The link has been sent by email. If you don’t receive an email send link again"
    },
    form: {
      agree(term: string, privacy: string) {
        return `I agree to the <1>${term}</1> and <2>${privacy}</2>`;
      },
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
    recovery: {
      congratulations: "Congratulations",
      message: "Looks like the verification link has expired. Not to worry, we can send the link again",
      messageCongratulations: "Your email has been confirmed",
      title: "Email verification link expired"
    }
  },
  common: {
    loading: "Loading",
    modal: {
      no: "No",
      ok: "Ok",
      yes: "Yes"
    }
  },
  header: {
    en: "English",
    logout: "Logout",
    logoutConfirmation(email: string | undefined) {
      return `Are you really want to log out of your account ${email}?`;
    },
    ru: "Russian"
  },
  profile: {
    addPhoto: 'Add a Profile Photo',
    modal: {
      choosePhoto: 'Select from Computer',
      saveButton: 'Save',
      title: 'Add a Profile Photo'
    }
  }
};
