# ONG — Front

Application front-end de l'ONG, construite avec **React 19 + TypeScript + Vite**.

## Démarrer

```bash
npm install       # à faire une fois après le clone
npm run dev       # serveur de dev avec HMR
npm run build     # build de production (type-check + vite build)
npm run lint      # vérification ESLint
npm run preview   # prévisualiser le build de production
```

## Organisation des dossiers (par type)

Chaque dossier de `src/` a un rôle précis. Un `README.md` dans chaque dossier
rappelle la convention associée. **Respectez cette organisation pour que
l'équipe s'y retrouve et que les revues de code restent simples.**

```
src/
├── assets/       # images, icônes, polices importées dans le code
├── components/   # composants UI réutilisables (Button, Modal, Card...)
├── pages/        # un composant par écran/route (HomePage, LoginPage...)
├── hooks/        # hooks React personnalisés (useAuth, useFetch...)
├── services/     # appels API / communication backend
├── context/      # état global (AuthContext, ThemeContext...)
├── utils/        # fonctions utilitaires pures (formatDate, validators...)
├── types/        # types & interfaces TypeScript partagés
├── App.tsx       # composant racine
├── main.tsx      # point d'entrée (montage React)
└── index.css     # styles globaux de base
```

### Où je mets mon code ?

| Ce que tu écris                                  | Dossier        |
| ------------------------------------------------ | -------------- |
| Un écran complet lié à une route                 | `pages/`       |
| Un bouton/carte/modale réutilisable              | `components/`  |
| De la logique d'état réutilisable (`useX`)       | `hooks/`       |
| Un appel à l'API                                 | `services/`    |
| Un état partagé dans toute l'app                 | `context/`     |
| Une fonction pure (format, calcul, validation)   | `utils/`       |
| Un type/interface partagé                        | `types/`       |

### Imports avec l'alias `@`

`@` pointe vers `src/`. Utilisez-le pour éviter les `../../../` :

```ts
import { Button } from '@/components/Button/Button'
import { getDonations } from '@/services/donationsService'
import type { Donation } from '@/types/donation'
```

## Gestion du state

Le projet sépare **deux types d'état**, avec une bibliothèque dédiée à chacun.
Ne mélangez pas les deux : c'est la règle la plus importante ici.

| Type d'état      | Bibliothèque          | Exemples                                  |
| ---------------- | --------------------- | ----------------------------------------- |
| **Server state** | **TanStack Query** v5 | dons, bénévoles, projets, profil (données API) |
| **Client state** | **Zustand** v5        | session/token, thème, langue, UI globale  |

### TanStack Query — données du backend

Tout ce qui vient de l'API passe par TanStack Query (cache, `loading`/`error`,
refetch et invalidation automatiques). **N'écrivez pas ce cache à la main.**

- Les appels bruts à l'API → `src/services/`
- Les hooks `useQuery` / `useMutation` → `src/hooks/`

```ts
// src/hooks/useDonations.ts
import { useQuery } from '@tanstack/react-query'
import { getDonations } from '@/services/donationsService'

export function useDonations() {
  return useQuery({ queryKey: ['donations'], queryFn: getDonations })
}
```

> ✅ Le `QueryClientProvider` enveloppe déjà l'application dans `src/main.tsx`.
> Les hooks `useQuery` / `useMutation` fonctionnent partout sans config
> supplémentaire.

### Zustand — état global de l'UI

Placez les stores dans `src/context/` (le dossier dédié à l'état global).

```ts
// src/context/authStore.ts
import { create } from 'zustand'

type AuthState = {
  token: string | null
  setToken: (token: string | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}))
```

> ⚠️ **Ne mettez jamais les données de l'API dans Zustand.** Les données du
> backend appartiennent à TanStack Query ; Zustand ne sert qu'à l'état UI global.

## Conventions d'équipe

### Nommage des branches

Chaque branche suit le format **`prenom/nom-feature`** :

- `prenom` : votre prénom en minuscules, sans accent
- `nom-feature` : description courte de la fonctionnalité, en minuscules,
  mots séparés par des tirets (`-`)