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

const actions: {[x: string]: any} = {
    'initial_state': () => {
      model.isValid = false;
      model.message = 'Initial state'
      model.currentValue = null;
    },
    'valid_value': (value: number) => {
        model.isValid = true;
        model.message = 'Число валидно'
        model.currentValue = value;
    },
    'not_valid_value' : (value: string) => {
        model.isValid = false;
        model.message = value;
    },
    'max_valid_value': () => {
      model.message = 'Максимально возможное число для рассчета = 500';
        model.isValid = false;
    },
    'submit_value': (value: string) => {
        model.message = value;
    }
}

export { actions, model };
