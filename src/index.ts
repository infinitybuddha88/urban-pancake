import { fromEvent, map } from "rxjs";

import "./styles.css";

interface Model {
    isValid: boolean;
    fibonacciNumber: number;
    currentValue: number | null;
}

let model: Model = {
    isValid: false,
    currentValue: null,
    fibonacciNumber: 0
};

const validateForm = (value: number) => value >= 0 && value <= 500;
const toggleButtonDisable = (model: Model) => !model.isValid;

const fibonacci = (num: number, memo: Record<string, number> = {}): number => {
    memo = memo || {};

    if (memo[num]) return memo[num];
    if (num <= 1) return 1;

    return (memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo));
};

const input = document.getElementById("input") as HTMLInputElement;
const button = document.getElementById("button") as HTMLButtonElement;
const state = document.getElementById("state") as HTMLDivElement;

const inputEvent = fromEvent<InputEvent>(input, "input");

const buttonEvent = fromEvent<MouseEvent>(button, "click");

const buttonController = (model: Model) => {
    (button as HTMLButtonElement).disabled = toggleButtonDisable(model);
};

const updateState = () => {
    if (model.isValid) {
        model.fibonacciNumber = fibonacci(model.currentValue as number);
        state.innerHTML = String(model.fibonacciNumber);
    }
};

const showError = () => {
    state.innerHTML = "Неверное число";
};

inputEvent
    .pipe(
        map((event: InputEvent) => (event.target as HTMLInputElement)?.value),
        map((value: string) => parseInt(value, 10))
    )
    .subscribe((value) => {
        if (validateForm(value)) {
            model.currentValue = value;
            model.isValid = true;
            state.innerHTML = "";
            buttonController(model);
        } else {
            model.isValid = false;
            buttonController(model);
            showError();
        }
    });

buttonEvent.subscribe(() => {
    updateState();
});
