import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    // Спека скачивается curl'ом (скрипт api:fetch) и лежит рядом с конфигом
    input: { target: './openapi.json' },

    output: {
      mode: 'tags-split',                       // один файл хуков на тег
      target: './src/api/generated/endpoints',
      // DTO генерируются как zod-схемы + выведенные из них типы
      schemas: { path: './src/api/generated/model', type: 'zod' },
      client: 'react-query',
      httpClient: 'fetch',
      clean: true,                              // папка generated целиком принадлежит orval

      // База URL берётся в рантайме из src/api/config.ts (путь — относительно target)
      baseUrl: {
        runtime: 'API_BASE_URL',
        imports: [{ name: 'API_BASE_URL', importPath: '../../config' }],
      },

      override: {
        // snake_case → camelCase: zod валидирует ключи как в спеке,
        // затем .transform() переименовывает их в camelCase
        namingConvention: { properties: 'camelCase' },

        fetch: {
          runtimeValidation: true,              // каждый JSON-ответ проходит Schema.parse()
          includeHttpResponseReturnType: false, // хук отдаёт сразу данные, без { data, status }
          forceSuccessResponse: true,           // не-2xx → throw (Error с .status и .info)
        },

        zod: {
          version: 4,
          generate: { param: true, query: true, body: true, response: true, header: false },
        },

        query: {
          useSuspenseQuery: true,
          signal: true,
        },
      },
    },
  },
});
