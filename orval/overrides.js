import { defineConfig } from 'orval';

const camel = (s: string) =>
  s.replace(/[_\-\s]+(.)?/g, (_, c: string | undefined) => (c ? c.toUpperCase() : ''))
   .replace(/^./, (c) => c.toLowerCase());

export default defineConfig({
  api: {
    // ...
    output: {
      // ...
      override: {
        // ...existing options...

        // "get_user_api_v1_users__user_id__get" → "getUser" → useGetUser
        operationName: (operation, route, verb) => {
          let id = operation.operationId ?? '';
          // Static part of the path, e.g. "/api/v1/users/${userId}" → "_api_v1_users"
          const staticPath = route.split('/${')[0].replace(/\W/g, '_');
          if (staticPath.length > 1 && id.endsWith(`_${verb}`)) {
            const cut = id.lastIndexOf(staticPath);
            if (cut > 0) id = id.slice(0, cut);
          }
          return camel(id);
        },
      },
    },
  },
});
