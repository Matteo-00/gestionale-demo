# 🎨 Sistema di Tema Dinamico Custom - Documentazione Completa

## 📋 Indice

1. [Panoramica](#panoramica)
2. [Architettura](#architettura)
3. [Componenti](#componenti)
4. [Utilizzo](#utilizzo)
5. [API Reference](#api-reference)
6. [Personalizzazione Avanzata](#personalizzazione-avanzata)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Panoramica

Il **Sistema di Tema Dinamico Custom** permette di personalizzare completamente l'aspetto del gestionale mantenendo invariati i colori dei componenti operativi (bottoni azione, alert, tabelle).

### ✨ Caratteristiche Principali

- ✅ **Personalizzazione Brand Completa**: Colori, logo, nome progetto
- ✅ **Preview Live**: Visualizzazione in tempo reale delle modifiche
- ✅ **Preset Professionali**: 6 temi predefiniti pronti all'uso
- ✅ **Persistenza Automatica**: Salvataggio su localStorage
- ✅ **Componenti Protetti**: Colori operativi sempre invariati
- ✅ **Dark Mode Ready**: Preparato per tema scuro
- ✅ **Export/Import**: Condivisione configurazioni tema
- ✅ **Performance Ottimizzata**: CSS Variables dinamiche

---

## 🏗️ Architettura

### Schema del Sistema

```
┌─────────────────────────────────────────────────┐
│            SETUP PAGE (setup-new.html)          │
│  ┌───────────────────┐   ┌─────────────────┐   │
│  │  Configuratore    │   │  Live Preview   │   │
│  │  - Nome Progetto  │   │  - Dashboard    │   │
│  │  - Preset Temi    │   │  - Cards        │   │
│  │  - Color Pickers  │   │  - Charts       │   │
│  │  - Logo Upload    │   │  - Tabelle      │   │
│  └───────────────────┘   └─────────────────┘   │
└─────────────────────────────────────────────────┘
                      ↓
            ┌─────────────────────┐
            │  ProjectThemeManager │
            │  (theme-manager-v2.js)│
            └─────────────────────┘
                      ↓
            ┌─────────────────────┐
            │   localStorage       │
            │  "projectTheme"      │
            └─────────────────────┘
                      ↓
            ┌─────────────────────┐
            │  CSS Variables       │
            │  (themes-new.css)    │
            └─────────────────────┘
                      ↓
        ┌───────────────────────────────┐
        │   APPLICAZIONE (index.html)    │
        │   - Tema applicato automatico  │
        │   - Brand personalizzato       │
        └───────────────────────────────┘
```

### Struttura File

```
gestionale-demo/
├── css/
│   ├── themes-new.css          # CSS Variables dinamiche
│   ├── themes.css              # Temi legacy (compatibilità)
│   └── style.css               # Stili applicazione
├── js/
│   ├── theme-manager-v2.js     # Core tema dinamico
│   ├── setup-configurator.js   # Logica pagina setup
│   └── theme-manager.js        # Legacy (compatibilità)
├── setup-new.html              # Pagina configurazione tema
├── welcome.html                # Splash screen routing
├── login.html                  # Login con tema applicato
└── index.html                  # Dashboard principale
```

---

## 🧩 Componenti

### 1. CSS Variables (themes-new.css)

#### Colori FISSI (NON Modificabili)

Questi rimangono **sempre invariati** per garantire UX coerente:

```css
/* Bottoni Azione */
--btn-delete: #ef4444;        /* Rosso elimina */
--btn-save: #10b981;          /* Verde salva */
--btn-cancel: #6b7280;        /* Grigio annulla */
--btn-edit: #3b82f6;          /* Blu modifica */

/* Alert Sistema */
--success: #10b981;           /* Verde successo */
--warning: #f59e0b;           /* Arancione warning */
--danger: #ef4444;            /* Rosso errore */
--info: #3b82f6;              /* Blu informativo */

/* Tabelle */
--table-header-bg: #f9fafb;   /* Background header */
--table-border: #e5e7eb;      /* Bordi tabella */
--table-row-hover: #f9fafb;   /* Hover righe */
```

#### Colori DINAMICI (Modificabili)

Questi vengono sovrascritti dal configuratore:

```css
/* Colori Brand */
--primary: #6366f1;           /* Colore primario brand */
--secondary: #8b5cf6;         /* Colore secondario */
--accent: #f59e0b;            /* Colore accent */

/* Backgrounds */
--bg: #fafafa;                /* Background generale */
--surface: #ffffff;           /* Superfici card */

/* Sidebar & Navbar */
--sidebar-bg: #ffffff;        /* Background sidebar */
--navbar-bg: #ffffff;         /* Background navbar */

/* Charts */
--chart-1: #6366f1;           /* Colori grafici */
--chart-2: #8b5cf6;
--chart-3: #ec4899;
/* ... fino a chart-6 */
```

### 2. ProjectThemeManager (theme-manager-v2.js)

Classe principale che gestisce il tema.

#### Struttura Tema

```javascript
{
  // Meta
  configured: boolean,
  darkMode: boolean,
  createdAt: string,
  lastModified: string,
  
  // Branding
  projectName: string,
  logo: string | null,
  
  // Colori Brand
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
  
  // Backgrounds
  backgroundColor: string,
  surfaceColor: string,
  
  // Navigation
  sidebarColor: string,
  navbarColor: string,
  
  // Charts
  chartColors: string[]
}
```

### 3. Setup Configurator (setup-configurator.js)

Gestisce l'interfaccia di configurazione e la preview live.

#### Funzionalità Principali

- **Live Preview**: Ogni modifica si riflette istantaneamente
- **Preset Themes**: 6 temi professionali predefiniti
- **Color Pickers**: Selettori colore nativi del browser
- **Logo Upload**: Drag & drop o click per caricare
- **Validazione**: Controllo formati e dimensioni file

---

## 💻 Utilizzo

### Setup Iniziale

1. **Prima Configurazione**

All'avvio dell'applicazione, se non configurata, l'utente viene indirizzato a `setup-new.html`:

```
welcome.html → setup-new.html → login.html → index.html
```

2. **Configurazione Tema**

- Inserisci **Nome Progetto**
- Scegli un **Preset Tema** o personalizza i colori
- Carica il **Logo** (opzionale)
- Clicca **"🚀 Avvia Dashboard"**

3. **Applicazione Automatica**

Il tema viene applicato automaticamente a:
- ✅ Pagina login
- ✅ Dashboard principale
- ✅ Tutte le sezioni dell'app

### Modifica Tema Successiva

Per modificare il tema dopo la configurazione iniziale:

```javascript
// Reset configurazione e riavvio setup
themeManager.reset();
window.location.href = 'setup-new.html';
```

---

## 📚 API Reference

### ProjectThemeManager

#### Metodi di Configurazione

```javascript
// Aggiorna tema completo
themeManager.updateTheme({
  primaryColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  // ...
});

// Imposta nome progetto
themeManager.setProjectName('Il Mio Gestionale');

// Imposta logo
themeManager.setLogo(logoDataUrl);

// Imposta colori
themeManager.setColors({
  primary: '#6366f1',
  secondary: '#8b5cf6',
  accent: '#f59e0b',
  background: '#fafafa',
  surface: '#ffffff',
  sidebar: '#ffffff',
  navbar: '#ffffff'
});

// Imposta colori grafici
themeManager.setChartColors([
  '#6366f1', '#8b5cf6', '#ec4899',
  '#f59e0b', '#10b981', '#3b82f6'
]);
```

#### Metodi di Applicazione

```javascript
// Applica tema (automatico al caricamento)
themeManager.applyTheme();

// Toggle dark mode
themeManager.toggleDarkMode();

// Marca come configurato
themeManager.markAsConfigured();

// Verifica configurazione
const isConfigured = themeManager.isConfigured();
```

#### Metodi di Preset

```javascript
// Ottieni tutti i preset
const presets = themeManager.getPresetThemes();

// Applica un preset
themeManager.applyPreset('modern'); // modern, ocean, forest, sunset, royal, slate
```

#### Metodi di Persistenza

```javascript
// Export tema (JSON)
const themeJson = themeManager.exportTheme();

// Import tema
themeManager.importTheme(themeJson);

// Reset completo
themeManager.reset();
```

#### Metodi Getter

```javascript
// Ottieni tema completo
const theme = themeManager.getTheme();

// Ottieni nome progetto
const name = themeManager.getProjectName();

// Ottieni logo
const logo = themeManager.getLogo();

// Ottieni colori
const colors = themeManager.getColors();

// Ottieni colori chart
const chartColors = themeManager.getChartColors();

// Check dark mode
const isDark = themeManager.isDarkMode();
```

---

## 🎨 Personalizzazione Avanzata

### Creare un Nuovo Preset

Aggiungi un nuovo preset in `theme-manager-v2.js`:

```javascript
getPresetThemes() {
  return {
    // ... preset esistenti ...
    
    myCustom: {
      name: 'My Custom Theme',
      description: 'La mia palette personalizzata',
      primaryColor: '#FF6B6B',
      secondaryColor: '#4ECDC4',
      accentColor: '#FFE66D',
      backgroundColor: '#FAFAFA',
      surfaceColor: '#FFFFFF',
      sidebarColor: '#F5F5F5',
      navbarColor: '#FFFFFF',
      chartColors: [
        '#FF6B6B', '#4ECDC4', '#FFE66D',
        '#95E1D3', '#F38181', '#AA96DA'
      ]
    }
  };
}
```

### Estendere CSS Variables

In `themes-new.css`, aggiungi nuove variabili:

```css
:root {
  /* Variabili custom aggiuntive */
  --my-custom-color: #FF6B6B;
  --my-gradient: linear-gradient(135deg, var(--primary), var(--secondary));
}
```

Poi applicale dinamicamente in `theme-manager-v2.js`:

```javascript
applyTheme(theme = null) {
  // ... codice esistente ...
  
  // Aggiungi variabili custom
  root.style.setProperty('--my-custom-color', theme.myCustomColor);
}
```

### Aggiungere Dark Mode

Il sistema è già preparato. Per attivarlo:

```javascript
// Toggle dark mode
themeManager.toggleDarkMode();

// Oppure imposta direttamente
themeManager.updateTheme({ darkMode: true });
```

CSS per dark mode già presente in `themes-new.css`:

```css
:root[data-mode="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
  /* ... */
}
```

---

## ✅ Best Practices

### 1. Colori Brand

**DO ✅**
- Usa colori con sufficiente contrasto (min 4.5:1)
- Testa la leggibilità su sfondo chiaro e scuro
- Usa preset come punto di partenza

**DON'T ❌**
- Non usare colori troppo saturi (#FF0000 puro)
- Evita combinazioni con basso contrasto
- Non modificare i colori operativi (bottoni, alert)

### 2. Logo

**DO ✅**
- Formato: PNG con sfondo trasparente
- Dimensione: 200x200px o superiore
- Peso file: < 2MB

**DON'T ❌**
- Non usare immagini troppo grandi (>5MB)
- Evita formati non standard (TIFF, BMP)

### 3. Performance

```javascript
// ✅ BUONO: Update batch
themeManager.updateTheme({
  primaryColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  accentColor: '#f59e0b'
});

// ❌ CATTIVO: Update multipli
themeManager.setColors({ primary: '#6366f1' });
themeManager.setColors({ secondary: '#8b5cf6' });
themeManager.setColors({ accent: '#f59e0b' });
```

### 4. Compatibilità

Il sistema mantiene compatibilità con il vecchio theme-manager:

```javascript
// Vecchio sistema (funziona ancora)
const config = themeManager.getConfig();

// Nuovo sistema (raccomandato)
const theme = themeManager.getTheme();
```

---

## 🐛 Troubleshooting

### Problema: Il tema non si applica

**Soluzione:**

1. Verifica che `theme-manager-v2.js` sia caricato:

```html
<script src="js/theme-manager-v2.js"></script>
```

2. Controlla che il tema sia configurato:

```javascript
if (!themeManager.isConfigured()) {
  window.location.href = 'setup-new.html';
}
```

3. Verifica localStorage:

```javascript
// Controlla se il tema è salvato
console.log(localStorage.getItem('projectTheme'));
```

### Problema: I colori dei bottoni sono cambiati

**Soluzione:**

I colori dei bottoni NON devono mai cambiare. Verifica che stai usando le variabili corrette:

```css
/* ✅ CORRETTO - Colore fisso */
.btn-delete {
  background: var(--btn-delete);
}

/* ❌ SBAGLIATO - Colore dinamico */
.btn-delete {
  background: var(--primary);
}
```

### Problema: La preview non si aggiorna

**Soluzione:**

1. Verifica che `setup-configurator.js` sia caricato
2. Controlla la console per errori JavaScript
3. Pulisci cache del browser (Ctrl+Shift+R)

### Problema: Logo non visibile

**Soluzione:**

1. Verifica formato file (PNG, JPG, SVG)
2. Controlla dimensione (< 2MB)
3. Verifica che il logo sia salvato:

```javascript
const logo = themeManager.getLogo();
console.log('Logo:', logo ? 'Presente' : 'Assente');
```

---

## 🚀 Roadmap Futuri Sviluppi

- [ ] **Multi-Theme Support**: Temi multipli salvati
- [ ] **Theme Marketplace**: Condivisione temi community
- [ ] **Advanced Dark Mode**: Dark mode automatico (orario)
- [ ] **Gradient Builder**: Editor gradienti avanzato
- [ ] **Font Customization**: Personalizzazione font
- [ ] **Animation Presets**: Preset animazioni UI
- [ ] **Accessibility Tools**: Controllo contrasto automatico
- [ ] **Team Sharing**: Sync tema su team/workspace

---

## 📝 Changelog

### v2.0.0 - Sistema Tema Dinamico Custom
- ✨ Nuovo sistema tema completamente dinamico
- ✨ Live preview con update real-time
- ✨ 6 preset professionali
- ✨ Dark mode support
- ✨ Export/Import configurazioni
- ✨ Logo upload con drag & drop
- ✨ API completa per gestione tema
- 🔧 Migliorata persistenza localStorage
- 🔧 Performance ottimizzate CSS Variables
- 🐛 Fix compatibilità legacy

---

## 📄 Licenza

Sistema di Tema Dinamico - Gestionale Demo
© 2026 - Tutti i diritti riservati

---

## 🆘 Supporto

Per domande, problemi o suggerimenti:
- 📧 Email: support@gestionale-demo.com
- 💬 GitHub Issues: [Link Repository]
- 📚 Documentazione: [Link Docs]

---

**Buon lavoro! 🎨✨**
