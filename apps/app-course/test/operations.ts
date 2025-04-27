export enum Exceptions {
    DivisionByZero = "Cannot divide by zero",
    InvalidOperation = "Invalid operation"
}


export function sum(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}

export function divide(a: number, b: number): number {
    if (b === 0) {
        throw new Error(Exceptions.DivisionByZero);
    }
    return a / b;
}
