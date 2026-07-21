# components/

Composants d'interface **réutilisables** et sans logique métier lourde
(présentation avant tout) : `Button`, `Modal`, `Card`, `Navbar`, `Input`...

**Convention**
- Un dossier par composant : `Button/Button.tsx`, `Button/Button.css`.
- Nom en `PascalCase`, export nommé ou par défaut selon l'habitude de l'équipe.
- Si un composant n'est utilisé que par une seule page, laissez-le près de
  cette page ; on ne le remonte ici que lorsqu'il est réutilisé ailleurs.

```tsx
// import depuis n'importe où grâce à l'alias @
import { Button } from '@/components/Button/Button'
```
