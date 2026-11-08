import type { CamelCasedPropertiesDeep, SnakeCasedPropertiesDeep } from 'type-fest';

/** camelCase-версия wire-типа (для форм и аргументов запросов). */
export type Camel<T> = CamelCasedPropertiesDeep<T>;

const toSnakeKey = (key: string) => key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && Object.getPrototypeOf(v) === Object.prototype;

/** Глубоко переименовывает ключи camelCase → snake_case (значения не трогает). */
export function toSnake<T>(value: T): SnakeCasedPropertiesDeep<T> {
  if (Array.isArray(value)) return value.map(toSnake) as SnakeCasedPropertiesDeep<T>;
  if (!isPlainObject(value)) return value as SnakeCasedPropertiesDeep<T>;
  return Object.fromEntries(
    Object.entries(value).map(([k, v]) => [toSnakeKey(k), toSnake(v)]),
  ) as SnakeCasedPropertiesDeep<T>;
}