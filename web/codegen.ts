
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript", // Ensure TypeScript support
        "typescript-operations", // Generate TypeScript types for operations
        "typescript-urql", // Urql plugin for TypeScript
        // {
        //   "typescript-urql": {
        //     withHooks: true // Enable generation of React hooks
        //   }
        // }
      ]
    }
  }
};

export default config;
