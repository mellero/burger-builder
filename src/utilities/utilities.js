export const updateObject = (oldObject, updatedProps) => ({
    ...oldObject,
    ...updatedProps
})

export const orderFormInit = (emType, inType, placeholder, value, validation) => {
    return {
        elementType: emType,
        elementConfig: {
            type: inType,
            placeholder: placeholder
        },
        modified: false,
        value: value,
        validation: validation,
        valid: false
    }
}

export const checkValidation = (value, rules) => {
    if (rules.required && value.trim() === "" ) {
        return false;
    }

    if (rules.minLength && value.length < rules.minLength) {
        return false;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
        return false;
    }

    return true;
}