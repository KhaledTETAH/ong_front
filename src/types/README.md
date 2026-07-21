# types/

Types et interfaces **TypeScript partagés** entre plusieurs fichiers :
modèles de données, réponses d'API, enums.

**Convention**
- Un fichier par domaine : `donation.ts`, `user.ts`, `api.ts`.
- Un type utilisé par un seul composant peut rester dans son fichier ; on le
  remonte ici dès qu'il est partagé.
- Préfixez les imports de type par `import type` pour un tree-shaking propre.

```ts
export interface Donation {
  id: string
  amount: number
  donorName: string
  createdAt: string
}
```
