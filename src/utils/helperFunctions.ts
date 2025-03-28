import { BaseSyntheticEvent } from "react";

export const flatMapJoin = <T>(joiner: T) => {
  return (el: T, i: number, arr: T[]) =>
    arr.length - 1 !== i ? [el, joiner] : el;
};

export const toggleArrayElement = <T>(array: T[], element: T) => {
  return array.includes(element)
    ? array.filter((e) => e !== element)
    : [...array, element];
};

/**
 * Creates a function that prevents default event behavior before executing a callback
 * @returns A function that prevents default and passes all arguments to the callback
 * @example
 * <button onClick={pd(handleClick)}>Click me</button>
 */
export const pd =
  <T, E extends BaseSyntheticEvent, Args extends any[]>(
    fn: (e: E, ...args: Args) => T,
  ) =>
  (e: E, ...args: Args): T => {
    e.preventDefault();
    return fn(e, ...args);
  };

export class SearchParamGetter<T = Record<string, any>> {
  private foundParams: Record<string, string | string[]> = {};

  constructor(private searchParams: URLSearchParams) {}

  get(key: string, options?: { as?: string }) {
    if (!this.searchParams.has(key)) return this;
    const foundKey = options?.as ?? key;
    this.foundParams[foundKey] = this.searchParams.get(key)!;
    return this;
  }

  getAll(key: string, options?: { as?: string }) {
    if (!this.searchParams.has(key)) return this;
    const foundKey = options?.as ?? key;
    this.foundParams[foundKey] = this.searchParams.getAll(key);
    return this;
  }

  getFoundParams() {
    return this.foundParams as T;
  }
}
