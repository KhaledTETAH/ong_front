# pages/

Un composant par **écran / route** de l'application : `HomePage`, `LoginPage`,
`DonationsPage`, `VolunteersPage`...

**Convention**
- Une page assemble des `components/`, appelle des `services/` et des `hooks/`.
- Elle contient la logique d'affichage propre à l'écran, pas de composant
  générique réutilisable (ceux-là vont dans `components/`).
- Nom en `PascalCase` suffixé `Page` : `DonationsPage.tsx`.

```tsx
import { DonationsPage } from '@/pages/DonationsPage'
```
