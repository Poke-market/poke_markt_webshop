export const flatMapJoin = <T>(joiner: T) => {
  return (el: T, i: number, arr: T[]) =>
    arr.length - 1 !== i ? [el, joiner] : el;
};

export const toggleArrayElement = <T>(array: T[], element: T) => {
  return array.includes(element)
    ? array.filter((e) => e !== element)
    : [...array, element];
};
