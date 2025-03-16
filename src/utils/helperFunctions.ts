export const flatMapJoin = <T>(joiner: T) => {
  return (el: T, i: number, arr: T[]) =>
    arr.length - 1 !== i ? [el, joiner] : el;
};
