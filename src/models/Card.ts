export interface Card {
    value: number,
    revealed: boolean
}
  
export interface Answer {
    date: Date,
    card: Card,
}
  
export function numberListToCardList(numbers:number[]):Card[] {
    return numbers.map((n:number) => Object({value: n, revealed: true}) as Card);
}
  
export function getRandomNumberInRange(min:number, max:number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
  
export function getUniqueRandomCards(amount:number, min:number, max:number, revealed = false): Card[] {
    const numbers = new Set<number>();
    while (numbers.size !== amount) {
        numbers.add(getRandomNumberInRange(min, max));
    }

    return [...numbers].map(value => Object({value, revealed}) as Card);
}
  