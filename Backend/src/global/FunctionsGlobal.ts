

export function generateRandomCodeNumber(min: number = 1, max: number = 999999): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}