# Turborepo Bootstrap

Includes:

- Apps:
  - React Mobx Starter App
- Packages:
  - Shared `tsconfigs`
  - Shared `eslint`
  - Shared MobX types
  - Shared Types
  - Shared UI Components

## Good things to know

- Package Manager: [pnpm](https://pnpm.io) - advantages: workspaces, just one `node_modules` folder with symlinks
- Shared Packages can be included into apps via package name:

```
{
  ...
  "dependencies": {
    ...
    "shared-types": "workspace:*"
    ...
  }
}
```

Can be imported into `ts` files with:

```ts
import { CatRoute } from "shared-types";
```

Example: [`cats.ts`](./apps/web/src/models/api/cats.ts)

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

This repository is used in the `npx create-turbo@latest` command, and selected when choosing which package manager you wish to use with your monorepo (pnpm).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm run dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
