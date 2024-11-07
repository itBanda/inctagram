export const en = {
  authPage: {
    button: {
      backToSignIn: "Back to Sign in",
      backToSignUp: "Back to Sign Up",
      resend: "Resend verification link",
      sendLink: "Send Link",
      sendLinkAgain: "Send Link Again",
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
      terms: {
        noun: "Privacy Policy",
        with: "Privacy Policy"
      }
    },
    recovery: {
      congratulations: "Congratulations",
      message: "Looks like the verification link has expired. Not to worry, we can send the link again",
      messageCongratulations: "Your email has been confirmed",
      title: "Email verification link expired"
    }
  },
  common: {
    alert: {
      error: "Error! Server is not available!",
      success: "Your settings are saved!"
    },
    language: {
      en: "English",
      ru: "Russian"
    },
    loading: "Loading"
  },
  formValidation: {
    firstLastNameRegex: "Username can contain only A-Z, a-z, А-Я, а-я",
    mandatory: "Mandatory",
    maxCharacters(max: number) {
      return `Maximum number of characters ${max}`;
    },
    minCharacters(min: number) {
      return `Minimum number of characters ${min}`;
    },
    required: "Required",
    userNameRegex: "Username can contain only A-Z, a-z, 0-9, _ or -"
  },
  modal: {
    deletePhoto: {
      confirm: "Confirm delete photo",
      description: "Do you really want to delete your profile photo?"
    },
    logOut: {
      confirm(email: string | undefined) {
        return `Are you really want to log out of your account ${email}?`;
      },
      logOut: "Confirm log Out"
    },
    no: "No",
    ok: "Ok",
    yes: "Yes"
  },
  myProfile: {
    button: {
      profileSettings: "Profile Settings"
    },
    invalidId: "Profile id is invalid"
  },
  navbar: {
    create: "Create",
    favorites: "Favorites",
    home: "Home",
    logOut: "Log\u00A0Out",
    messenger: "Messenger",
    profile: "My Profile",
    search: "Search",
    statistic: "Statistic"
  },
  photo: {
    add: "Add a Profile Photo",
    choose: "Select from Computer",
    error: {
      format: "Error! The format of the uploaded photo must be PNG or JPEG",
      size(max: number) {
        return `Error! Photo size must be less than ${max} MB!`;
      }
    }
  },
  profileSettings: {
    aboutMe: "About me",
    backToProfileSettings: "Back to profile settings",
    city: "City",
    country: "Country",
    dateOfBirth: "Date of birth",
    dateOfBirthError: "Users under 13 cannot create a profile",
    firstName: "First Name",
    lastName: "Last Name",
    saveChanges: "Save changes",
    selectYourCity: "Select your city",
    selectYourCountry: "Select your country",
    userName: "Username"
  },
  tabs: {
    accountManagement: "Account management",
    devices: "Devices",
    generalInfo: "General Information",
    payments: "Payments"
  }
};
