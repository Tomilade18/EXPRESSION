export const createUserValidationSchema = {
    userName: {
        isLength: {
            options: {
                min: 5,
                max: 32
            },
        errorMessage:
        "username must be at least 5 characters with a max of 32 characters"
        },
        notEmpty: {
            errorMessage:"Username cannot be empty"
        },
        isString: {
            errorMessage:"username must be a string"
        },
    },
    displayname: {
        notEmpty: {
            errorMessage:"display name cannot be empty"
        },
    },
    password: {
        notEmpty: {
            errorMessage:"password cannot be empty"
        },
        isLength: {
            options: {
                min: 6
            },
            errorMessage:"password must be at least 6 characters"
        },
    }
}