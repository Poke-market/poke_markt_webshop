// expand array includes type and make it a type predicate
interface ReadonlyArray<T> {
  includes(x: unknown): x is T[][number];
}

interface Array<T> {
  includes(x: unknown): x is T[][number];
}
