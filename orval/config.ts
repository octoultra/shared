// Держите этот файл вне src/api/generated — orval очищает ту папку при каждой генерации.
// Для Vite; для другого сборщика замените на свой способ чтения env.
export const API_BASE_URL: string = import.meta.env.VITE_API_URL ?? '';