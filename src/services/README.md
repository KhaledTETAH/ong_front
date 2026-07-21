# services/

Toute la communication avec le **backend / API** : fonctions qui font les
appels HTTP et renvoient des données typées.

**Convention**
- Un fichier par domaine : `authService.ts`, `donationsService.ts`.
- Centralisez la config (URL de base, intercepteurs, token) dans un client
  partagé, par ex. `services/apiClient.ts`.
- Les fonctions renvoient des types définis dans `types/`. Aucune logique
  d'affichage ici.

```ts
import { apiClient } from '@/services/apiClient'
import type { Donation } from '@/types/donation'

export function getDonations(): Promise<Donation[]> {
  return apiClient.get('/donations').then((r) => r.data)
}
```
