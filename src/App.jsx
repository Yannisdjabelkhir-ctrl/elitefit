import { useState, useEffect } from "react";
import React from "react";
import { Home, LayoutList, Dumbbell, BarChart2, UtensilsCrossed, Calculator, RefreshCw, Bot, Target, Calendar, Plus, Trash2, Search, Send, Clock, Flame, ChevronRight, Zap, Building, Play, ChefHat, Filter } from "lucide-react";

// ── Google Fonts ───────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap";
document.head.appendChild(fontLink);

// ── Design tokens ──────────────────────────────────────────────
const C = {
  bg: "#0A0A0A",
  surface: "#111111",
  card: "#181818",
  border: "#2A2A2A",
  gold: "#C9A84C",
  goldLight: "#E8C96A",
  goldDim: "#7A6030",
  text: "#F0EDE6",
  muted: "#888880",
  danger: "#E05252",
  success: "#52C97A",
};

const styles = {
  app: {
    minHeight: "100vh",
    background: "radial-gradient(ellipse at 20% 0%, #1a1200 0%, #0A0A0A 55%, #050505 100%)",
    color: C.text,
    fontFamily: "'Outfit', 'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "rgba(10,10,10,0.92)",
    backdropFilter: "blur(24px)",
    borderBottom: `1px solid ${C.gold}22`,
    padding: "0 24px",
    height: 68,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: `0 4px 32px rgba(0,0,0,0.6), 0 1px 0 ${C.gold}18`,
  },
  logo: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: C.gold,
    fontFamily: "'Playfair Display', serif",
    textShadow: `0 0 30px ${C.gold}55`,
  },
  nav: {
    display: "flex",
    gap: 4,
    background: C.card,
    borderRadius: 12,
    padding: 4,
    border: `1px solid ${C.border}`,
  },
  navBtn: (active) => ({
    padding: "8px 16px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.04em",
    transition: "all 0.2s",
    background: active ? C.gold : "transparent",
    color: active ? "#000" : C.muted,
  }),
  main: {
    flex: 1,
    padding: "28px 20px",
    maxWidth: 900,
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 6,
    letterSpacing: "-0.01em",
    fontFamily: "'Playfair Display', serif",
    textShadow: `0 2px 20px ${C.gold}33`,
  },
  pageSubtitle: {
    fontSize: 13,
    color: C.muted,
    marginBottom: 24,
  },
  // 3D card with deep shadow + gold border glow
  card: {
    background: "linear-gradient(145deg, #1e1e1e 0%, #141414 100%)",
    border: `1px solid ${C.gold}28`,
    borderRadius: 20,
    padding: 22,
    marginBottom: 18,
    boxShadow: `0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 ${C.gold}18`,
    transform: "translateZ(0)",
    transition: "box-shadow 0.2s, transform 0.2s",
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 16,
    color: C.gold,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  goldBtn: {
    background: `linear-gradient(135deg, #b8860b 0%, ${C.gold} 40%, ${C.goldLight} 100%)`,
    color: "#000",
    border: "none",
    borderRadius: 12,
    padding: "13px 24px",
    fontWeight: 800,
    fontSize: 14,
    cursor: "pointer",
    letterSpacing: "0.06em",
    width: "100%",
    boxShadow: `0 4px 20px ${C.gold}55, 0 1px 0 ${C.goldLight}88 inset`,
    transition: "all 0.2s",
    textTransform: "uppercase",
  },
  ghostBtn: {
    background: `linear-gradient(135deg, ${C.gold}0A, ${C.gold}18)`,
    color: C.gold,
    border: `1px solid ${C.gold}44`,
    borderRadius: 10,
    padding: "10px 20px",
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
    letterSpacing: "0.04em",
    transition: "all 0.2s",
    boxShadow: `0 2px 12px ${C.gold}18`,
  },
  input: {
    background: "linear-gradient(145deg, #111 0%, #0e0e0e 100%)",
    border: `1px solid ${C.gold}30`,
    borderRadius: 11,
    padding: "12px 16px",
    color: C.text,
    fontSize: 14,
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    marginBottom: 12,
    boxShadow: `inset 0 2px 8px rgba(0,0,0,0.4), 0 1px 0 ${C.gold}10`,
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  select: {
    background: "linear-gradient(145deg, #111 0%, #0e0e0e 100%)",
    border: `1px solid ${C.gold}30`,
    borderRadius: 11,
    padding: "12px 16px",
    color: C.text,
    fontSize: 14,
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    marginBottom: 12,
    cursor: "pointer",
    boxShadow: `inset 0 2px 8px rgba(0,0,0,0.4)`,
  },
  label: {
    fontSize: 11,
    color: C.muted,
    marginBottom: 6,
    display: "block",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
  },
  // 3D stat card with gold glow bottom border
  statCard: {
    background: "linear-gradient(160deg, #1f1a0e 0%, #141414 60%, #101010 100%)",
    border: `1px solid ${C.gold}35`,
    borderRadius: 16,
    padding: "18px 12px",
    textAlign: "center",
    boxShadow: `0 6px 28px rgba(0,0,0,0.5), 0 1px 0 ${C.gold}20 inset, 0 -1px 0 ${C.gold}15 inset`,
    position: "relative",
    overflow: "hidden",
  },
  statValue: {
    fontSize: 28,
    fontWeight: 800,
    color: C.gold,
    lineHeight: 1,
    marginBottom: 5,
    textShadow: `0 0 20px ${C.gold}66`,
  },
  statLabel: {
    fontSize: 10,
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: 600,
  },
  exerciseRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: `1px solid ${C.gold}15`,
  },
  badge: (color = C.gold) => ({
    background: `linear-gradient(135deg, ${color}18, ${color}28)`,
    color: color,
    border: `1px solid ${color}50`,
    borderRadius: 7,
    padding: "3px 10px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.06em",
    boxShadow: `0 2px 8px ${color}18`,
  }),
  progressBar: (pct, color = C.gold) => ({
    height: 6,
    borderRadius: 3,
    background: "rgba(255,255,255,0.06)",
    marginTop: 8,
    position: "relative",
    overflow: "hidden",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4)",
  }),
  progressFill: (pct, color = C.gold) => ({
    height: "100%",
    width: `${pct}%`,
    background: `linear-gradient(90deg, ${C.goldDim}, ${color}, ${C.goldLight})`,
    borderRadius: 3,
    transition: "width 0.7s cubic-bezier(0.4,0,0.2,1)",
    boxShadow: `0 0 8px ${color}88`,
  }),
  chatBubble: (isUser) => ({
    maxWidth: "82%",
    padding: "12px 16px",
    borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
    background: isUser
      ? `linear-gradient(135deg, #b8860b, ${C.gold}, ${C.goldLight})`
      : "linear-gradient(145deg, #1e1e1e, #161616)",
    color: isUser ? "#000" : C.text,
    fontSize: 14,
    lineHeight: 1.6,
    alignSelf: isUser ? "flex-end" : "flex-start",
    border: isUser ? "none" : `1px solid ${C.gold}25`,
    whiteSpace: "pre-wrap",
    boxShadow: isUser
      ? `0 4px 20px ${C.gold}44`
      : "0 4px 16px rgba(0,0,0,0.4)",
  }),
  textarea: {
    background: "linear-gradient(145deg, #111, #0e0e0e)",
    border: `1px solid ${C.gold}30`,
    borderRadius: 11,
    padding: "12px 16px",
    color: C.text,
    fontSize: 14,
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    resize: "none",
    fontFamily: "inherit",
    lineHeight: 1.5,
    boxShadow: "inset 0 2px 8px rgba(0,0,0,0.4)",
  },
};

