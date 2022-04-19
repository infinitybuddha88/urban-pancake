import { fromEvent, map } from "rxjs";
import { fibonacci } from "./utils";
import * as t from 'io-ts'
import { either } from "fp-ts";
import { fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { components, App, StateField, Button } from './components';
import { actions , model } from "./store";

import "./styles.css";

App();

const positiveInteger = new t.Type<number, string, string>(
    'NumberCodec',
    t.number.is,
    (s, c) => {
        const n = parseInt(s, 10);
        return isNaN(n) || n <= 0 ? t.failure(s, c, 'Введите число >= 0') : t.success(n)
    },
    String
);

const maxValidInteger = new t.Type<number, number, number>(
    'number',
    t.number.is,
    (s,c) => {
       return s > 500 ? t.failure(s,c) : t.success(s);
    },
    Number
)

const inputEvent = fromEvent<InputEvent>(components['input'], "input");
const buttonEvent = fromEvent<MouseEvent>(components['button'], "click");

const showResult = () => {
    if (!model.currentValue) return;
    actions['submit_value'](String(fibonacci(model.currentValue)));
    StateField();
};

const onRight = (value: number) => {
    pipe(maxValidInteger.decode(value), fold(actions['max_valid_value'], actions['valid_value']));
    Button();
    StateField();
}
const onLeft = (errors: Array<{ message?: string }>) => {
    actions['not_valid_value'](errors[0]?.message);
    Button();
    StateField();
}
inputEvent
    .pipe(
        map((event: InputEvent) => (event.target as HTMLInputElement)?.value),
    )
    .subscribe((value: any) => {
        if (value.length === 0) {
            actions['initial_state']();
            Button();
            StateField();
            return;
        }
        model.currentValue = value;
        pipe(positiveInteger.decode(value), fold(onLeft, onRight));
    });

buttonEvent.subscribe(() => {
    showResult();
});
