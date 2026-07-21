# context/

État **global** partagé via React Context (ou un store) : session utilisateur,
thème, langue, panier...

**Convention**
- Un dossier par contexte : `AuthContext/` avec le `Provider` et le hook
  d'accès (`useAuthContext`).
- N'y mettez que ce qui doit vraiment être global. Pour un état local à un
  écran, préférez `useState`/`useReducer` dans la page.

```tsx
import { AuthProvider } from '@/context/AuthContext/AuthProvider'
```
