# utils/

Fonctions **utilitaires pures** et réutilisables, sans dépendance à React :
formatage de dates/montants, validation, helpers divers.

**Convention**
- Regroupez par thème : `formatDate.ts`, `formatCurrency.ts`, `validators.ts`.
- Une fonction pure = mêmes entrées → mêmes sorties, aucun effet de bord.
- Si ça touche à l'état React ou aux effets, c'est un `hook`, pas un util.

```ts
import { formatCurrency } from '@/utils/formatCurrency'
```