// ── Programmes complets (PDF intégrés) ────────────────────────
const PROGRAMMES = [
  {
    id: 1,
    nom: "Prise de Masse",
    duree: "30 jours",
    niveau: "Débutant",
    seances: 4,
    objectif: "masse",
    description: "Programme hypertrophie progressif. Full body → Split → Push/Pull/Jambes.",
    regles: [
      "Surplus calorique +200 à +400 kcal/jour",
      "1,6 à 2g de protéines par kg de poids",
      "7 à 9h de sommeil par nuit",
      "Augmente les charges progressivement",
      "4 séances régulières valent mieux que 2 épuisantes",
    ],
    semaines: [
      {
        num: 1, titre: "Découverte des mouvements", theme: "Full body", duree: "30–35 min", vol: 60,
        jours: [
          {
            jour: "Lundi & Vendredi", nom: "Full body A", duree: "30 min",
            exercices: [
              { nom: "Squat poids du corps", series: "3×12", repos: "60s" },
              { nom: "Pompes sur les genoux", series: "3×10", repos: "60s" },
              { nom: "Rowing haltère 1 bras", series: "3×10", repos: "60s" },
              { nom: "Développé haltères épaules", series: "3×10", repos: "60s" },
              { nom: "Pont fessier", series: "3×15", repos: "45s" },
              { nom: "Gainage frontal", series: "3×20s", repos: "45s" },
            ],
          },
          {
            jour: "Mercredi", nom: "Full body B", duree: "35 min",
            exercices: [
              { nom: "Fentes avant alternées", series: "3×10", repos: "60s" },
              { nom: "Pompes classiques", series: "3×8", repos: "60s" },
              { nom: "Curl biceps haltères", series: "3×12", repos: "45s" },
              { nom: "Extension triceps haltère", series: "3×12", repos: "45s" },
              { nom: "Squat sumo haltère", series: "3×12", repos: "60s" },
              { nom: "Crunchs abdominaux", series: "3×15", repos: "45s" },
            ],
          },
          {
            jour: "Dimanche", nom: "Mobilité & récupération", duree: "20 min",
            exercices: [
              { nom: "Rotation des épaules", series: "1 min", repos: "—" },
              { nom: "Étirement quadriceps debout", series: "30s×2", repos: "—" },
              { nom: "Étirement pectoral au mur", series: "30s×2", repos: "—" },
              { nom: "Fente basse avec rotation", series: "45s×2", repos: "—" },
              { nom: "Chat-vache (sol)", series: "1 min", repos: "—" },
              { nom: "Relaxation allongée", series: "3 min", repos: "—" },
            ],
          },
        ],
      },
      {
        num: 2, titre: "Charge progressive", theme: "Split haut/bas", duree: "35–40 min", vol: 72,
        jours: [
          {
            jour: "Lundi & Vendredi", nom: "Haut du corps", duree: "35 min",
            exercices: [
              { nom: "Développé couché haltères", series: "4×10", repos: "75s" },
              { nom: "Rowing haltère 1 bras", series: "4×10", repos: "75s" },
              { nom: "Développé militaire haltères", series: "3×10", repos: "60s" },
              { nom: "Curl biceps haltères", series: "3×12", repos: "45s" },
              { nom: "Extension triceps haltère", series: "3×12", repos: "45s" },
              { nom: "Gainage dynamique", series: "3×20", repos: "45s" },
            ],
          },
          {
            jour: "Mercredi", nom: "Bas du corps", duree: "40 min",
            exercices: [
              { nom: "Squat gobelet haltère", series: "4×12", repos: "75s" },
              { nom: "Fentes marchées haltères", series: "4×10", repos: "75s" },
              { nom: "Hip thrust haltère", series: "4×12", repos: "60s" },
              { nom: "Soulevé de terre haltères", series: "3×10", repos: "75s" },
              { nom: "Mollets debout", series: "4×15", repos: "45s" },
              { nom: "Crunchs bicycle", series: "3×20", repos: "45s" },
            ],
          },
          {
            jour: "Dimanche", nom: "Cardio léger + étirements", duree: "25 min",
            exercices: [
              { nom: "Marche rapide ou vélo léger", series: "20 min", repos: "—" },
              { nom: "Étirement ischio-jambiers", series: "1 min", repos: "—" },
              { nom: "Étirement dos et lombaires", series: "1 min", repos: "—" },
              { nom: "Pigeon au sol chaque côté", series: "45s×2", repos: "—" },
              { nom: "Relaxation allongée", series: "3 min", repos: "—" },
            ],
          },
        ],
      },
      {
        num: 3, titre: "Hypertrophie", theme: "Push / Pull / Jambes", duree: "40–45 min", vol: 85,
        jours: [
          {
            jour: "Lundi", nom: "Push — Pectoraux, Épaules, Triceps", duree: "40 min",
            exercices: [
              { nom: "Développé couché haltères", series: "4×10", repos: "75s" },
              { nom: "Écarté pectoraux haltères", series: "3×12", repos: "60s" },
              { nom: "Développé militaire haltères", series: "4×10", repos: "75s" },
              { nom: "Élévations latérales haltères", series: "3×15", repos: "45s" },
              { nom: "Dips sur chaise", series: "3×10", repos: "60s" },
              { nom: "Extension triceps haltère", series: "3×12", repos: "45s" },
            ],
          },
          {
            jour: "Mercredi", nom: "Pull — Dos, Biceps", duree: "40 min",
            exercices: [
              { nom: "Rowing haltère 1 bras", series: "4×10", repos: "75s" },
              { nom: "Rowing haltères 2 bras penché", series: "4×10", repos: "75s" },
              { nom: "Pull-over haltère allongé", series: "3×12", repos: "60s" },
              { nom: "Curl biceps haltères", series: "4×12", repos: "45s" },
              { nom: "Curl marteau haltères", series: "3×12", repos: "45s" },
              { nom: "Gainage frontal", series: "3×30s", repos: "45s" },
            ],
          },
          {
            jour: "Vendredi", nom: "Jambes", duree: "45 min",
            exercices: [
              { nom: "Squat haltères", series: "4×12", repos: "75s" },
              { nom: "Squat bulgare haltères", series: "4×10", repos: "75s" },
              { nom: "Soulevé de terre jambes tendues", series: "4×10", repos: "75s" },
              { nom: "Hip thrust haltère", series: "4×12", repos: "60s" },
              { nom: "Fentes latérales haltères", series: "3×12", repos: "60s" },
              { nom: "Mollets debout haltères", series: "4×20", repos: "45s" },
            ],
          },
        ],
      },
      {
        num: 4, titre: "Consolidation & surcharge", theme: "Surcharge progressive", duree: "45 min", vol: 95,
        jours: [
          {
            jour: "Lundi", nom: "Push+ — Charge augmentée", duree: "45 min",
            exercices: [
              { nom: "Développé couché haltères", series: "5×10", repos: "75s" },
              { nom: "Écarté pectoraux haltères", series: "4×12", repos: "60s" },
              { nom: "Développé militaire haltères", series: "5×10", repos: "75s" },
              { nom: "Élévations latérales haltères", series: "4×15", repos: "45s" },
              { nom: "Dips sur chaise", series: "4×12", repos: "60s" },
              { nom: "Extension triceps haltère", series: "4×12", repos: "45s" },
            ],
          },
          {
            jour: "Mercredi", nom: "Pull+ — Charge augmentée", duree: "45 min",
            exercices: [
              { nom: "Rowing haltère 1 bras", series: "5×10", repos: "75s" },
              { nom: "Rowing haltères 2 bras penché", series: "5×10", repos: "75s" },
              { nom: "Pull-over haltère allongé", series: "4×12", repos: "60s" },
              { nom: "Curl biceps haltères", series: "4×12", repos: "45s" },
              { nom: "Curl marteau haltères", series: "4×12", repos: "45s" },
              { nom: "Gainage frontal", series: "4×30s", repos: "45s" },
            ],
          },
          {
            jour: "Vendredi", nom: "Jambes+ — Charge augmentée", duree: "45 min",
            exercices: [
              { nom: "Squat haltères", series: "5×12", repos: "75s" },
              { nom: "Squat bulgare haltères", series: "4×10", repos: "75s" },
              { nom: "Soulevé de terre jambes tendues", series: "4×10", repos: "75s" },
              { nom: "Hip thrust haltère lourd", series: "5×12", repos: "60s" },
              { nom: "Fentes latérales haltères", series: "4×12", repos: "60s" },
              { nom: "Mollets debout haltères", series: "5×20", repos: "45s" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    nom: "Perte de Poids",
    duree: "30 jours",
    niveau: "Débutant",
    seances: 4,
    objectif: "seche",
    description: "Cardio HIIT + renforcement progressif. Brûle les graisses durablement.",
    regles: [
      "Respecte les jours de repos — la progression se fait à la récupération",
      "1,5 à 2 litres d'eau par jour minimum",
      "3 min d'échauffement avant chaque séance",
      "Si trop difficile, fais la version sur les genoux",
      "La régularité prime sur l'intensité",
    ],
    semaines: [
      {
        num: 1, titre: "Éveil du corps", theme: "Intensité débutant", duree: "25–30 min", vol: 45,
        jours: [
          {
            jour: "Lundi", nom: "Cardio léger", duree: "25 min",
            exercices: [
              { nom: "Marche rapide / Tapis de marche", series: "1×20 min", repos: "—" },
              { nom: "Montées de genoux sur place", series: "3×30s", repos: "30s" },
              { nom: "Talons-fesses sur place", series: "3×30s", repos: "30s" },
            ],
          },
          {
            jour: "Mercredi", nom: "Renforcement global", duree: "30 min",
            exercices: [
              { nom: "Squat poids du corps", series: "3×12", repos: "45s" },
              { nom: "Pompes sur les genoux", series: "3×8", repos: "45s" },
              { nom: "Fentes avant alternées", series: "3×10", repos: "45s" },
              { nom: "Gainage frontal (planche)", series: "3×20s", repos: "30s" },
              { nom: "Pont fessier", series: "3×15", repos: "30s" },
            ],
          },
          {
            jour: "Vendredi", nom: "Circuit global", duree: "25 min",
            note: "Enchaîne les 5 exercices sans pause, repos 90s. Répète 3 fois.",
            exercices: [
              { nom: "Jumping Jacks", series: "30s", repos: "—" },
              { nom: "Squat sauté (doux)", series: "30s", repos: "—" },
              { nom: "Pompes sur genoux", series: "30s", repos: "—" },
              { nom: "Mountain climbers lents", series: "30s", repos: "—" },
              { nom: "Gainage latéral (chaque côté)", series: "20s", repos: "— / 90s" },
            ],
          },
          {
            jour: "Dimanche", nom: "Mobilité & étirements", duree: "20 min",
            exercices: [
              { nom: "Rotation des épaules", series: "1 min", repos: "—" },
              { nom: "Étirement quadriceps debout", series: "30s×2", repos: "—" },
              { nom: "Étirement ischio-jambiers assis", series: "30s×2", repos: "—" },
              { nom: "Fente basse avec rotation", series: "45s×2", repos: "—" },
              { nom: "Étirement du dos en boule", series: "1 min", repos: "—" },
              { nom: "Respiration profonde allongé", series: "2 min", repos: "—" },
            ],
          },
        ],
      },
      {
        num: 2, titre: "Activation", theme: "Circuit training", duree: "30–35 min", vol: 62,
        jours: [
          {
            jour: "Lundi", nom: "Circuit training débutant", duree: "30 min",
            note: "Enchaîne les 5 exercices, repos 60s entre chaque circuit. Répète 3 fois.",
            exercices: [
              { nom: "Jumping Jacks", series: "40s", repos: "—" },
              { nom: "Squat poids du corps", series: "40s", repos: "—" },
              { nom: "Pompes sur genoux", series: "40s", repos: "—" },
              { nom: "Fentes alternées", series: "40s", repos: "—" },
              { nom: "Gainage frontal", series: "30s", repos: "— / 60s" },
            ],
          },
          {
            jour: "Mercredi", nom: "Renforcement ciblé", duree: "35 min",
            exercices: [
              { nom: "Squat sumo", series: "3×15", repos: "45s" },
              { nom: "Pompes classiques (ou genoux)", series: "3×10", repos: "45s" },
              { nom: "Hip thrust au sol", series: "3×15", repos: "40s" },
              { nom: "Rowing haltère 1 bras", series: "3×12", repos: "40s" },
              { nom: "Crunchs abdominaux", series: "3×15", repos: "30s" },
              { nom: "Superman dos", series: "3×12", repos: "30s" },
            ],
          },
          {
            jour: "Vendredi", nom: "Cardio continu", duree: "30 min",
            exercices: [
              { nom: "Échauffement marche", series: "5 min", repos: "—" },
              { nom: "Cardio modéré continu", series: "20 min", repos: "—" },
              { nom: "Retour au calme", series: "5 min", repos: "—" },
            ],
          },
          {
            jour: "Dimanche", nom: "Mobilité active", duree: "30 min",
            exercices: [
              { nom: "Cercles de hanches debout", series: "1 min", repos: "—" },
              { nom: "Chat-vache (sol)", series: "1 min", repos: "—" },
              { nom: "Pigeon au sol (chaque côté)", series: "45s×2", repos: "—" },
              { nom: "Étirement pectoral au mur", series: "30s×2", repos: "—" },
              { nom: "Torsion dorsale allongé", series: "45s×2", repos: "—" },
              { nom: "Cohérence cardiaque (respiration)", series: "3 min", repos: "—" },
            ],
          },
        ],
      },
      {
        num: 3, titre: "Combustion", theme: "HIIT doux", duree: "35–40 min", vol: 78,
        jours: [
          {
            jour: "Lundi", nom: "HIIT doux", duree: "35 min",
            note: "40s effort / 20s repos. 4 tours. Repos 90s entre chaque tour.",
            exercices: [
              { nom: "Burpees simplifiés (sans saut)", series: "40s", repos: "20s" },
              { nom: "Squat sauté", series: "40s", repos: "20s" },
              { nom: "Mountain climbers", series: "40s", repos: "20s" },
              { nom: "Pompes explosives (ou genoux)", series: "40s", repos: "20s" },
              { nom: "Montées de genoux rapides", series: "40s", repos: "20s / 90s" },
            ],
          },
          {
            jour: "Mercredi", nom: "Renforcement musculaire ciblé", duree: "40 min",
            exercices: [
              { nom: "Squat bulgare (chaise)", series: "3×12", repos: "45s" },
              { nom: "Pompes déclinées (pieds surélevés)", series: "3×10", repos: "45s" },
              { nom: "Hip thrust unilatéral", series: "3×12", repos: "40s" },
              { nom: "Gainage dynamique (planche toucher épaule)", series: "3×20", repos: "40s" },
              { nom: "Crunchs bicycle", series: "3×20", repos: "30s" },
              { nom: "Good morning poids du corps", series: "3×15", repos: "30s" },
            ],
          },
          {
            jour: "Vendredi", nom: "HIIT doux 2", duree: "35 min",
            note: "5 exercices enchaînés, repos 90s. 4 tours.",
            exercices: [
              { nom: "Corde à sauter (ou simulation)", series: "45s", repos: "—" },
              { nom: "Fentes sautées (douces)", series: "45s", repos: "—" },
              { nom: "Dips sur chaise", series: "45s", repos: "—" },
              { nom: "Gainage latéral dynamique", series: "30s×2", repos: "—" },
              { nom: "Burpees complets", series: "45s", repos: "— / 90s" },
            ],
          },
          {
            jour: "Dimanche", nom: "Récupération active", duree: "30 min",
            exercices: [
              { nom: "Marche lente", series: "10 min", repos: "—" },
              { nom: "Étirement complet jambes", series: "2 min", repos: "—" },
              { nom: "Étirement dos et lombaires", series: "2 min", repos: "—" },
              { nom: "Foam roller cuisses", series: "3 min", repos: "—" },
              { nom: "Posture enfant (yoga)", series: "2 min", repos: "—" },
              { nom: "Relaxation allongée", series: "5 min", repos: "—" },
            ],
          },
        ],
      },
      {
        num: 4, titre: "Consolidation", theme: "Ancrer les résultats", duree: "40 min", vol: 92,
        jours: [
          {
            jour: "Lundi", nom: "Best-of S1–S3", duree: "40 min",
            note: "4 tours. Repos 90s entre chaque tour.",
            exercices: [
              { nom: "Jumping Jacks", series: "40s", repos: "—" },
              { nom: "Squat sauté", series: "40s", repos: "—" },
              { nom: "Pompes classiques", series: "40s", repos: "—" },
              { nom: "Mountain climbers", series: "40s", repos: "—" },
              { nom: "Fentes alternées", series: "40s", repos: "—" },
              { nom: "Burpees complets", series: "40s", repos: "— / 90s" },
            ],
          },
          {
            jour: "Mercredi", nom: "Renforcement complet", duree: "40 min",
            exercices: [
              { nom: "Squat bulgare", series: "4×12", repos: "45s" },
              { nom: "Pompes déclinées", series: "4×10", repos: "45s" },
              { nom: "Hip thrust unilatéral", series: "4×12", repos: "40s" },
              { nom: "Gainage frontal + toucher épaule", series: "4×20", repos: "40s" },
              { nom: "Crunchs bicycle", series: "4×20", repos: "30s" },
              { nom: "Superman dos", series: "4×15", repos: "30s" },
            ],
          },
          {
            jour: "Vendredi", nom: "HIIT final (Tabata)", duree: "40 min",
            note: "Format Tabata : 20s effort / 10s repos. 8 tours par exercice. Repos 2 min entre exercices.",
            exercices: [
              { nom: "Burpees complets", series: "8×20s", repos: "10s" },
              { nom: "Squat sauté", series: "8×20s", repos: "10s" },
              { nom: "Mountain climbers rapides", series: "8×20s", repos: "10s" },
              { nom: "Pompes explosives", series: "8×20s", repos: "10s" },
            ],
          },
          {
            jour: "Dimanche", nom: "Bilan & étirements profonds", duree: "40 min",
            exercices: [
              { nom: "Marche douce", series: "10 min", repos: "—" },
              { nom: "Pigeon au sol chaque côté", series: "2 min", repos: "—" },
              { nom: "Étirement ischio-jambiers", series: "2 min", repos: "—" },
              { nom: "Torsion dorsale allongée", series: "2 min", repos: "—" },
              { nom: "Posture enfant prolongée", series: "3 min", repos: "—" },
              { nom: "Relaxation complète", series: "5 min", repos: "—" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    nom: "Force Pure",
    duree: "8 semaines",
    niveau: "Avancé",
    seances: 3,
    objectif: "force",
    description: "Focus sur les 3 grands mouvements : squat, développé couché, soulevé de terre.",
    regles: [
      "Travail en 85–95% de ta charge maximale",
      "Repos complets entre les séries (2–3 min)",
      "Technique parfaite avant d'augmenter les charges",
      "Alimentation riche en protéines et glucides complexes",
    ],
    semaines: [
      { num: 1, titre: "Technique & Volume", theme: "Force basse rep", duree: "60–75 min", vol: 65, jours: [] },
      { num: 2, titre: "Force basse répétition", theme: "85% 1RM", duree: "65–75 min", vol: 75, jours: [] },
      { num: 3, titre: "Intensité 85–90%", theme: "Surcharge", duree: "70 min", vol: 85, jours: [] },
      { num: 4, titre: "Pic de force", theme: "95% 1RM", duree: "75 min", vol: 95, jours: [] },
    ],
  },
];

const EXERCICES = [
  // ── SALLE ──
  { nom: "Squat barre", groupe: "Jambes", series: "4x8", repos: "90s", kcal: 45, lieu: "Salle" },
  { nom: "Développé couché", groupe: "Pectoraux", series: "4x10", repos: "75s", kcal: 38, lieu: "Salle" },
  { nom: "Soulevé de terre", groupe: "Dos / Ischios", series: "3x5", repos: "120s", kcal: 52, lieu: "Salle" },
  { nom: "Tirage vertical", groupe: "Dos", series: "3x12", repos: "60s", kcal: 30, lieu: "Salle" },
  { nom: "Développé militaire", groupe: "Épaules", series: "3x10", repos: "75s", kcal: 28, lieu: "Salle" },
  { nom: "Curl biceps barre", groupe: "Biceps", series: "3x12", repos: "45s", kcal: 18, lieu: "Salle" },
  { nom: "Triceps poulie haute", groupe: "Triceps", series: "3x15", repos: "45s", kcal: 16, lieu: "Salle" },
  { nom: "Hip thrust barre", groupe: "Fessiers", series: "4x12", repos: "60s", kcal: 35, lieu: "Salle" },
  { nom: "Leg press", groupe: "Jambes", series: "4x10", repos: "90s", kcal: 42, lieu: "Salle" },
  { nom: "Rowing haltère", groupe: "Dos", series: "3x10", repos: "60s", kcal: 27, lieu: "Salle" },
  { nom: "Pec deck / Butterfly", groupe: "Pectoraux", series: "3x15", repos: "60s", kcal: 22, lieu: "Salle" },
  { nom: "Curl haltères incliné", groupe: "Biceps", series: "3x12", repos: "45s", kcal: 17, lieu: "Salle" },
  { nom: "Extensions triceps barre", groupe: "Triceps", series: "3x12", repos: "45s", kcal: 18, lieu: "Salle" },
  { nom: "Élévations latérales haltères", groupe: "Épaules", series: "4x15", repos: "45s", kcal: 20, lieu: "Salle" },
  { nom: "Leg curl couché", groupe: "Ischios", series: "3x12", repos: "60s", kcal: 25, lieu: "Salle" },
  { nom: "Leg extension", groupe: "Quadriceps", series: "3x15", repos: "60s", kcal: 22, lieu: "Salle" },
  { nom: "Face pull câble", groupe: "Épaules / Dos", series: "4x15", repos: "45s", kcal: 18, lieu: "Salle" },
  { nom: "Squat hack machine", groupe: "Jambes", series: "4x10", repos: "90s", kcal: 40, lieu: "Salle" },
  { nom: "Développé incliné haltères", groupe: "Pectoraux", series: "3x12", repos: "75s", kcal: 32, lieu: "Salle" },
  { nom: "Adducteurs machine", groupe: "Fessiers / Cuisses", series: "3x15", repos: "45s", kcal: 18, lieu: "Salle" },
  // ── MAISON ──
  { nom: "Pompes classiques", groupe: "Pectoraux", series: "4x15", repos: "60s", kcal: 28, lieu: "Maison" },
  { nom: "Squat poids du corps", groupe: "Jambes", series: "4x20", repos: "60s", kcal: 32, lieu: "Maison" },
  { nom: "Fentes alternées", groupe: "Jambes", series: "3x12", repos: "45s", kcal: 30, lieu: "Maison" },
  { nom: "Dips sur chaise", groupe: "Triceps", series: "3x15", repos: "45s", kcal: 20, lieu: "Maison" },
  { nom: "Gainage planche", groupe: "Abdos", series: "3x45s", repos: "30s", kcal: 12, lieu: "Maison" },
  { nom: "Burpees", groupe: "Full body", series: "4x12", repos: "60s", kcal: 55, lieu: "Maison" },
  { nom: "Mountain climbers", groupe: "Abdos / Cardio", series: "4x30s", repos: "30s", kcal: 40, lieu: "Maison" },
  { nom: "Pompes diamant", groupe: "Triceps", series: "3x12", repos: "45s", kcal: 22, lieu: "Maison" },
  { nom: "Relevés de jambes allongé", groupe: "Abdos", series: "3x15", repos: "30s", kcal: 14, lieu: "Maison" },
  { nom: "Jumping jacks", groupe: "Full body / Cardio", series: "4x45s", repos: "30s", kcal: 48, lieu: "Maison" },
];

const ALIMENTS = [
  { nom: "Blanc de poulet 100g", kcal: 165, prot: 31, gluc: 0, lip: 3.6 },
  { nom: "Riz blanc 100g (cuit)", kcal: 130, prot: 2.7, gluc: 28, lip: 0.3 },
  { nom: "Œuf entier", kcal: 78, prot: 6, gluc: 0.6, lip: 5 },
  { nom: "Flocons d'avoine 100g", kcal: 389, prot: 17, gluc: 66, lip: 7 },
  { nom: "Brocoli 100g", kcal: 34, prot: 2.8, gluc: 7, lip: 0.4 },
  { nom: "Saumon 100g", kcal: 208, prot: 20, gluc: 0, lip: 13 },
  { nom: "Fromage blanc 0%", kcal: 57, prot: 8, gluc: 4, lip: 0.2 },
  { nom: "Banane", kcal: 89, prot: 1.1, gluc: 23, lip: 0.3 },
  { nom: "Amandes 30g", kcal: 174, prot: 6, gluc: 6, lip: 15 },
  { nom: "Patate douce 100g", kcal: 86, prot: 1.6, gluc: 20, lip: 0.1 },
];

// ── Utility ────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}44, transparent)`, margin: "20px 0" }} />
  );
}

function ProgressBar({ pct, color = C.gold }) {
  return (
    <div style={styles.progressBar(pct, color)}>
      <div style={styles.progressFill(pct, color)} />
    </div>
  );
}

// ── Pages ──────────────────────────────────────────────────────

function Dashboard({ sessions, nutrition, onNavigate }) {
  const totalKcal = nutrition.reduce((s, n) => s + n.kcal, 0);
  const totalProt = nutrition.reduce((s, n) => s + n.prot, 0);
  const thisWeek = sessions.filter((s) => {
    const d = new Date(s.date);
    const now = new Date();
    const diff = (now - d) / 86400000;
    return diff <= 7;
  });

  const shortcuts = [
    { icon: <LayoutList size={22} color={C.gold} />, label: "Programmes", id: "programmes", desc: "Voir mes programmes" },
    { icon: <Dumbbell size={22} color={C.gold} />, label: "Exercices", id: "exercices", desc: "Bibliothèque complète" },
    { icon: <BarChart2 size={22} color={C.gold} />, label: "Suivi", id: "suivi", desc: "Ajouter une séance" },
    { icon: <UtensilsCrossed size={22} color={C.gold} />, label: "Nutrition", id: "nutrition", desc: "Journal alimentaire" },
    { icon: <Calculator size={22} color={C.gold} />, label: "Macros", id: "macros", desc: "Calculer mes besoins" },
    { icon: <RefreshCw size={22} color={C.gold} />, label: "Substitutions", id: "substitutions", desc: "Trouver une alternative" },
    { icon: <ChefHat size={22} color={C.gold} />, label: "Recettes", id: "recettes", desc: "Repas adaptés" },
    { icon: <Bot size={22} color={C.gold} />, label: "Coach IA", id: "coach", desc: "Programme sur mesure" },
  ];

  return (
    <div>
      {/* 3D Hero banner */}
      <div style={{
        borderRadius: 22, marginBottom: 22, padding: "28px 24px",
        background: "linear-gradient(135deg, #1a1200 0%, #0e0c00 40%, #0A0A0A 100%)",
        border: `1px solid ${C.gold}45`,
        boxShadow: `0 12px 48px rgba(0,0,0,0.7), 0 2px 0 ${C.gold}25 inset, 0 -1px 0 ${C.gold}10 inset`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}18 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}10 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: C.text, marginBottom: 6, position: "relative" }}>Bonjour 💪</div>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 18, position: "relative" }}>Prêt pour ta séance du jour ?</div>
        <button onClick={() => onNavigate("suivi")} style={{
          background: `linear-gradient(135deg, #b8860b, ${C.gold}, ${C.goldLight})`,
          color: "#000", border: "none", borderRadius: 10, padding: "10px 20px",
          fontWeight: 800, fontSize: 12, cursor: "pointer", letterSpacing: "0.08em",
          boxShadow: `0 4px 16px ${C.gold}55`, position: "relative",
        }}>+ NOUVELLE SÉANCE</button>
      </div>

      <div style={styles.grid3}>
        <div style={{ ...styles.statCard, cursor: "pointer" }} onClick={() => onNavigate("suivi")}>
          <div style={styles.statValue}>{thisWeek.length}</div>
          <div style={styles.statLabel}>Séances / semaine</div>
        </div>
        <div style={{ ...styles.statCard, cursor: "pointer" }} onClick={() => onNavigate("nutrition")}>
          <div style={styles.statValue}>{totalKcal}</div>
          <div style={styles.statLabel}>Kcal aujourd'hui</div>
        </div>
        <div style={{ ...styles.statCard, cursor: "pointer" }} onClick={() => onNavigate("macros")}>
          <div style={styles.statValue}>{Math.round(totalProt)}g</div>
          <div style={styles.statLabel}>Protéines</div>
        </div>
      </div>

      {/* Shortcuts grid */}
      <div style={{ marginTop: 24, marginBottom: 4 }}>
        <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, fontWeight: 600 }}>Accès rapide</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10 }}>
          {shortcuts.map((s) => (
            <div
              key={s.id}
              onClick={() => onNavigate(s.id)}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                padding: "16px 12px",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${C.goldDim}`; e.currentTarget.style.background = C.gold + "11"; }}
              onMouseLeave={e => { e.currentTarget.style.border = `1px solid ${C.border}`; e.currentTarget.style.background = C.card; }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: 10, color: C.muted }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={styles.card}>
          <div style={{ ...styles.cardTitle, display: "flex", alignItems: "center", gap: 6 }}><Target size={13} color={C.gold} /> Objectifs du jour</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13 }}>Calories</span>
              <span style={{ fontSize: 13, color: C.gold }}>{totalKcal} / 2500 kcal</span>
            </div>
            <ProgressBar pct={Math.min((totalKcal / 2500) * 100, 100)} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13 }}>Protéines</span>
              <span style={{ fontSize: 13, color: C.gold }}>{Math.round(totalProt)} / 180g</span>
            </div>
            <ProgressBar pct={Math.min((totalProt / 180) * 100, 100)} />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13 }}>Séances hebdo</span>
              <span style={{ fontSize: 13, color: C.gold }}>{thisWeek.length} / 4</span>
            </div>
            <ProgressBar pct={Math.min((thisWeek.length / 4) * 100, 100)} />
          </div>
        </div>

        <div style={{ ...styles.card, cursor: "pointer" }} onClick={() => onNavigate("suivi")}>
          <div style={{ ...styles.cardTitle, display: "flex", alignItems: "center", gap: 6 }}><Calendar size={13} color={C.gold} /> Dernières séances</div>
          {sessions.length === 0 ? (
            <p style={{ color: C.muted, fontSize: 13 }}>Aucune séance enregistrée. <span style={{ color: C.gold }}>Ajouter →</span></p>
          ) : (
            sessions.slice(-3).reverse().map((s, i) => (
              <div key={i} style={styles.exerciseRow}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{s.programme}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{s.date} · {s.duree} min</div>
                </div>
                <span style={styles.badge()}>{s.exercices} exercices</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ── Macro calculator helper ────────────────────────────────────
function calcMacros(poids, taille, age, sexe, activite, objectif) {
  const facteurs = { sedentaire: 1.2, leger: 1.375, modere: 1.55, actif: 1.725, extreme: 1.9 };
  const bmr = sexe === "homme"
    ? 10 * poids + 6.25 * taille - 5 * age + 5
    : 10 * poids + 6.25 * taille - 5 * age - 161;
  const tdee = bmr * (facteurs[activite] || 1.55);
  const adj = objectif === "masse" ? 0.1 : objectif === "seche" ? -0.2 : 0;
  const kcal = Math.round(tdee * (1 + adj));
  const prot = Math.round(poids * (objectif === "masse" ? 2.2 : objectif === "seche" ? 2.4 : 1.8));
  const lip = Math.round((kcal * 0.25) / 9);
  const gluc = Math.round((kcal - prot * 4 - lip * 9) / 4);
  return { kcal, prot, gluc, lip, bmr: Math.round(bmr), tdee: Math.round(tdee) };
}

function Programmes({ onStartSession, programmeActif, onSaveProfile, userProfile, isPremium, onUnlock }) {
  const [vue, setVue] = useState("liste"); // liste | detail | generateur | result
  const [selected, setSelected] = useState(null);
  const [semaine, setSemaine] = useState(0);
  const [profil, setProfil] = useState(userProfile || { poids: "", taille: "", age: "", sexe: "homme", activite: "modere", objectif: "masse", jours: "4", lieu: "salle" });
  const [progGenere, setProgGenere] = useState(null);
  const [loading, setLoading] = useState(false);

  const niveauColor = { Débutant: C.success, Intermédiaire: C.gold, Avancé: C.danger };

  const genererProgramme = async () => {
    if (!profil.poids || !profil.taille || !profil.age) return;
    setLoading(true);
    const macros = calcMacros(+profil.poids, +profil.taille, +profil.age, profil.sexe, profil.activite, profil.objectif);
    const imc = (+profil.poids / ((+profil.taille / 100) ** 2)).toFixed(1);
    const prompt = `Tu es un coach fitness expert. Génère un programme d'entraînement personnalisé en JSON uniquement, sans texte autour.

Profil :
- Sexe : ${profil.sexe}
- Âge : ${profil.age} ans
- Poids : ${profil.poids} kg
- Taille : ${profil.taille} cm
- IMC : ${imc}
- Niveau d'activité : ${profil.activite}
- Objectif : ${profil.objectif}
- Jours disponibles : ${profil.jours} jours/semaine
- Lieu : ${profil.lieu}
- Macros calculées : ${macros.kcal} kcal, ${macros.prot}g protéines, ${macros.gluc}g glucides, ${macros.lip}g lipides

Réponds UNIQUEMENT avec ce JSON (pas de backticks, pas d'explication) :
{
  "titre": "Nom du programme",
  "duree": "X semaines",
  "resume": "Description en 1-2 phrases",
  "conseil_cle": "Conseil nutritionnel personnalisé basé sur son profil",
  "macros": { "kcal": ${macros.kcal}, "prot": ${macros.prot}, "gluc": ${macros.gluc}, "lip": ${macros.lip} },
  "semaines": [
    {
      "num": 1,
      "titre": "Nom",
      "theme": "Thème",
      "jours": [
        {
          "jour": "Lundi",
          "nom": "Nom séance",
          "exercices": [
            { "nom": "Exercice", "series": "3×12", "repos": "60s" }
          ]
        }
      ]
    }
  ]
}`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const text = data.content?.map(c => c.text).join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const prog = JSON.parse(clean);
      prog.macros = macros;      prog.profil = { ...profil };
      setProgGenere(prog);
      onSaveProfile?.(profil);
      setVue("result");
    
    } catch (e) {
      alert("Erreur: " + e.message);
    } finally {
      setLoading(false);
    }
  };  // ── Liste des programmes ──
  if (vue === "liste") return (
    <div>
      <div style={{ borderRadius: 22, marginBottom: 20, padding: "22px 24px", background: "linear-gradient(135deg, #1a1200 0%, #0e0c00 50%, #0A0A0A 100%)", border: `1px solid ${C.gold}40`, boxShadow: `0 10px 40px rgba(0,0,0,0.65), 0 2px 0 ${C.gold}22 inset`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}15 0%, transparent 70%)`, pointerEvents: "none" }} />
        <p style={{ ...styles.pageTitle, marginBottom: 4, fontSize: 24 }}>Programmes</p>
        <p style={{ ...styles.pageSubtitle, marginBottom: 12, fontSize: 12 }}>Programmes PDF intégrés + générateur IA personnalisé</p>
        <button onClick={() => setVue("generateur")} style={{ ...styles.goldBtn, width: "auto", padding: "10px 20px", fontSize: 12 }}>
          ✦ GÉNÉRER MON PROGRAMME PERSONNALISÉ
        </button>
      </div>

      {PROGRAMMES.map((p) => (
        <div key={p.id} style={{ ...styles.card, cursor: "pointer", border: programmeActif?.id === p.id ? `1px solid ${C.gold}` : `1px solid ${C.gold}28` }}
          onClick={() => { setSelected(p); setSemaine(0); setVue("detail"); }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{p.nom}</div>
              <div style={{ fontSize: 13, color: C.muted }}>{p.description}</div>
            </div>
            <span style={{ ...styles.badge(niveauColor[p.niveau] || C.gold), marginLeft: 10, flexShrink: 0 }}>{p.niveau}</span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} color={C.muted} /> {p.duree}</span>
            <span style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}><Dumbbell size={12} color={C.muted} /> {p.seances}x/semaine</span>
            <span style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}><LayoutList size={12} color={C.muted} /> {p.semaines.length} semaines</span>
          </div>
          {programmeActif?.id === p.id && (
            <div style={{ marginTop: 10, fontSize: 11, color: C.gold, fontWeight: 700, letterSpacing: "0.06em" }}>✦ PROGRAMME ACTIF</div>
          )}
        </div>
      ))}
    </div>
  );

  // ── Détail programme PDF ──
  if (vue === "detail" && selected) {
    const sem = selected.semaines[semaine];
    return (
      <div>
        <button onClick={() => setVue("liste")} style={{ ...styles.ghostBtn, marginBottom: 16, fontSize: 12, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6 }}>
          <ChevronRight size={13} style={{ transform: "rotate(180deg)" }} /> Retour
        </button>

        <div style={{ ...styles.card, background: "linear-gradient(135deg, #1a1200 0%, #0e0c00 50%, #0A0A0A 100%)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Playfair Display', serif", color: C.gold }}>{selected.nom}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{selected.duree} · {selected.niveau} · {selected.seances}x/semaine</div>
            </div>
          </div>
          <GoldDivider />
          <div style={{ ...styles.cardTitle, marginBottom: 8 }}>Règles d'or</div>
          {selected.regles?.map((r, i) => (
            <div key={i} style={{ fontSize: 12, color: C.muted, marginBottom: 6, display: "flex", gap: 8 }}>
              <span style={{ color: C.gold, flexShrink: 0 }}>▸</span>{r}
            </div>
          ))}
        </div>

        {/* Semaine selector */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {selected.semaines.map((s, i) => (
            <button key={i} onClick={() => setSemaine(i)} style={{
              padding: "8px 16px", borderRadius: 10, border: semaine === i ? `1px solid ${C.gold}` : `1px solid ${C.gold}25`,
              background: semaine === i ? `linear-gradient(135deg, #1a1200, #0e0c00)` : "transparent",
              color: semaine === i ? C.gold : C.muted, cursor: "pointer", fontSize: 12, fontWeight: 700,
              boxShadow: semaine === i ? `0 4px 16px ${C.gold}25` : "none",
            }}>
              S{s.num}
            </button>
          ))}
        </div>

        {/* Semaine detail */}
        <div style={styles.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Semaine {sem.num} — {sem.titre}</div>
            <span style={styles.badge()}>{sem.vol}%</span>
          </div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>{sem.theme} · {sem.duree}</div>
          <ProgressBar pct={sem.vol} />
        </div>

        {sem.jours?.length > 0 ? sem.jours.map((j, ji) => (
          <div key={ji} style={styles.card}>
            <div style={{ ...styles.cardTitle, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <Calendar size={12} color={C.gold} /> {j.jour} — {j.nom}
              <span style={{ marginLeft: "auto", fontWeight: 600, color: C.muted, fontSize: 11 }}>{j.duree}</span>
            </div>
            {j.note && <div style={{ fontSize: 11, color: C.gold, background: `${C.gold}12`, borderRadius: 8, padding: "8px 12px", marginBottom: 12, border: `1px solid ${C.gold}25` }}>{j.note}</div>}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "4px 12px", alignItems: "center" }}>
              <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", paddingBottom: 6, borderBottom: `1px solid ${C.gold}18` }}>EXERCICE</div>
              <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", paddingBottom: 6, borderBottom: `1px solid ${C.gold}18`, textAlign: "center" }}>SÉRIES</div>
              <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", paddingBottom: 6, borderBottom: `1px solid ${C.gold}18`, textAlign: "center" }}>REPOS</div>
              {j.exercices.map((ex, ei) => (
                <React.Fragment key={ei}>
                  <div style={{ fontSize: 13, fontWeight: 600, padding: "10px 0", borderBottom: ei < j.exercices.length - 1 ? `1px solid ${C.gold}10` : "none" }}>{ex.nom}</div>
                  <div style={{ fontSize: 12, color: C.gold, fontWeight: 700, textAlign: "center", padding: "10px 0", borderBottom: ei < j.exercices.length - 1 ? `1px solid ${C.gold}10` : "none" }}>{ex.series}</div>
                  <div style={{ fontSize: 11, color: C.muted, textAlign: "center", padding: "10px 0", borderBottom: ei < j.exercices.length - 1 ? `1px solid ${C.gold}10` : "none" }}>{ex.repos}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )) : (
          <div style={{ ...styles.card, textAlign: "center", color: C.muted, fontSize: 13 }}>Détail des séances disponible dans le programme complet.</div>
        )}

        <button style={styles.goldBtn} onClick={() => onStartSession(selected)}>
          ✦ DÉMARRER CE PROGRAMME
        </button>
      </div>
    );
  }

  // ── Générateur IA ──
  if (vue === "generateur") {
    if (!isPremium) return (
      <div>
        <button onClick={() => setVue("liste")} style={{ ...styles.ghostBtn, marginBottom: 16, fontSize: 12, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6 }}>
          <ChevronRight size={13} style={{ transform: "rotate(180deg)" }} /> Retour
        </button>
        <PremiumLock onUnlock={onUnlock} />
      </div>
    );
    return (
    <div>
      <button onClick={() => setVue("liste")} style={{ ...styles.ghostBtn, marginBottom: 16, fontSize: 12, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6 }}>
        <ChevronRight size={13} style={{ transform: "rotate(180deg)" }} /> Retour
      </button>

      <div style={{ ...styles.card, background: "linear-gradient(135deg, #1a1200 0%, #0e0c00 50%, #0A0A0A 100%)" }}>
        <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Playfair Display', serif", color: C.gold, marginBottom: 4 }}>Programme sur mesure</div>
        <div style={{ fontSize: 12, color: C.muted }}>Remplis ton profil — l'IA génère un programme + tes macros personnalisées</div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Ton profil</div>
        <div style={styles.grid2}>
          <div>
            <label style={styles.label}>Sexe</label>
            <select style={styles.select} value={profil.sexe} onChange={e => setProfil({ ...profil, sexe: e.target.value })}>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>Âge</label>
            <input style={styles.input} type="number" placeholder="25" value={profil.age} onChange={e => setProfil({ ...profil, age: e.target.value })} />
          </div>
          <div>
            <label style={styles.label}>Poids (kg)</label>
            <input style={styles.input} type="number" placeholder="75" value={profil.poids} onChange={e => setProfil({ ...profil, poids: e.target.value })} />
          </div>
          <div>
            <label style={styles.label}>Taille (cm)</label>
            <input style={styles.input} type="number" placeholder="175" value={profil.taille} onChange={e => setProfil({ ...profil, taille: e.target.value })} />
          </div>
        </div>

        <label style={styles.label}>Objectif</label>
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          {[{ val: "masse", label: "Prise de masse" }, { val: "seche", label: "Perte de poids" }, { val: "maintien", label: "Maintien" }].map(o => (
            <button key={o.val} onClick={() => setProfil({ ...profil, objectif: o.val })}
              style={{ ...styles.ghostBtn, flex: 1, fontSize: 12, padding: "10px 8px", background: profil.objectif === o.val ? `${C.gold}22` : "transparent", color: profil.objectif === o.val ? C.gold : C.muted, borderColor: profil.objectif === o.val ? C.gold : `${C.gold}30` }}>
              {o.label}
            </button>
          ))}
        </div>

        <label style={styles.label}>Niveau d'activité</label>
        <select style={styles.select} value={profil.activite} onChange={e => setProfil({ ...profil, activite: e.target.value })}>
          <option value="sedentaire">Sédentaire (pas de sport)</option>
          <option value="leger">Légèrement actif (1-2x/sem)</option>
          <option value="modere">Modérément actif (3-4x/sem)</option>
          <option value="actif">Très actif (5-6x/sem)</option>
        </select>

        <div style={styles.grid2}>
          <div>
            <label style={styles.label}>Jours disponibles</label>
            <select style={styles.select} value={profil.jours} onChange={e => setProfil({ ...profil, jours: e.target.value })}>
              {["2","3","4","5","6"].map(j => <option key={j} value={j}>{j} jours/semaine</option>)}
            </select>
          </div>
          <div>
            <label style={styles.label}>Lieu</label>
            <select style={styles.select} value={profil.lieu} onChange={e => setProfil({ ...profil, lieu: e.target.value })}>
              <option value="salle">Salle de sport</option>
              <option value="maison">À la maison</option>
              <option value="mixte">Mixte (salle + maison)</option>
            </select>
          </div>
        </div>

        <button style={{ ...styles.goldBtn, opacity: loading ? 0.6 : 1 }} onClick={genererProgramme} disabled={loading}>
          {loading ? "Génération en cours..." : "✦ GÉNÉRER MON PROGRAMME + MACROS"}
        </button>
      </div>
    </div>
  );
  }

  // ── Résultat généré ──
  if (vue === "result" && progGenere) {
    const m = progGenere.macros;
    return (
      <div>
        <button onClick={() => setVue("generateur")} style={{ ...styles.ghostBtn, marginBottom: 16, fontSize: 12, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6 }}>
          <ChevronRight size={13} style={{ transform: "rotate(180deg)" }} /> Modifier le profil
        </button>

        {/* Programme header */}
        <div style={{ ...styles.card, background: "linear-gradient(135deg, #1a1200 0%, #0e0c00 50%, #0A0A0A 100%)" }}>
          <div style={{ fontSize: 21, fontWeight: 800, fontFamily: "'Playfair Display', serif", color: C.gold, marginBottom: 6 }}>{progGenere.titre}</div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 10 }}>{progGenere.resume}</div>
          <div style={{ fontSize: 12, color: C.text, background: `${C.gold}12`, borderRadius: 10, padding: "10px 14px", border: `1px solid ${C.gold}25` }}>
            <span style={{ color: C.gold, fontWeight: 700 }}>Conseil clé : </span>{progGenere.conseil_cle}
          </div>
        </div>

        {/* Macros */}
        <div style={styles.card}>
          <div style={{ ...styles.cardTitle, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}><Flame size={13} color={C.gold} /> Tes macros personnalisées</div>
          <div style={styles.grid3}>
            {[{ label: "Calories", val: m.kcal, unit: "kcal", color: C.gold },
              { label: "Protéines", val: m.prot, unit: "g", color: "#4A9EFF" },
              { label: "Glucides", val: m.gluc, unit: "g", color: C.success },
              { label: "Lipides", val: m.lip, unit: "g", color: "#E8A04A" },
            ].slice(0,3).map((s, i) => (
              <div key={i} style={styles.statCard}>
                <div style={{ ...styles.statValue, fontSize: 22, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 10, color: C.muted }}>{s.unit}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: C.muted, textAlign: "center" }}>Lipides : <span style={{ color: "#E8A04A", fontWeight: 700 }}>{m.lip}g</span> · {profil.poids}kg · {progGenere.duree}</div>
        </div>

        {/* Semaines générées */}
        {progGenere.semaines?.map((s, si) => (
          <div key={si} style={styles.card}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Semaine {s.num} — {s.titre}</div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 12 }}>{s.theme}</div>
            {s.jours?.map((j, ji) => (
              <div key={ji} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: C.gold, fontWeight: 700, marginBottom: 8, letterSpacing: "0.06em" }}>{j.jour} — {j.nom}</div>
                {j.exercices?.map((ex, ei) => (
                  <div key={ei} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: ei < j.exercices.length - 1 ? `1px solid ${C.gold}10` : "none" }}>
                    <span style={{ fontSize: 13 }}>{ex.nom}</span>
                    <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
                      <span style={{ fontSize: 12, color: C.gold, fontWeight: 700 }}>{ex.series}</span>
                      <span style={{ fontSize: 11, color: C.muted, minWidth: 32, textAlign: "right" }}>{ex.repos}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}

        <button style={styles.goldBtn} onClick={() => onStartSession({ id: 99, nom: progGenere.titre, ...progGenere })}>
          ✦ DÉMARRER CE PROGRAMME
        </button>
      </div>
    );
  }

  return null;
}

function Exercices() {
  const [lieu, setLieu] = useState("Tous");
  const [filtre, setFiltre] = useState("Tous");

  const parLieu = lieu === "Tous" ? EXERCICES : EXERCICES.filter((e) => e.lieu === lieu);
  const groupes = ["Tous", ...new Set(parLieu.map((e) => e.groupe))];
  const filtres = filtre === "Tous" ? parLieu : parLieu.filter((e) => e.groupe === filtre);

  const handleLieu = (l) => { setLieu(l); setFiltre("Tous"); };

  const lieuColor = { Salle: "#4A9EFF", Maison: C.success };

  return (
    <div>
      <div style={{
        borderRadius: 22, marginBottom: 20, padding: "22px 24px",
        background: "linear-gradient(135deg, #1a1200 0%, #0e0c00 50%, #0A0A0A 100%)",
        border: `1px solid ${C.gold}40`,
        boxShadow: `0 10px 40px rgba(0,0,0,0.65), 0 2px 0 ${C.gold}22 inset`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}15 0%, transparent 70%)`, pointerEvents: "none" }} />
        <p style={{ ...styles.pageTitle, marginBottom: 4, fontSize: 24 }}>Exercices</p>
        <p style={{ ...styles.pageSubtitle, marginBottom: 0, fontSize: 12 }}>30 mouvements · Salle & Maison</p>
      </div>

      {/* Lieu tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20, background: C.card, borderRadius: 12, padding: 4, border: `1px solid ${C.border}`, width: "fit-content" }}>
        {["Tous", "Salle", "Maison"].map((l) => (
          <button
            key={l}
            onClick={() => handleLieu(l)}
            style={{
              padding: "10px 24px",
              borderRadius: 9,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.04em",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 6,
              background: lieu === l
                ? (l === "Salle" ? "#4A9EFF" : l === "Maison" ? C.success : C.gold)
                : "transparent",
              color: lieu === l ? "#000" : C.muted,
            }}
          >
            {l === "Salle" ? <><Building size={13} /> Salle</> : l === "Maison" ? <><Home size={13} /> Maison</> : <><Zap size={13} /> Tous</>}
          </button>
        ))}
      </div>

      {/* Compteur */}
      <div style={{ marginBottom: 16, fontSize: 12, color: C.muted }}>
        <span style={{ color: C.gold, fontWeight: 700 }}>{filtres.length}</span> exercice{filtres.length > 1 ? "s" : ""}
        {lieu !== "Tous" && <span> · {lieu}</span>}
        {filtre !== "Tous" && <span> · {filtre}</span>}
      </div>

      {/* Groupe muscle filters */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {groupes.map((g) => (
          <button
            key={g}
            onClick={() => setFiltre(g)}
            style={{
              ...styles.ghostBtn,
              background: filtre === g ? C.gold + "22" : "transparent",
              color: filtre === g ? C.gold : C.muted,
              borderColor: filtre === g ? C.gold : C.border,
              padding: "5px 12px",
              fontSize: 11,
            }}
          >
            {g}
          </button>
        ))}
      </div>

      <div style={styles.card}>
        {filtres.length === 0 && (
          <p style={{ color: C.muted, fontSize: 13 }}>Aucun exercice pour ce filtre.</p>
        )}
        {filtres.map((ex, i) => {
          const query = encodeURIComponent(ex.nom + " exercice technique");
          const ytUrl = `https://www.youtube.com/results?search_query=${query}`;
          return (
            <div key={i} style={{ ...styles.exerciseRow, borderBottom: i < filtres.length - 1 ? `1px solid ${C.border}` : "none", flexWrap: "wrap", gap: 10 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{ex.nom}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <span style={styles.badge()}>{ex.groupe}</span>
                  <span style={{ ...styles.badge(lieuColor[ex.lieu] || C.gold), display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {ex.lieu === "Salle" ? <Building size={10} /> : <Home size={10} />} {ex.lieu}
                  </span>
                  <span style={{ fontSize: 12, color: C.muted }}>Repos : {ex.repos}</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>{ex.series}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>~{ex.kcal} kcal</div>
                </div>
                <a
                  href={ytUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    background: "#FF000022",
                    color: "#FF4444",
                    border: "1px solid #FF444444",
                    borderRadius: 7,
                    padding: "4px 10px",
                    fontSize: 11,
                    fontWeight: 700,
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Play size={10} /> Vidéo
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Suivi({ sessions, onAddSession }) {
  const [form, setForm] = useState({ programme: "Prise de Masse", duree: "", exercices: "", date: new Date().toISOString().slice(0, 10), note: "" });

  const handleSave = () => {
    if (!form.duree) return;
    onAddSession({ ...form, exercices: form.exercices || "0" });
    setForm({ ...form, duree: "", exercices: "", note: "" });
  };

  return (
    <div>
      <div style={{
        borderRadius: 22, marginBottom: 20, padding: "22px 24px",
        background: "linear-gradient(135deg, #1a1200 0%, #0e0c00 50%, #0A0A0A 100%)",
        border: `1px solid ${C.gold}40`,
        boxShadow: `0 10px 40px rgba(0,0,0,0.65), 0 2px 0 ${C.gold}22 inset`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}15 0%, transparent 70%)`, pointerEvents: "none" }} />
        <p style={{ ...styles.pageTitle, marginBottom: 4, fontSize: 24 }}>Suivi des séances</p>
        <p style={{ ...styles.pageSubtitle, marginBottom: 0, fontSize: 12 }}>Enregistre tes entraînements</p>
      </div>

      <div style={styles.card}>
        <div style={{ ...styles.cardTitle, display: "flex", alignItems: "center", gap: 6 }}><Plus size={13} color={C.gold} /> Nouvelle séance</div>

        <label style={styles.label}>Programme</label>
        <select style={styles.select} value={form.programme} onChange={(e) => setForm({ ...form, programme: e.target.value })}>
          {PROGRAMMES.map((p) => <option key={p.id}>{p.nom}</option>)}
        </select>

        <div style={styles.grid2}>
          <div>
            <label style={styles.label}>Date</label>
            <input style={styles.input} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div>
            <label style={styles.label}>Durée (min)</label>
            <input style={styles.input} type="number" placeholder="60" value={form.duree} onChange={(e) => setForm({ ...form, duree: e.target.value })} />
          </div>
        </div>

        <label style={styles.label}>Nombre d'exercices</label>
        <input style={styles.input} type="number" placeholder="8" value={form.exercices} onChange={(e) => setForm({ ...form, exercices: e.target.value })} />

        <label style={styles.label}>Note / Ressenti</label>
        <textarea style={{ ...styles.textarea, marginBottom: 16 }} rows={2} placeholder="Super séance aujourd'hui..." value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />

        <button style={styles.goldBtn} onClick={handleSave}>Enregistrer la séance</button>
      </div>

      <div style={styles.card}>
        <div style={{ ...styles.cardTitle, display: "flex", alignItems: "center", gap: 6 }}><BarChart2 size={13} color={C.gold} /> Historique</div>
        {sessions.length === 0 ? (
          <p style={{ color: C.muted, fontSize: 13 }}>Aucune séance enregistrée. Commence dès maintenant !</p>
        ) : (
          sessions.slice().reverse().map((s, i) => (
            <div key={i} style={{ ...styles.exerciseRow, borderBottom: i < sessions.length - 1 ? `1px solid ${C.border}` : "none", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <span style={{ fontWeight: 700 }}>{s.programme}</span>
                <span style={styles.badge()}>{s.duree} min</span>
              </div>
              <div style={{ fontSize: 12, color: C.muted }}>{s.date} · {s.exercices} exercices</div>
              {s.note && <div style={{ fontSize: 13, color: C.text, fontStyle: "italic" }}>"{s.note}"</div>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Nutrition({ journal, setJournal }) {
  const [search, setSearch] = useState("");
  const [qty, setQty] = useState(1);

  const filtered = ALIMENTS.filter((a) => a.nom.toLowerCase().includes(search.toLowerCase()));
  const total = { kcal: 0, prot: 0, gluc: 0, lip: 0 };
  journal.forEach((j) => { total.kcal += j.kcal * j.qty; total.prot += j.prot * j.qty; total.gluc += j.gluc * j.qty; total.lip += j.lip * j.qty; });

  const addAliment = (a) => {
    setJournal([...journal, { ...a, qty: Number(qty) || 1 }]);
    setSearch("");
    setQty(1);
  };

  const remove = (i) => setJournal(journal.filter((_, idx) => idx !== i));

  return (
    <div>
      <div style={{
        borderRadius: 22, marginBottom: 20, padding: "22px 24px",
        background: "linear-gradient(135deg, #1a1200 0%, #0e0c00 50%, #0A0A0A 100%)",
        border: `1px solid ${C.gold}40`,
        boxShadow: `0 10px 40px rgba(0,0,0,0.65), 0 2px 0 ${C.gold}22 inset`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}15 0%, transparent 70%)`, pointerEvents: "none" }} />
        <p style={{ ...styles.pageTitle, marginBottom: 4, fontSize: 24 }}>Nutrition</p>
        <p style={{ ...styles.pageSubtitle, marginBottom: 0, fontSize: 12 }}>Suis tes macros et calories du jour</p>
      </div>

      <div style={styles.grid3}>
        {[
          { label: "Calories", val: Math.round(total.kcal), unit: "kcal", max: 2500 },
          { label: "Protéines", val: Math.round(total.prot), unit: "g", max: 180 },
          { label: "Glucides", val: Math.round(total.gluc), unit: "g", max: 250 },
        ].map((s, i) => (
          <div key={i} style={styles.statCard}>
            <div style={styles.statValue}>{s.val}</div>
            <div style={styles.statLabel}>{s.label}</div>
            <ProgressBar pct={Math.min((s.val / s.max) * 100, 100)} />
          </div>
        ))}
      </div>

      <div style={{ ...styles.card, marginTop: 20 }}>
        <div style={{ ...styles.cardTitle, display: "flex", alignItems: "center", gap: 6 }}><Search size={13} color={C.gold} /> Ajouter un aliment</div>
        <div style={styles.grid2}>
          <div>
            <label style={styles.label}>Rechercher</label>
            <input style={styles.input} placeholder="ex: poulet, riz..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Quantité (portions)</label>
            <input style={styles.input} type="number" min="0.5" step="0.5" value={qty} onChange={(e) => setQty(e.target.value)} />
          </div>
        </div>
        {search && (
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
            {filtered.map((a, i) => (
              <div
                key={i}
                onClick={() => addAliment(a)}
                style={{ padding: "12px 16px", cursor: "pointer", borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span style={{ fontSize: 14 }}>{a.nom}</span>
                <span style={{ fontSize: 12, color: C.gold }}>{a.kcal} kcal · {a.prot}g prot</span>
              </div>
            ))}
            {filtered.length === 0 && <div style={{ padding: 16, color: C.muted, fontSize: 13 }}>Aucun résultat</div>}
          </div>
        )}
      </div>

      <div style={styles.card}>
        <div style={{ ...styles.cardTitle, display: "flex", alignItems: "center", gap: 6 }}><LayoutList size={13} color={C.gold} /> Journal du jour</div>
        {journal.length === 0 ? (
          <p style={{ color: C.muted, fontSize: 13 }}>Aucun aliment ajouté.</p>
        ) : (
          journal.map((j, i) => (
            <div key={i} style={{ ...styles.exerciseRow, borderBottom: i < journal.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{j.nom}</div>
                <div style={{ fontSize: 12, color: C.muted }}>x{j.qty} · {Math.round(j.kcal * j.qty)} kcal</div>
              </div>
              <button onClick={() => remove(i)} style={{ background: "none", border: "none", color: C.danger, cursor: "pointer", display: "flex", alignItems: "center" }}><Trash2 size={15} /></button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function CoachIA() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Bonjour ! Je suis ton coach IA personnalisé 🏆\n\nDis-moi ton objectif, ton niveau, et tes disponibilités et je vais créer un programme sur mesure pour toi !" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `Tu es un coach fitness professionnel francophone expert et motivant. Tu crées des programmes d'entraînement sur mesure, tu donnes des conseils nutrition adaptés, et tu motives tes clients. 
Quand on te demande un programme, structure-le clairement avec :
- Les jours d'entraînement
- Les exercices avec séries/répétitions  
- Les conseils nutrition de base
- Un message de motivation
Reste concis, pratique et toujours positif. Utilise des emojis avec modération.`,
          messages: [...history, { role: "user", content: userMsg }],
        }),
      });
      const data = await response.json();
      const reply = data.content?.map((c) => c.text).join("") || "Désolé, une erreur s'est produite.";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Erreur de connexion. Vérifie ta connexion internet." }]);
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{
        borderRadius: 22, marginBottom: 20, padding: "22px 24px",
        background: "linear-gradient(135deg, #1a1200 0%, #0e0c00 50%, #0A0A0A 100%)",
        border: `1px solid ${C.gold}40`,
        boxShadow: `0 10px 40px rgba(0,0,0,0.65), 0 2px 0 ${C.gold}22 inset`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}15 0%, transparent 70%)`, pointerEvents: "none" }} />
        <p style={{ ...styles.pageTitle, marginBottom: 4, fontSize: 24 }}>Coach IA</p>
        <p style={{ ...styles.pageSubtitle, marginBottom: 0, fontSize: 12 }}>Programme sur mesure par intelligence artificielle</p>
      </div>

      <div style={{ ...styles.card, padding: 0, overflow: "hidden" }}>
        <div style={{ background: `linear-gradient(135deg, ${C.surface}, ${C.card})`, padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Bot size={18} color="#000" /></div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Coach Elite IA</div>
            <div style={{ fontSize: 11, color: C.success }}>● En ligne</div>
          </div>
        </div>

        <div style={{ padding: 20, minHeight: 320, display: "flex", flexDirection: "column", gap: 12, maxHeight: 400, overflowY: "auto" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={styles.chatBubble(m.role === "user")}>{m.text}</div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex" }}>
              <div style={{ ...styles.chatBubble(false), color: C.muted }}>Coach en train d'écrire...</div>
            </div>
          )}
        </div>

        <div style={{ padding: 16, borderTop: `1px solid ${C.border}`, display: "flex", gap: 10 }}>
          <textarea
            style={{ ...styles.textarea, flex: 1, marginBottom: 0 }}
            rows={2}
            placeholder="Ex: J'ai 3 jours pour m'entraîner, objectif prise de masse, débutant..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            style={{ ...styles.goldBtn, width: "auto", padding: "0 20px", opacity: loading ? 0.5 : 1 }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      <div style={{ ...styles.card, marginTop: 20 }}>
        <div style={{ ...styles.cardTitle, display: "flex", alignItems: "center", gap: 6 }}><Zap size={13} color={C.gold} /> Questions suggérées</div>
        {[
          "Crée-moi un programme 3 jours/semaine pour prise de masse",
          "Quel est le meilleur plan nutrition pour sécher ?",
          "Programme débutant pour perdre 5 kg en 2 mois",
          "Comment bien récupérer après une séance intense ?",
        ].map((q, i) => (
          <button
            key={i}
            onClick={() => { setInput(q); }}
            style={{ ...styles.ghostBtn, display: "block", width: "100%", textAlign: "left", marginBottom: 8, fontSize: 13 }}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Macro Calculator ───────────────────────────────────────────
function MacroCalculateur({ savedResult, onSaveResult }) {
  const [form, setForm] = useState({ age: "", poids: "", taille: "", sexe: "homme", activite: "modere", objectif: "maintien" });
  const [result, setResult] = useState(savedResult || null);

  const niveaux = [
    { val: "sedentaire", label: "Sédentaire (pas de sport)" },
    { val: "leger", label: "Légèrement actif (1-2x/sem)" },
    { val: "modere", label: "Modérément actif (3-4x/sem)" },
    { val: "actif", label: "Très actif (5-6x/sem)" },
    { val: "extreme", label: "Extrêmement actif (2x/jour)" },
  ];
  const objectifs = [
    { val: "seche", label: "Sèche / Perte de poids" },
    { val: "maintien", label: "Maintien" },
    { val: "masse", label: "Prise de masse" },
  ];
  const facteurs = { sedentaire: 1.2, leger: 1.375, modere: 1.55, actif: 1.725, extreme: 1.9 };
  const adjustments = { seche: -0.2, maintien: 0, masse: 0.1 };

  const calculer = () => {
    const { age, poids, taille, sexe, activite, objectif } = form;
    if (!age || !poids || !taille) return;
    const p = parseFloat(poids), t = parseFloat(taille), a = parseFloat(age);
    const bmr = sexe === "homme"
      ? 10 * p + 6.25 * t - 5 * a + 5
      : 10 * p + 6.25 * t - 5 * a - 161;
    const tdee = bmr * facteurs[activite];
    const adj = adjustments[objectif];
    const kcal = Math.round(tdee * (1 + adj));
    const prot = Math.round(p * (objectif === "masse" ? 2.2 : objectif === "seche" ? 2.4 : 1.8));
    const lip = Math.round((kcal * 0.25) / 9);
    const gluc = Math.round((kcal - prot * 4 - lip * 9) / 4);
    setResult({ kcal, prot, gluc, lip, bmr: Math.round(bmr), tdee: Math.round(tdee) });
    onSaveResult?.({ kcal, prot, gluc, lip, bmr: Math.round(bmr), tdee: Math.round(tdee) });
  };

  const MacroBar = ({ label, val, unit, color, max }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 13, color }}>{val}{unit}</span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: C.border }}>
        <div style={{ height: "100%", width: `${Math.min((val / max) * 100, 100)}%`, background: color, borderRadius: 4, transition: "width 0.6s ease" }} />
      </div>
    </div>
  );

  return (
    <div>
      <div style={{
        borderRadius: 22, marginBottom: 20, padding: "22px 24px",
        background: "linear-gradient(135deg, #1a1200 0%, #0e0c00 50%, #0A0A0A 100%)",
        border: `1px solid ${C.gold}40`,
        boxShadow: `0 10px 40px rgba(0,0,0,0.65), 0 2px 0 ${C.gold}22 inset`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}15 0%, transparent 70%)`, pointerEvents: "none" }} />
        <p style={{ ...styles.pageTitle, marginBottom: 4, fontSize: 24 }}>Calculateur de Macros</p>
        <p style={{ ...styles.pageSubtitle, marginBottom: 0, fontSize: 12 }}>Calcule tes besoins caloriques précis</p>
      </div>

      <div style={styles.card}>
        <div style={{ ...styles.cardTitle, display: "flex", alignItems: "center", gap: 6 }}><BarChart2 size={13} color={C.gold} /> Tes informations</div>

        <div style={styles.grid2}>
          <div>
            <label style={styles.label}>Sexe</label>
            <select style={styles.select} value={form.sexe} onChange={e => setForm({ ...form, sexe: e.target.value })}>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>Âge (ans)</label>
            <input style={styles.input} type="number" placeholder="25" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
          </div>
          <div>
            <label style={styles.label}>Poids (kg)</label>
            <input style={styles.input} type="number" placeholder="75" value={form.poids} onChange={e => setForm({ ...form, poids: e.target.value })} />
          </div>
          <div>
            <label style={styles.label}>Taille (cm)</label>
            <input style={styles.input} type="number" placeholder="175" value={form.taille} onChange={e => setForm({ ...form, taille: e.target.value })} />
          </div>
        </div>

        <label style={styles.label}>Niveau d'activité</label>
        <select style={styles.select} value={form.activite} onChange={e => setForm({ ...form, activite: e.target.value })}>
          {niveaux.map(n => <option key={n.val} value={n.val}>{n.label}</option>)}
        </select>

        <label style={styles.label}>Objectif</label>
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {objectifs.map(o => (
            <button key={o.val} onClick={() => setForm({ ...form, objectif: o.val })}
              style={{ ...styles.ghostBtn, flex: 1, background: form.objectif === o.val ? C.gold + "22" : "transparent", color: form.objectif === o.val ? C.gold : C.muted, borderColor: form.objectif === o.val ? C.gold : C.border, fontSize: 12 }}>
              {o.label}
            </button>
          ))}
        </div>

        <button style={styles.goldBtn} onClick={calculer}>Calculer mes macros</button>
      </div>

      {result && (
        <div style={styles.card}>
          <div style={{ ...styles.cardTitle, display: "flex", alignItems: "center", gap: 6 }}><Target size={13} color={C.gold} /> Tes résultats personnalisés</div>

          <div style={styles.grid3}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{result.bmr}</div>
              <div style={styles.statLabel}>Métabolisme base</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{result.tdee}</div>
              <div style={styles.statLabel}>Dépense totale</div>
            </div>
            <div style={{ ...styles.statCard, border: `1px solid ${C.gold}` }}>
              <div style={styles.statValue}>{result.kcal}</div>
              <div style={styles.statLabel}>Objectif kcal/jour</div>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <MacroBar label="Protéines" val={result.prot} unit="g" color="#4A9EFF" max={300} />
            <MacroBar label="Glucides" val={result.gluc} unit="g" color={C.gold} max={500} />
            <MacroBar label="Lipides" val={result.lip} unit="g" color={C.success} max={150} />
          </div>

          <div style={{ background: C.surface, borderRadius: 10, padding: 14, marginTop: 8, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.8, display: "flex", gap: 8 }}>
              <Flame size={13} color={C.gold} style={{ flexShrink: 0, marginTop: 2 }} />
              <span><strong style={{ color: C.text }}>Répartition calorique :</strong><br />
              Protéines : {result.prot * 4} kcal · Glucides : {result.gluc * 4} kcal · Lipides : {result.lip * 9} kcal</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Substitution Dictionary ────────────────────────────────────
const SUBSTITUTIONS = [
  {
    exercice: "Leg press",
    lieu: "Salle",
    raison: "Machine prise",
    substituts: [
      { nom: "Squat barre", note: "Même groupe musculaire, charge libre" },
      { nom: "Goblet squat haltère", note: "Plus facile techniquement" },
      { nom: "Fentes bulgares", note: "Unilatéral, intensité élevée" },
    ],
  },
  {
    exercice: "Tirage vertical (lat machine)",
    lieu: "Salle",
    raison: "Machine prise",
    substituts: [
      { nom: "Tractions", note: "Même mouvement au poids du corps" },
      { nom: "Rowing barre", note: "Dos complet, bonne alternative" },
      { nom: "Rowing haltère unilatéral", note: "Isolation du grand dorsal" },
    ],
  },
  {
    exercice: "Pec deck / Butterfly",
    lieu: "Salle",
    raison: "Machine prise",
    substituts: [
      { nom: "Écarté haltères couché", note: "Même amplitude de mouvement" },
      { nom: "Câble croisé", note: "Si disponible, tension constante" },
      { nom: "Pompes larges", note: "Alternative poids du corps" },
    ],
  },
  {
    exercice: "Leg curl couché",
    lieu: "Salle",
    raison: "Machine prise",
    substituts: [
      { nom: "Romanian deadlift haltères", note: "Ischios en excentrique" },
      { nom: "Good morning barre", note: "Travail ischios / lombaires" },
      { nom: "Nordic curl au sol", note: "Très intense, poids du corps" },
    ],
  },
  {
    exercice: "Leg extension",
    lieu: "Salle",
    raison: "Machine prise",
    substituts: [
      { nom: "Squat sumo haltères", note: "Quadriceps en priorité" },
      { nom: "Wall sit (chaise murale)", note: "Isométrique quadriceps" },
      { nom: "Fentes avant lentes", note: "Quadriceps + équilibre" },
    ],
  },
  {
    exercice: "Adducteurs machine",
    lieu: "Salle",
    raison: "Machine prise",
    substituts: [
      { nom: "Squat sumo large", note: "Adducteurs sollicités" },
      { nom: "Fentes latérales", note: "Étirement et renfo adducteurs" },
      { nom: "Hip thrust pied en dehors", note: "Cible l'intérieur cuisse" },
    ],
  },
  {
    exercice: "Squat hack machine",
    lieu: "Salle",
    raison: "Machine prise",
    substituts: [
      { nom: "Squat barre avant", note: "Même recrutement quadriceps" },
      { nom: "Leg press 45°", note: "Si disponible" },
      { nom: "Squat goblet haltère", note: "Dos droit, genoux en avant" },
    ],
  },
  {
    exercice: "Face pull câble",
    lieu: "Salle",
    raison: "Câble non disponible",
    substituts: [
      { nom: "Rowing élastique", note: "Avec bande de résistance" },
      { nom: "Oiseau haltères penché", note: "Deltoïde postérieur" },
      { nom: "Élévation latérale penché", note: "Rotation externe épaule" },
    ],
  },
  {
    exercice: "Triceps poulie haute",
    lieu: "Salle",
    raison: "Câble / machine prise",
    substituts: [
      { nom: "Extensions triceps barre", note: "Skull crusher, même effet" },
      { nom: "Dips entre deux bancs", note: "Poids du corps efficace" },
      { nom: "Kickback haltère", note: "Isolation triceps bras tendu" },
    ],
  },
  {
    exercice: "Développé militaire",
    lieu: "Salle",
    raison: "Barre / rack pris",
    substituts: [
      { nom: "Développé militaire haltères", note: "Même mouvement, plus libre" },
      { nom: "Arnold press haltères", note: "Épaules complètes" },
      { nom: "Pompes pike", note: "Version poids du corps" },
    ],
  },
  // Maison
  {
    exercice: "Pompes classiques",
    lieu: "Maison",
    raison: "Trop facile / Variation",
    substituts: [
      { nom: "Pompes pieds surélevés", note: "Plus d'intensité haut pectoraux" },
      { nom: "Pompes avec pause", note: "Tempo 3-1-1 pour plus d'intensité" },
      { nom: "Pompes archer", note: "Unilatéral, très difficile" },
    ],
  },
  {
    exercice: "Dips sur chaise",
    lieu: "Maison",
    raison: "Pas de chaise stable",
    substituts: [
      { nom: "Extensions triceps au sol", note: "Skull crusher poids du corps" },
      { nom: "Pompes diamant", note: "Isolation triceps efficace" },
      { nom: "Kickback bouteille d'eau", note: "Charge légère d'appoint" },
    ],
  },
  {
    exercice: "Burpees",
    lieu: "Maison",
    raison: "Trop d'impact / voisins",
    substituts: [
      { nom: "Squat + pompe enchaînés", note: "Même effet sans saut" },
      { nom: "Mountain climbers", note: "Cardio au sol, silencieux" },
      { nom: "Bear crawl", note: "Full body, sans impact" },
    ],
  },
  {
    exercice: "Jumping jacks",
    lieu: "Maison",
    raison: "Trop de bruit",
    substituts: [
      { nom: "Shadow boxing", note: "Cardio sans impact au sol" },
      { nom: "Step touch latéral", note: "Même effet, silencieux" },
      { nom: "Gainage dynamique", note: "Planche avec mouvements bras" },
    ],
  },
];

function Substitutions() {
  const [lieu, setLieu] = useState("Tous");
  const [search, setSearch] = useState("");
  const [ouvert, setOuvert] = useState(null);

  const filtres = SUBSTITUTIONS.filter(s =>
    (lieu === "Tous" || s.lieu === lieu) &&
    s.exercice.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{
        borderRadius: 22, marginBottom: 20, padding: "22px 24px",
        background: "linear-gradient(135deg, #1a1200 0%, #0e0c00 50%, #0A0A0A 100%)",
        border: `1px solid ${C.gold}40`,
        boxShadow: `0 10px 40px rgba(0,0,0,0.65), 0 2px 0 ${C.gold}22 inset`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}15 0%, transparent 70%)`, pointerEvents: "none" }} />
        <p style={{ ...styles.pageTitle, marginBottom: 4, fontSize: 24 }}>Substitutions</p>
        <p style={{ ...styles.pageSubtitle, marginBottom: 0, fontSize: 12 }}>Machine prise ? Trouve une alternative</p>
      </div>

      {/* Lieu filter */}
      <div style={{ display: "flex", gap: 0, marginBottom: 16, background: C.card, borderRadius: 12, padding: 4, border: `1px solid ${C.border}`, width: "fit-content" }}>
        {["Tous", "Salle", "Maison"].map(l => (
          <button key={l} onClick={() => setLieu(l)} style={{
            padding: "10px 22px", borderRadius: 9, border: "none", cursor: "pointer",
            fontSize: 13, fontWeight: 700, transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: 6,
            background: lieu === l ? (l === "Salle" ? "#4A9EFF" : l === "Maison" ? C.success : C.gold) : "transparent",
            color: lieu === l ? "#000" : C.muted,
          }}>
            {l === "Salle" ? <><Building size={13} /> Salle</> : l === "Maison" ? <><Home size={13} /> Maison</> : <><Zap size={13} /> Tous</>}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        style={{ ...styles.input, marginBottom: 20 }}
        placeholder="🔍 Rechercher un exercice..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>
        <span style={{ color: C.gold, fontWeight: 700 }}>{filtres.length}</span> substitution{filtres.length > 1 ? "s" : ""} disponible{filtres.length > 1 ? "s" : ""}
      </div>

      {filtres.map((s, i) => (
        <div key={i} style={{ ...styles.card, cursor: "pointer", border: ouvert === i ? `1px solid ${C.gold}` : `1px solid ${C.border}` }}
          onClick={() => setOuvert(ouvert === i ? null : i)}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{s.exercice}</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ ...styles.badge(s.lieu === "Salle" ? "#4A9EFF" : C.success), display: "inline-flex", alignItems: "center", gap: 4 }}>
                  {s.lieu === "Salle" ? <Building size={10} /> : <Home size={10} />} {s.lieu}
                </span>
                <span style={{ ...styles.badge(C.danger), display: "inline-flex", alignItems: "center", gap: 4 }}><Zap size={10} /> {s.raison}</span>
              </div>
            </div>
            <span style={{ color: C.gold, fontSize: 20, fontWeight: 300, transition: "transform 0.2s", display: "block", transform: ouvert === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
          </div>

          {ouvert === i && (
            <div style={{ marginTop: 16 }}>
              <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}44, transparent)`, marginBottom: 16 }} />
              <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}><ChevronRight size={11} color={C.success} /> Alternatives recommandées</div>
              {s.substituts.map((sub, j) => {
                const query = encodeURIComponent(sub.nom + " exercice technique");
                const ytUrl = `https://www.youtube.com/results?search_query=${query}`;
                return (
                  <div key={j} style={{ background: C.surface, borderRadius: 10, padding: "12px 14px", marginBottom: 8, border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.gold, marginBottom: 3 }}>{sub.nom}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{sub.note}</div>
                    </div>
                    <a
                      href={ytUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        display: "flex", alignItems: "center", gap: 5,
                        background: "#FF000022", color: "#FF4444",
                        border: "1px solid #FF444444", borderRadius: 7,
                        padding: "4px 10px", fontSize: 11, fontWeight: 700,
                        textDecoration: "none", letterSpacing: "0.04em", whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      <Play size={10} /> Vidéo
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Fitness Images (Unsplash) ──────────────────────────────────
const IMGS = {
  login:    "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1200",
  hero:     "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1200",
  squat:    "https://images.pexels.com/photos/949128/pexels-photo-949128.jpeg?auto=compress&cs=tinysrgb&w=800",
  nutrition:"https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=800",
  running:  "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800",
  weights:  "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=800",
  stretch:  "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800",
  coach:    "https://images.pexels.com/photos/4162579/pexels-photo-4162579.jpeg?auto=compress&cs=tinysrgb&w=800",
};
function useUserData(userId) {
  const key = `elitefit:${userId}`;

  const load = async () => {
    try {
      const r = await window.storage.get(key);
      return r ? JSON.parse(r.value) : { sessions: [], nutrition: [], macroResult: null, programmeActif: null };
    } catch { return { sessions: [], nutrition: [], macroResult: null, programmeActif: null }; }
  };

  const save = async (data) => {
    try { await window.storage.set(key, JSON.stringify(data)); } catch {}
  };

  return { load, save };
}

// ── Login Screen ───────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState("login"); // login | register
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    ...styles.input,
    marginBottom: 14,
    fontSize: 15,
    padding: "14px 18px",
  };

  const handleEmailAuth = async () => {
    setError("");
    if (!form.email || !form.password) { setError("Remplis tous les champs."); return; }
    if (mode === "register" && !form.name) { setError("Entre ton prénom."); return; }
    setLoading(true);

    const usersKey = "elitefit:users";
    let users = {};
    try {
      const r = await window.storage.get(usersKey);
      if (r) users = JSON.parse(r.value);
    } catch {}

    if (mode === "register") {
      if (users[form.email]) { setError("Cet email est déjà utilisé."); setLoading(false); return; }
      const userId = "user_" + Date.now();
      users[form.email] = { userId, name: form.name, password: form.password };
      await window.storage.set(usersKey, JSON.stringify(users));
      onLogin({ userId, name: form.name, email: form.email });
    } else {
      const u = users[form.email];
      if (!u || u.password !== form.password) { setError("Email ou mot de passe incorrect."); setLoading(false); return; }
      onLogin({ userId: u.userId, name: u.name, email: form.email });
    }
    setLoading(false);
  };

  const handleGoogle = () => {
    // Simulated Google login — generates a consistent userId from the email
    const mockEmail = "google_user@gmail.com";
    const mockName = "Utilisateur Google";
    const userId = "google_" + btoa(mockEmail).slice(0, 12);
    onLogin({ userId, name: mockName, email: mockEmail, provider: "google" });
  };

  const handleApple = () => {
    const mockEmail = "apple_user@icloud.com";
    const mockName = "Utilisateur Apple";
    const userId = "apple_" + btoa(mockEmail).slice(0, 12);
    onLogin({ userId, name: mockName, email: mockEmail, provider: "apple" });
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, background: "radial-gradient(ellipse at 20% 0%, #1a1200 0%, #0A0A0A 55%, #050505 100%)" }}>
      {/* Ambient gold orbs */}
      <div style={{ position: "fixed", top: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}12 0%, transparent 65%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}0A 0%, transparent 65%)`, pointerEvents: "none", zIndex: 0 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 42, fontWeight: 700, color: C.gold, fontFamily: "'Playfair Display', serif", letterSpacing: "0.08em", textShadow: `0 2px 24px ${C.gold}66` }}>⚡ EliteFit</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 8, letterSpacing: "0.14em", textTransform: "uppercase" }}>Ton coach fitness premium</div>
        </div>

        <div style={{ width: "100%", background: "linear-gradient(145deg, #1c1c1c 0%, #131313 100%)", border: `1px solid ${C.gold}35`, borderRadius: 22, padding: 28, boxShadow: `0 16px 56px rgba(0,0,0,0.75), 0 2px 0 ${C.gold}20 inset`, position: "relative", zIndex: 2 }}>
          {/* Tabs */}
          <div style={{ display: "flex", background: C.surface, borderRadius: 12, padding: 4, marginBottom: 24, border: `1px solid ${C.border}` }}>
            {["login", "register"].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); }}
                style={{ flex: 1, padding: "10px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700,
                  background: mode === m ? C.gold : "transparent", color: mode === m ? "#000" : C.muted, transition: "all 0.2s" }}>
                {m === "login" ? "Connexion" : "Inscription"}
              </button>
            ))}
          </div>

          {mode === "register" && (
            <div>
              <label style={styles.label}>Prénom</label>
              <input style={inputStyle} placeholder="Ex: Yannis" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
          )}

          <label style={styles.label}>Email</label>
          <input style={inputStyle} type="email" placeholder="ton@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />

          <label style={styles.label}>Mot de passe</label>
          <input style={{ ...inputStyle, marginBottom: 6 }} type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={e => e.key === "Enter" && handleEmailAuth()} />

          {error && <div style={{ fontSize: 12, color: C.danger, marginBottom: 14, padding: "8px 12px", background: C.danger + "15", borderRadius: 8 }}>{error}</div>}

          <button onClick={handleEmailAuth} disabled={loading}
            style={{ ...styles.goldBtn, marginBottom: 16, opacity: loading ? 0.6 : 1, fontSize: 15, padding: "14px" }}>
            {loading ? "Chargement..." : mode === "login" ? "Se connecter" : "Créer mon compte"}
          </button>
        </div>

        <div style={{ fontSize: 11, color: "#666", marginTop: 20, textAlign: "center", letterSpacing: "0.04em" }}>
          ELITEFIT © 2026 · POWERED BY AI
        </div>
      </div>
    </div>
  );
}

// ── Recettes Data ──────────────────────────────────────────────
const RECETTES = [
  // ── MASSE ──
  {
    id: 1, nom: "Omelette protéinée au fromage", objectif: ["masse"], moment: "matin",
    temps: 10, kcal: 480, prot: 38, gluc: 8, lip: 32, difficulte: "Facile",
    color1: "#2D1B00", color2: "#8B4513", emoji: "🍳",
    ingredients: ["4 œufs", "80g fromage râpé", "100g blanc de poulet cuit émietté", "1 c.à.s huile d'olive", "Sel, poivre, herbes"],
    etapes: ["Battre les œufs avec sel et poivre.", "Faire chauffer l'huile dans une poêle.", "Verser les œufs, ajouter poulet + fromage à mi-cuisson.", "Plier et servir."],
  },
  {
    id: 2, nom: "Porridge avoine banane miel", objectif: ["masse"], moment: "matin",
    temps: 8, kcal: 520, prot: 18, gluc: 82, lip: 10, difficulte: "Facile",
    color1: "#1A0D00", color2: "#C8860A", emoji: "🥣",
    ingredients: ["100g flocons d'avoine", "300ml lait entier", "1 banane", "1 c.à.s miel", "30g beurre de cacahuète"],
    etapes: ["Faire chauffer le lait avec les flocons 5 min en remuant.", "Ajouter le miel et le beurre de cacahuète.", "Servir avec la banane en rondelles."],
  },
  {
    id: 3, nom: "Riz poulet légumes prise de masse", objectif: ["masse"], moment: "midi",
    temps: 20, kcal: 680, prot: 52, gluc: 74, lip: 14, difficulte: "Facile",
    color1: "#001A0D", color2: "#2E8B57", emoji: "🍚",
    ingredients: ["200g blanc de poulet", "150g riz blanc cuit", "100g brocoli", "1 c.à.s huile d'olive", "Sauce soja, ail, gingembre"],
    etapes: ["Cuire le riz. Faire revenir le poulet en dés 8 min.", "Ajouter le brocoli, cuire 5 min.", "Assaisonner avec sauce soja, ail et gingembre.", "Servir sur le riz."],
  },
  {
    id: 4, nom: "Pâtes thon avocat", objectif: ["masse"], moment: "midi",
    temps: 15, kcal: 720, prot: 44, gluc: 78, lip: 24, difficulte: "Facile",
    color1: "#1A0A00", color2: "#D46A00", emoji: "🍝",
    ingredients: ["180g pâtes", "1 boîte thon naturel (150g)", "1/2 avocat", "Jus de citron", "Huile d'olive, sel, poivre"],
    etapes: ["Cuire les pâtes al dente.", "Écraser l'avocat avec le citron.", "Mélanger pâtes, thon, avocat.", "Arroser d'huile d'olive."],
  },
  {
    id: 5, nom: "Saumon patate douce épinards", objectif: ["masse"], moment: "soir",
    temps: 25, kcal: 610, prot: 46, gluc: 42, lip: 26, difficulte: "Moyen",
    color1: "#00101A", color2: "#1E6B8A", emoji: "🐟",
    ingredients: ["200g saumon", "200g patate douce", "100g épinards frais", "1 c.à.s huile d'olive", "Citron, ail, thym"],
    etapes: ["Cuire la patate douce 20 min à la vapeur.", "Faire revenir le saumon 4 min chaque côté.", "Faire sauter les épinards 2 min.", "Dresser et arroser de citron."],
  },
  {
    id: 6, nom: "Burger maison bœuf haricots", objectif: ["masse"], moment: "soir",
    temps: 20, kcal: 780, prot: 58, gluc: 64, lip: 28, difficulte: "Moyen",
    color1: "#1A0500", color2: "#C0392B", emoji: "🍔",
    ingredients: ["200g steak haché 5%", "1 pain burger complet", "80g haricots verts", "Fromage, salade, tomate", "Moutarde, oignon"],
    etapes: ["Cuire le steak haché 3 min chaque côté.", "Griller le pain. Cuire les haricots 5 min.", "Assembler le burger avec tous les ingrédients."],
  },
  {
    id: 7, nom: "Shake protéiné avoine cacahuète", objectif: ["masse"], moment: "collation",
    temps: 5, kcal: 420, prot: 30, gluc: 44, lip: 12, difficulte: "Facile",
    color1: "#0D1A00", color2: "#5D8A1E", emoji: "🥤",
    ingredients: ["30g protéine whey vanille", "50g flocons d'avoine", "1 c.à.s beurre de cacahuète", "250ml lait", "1 banane"],
    etapes: ["Mixer tous les ingrédients ensemble.", "Servir immédiatement après l'entraînement."],
  },

  // ── SÈCHE ──
  {
    id: 8, nom: "Œufs brouillés légumes verts", objectif: ["seche"], moment: "matin",
    temps: 10, kcal: 280, prot: 24, gluc: 8, lip: 16, difficulte: "Facile",
    color1: "#1A1500", color2: "#B8860B", emoji: "🥚",
    ingredients: ["3 œufs entiers", "100g courgette", "50g épinards", "1 c.à.c huile d'olive", "Sel, poivre, curcuma"],
    etapes: ["Faire revenir les légumes coupés 3 min.", "Ajouter les œufs battus.", "Remuer doucement jusqu'à cuisson.", "Assaisonner et servir."],
  },
  {
    id: 9, nom: "Fromage blanc fruits rouges graines", objectif: ["seche"], moment: "matin",
    temps: 5, kcal: 240, prot: 20, gluc: 22, lip: 7, difficulte: "Facile",
    color1: "#1A0010", color2: "#C0144A", emoji: "🍓",
    ingredients: ["200g fromage blanc 0%", "100g fruits rouges", "1 c.à.s graines de chia", "1 c.à.c miel", "Cannelle"],
    etapes: ["Verser le fromage blanc dans un bol.", "Ajouter les fruits rouges et les graines.", "Arroser de miel, saupoudrer de cannelle."],
  },
  {
    id: 10, nom: "Salade de poulet avocat quinoa", objectif: ["seche"], moment: "midi",
    temps: 15, kcal: 420, prot: 38, gluc: 28, lip: 18, difficulte: "Facile",
    color1: "#001A08", color2: "#27AE60", emoji: "🥗",
    ingredients: ["180g blanc de poulet grillé", "80g quinoa cuit", "1/2 avocat", "Salade mélangée", "Vinaigrette citron-huile d'olive"],
    etapes: ["Griller le poulet 8 min.", "Cuire le quinoa 12 min.", "Mélanger salade, quinoa, poulet en dés.", "Ajouter l'avocat et la vinaigrette."],
  },
  {
    id: 11, nom: "Soupe de légumes protéinée", objectif: ["seche"], moment: "midi",
    temps: 20, kcal: 320, prot: 28, gluc: 30, lip: 8, difficulte: "Facile",
    color1: "#1A0800", color2: "#E67E22", emoji: "🍲",
    ingredients: ["150g blanc de poulet", "Carottes, courgette, poireaux", "1 bouillon cube", "Épices (curry, cumin)", "Persil frais"],
    etapes: ["Faire bouillir 500ml d'eau avec le bouillon.", "Ajouter les légumes coupés, cuire 15 min.", "Ajouter le poulet émietté.", "Assaisonner et servir chaud."],
  },
  {
    id: 12, nom: "Filet de cabillaud vapeur légumes", objectif: ["seche"], moment: "soir",
    temps: 20, kcal: 310, prot: 42, gluc: 18, lip: 7, difficulte: "Facile",
    color1: "#001018", color2: "#2980B9", emoji: "🐠",
    ingredients: ["200g cabillaud", "150g haricots verts", "100g carottes", "Citron, ail, persil", "1 c.à.c huile d'olive"],
    etapes: ["Cuire le cabillaud à la vapeur 12 min.", "Cuire les légumes 8 min à la vapeur.", "Assaisonner le poisson avec citron et ail.", "Servir avec les légumes et un filet d'huile."],
  },
  {
    id: 13, nom: "Bowl dinde patate douce", objectif: ["seche"], moment: "soir",
    temps: 25, kcal: 380, prot: 40, gluc: 32, lip: 9, difficulte: "Moyen",
    color1: "#0D1A0A", color2: "#8BC34A", emoji: "🥙",
    ingredients: ["180g escalope de dinde", "150g patate douce", "Brocoli, épinards", "Sauce yaourt-citron", "Épices (paprika, cumin)"],
    etapes: ["Rôtir la patate douce 20 min au four.", "Poêler la dinde 6 min.", "Cuire brocoli à la vapeur.", "Assembler le bowl, napper de sauce."],
  },
  {
    id: 14, nom: "Smoothie protéiné perte de poids", objectif: ["seche"], moment: "collation",
    temps: 5, kcal: 220, prot: 24, gluc: 20, lip: 4, difficulte: "Facile",
    color1: "#1A0015", color2: "#9B59B6", emoji: "🍹",
    ingredients: ["25g protéine whey", "200ml lait d'amande", "100g fruits rouges surgelés", "1/2 banane", "Glaçons"],
    etapes: ["Mixer tous les ingrédients 30 secondes.", "Servir immédiatement."],
  },

  // ── MIXTE / MAINTIEN ──
  {
    id: 15, nom: "Toast avocat œuf poché", objectif: ["masse", "seche", "maintien"], moment: "matin",
    temps: 12, kcal: 360, prot: 20, gluc: 30, lip: 18, difficulte: "Moyen",
    color1: "#0A1A00", color2: "#4CAF50", emoji: "🥑",
    ingredients: ["2 tranches pain complet", "1/2 avocat", "2 œufs", "Vinaigre blanc", "Sel, poivre, graines de sésame"],
    etapes: ["Toaster le pain. Écraser l'avocat.", "Porter l'eau à frémissement avec le vinaigre.", "Pocher les œufs 3 min.", "Tartiner l'avocat, poser les œufs."],
  },
  {
    id: 16, nom: "Wok de légumes tofu sésame", objectif: ["seche", "maintien"], moment: "soir",
    temps: 15, kcal: 340, prot: 22, gluc: 28, lip: 14, difficulte: "Moyen",
    color1: "#1A0A0A", color2: "#E74C3C", emoji: "🥡",
    ingredients: ["150g tofu ferme", "Poivrons, brocoli, carottes", "Sauce soja, gingembre, ail", "1 c.à.s huile sésame", "Graines de sésame"],
    etapes: ["Couper le tofu en dés, faire dorer 5 min.", "Faire sauter les légumes 5 min.", "Ajouter sauce soja, ail, gingembre.", "Servir avec les graines de sésame."],
  },
];

// Daily meal plans per objectif
const PLANS_JOURNALIERS = {
  masse: {
    matin:    [1, 2],
    midi:     [3, 4],
    soir:     [5, 6],
    collation:[7],
  },
  seche: {
    matin:    [8, 9],
    midi:     [10, 11],
    soir:     [12, 13],
    collation:[14],
  },
  maintien: {
    matin:    [15, 1],
    midi:     [10, 3],
    soir:     [16, 5],
    collation:[7],
  },
};

function RecetteCard({ recette, expanded, onToggle }) {
  const momentColor = { matin: "#E8A04A", midi: C.gold, soir: "#4A9EFF", collation: C.success };
  const momentLabel = { matin: "Matin", midi: "Midi", soir: "Soir", collation: "Collation" };

  return (
    <div onClick={onToggle} style={{ ...styles.card, cursor: "pointer", border: expanded ? `1px solid ${C.gold}` : `1px solid ${C.gold}28`, transition: "all 0.2s", padding: 0, overflow: "hidden" }}>

      {/* SVG Illustration */}
      <div style={{ position: "relative", height: 140, overflow: "hidden", background: `linear-gradient(135deg, ${recette.color1} 0%, ${recette.color2} 100%)` }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", fontSize: 56, lineHeight: 1, userSelect: "none" }}>{recette.emoji}</div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)" }} />
        {/* Badges sur l'illustration */}
        <div style={{ position: "absolute", top: 10, left: 12, display: "flex", gap: 6 }}>
          <span style={{ ...styles.badge(momentColor[recette.moment] || C.gold), fontSize: 10, background: "rgba(0,0,0,0.6)" }}>{momentLabel[recette.moment]}</span>
          <span style={{ ...styles.badge(recette.difficulte === "Facile" ? C.success : C.gold), fontSize: 10, background: "rgba(0,0,0,0.6)" }}>{recette.difficulte}</span>
        </div>
        {/* YouTube button */}
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent("recette " + recette.nom)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{ position: "absolute", top: 10, right: 12, display: "flex", alignItems: "center", gap: 5, background: "rgba(255,0,0,0.85)", color: "#fff", borderRadius: 7, padding: "4px 10px", fontSize: 11, fontWeight: 700, textDecoration: "none", letterSpacing: "0.04em" }}
        >
          <Play size={9} /> Recette
        </a>
        {/* Titre sur la photo */}
        <div style={{ position: "absolute", bottom: 10, left: 12, right: 36 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.8)", lineHeight: 1.3 }}>{recette.nom}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={10} /> {recette.temps} min
          </div>
        </div>
        {/* Toggle button */}
        <span style={{ position: "absolute", bottom: 10, right: 12, color: C.gold, fontSize: 20, transform: expanded ? "rotate(45deg)" : "none", transition: "transform 0.2s", lineHeight: 1 }}>+</span>
      </div>

      {/* Macros bar */}
      <div style={{ display: "flex", gap: 0, padding: "10px 14px", borderBottom: expanded ? `1px solid ${C.gold}15` : "none" }}>
        {[
          { label: "Kcal", val: recette.kcal, color: C.gold },
          { label: "Prot", val: `${recette.prot}g`, color: "#4A9EFF" },
          { label: "Gluc", val: `${recette.gluc}g`, color: C.success },
          { label: "Lip", val: `${recette.lip}g`, color: "#E8A04A" },
        ].map((m, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 3 ? `1px solid ${C.gold}15` : "none" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: m.color }}>{m.val}</div>
            <div style={{ fontSize: 9, color: C.muted, letterSpacing: "0.06em" }}>{m.label}</div>
          </div>
        ))}
      </div>

      {expanded && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ ...styles.cardTitle, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <UtensilsCrossed size={11} color={C.gold} /> Ingrédients
          </div>
          {recette.ingredients.map((ing, i) => (
            <div key={i} style={{ fontSize: 13, color: C.muted, padding: "4px 0", display: "flex", gap: 8 }}>
              <span style={{ color: C.gold }}>▸</span>{ing}
            </div>
          ))}

          <div style={{ ...styles.cardTitle, marginTop: 14, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <ChefHat size={11} color={C.gold} /> Préparation
          </div>
          {recette.etapes.map((e, i) => (
            <div key={i} style={{ fontSize: 13, color: C.text, padding: "7px 0", display: "flex", gap: 10, borderBottom: i < recette.etapes.length - 1 ? `1px solid ${C.gold}10` : "none" }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: "#000", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
              {e}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Recettes({ programmeActif }) {
  const [vue, setVue] = useState("jour"); // jour | banque
  const [filtre, setFiltre] = useState("Tous");
  const [moment, setMoment] = useState("Tous");
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");

  const objectifActif = programmeActif?.objectif || "masse";
  const plan = PLANS_JOURNALIERS[objectifActif] || PLANS_JOURNALIERS.masse;

  const momentLabels = ["Tous", "matin", "midi", "soir", "collation"];
  const momentDisplay = { matin: "Matin", midi: "Midi", soir: "Soir", collation: "Collation", Tous: "Tous" };

  const filteredBanque = RECETTES.filter(r => {
    const matchObjectif = filtre === "Tous" || r.objectif.includes(filtre);
    const matchMoment = moment === "Tous" || r.moment === moment;
    const matchSearch = r.nom.toLowerCase().includes(search.toLowerCase());
    return matchObjectif && matchMoment && matchSearch;
  });

  const PlanSection = ({ titre, ids, color }) => {
    const recettes = ids.map(id => RECETTES.find(r => r.id === id)).filter(Boolean);
    return (
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
          {titre}
        </div>
        {recettes.map(r => (
          <RecetteCard key={r.id} recette={r} expanded={expanded === r.id} onToggle={() => setExpanded(expanded === r.id ? null : r.id)} />
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Header banner */}
      <div style={{ borderRadius: 22, marginBottom: 20, padding: "22px 24px", background: "linear-gradient(135deg, #1a1200 0%, #0e0c00 50%, #0A0A0A 100%)", border: `1px solid ${C.gold}40`, boxShadow: `0 10px 40px rgba(0,0,0,0.65), 0 2px 0 ${C.gold}22 inset`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}15 0%, transparent 70%)`, pointerEvents: "none" }} />
        <p style={{ ...styles.pageTitle, marginBottom: 4, fontSize: 24 }}>Recettes</p>
        <p style={{ ...styles.pageSubtitle, marginBottom: 12, fontSize: 12 }}>
          {programmeActif ? `Adaptées à ton programme : ${programmeActif.nom}` : "Sélectionne un programme pour des recettes personnalisées"}
        </p>
        {/* Vue toggle */}
        <div style={{ display: "flex", gap: 0, background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: 3, width: "fit-content", border: `1px solid ${C.gold}25` }}>
          {[{ id: "jour", label: "Plan du jour" }, { id: "banque", label: "Banque de recettes" }].map(v => (
            <button key={v.id} onClick={() => setVue(v.id)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: vue === v.id ? `linear-gradient(135deg, ${C.gold}, ${C.goldLight})` : "transparent", color: vue === v.id ? "#000" : C.muted, transition: "all 0.2s" }}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plan du jour */}
      {vue === "jour" && (
        <div>
          {!programmeActif && (
            <div style={{ ...styles.card, textAlign: "center", color: C.muted, fontSize: 13 }}>
              <ChefHat size={28} color={C.goldDim} style={{ marginBottom: 8 }} />
              <div>Démarre un programme pour voir ton plan repas personnalisé.</div>
            </div>
          )}
          {programmeActif && (
            <>
              <div style={{ ...styles.card, background: "linear-gradient(145deg, #1a1200, #0e0c00)" }}>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>Programme actif</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.gold }}>{programmeActif.nom}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Objectif : <span style={{ color: C.text }}>{objectifActif === "masse" ? "Prise de masse" : objectifActif === "seche" ? "Perte de poids" : "Maintien"}</span></div>
              </div>

              {/* Totaux du jour */}
              <div style={styles.card}>
                <div style={{ ...styles.cardTitle, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}><Flame size={12} color={C.gold} /> Total nutritionnel du jour</div>
                {(() => {
                  const allIds = [...(plan.matin || []), ...(plan.midi || []), ...(plan.soir || []), ...(plan.collation || [])];
                  const total = allIds.reduce((acc, id) => {
                    const r = RECETTES.find(r => r.id === id);
                    if (!r) return acc;
                    return { kcal: acc.kcal + r.kcal, prot: acc.prot + r.prot, gluc: acc.gluc + r.gluc, lip: acc.lip + r.lip };
                  }, { kcal: 0, prot: 0, gluc: 0, lip: 0 });
                  return (
                    <div style={styles.grid3}>
                      {[{ label: "Calories", val: total.kcal, unit: "kcal", color: C.gold }, { label: "Protéines", val: total.prot, unit: "g", color: "#4A9EFF" }, { label: "Glucides", val: total.gluc, unit: "g", color: C.success }].map((s, i) => (
                        <div key={i} style={styles.statCard}>
                          <div style={{ ...styles.statValue, fontSize: 22, color: s.color }}>{s.val}</div>
                          <div style={{ fontSize: 10, color: C.muted }}>{s.unit}</div>
                          <div style={styles.statLabel}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              <PlanSection titre="Petit-déjeuner" ids={plan.matin} color="#E8A04A" />
              <PlanSection titre="Déjeuner" ids={plan.midi} color={C.gold} />
              <PlanSection titre="Dîner" ids={plan.soir} color="#4A9EFF" />
              <PlanSection titre="Collation" ids={plan.collation} color={C.success} />
            </>
          )}
        </div>
      )}

      {/* Banque de recettes */}
      {vue === "banque" && (
        <div>
          {/* Search */}
          <div style={{ position: "relative", marginBottom: 14 }}>
            <Search size={14} color={C.muted} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input style={{ ...styles.input, paddingLeft: 36, marginBottom: 0 }} placeholder="Rechercher une recette..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {/* Filtres objectif */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            {[{ val: "Tous", label: "Tous" }, { val: "masse", label: "Prise de masse" }, { val: "seche", label: "Perte de poids" }, { val: "maintien", label: "Maintien" }].map(f => (
              <button key={f.val} onClick={() => setFiltre(f.val)} style={{ ...styles.ghostBtn, padding: "6px 14px", fontSize: 11, background: filtre === f.val ? `${C.gold}22` : "transparent", color: filtre === f.val ? C.gold : C.muted, borderColor: filtre === f.val ? C.gold : `${C.gold}30` }}>
                {f.label}
              </button>
            ))}
          </div>

          {/* Filtres moment */}
          <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
            {momentLabels.map(m => (
              <button key={m} onClick={() => setMoment(m)} style={{ padding: "5px 12px", borderRadius: 8, border: `1px solid ${moment === m ? C.gold : C.gold + "25"}`, background: moment === m ? `${C.gold}18` : "transparent", color: moment === m ? C.gold : C.muted, cursor: "pointer", fontSize: 11, fontWeight: 600 }}>
                {momentDisplay[m]}
              </button>
            ))}
          </div>

          <div style={{ fontSize: 12, color: C.muted, marginBottom: 14 }}>
            <span style={{ color: C.gold, fontWeight: 700 }}>{filteredBanque.length}</span> recette{filteredBanque.length > 1 ? "s" : ""}
          </div>

          {filteredBanque.map(r => (
            <RecetteCard key={r.id} recette={r} expanded={expanded === r.id} onToggle={() => setExpanded(expanded === r.id ? null : r.id)} />
          ))}

          {filteredBanque.length === 0 && (
            <div style={{ ...styles.card, textAlign: "center", color: C.muted, fontSize: 13 }}>Aucune recette pour ces filtres.</div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Premium Access Code ────────────────────────────────────────
const ABONNEMENT_CODE = "PREMIUM999"; // Seul code qui débloque le Coach IA

function PremiumLock({ onUnlock }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleUnlock = () => {
    if (code.trim().toUpperCase() === ABONNEMENT_CODE) {
      onUnlock(code.trim().toUpperCase());
      setError("");
    } else {
      setError("Code incorrect. Le Coach IA est réservé aux abonnés EliteFit Premium.");
    }
  };

  return (
    <div style={{ ...styles.card, textAlign: "center", padding: 32, background: "linear-gradient(145deg, #1a1200, #0e0c00)" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: `0 8px 24px ${C.gold}44` }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>

      <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "'Playfair Display', serif", color: C.gold, marginBottom: 8 }}>
        Réservé aux abonnés Premium
      </div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 24, lineHeight: 1.6 }}>
        Le Coach IA est exclusivement réservé aux abonnés <span style={{ color: C.gold, fontWeight: 700 }}>EliteFit Premium à 9,99€/mois.</span>
        <br /><br />
        Entre ton code reçu après ton abonnement.
      </div>

      <label style={styles.label}>Ton code abonné</label>
      <input
        style={{ ...styles.input, textAlign: "center", fontSize: 16, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}
        placeholder="TON CODE ICI"
        value={code}
        onChange={e => setCode(e.target.value.toUpperCase())}
        onKeyDown={e => e.key === "Enter" && handleUnlock()}
      />
      {error && <div style={{ fontSize: 12, color: C.danger, marginBottom: 12, padding: "8px 12px", background: C.danger + "15", borderRadius: 8 }}>{error}</div>}

      <button style={styles.goldBtn} onClick={handleUnlock}>Débloquer le Coach IA</button>

      <div style={{ marginTop: 20, fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
        Pas encore abonné ?<br />
        <span style={{ color: C.gold, fontWeight: 700 }}>Abonne-toi à 9,99€/mois</span> pour débloquer<br />
        le Coach IA et toutes les fonctionnalités premium.
      </div>
    </div>
  );
}

// ── App Shell ──────────────────────────────────────────────────
const TABS = [
  { id: "dashboard",      label: "Accueil",        icon: <Home size={15} /> },
  { id: "programmes",     label: "Programmes",     icon: <LayoutList size={15} /> },
  { id: "exercices",      label: "Exercices",      icon: <Dumbbell size={15} /> },
  { id: "suivi",          label: "Suivi",          icon: <BarChart2 size={15} /> },
  { id: "nutrition",      label: "Nutrition",      icon: <UtensilsCrossed size={15} /> },
  { id: "recettes",       label: "Recettes",       icon: <ChefHat size={15} /> },
  { id: "macros",         label: "Macros",         icon: <Calculator size={15} /> },
  { id: "substitutions",  label: "Substitutions",  icon: <RefreshCw size={15} /> },
  { id: "coach",          label: "Coach IA",       icon: <Bot size={15} /> },
];

export default function App() {
  const [user, setUser] = useState(() => {
  const saved = localStorage.getItem("elitefit_user");
  return saved ? JSON.parse(saved) : null;
});  const [tab, setTab] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [nutritionJournal, setNutritionJournal] = useState([]);
  const [macroResult, setMacroResult] = useState(null);
  const [programmeActif, setProgrammeActif] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { load, save } = useUserData(user?.userId || "guest");

  // Load data on login
  useEffect(() => {
    if (!user) return;
    load().then(data => {
      setSessions(data.sessions || []);
      setNutritionJournal(data.nutrition || []);
      setMacroResult(data.macroResult || null);
      setProgrammeActif(data.programmeActif || null);
      setUserProfile(data.userProfile || null);
      setIsPremium(data.isPremium || false);
      setDataLoaded(true);
    });
  }, [user]);

  // Auto-save on every change
  useEffect(() => {
    if (!user || !dataLoaded) return;
    save({ sessions, nutrition: nutritionJournal, macroResult, programmeActif, userProfile, isPremium });
  }, [sessions, nutritionJournal, macroResult, programmeActif, dataLoaded, isPremium]);

  const handleLogin = (u) => {
  setUser(u);
  localStorage.setItem("elitefit_user", JSON.stringify(u));
};  const handleLogout = () => { setUser(null); localStorage.removeItem("elitefit_user"); setDataLoaded(false); setSessions([]); setNutritionJournal([]); setMacroResult(null); setProgrammeActif(null); setUserProfile(null); setIsPremium(false); };
  const handleUnlock = (code) => setIsPremium(true);
  const handleStartSession = (prog) => { setProgrammeActif(prog); setTab("suivi"); };
  const handleAddSession = (s) => setSessions(prev => [...prev, s]);
  const goTo = (id) => { setTab(id); setMenuOpen(false); };
  const currentTab = TABS.find(t => t.id === tab);

  if (!user) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div style={styles.app}>
      {menuOpen && <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99 }} />}

      <header style={styles.header}>
        <div style={styles.logo}>⚡ EliteFit</div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Burger */}
          <div style={{ position: "relative", zIndex: 200 }}>
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: menuOpen ? C.gold + "22" : C.card, border: `1px solid ${menuOpen ? C.gold : C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, color: menuOpen ? C.gold : C.text, fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: menuOpen ? C.gold : C.muted }}>
                {currentTab?.icon} {currentTab?.label}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 18 }}>
                <div style={{ height: 2, borderRadius: 2, background: menuOpen ? C.gold : C.muted, transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
                <div style={{ height: 2, borderRadius: 2, background: menuOpen ? C.gold : C.muted, transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
                <div style={{ height: 2, borderRadius: 2, background: menuOpen ? C.gold : C.muted, transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
              </div>
            </button>

            {menuOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0,
                background: "linear-gradient(145deg, #1e1e1e 0%, #141414 100%)",
                border: `1px solid ${C.gold}35`, borderRadius: 16, padding: 6, minWidth: 210, zIndex: 300,
                boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 2px 0 ${C.gold}18 inset` }}>

                {/* User info */}
                <div style={{ padding: "10px 16px 8px", borderBottom: `1px solid ${C.gold}15`, marginBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#000", flexShrink: 0 }}>
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{user.name}</div>
                      <div style={{ fontSize: 10, color: isPremium ? C.gold : C.muted }}>
                        {isPremium ? "✦ Premium débloqué" : "Compte gratuit"}
                      </div>
                    </div>
                  </div>
                </div>

                {TABS.map((t) => (
                  <button key={t.id} onClick={() => goTo(t.id)}
                    style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "11px 16px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 13, fontWeight: tab === t.id ? 700 : 500, background: tab === t.id ? C.gold + "22" : "transparent", color: tab === t.id ? C.gold : C.text, transition: "all 0.15s", letterSpacing: "0.02em" }}>
                    <span style={{ color: tab === t.id ? C.gold : C.muted }}>{t.icon}</span>
                    {t.label}
                  </button>
                ))}

                {/* Logout */}
                <div style={{ borderTop: `1px solid ${C.gold}15`, marginTop: 4, paddingTop: 4 }}>
                  <button onClick={handleLogout}
                    style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "11px 16px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, background: "transparent", color: C.danger, transition: "all 0.15s" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Se déconnecter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main style={styles.main}>
        {tab === "dashboard" && <Dashboard sessions={sessions} nutrition={nutritionJournal} onNavigate={goTo} programmeActif={programmeActif} />}
        {tab === "programmes" && <Programmes onStartSession={handleStartSession} programmeActif={programmeActif} userProfile={userProfile} onSaveProfile={setUserProfile} isPremium={isPremium} onUnlock={handleUnlock} />}
        {tab === "exercices" && <Exercices />}
        {tab === "suivi" && <Suivi sessions={sessions} onAddSession={handleAddSession} programmeActif={programmeActif} />}
        {tab === "nutrition" && <Nutrition journal={nutritionJournal} setJournal={setNutritionJournal} />}
        {tab === "recettes" && <Recettes programmeActif={programmeActif} />}
        {tab === "macros" && <MacroCalculateur savedResult={macroResult} onSaveResult={setMacroResult} />}
        {tab === "substitutions" && <Substitutions />}
        {tab === "coach" && (isPremium ? <CoachIA /> : <PremiumLock onUnlock={handleUnlock} />)}
      </main>

      <footer style={{ textAlign: "center", padding: "16px", borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.muted, letterSpacing: "0.08em" }}>
        ELITEFIT © 2026 · POWERED BY AI
      </footer>
    </div>
  );
}

