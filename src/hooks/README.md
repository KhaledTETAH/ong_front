# hooks/

Hooks React **personnalisés et réutilisables** : `useAuth`, `useFetch`,
`useLocalStorage`, `useDebounce`...

**Convention**
- Le nom commence toujours par `use` : `useAuth.ts`.
- Un hook encapsule de la logique d'état/effet réutilisable entre composants.
- Pas d'appel API brut ici : la logique réseau va dans `services/`, le hook
  l'orchestre.

```ts
import { useAuth } from '@/hooks/useAuth'
```
