# assets/

Fichiers **statiques importés dans le code** : images, icônes, polices, logos.

**Convention**
- Rangez par type si le volume grandit : `assets/images/`, `assets/icons/`,
  `assets/fonts/`.
- Importez depuis le code pour que Vite les optimise :
  `import logo from '@/assets/images/logo.png'`.
- Les fichiers qui doivent garder une URL fixe (favicon, robots.txt) vont
  plutôt dans `public/`.
