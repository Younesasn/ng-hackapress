# Welcome to Hacka'Press 🧺

!['image'](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white) !['image'](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Un site de pressing pour les vêtements de qualité.

Ce projet est le front-end d'[Hacka'Press](<https://hackapress.you-dev.fr>). Pour la partie back-end, voir [sf-hackapress](<https://github.com/Younesasn/sf-hackapress.git>).

## Configuration ⚙️

Installer le projet avec `Pnpm` :
```bash
pnpm install
```

### Environments 🌳

Créez deux fichiers `environment.ts` & `environment.development.ts`, à l'intérieur d'un dossier `environments` à la racine du dossier `src/` et configurez-les :

```typescript
// environment.development.ts
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000/api',
  url: 'http://127.0.0.1:8000',
  urlImage: 'http://127.0.0.1:8000/uploads/'
};
```

```typescript
// environment.ts
export const environment = {
  production: true,
  apiUrl: 'http://127.0.0.1:8000/api',
  url: 'http://127.0.0.1:8000',
  urlImage: 'http://127.0.0.1:8000/uploads/'
};
```

Lancez le projet :
```bash
pnpm dev
```

Enjoy !