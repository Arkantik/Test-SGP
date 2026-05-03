# Les ateliers du Baobab — Application de connexion

Interface de connexion développée en Next.js 16, reproduisant fidèlement la maquette fournie.

---

## Prérequis

- Node.js 18+
- npm ou pnpm

## Installation et démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.  
La page de connexion est accessible directement à la racine (redirection automatique vers `/login`).

---

## Tester le formulaire

### Cas nominal

1. Saisir un email valide (`nom@example.fr`)
2. Saisir un mot de passe d'au moins 4 caractères
3. Cliquer sur **Se connecter**
4. Les données soumises apparaissent dans la **console du navigateur**

### Validation côté client

Le formulaire valide les champs avant soumission et affiche des messages d'erreur inline :

| Champ         | Règles                          |
| ------------- | ------------------------------- |
| Email         | Requis, format email valide     |
| Mot de passe  | Requis, minimum 4 caractères    |

### Cas d'erreur serveur

La fonction `loginUser` (`src/app/api/mockLogin.ts`) simule une réponse d'erreur pour tester le retour visuel :

1. Saisir **`error@test.fr`** comme email
2. Saisir n'importe quel mot de passe valide (4 caractères minimum)
3. Cliquer sur **Se connecter**
4. Un bandeau rouge s'affiche : *"Email ou mot de passe incorrect."*

Tout autre email valide déclenche la réponse de succès.

### Retours ergonomiques

- **Chargement** : le bouton se désactive et affiche un spinner pendant la soumission (800 ms simulés)
- **Succès** : bandeau vert en haut du formulaire, refermable
- **Erreur serveur** : bandeau rouge en haut du formulaire, refermable
- **Erreurs de saisie** : messages sous chaque champ concerné, effacés dès que le champ est modifié

---

## Stack technique

| Outil                  | Version | Rôle                          |
| ---------------------- | ------- | ----------------------------- |
| Next.js                | 16      | Framework React (App Router)  |
| React                  | 19      | UI                            |
| MUI (Material UI)      | 9       | Composants et thème           |
| TypeScript             | 6       | Typage statique               |
| CSS Modules            | —       | Styles scopés par composant   |
| Google Fonts (Aclonica)| —       | Police du titre               |

> **Note MUI v9** : MUI a été mis à jour vers la v9 (dernière version disponible) afin de bénéficier de la compatibilité de `AppRouterCacheProvider` avec Next.js 16, nécessaire pour le rendu des styles côté serveur avec l'App Router.

---

## Structure du projet

```text
src/
├── app/
│   ├── layout.tsx          # Layout racine, providers MUI, polices
│   ├── login/
│   │   ├── page.tsx        # Page de connexion
│   │   └── login.module.css
│   └── globals.css
├── features/
│   └── login/
│       ├── LoginForm.tsx   # Formulaire (état, validation, soumission)
│       └── form.module.css
├── components/
│   └── FormField.tsx       # Champ réutilisable (label + TextField MUI)
└── utils/
    └── validators.ts       # Fonctions de validation composables
```

### Points d'attention

- **Validation composable** : les validateurs (`required`, `isEmail`, `minLength`…) sont des fonctions pures combinables, indépendantes de tout framework.
- **Séparation des responsabilités** : la logique métier (validation, soumission) est isolée dans `LoginForm`, les composants de présentation (`FormField`) ne portent aucun état.
- **Accessibilité** : le formulaire utilise `noValidate` pour désactiver la validation navigateur et gérer entièrement les messages d'erreur via `helperText` et `aria-*` de MUI.
