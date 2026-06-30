# 🚀 Guide de déploiement EliteFit sur Vercel

## Ce dont tu as besoin
- Un compte **GitHub** (gratuit) → github.com
- Un compte **Vercel** (gratuit) → vercel.com
- **Node.js** installé sur ton ordinateur → nodejs.org (télécharge la version LTS)

---

## ÉTAPE 1 — Installer Node.js
1. Va sur https://nodejs.org
2. Télécharge la version **LTS** (recommandée)
3. Installe-la normalement
4. Vérifie l'installation : ouvre le Terminal (Mac) ou l'Invite de commandes (Windows) et tape :
   ```
   node --version
   ```
   Tu dois voir quelque chose comme `v20.x.x` ✅

---

## ÉTAPE 2 — Préparer le projet en local
1. Dézippe le dossier **elitefit** sur ton bureau
2. Ouvre le Terminal et navigue vers le dossier :
   ```
   cd Desktop/elitefit
   ```
3. Installe les dépendances :
   ```
   npm install
   ```
4. Teste l'app en local (optionnel) :
   ```
   npm run dev
   ```
   → Ouvre http://localhost:5173 dans ton navigateur pour voir l'app

---

## ÉTAPE 3 — Mettre sur GitHub
1. Va sur https://github.com et crée un compte si tu n'en as pas
2. Clique sur **"New repository"** (bouton vert)
3. Nomme-le `elitefit` → coche "Private" si tu veux que ça reste privé
4. Clique **"Create repository"**
5. Dans le Terminal (dans le dossier elitefit), tape ces commandes une par une :
   ```
   git init
   git add .
   git commit -m "EliteFit v1"
   git branch -M main
   git remote add origin https://github.com/TON_PSEUDO/elitefit.git
   git push -u origin main
   ```
   ⚠️ Remplace `TON_PSEUDO` par ton nom d'utilisateur GitHub

---

## ÉTAPE 4 — Déployer sur Vercel
1. Va sur https://vercel.com et connecte-toi avec GitHub
2. Clique **"Add New Project"**
3. Sélectionne ton repo `elitefit`
4. Vercel détecte automatiquement que c'est un projet Vite ✅
5. Laisse tout par défaut et clique **"Deploy"**
6. Attends 1-2 minutes… 🎉

**Ton app est en ligne !** Tu reçois une URL du type :
```
https://elitefit-ton-pseudo.vercel.app
```

---

## ÉTAPE 5 — Domaine personnalisé (optionnel, recommandé)
Pour avoir une URL pro comme `elitefit.fr` ou `elitefit.app` :
1. Achète un domaine sur OVH, Ionos ou Namecheap (5-15€/an)
2. Dans Vercel → Settings → Domains → ajoute ton domaine
3. Suis les instructions DNS de Vercel
→ Délai : 5 à 30 minutes

---

## Mises à jour futures
Quand tu modifies l'app avec Claude et récupères un nouveau fichier :
1. Remplace `src/App.jsx` par la nouvelle version
2. Dans le Terminal :
   ```
   git add .
   git commit -m "Mise à jour app"
   git push
   ```
3. Vercel redéploie automatiquement en 1 minute ✅

---

## 💰 Stratégie de vente (Option A)

### Sur Gumroad
- Ajoute dans la description de chaque programme :
  > "🎁 BONUS EXCLUSIF : Accès à l'application EliteFit (valeur 29€) offert avec l'achat"
- Dans le fichier de livraison, ajoute le lien de l'app

### Sur Etsy
- Mets à jour les photos du listing avec une capture de l'app
- Ajoute "APP INCLUSE" dans le titre du produit
- Augmente le prix de 10-15€ pour refléter la valeur ajoutée

### Argument de vente TikTok
> "J'ai créé une app fitness complète avec coach IA, programmes, recettes et suivi — et elle est offerte avec mon programme 30 jours"

---

## Option B — Accès payant mensuel

Quand tu es prêt pour l'abonnement :
1. Crée un compte **Stripe** (paiements en ligne)
2. Utilise **Outseta** ou **Memberstack** (5 min d'intégration)
   → Ces outils gèrent les abonnements + la protection de l'URL
3. Prix suggéré : **9,99€/mois** ou **79€/an**
4. Les abonnés reçoivent un email avec le lien privé de l'app

---

## En cas de problème
- Node.js non reconnu → redémarre le Terminal après installation
- `git push` échoue → vérifie que tu es connecté à GitHub
- Vercel build error → envoie le message d'erreur à Claude

**Questions ? → elitefit@ton-email.com**
