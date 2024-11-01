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
        return `I agree to the <1>${privacy}</1> and <2>${term}</2>`;
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
  navbar: {
    create: 'Create',
    favorites: 'Favorites',
    home: 'Home',
    logOut: 'Log Out',
    messenger: 'Messenger',
    profile: 'My Profile',
    search: 'Search',
    statistic: 'Statistic',
  },
  profile: {
    addPhoto: 'Add a Profile Photo',
    button: {
      profileSettings: 'Profile Settings'
    },
    confirmationModal: {
      description: 'Do you really want to delete your profile photo?',
      title: 'Confirm delete photo'
    },
    photoModal: {
      choosePhoto: 'Select from Computer',
      saveButton: 'Save',
      title: 'Add a Profile Photo'
    }
  },
  profileSettings: {
    aboutMe: 'About me',
    addPhoto: 'Add a Profile Photo',
    alert: {
      error: 'Error! Server is not available!',
      success: 'Your settings are saved!'
    },
    backToProfileSettings: 'Back to prifile settings',
    city: 'City',
    country: 'Country',
    dateOfBirth: 'Date of birth',
    errors: {
      dateOfBirth: 'Users under 13 cannot create a profile',
      firstLastNameRegex: "Username can contain only A-Z, a-z, А-Я, а-я",
      mandatory: 'mandatory',
      maxCharacters(max: number) {
        return `Maximum number of characters ${max}`;
      },
      minCharacters(min: number) {
        return `Minimum number of characters ${min}`;
      },
      privacy: 'Privacy policy',
      userNameRegex: "Username can contain only A-Z, a-z, 0-9, _ or -"
    },
    firstName: 'First Name',
    lastName: 'Last Name',
    saveChanges: 'Save changes',
    selectYourCity: 'Select your city',
    selectYourCountry: 'Select your country',
    username: 'Username'
  },
  tabs: {
    accountManagement: 'Account management',
    devices: 'Devices',
    generalInfo: 'General Information',
    payments: 'Payments'
  }
};
