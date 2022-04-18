import { fromEvent, map } from "rxjs";
import { fibonacci, validateForm } from "./utils";
import * as t from 'io-ts'
import { isRight, fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'

import "./styles.css";

type Model = {
    isValid: boolean;
    fibonacciNumber: number;
    currentValue: number | null;
}

let model: Model = {
    isValid: false,
    currentValue: null,
    fibonacciNumber: 0
};
const toggleButtonDisable = (model: Model) => !model.isValid;

const input = document.getElementById("input") as HTMLInputElement;
const button = document.getElementById("button") as HTMLButtonElement;
const stateField = document.getElementById("state") as HTMLDivElement;

const inputEvent = fromEvent<InputEvent>(input, "input");

const buttonEvent = fromEvent<MouseEvent>(button, "click");

const buttonController = (model: Model) => {
    (button as HTMLButtonElement).disabled = toggleButtonDisable(model);
};

const updateStateField = () => {
        model.fibonacciNumber = fibonacci(model.currentValue);
        stateField.innerHTML = String(model.fibonacciNumber);
};

const positiveInteger = new t.Type<number, number, unknown>(
    'number',
    (input: unknown): input is number  => typeof input === 'number',
    (input, context) => (typeof input === 'number' && input >= 0 ? t.success(input) : t.failure(input, context)),
    t.identity
)
const onLeft = (value) => {
    if (isNaN(value[0].value)) {
        stateField.innerHTML = 'Фибоначчи';
        return;
    }
    model.isValid = false;
    stateField.innerHTML = "Введите число больше 0";
    buttonController(model);
}
const onRight = () => {
    model.isValid = true;
    stateField.innerHTML = "Число валидно";
    buttonController(model);
}
inputEvent
    .pipe(
        map((event: InputEvent) => (event.target as HTMLInputElement)?.value),
        map((value: string) => parseInt(value, 10))
    )
    .subscribe((value: number) => {
        model.currentValue = value;
        pipe(positiveInteger.decode(value), fold(onLeft, onRight));
    });

buttonEvent.subscribe(() => {
    updateStateField();
});
