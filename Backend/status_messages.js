exports.MESSAGES = {
    VALIDATION_MESSAGES: {
        EXIST: "User is already exists.",
        EMAIL: "Email is already registered.",
        EMAIL_VALIDATE: "Please enter email.",
        USERNAME: "Username is already exist.",
        PASSWORD: "Please enter password.",
        CONFIRM_PASSWORD: "Please enter confirm password.",
        INCORRECT: "Incorrect password.",
        NOT_SAME: "Password and confirm password are not same.",
        INVALID_EMAIL: "Invalid email address.",
        FIRST_NAME: "Please enter first name.",
        LAST_NAME: "Please enter last name.",
        USER_NAME: "Please enter username.",
        PASSWORD_LENGTH: "Password must have a minimum of 8 characters.",
        NEW_PASSWORD_LENGTH: "New password must have a minimum of 8 characters.",
        CURRENT_PASS: "Please enter current password.",
        NEW_PASSWORD: "Please enter new password.",
    },

    PASSWORD: {
        NOT_SAME: "New password and confirm password are not same.",
        CURRENT_INCORRECT: "Current password is incorrect.",
        CHANGED: "Password has been changed successfully.",
    },

    USER: {
        NOT_REGISTERED: "User is not registered with us.",
        INACTIVE: "User is not active.",
        DELETED: "User is not available in our system.",
        SIGN_UP: "You have successfully signed up.",
        SIGN_IN: "You have successfully signed in.",
        SIGN_OUT: "You have successfully signed out.",
    }
}

exports.STATUS = {
    ACTIVE: 1,
    INACTIVE: 0,
    DELETED: 1,
    NOTDELETED: 0
}