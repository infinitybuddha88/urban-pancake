import { fromEvent, map } from "rxjs";
import { fibonacci, validateForm } from "./utils";
import * as t from 'io-ts'
import { isRight, fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { components, App, StateField, Button } from './components';
import { actions , model } from "./store";

import "./styles.css";

App();


const positiveInteger = new t.Type<number, number, unknown>(
    'number',
    (input: unknown): input is number  => typeof input === 'number',
    (input, context) => (typeof input === 'number' && input >= 0 ? t.success(input) : t.failure(input, context, 'Введите число больше 0')),
    t.identity
);

const inputEvent = fromEvent<InputEvent>(components['input'], "input");
const buttonEvent = fromEvent<MouseEvent>(components['button'], "click");

const updateStateField = () => {
        actions['submit_value'](String(fibonacci(model.currentValue)));
        StateField();
};

const onSuccess = (value) => {
    model.isValid = false;
    actions['not_valid_value']();
    Button();
    StateField();
    //isNaN(value[0].value) ?  stateField.innerHTML = 'Фибоначчи' : stateField.innerHTML = value[0].message;
}
const onError = () => {
    actions['valid_value']();
    Button();
    StateField();
}
inputEvent
    .pipe(
        map((event: InputEvent) => (event.target as HTMLInputElement)?.value),
        map((value: string) => parseInt(value, 10))
    )
    .subscribe((value: number) => {
        model.currentValue = value;
        pipe(positiveInteger.decode(value), fold(onSuccess, onError));
    });

buttonEvent.subscribe(() => {
    updateStateField();
});
// Создать декодирование из string в positive integer через codec
// TO_DO: выводить ошибку если число больше чем можно рассчитать
// если ввести число а потом минус покажет фибоначчи, нужно чтобы оно показывалос толкьо если поле пустое а в остальных случаях ошибка что введите число больше 0
