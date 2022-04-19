type Model = {
    isValid: boolean;
    currentValue: number | null;
    message: string;
}

let model: Model = {
    isValid: false,
    currentValue: null,
    message: 'Intial state',
};

const actions = {
    'valid_value': () => {
        model.isValid = true;
        model.message = 'Число валидно'
    },
    'not_valid_value' : () => {
        model.isValid = false;
        model.message = 'Число должно быть больше 0';
    },
    'submit_value': (value) => {
        model.message = value;
    }
}

export { actions, model };
