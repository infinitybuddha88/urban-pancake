import { model } from "./store";

let components = {};

const Button = () => {
    if (!components['button']) {
        const app = document.getElementById('app');
        const button = document.createElement('button');
        button.innerHTML = 'Submit';
        button.id = 'button';
        app.appendChild(button);
        components['button'] = button;
    }

    components['button'].disabled = !model.isValid;
}
const Input = () => {
    if (!components['input']) {
        const app = document.getElementById('app');
        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'input';
        input.autocomplete = 'off';
        app.appendChild(input);
        components['input'] = input;
    }

    components['input'].value = model.currentValue;
}

const StateField = () => {
    if (!components['state_field']) {
        const app = document.getElementById('app');
        const field = document.createElement('div');
        field.className = 'state';
        app.appendChild(field);
        components['state_field'] = field;
    }
    components['state_field'].innerHTML = model.message;
}
const App = () => {
    Input();
    Button();
    StateField();
}

export { App, Input, StateField, Button, components };
