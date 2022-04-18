export const fibonacci = (num: number, memo: Record<string, number> = {}): number => {
    memo = memo || {};

    if (memo[num]) return memo[num];
    if (num <= 1) return 1;

    return (memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo));
};

export const validateForm = (value: number): boolean => value >= 0 && value <= 500;
