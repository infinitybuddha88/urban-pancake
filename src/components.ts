import { model } from "./store";
type Elements = HTMLElement | HTMLButtonElement | HTMLInputElement;
let components: {[x: string]: Elements} = {};

const Button = () => {
    if (!components['button']) {
        const app = document.getElementById('app') as HTMLElement;
        const button = document.createElement('button') as HTMLButtonElement;
        button.innerHTML = 'Submit';
        button.id = 'button';
        app.appendChild(button);
        components['button'] = button;
    }

    (components['button'] as HTMLButtonElement).disabled = !model.isValid;
}
const Input = () => {
    if (!components['input']) {
        const app = document.getElementById('app') as HTMLElement;
        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'input';
        input.autocomplete = 'off';
        app.appendChild(input);
        components['input'] = input;
    }
}

const StateField = () => {
    if (!components['state_field']) {
        const app = document.getElementById('app') as HTMLElement;
        const field = document.createElement('div') as HTMLElement;
        field.className = <string>'state';
        app.appendChild(field);
        components['state_field'] = field;
    }
    (components['state_field'] as HTMLElement).innerHTML = model.message;
}
const App = () => {
    Input();
    Button();
    StateField();
}

export { App, Input, StateField, Button, components };
