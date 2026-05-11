# 🔄 Guida Migrazione al Sistema Tema v2.0

## 📋 Panoramica

Questa guida ti aiuta a migrare dal vecchio sistema tema (`theme-manager.js`) al nuovo sistema dinamico v2.0 (`theme-manager-v2.js`).

**Buone notizie:** ✅ La migrazione è **automatica e retrocompatibile**!

---

## 🎯 Cosa Cambia

### Prima (v1.0) ❌

```javascript
// Vecchio sistema
const config = themeManager.getConfig();

// Struttura dati
{
  projectName: string,
  theme: string,          // Es: 'theme-01', 'theme-02'
  logo: string | null,
  configured: boolean
}

// Temi statici predefiniti
// Modificabili solo via CSS
```

### Dopo (v2.0) ✅

```javascript
// Nuovo sistema
const theme = themeManager.getTheme();

// Struttura dati espansa
{
  // Meta
  configured: boolean,
  darkMode: boolean,
  createdAt: string,
  lastModified: string,
  
  // Branding
  projectName: string,
  logo: string | null,
  
  // Colori Custom (NUOVO!)
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
  backgroundColor: string,
  surfaceColor: string,
  sidebarColor: string,
  navbarColor: string,
  chartColors: string[]
}

// Temi completamente dinamici
// Modificabili real-time via API
```

---

## ✅ Compatibilità Retroattiva

### Metodi Legacy Ancora Funzionanti

```javascript
// ✅ FUNZIONA ANCORA (ma deprecato)
const config = themeManager.getConfig();
themeManager.applyAll();
themeManager.loadConfig();
themeManager.saveConfig(config);

// ✅ RACCOMANDATO (nuovo)
const theme = themeManager.getTheme();
themeManager.applyTheme();
themeManager.loadTheme();
themeManager.saveTheme(theme);
```

### Nessun Breaking Change

Il sistema v2.0 mantiene **piena compatibilità** con:
- ✅ Configurazioni salvate v1.0
- ✅ API vecchie (deprecate ma funzionanti)
- ✅ Struttura file esistente
- ✅ Routing applicazione

---

## 🚀 Migrazione Automatica

### Scenario 1: Utente NON ha mai configurato

**Cosa succede:**
1. Apre `welcome.html`
2. Viene indirizzato a `setup-new.html` (nuova pagina)
3. Configura tema con nuovo sistema
4. Tema salvato nel nuovo formato

**Azione richiesta:** ❌ Nessuna

---

### Scenario 2: Utente HA GIÀ configurato (v1.0)

**Cosa succede:**
1. Apre `welcome.html`
2. Sistema rileva configurazione esistente
3. Configurazione viene **convertita automaticamente** al nuovo formato
4. Utente continua a usare l'app normalmente

**Azione richiesta:** ❌ Nessuna (opzionale: aggiorna tema per nuove features)

---

### Scenario 3: Sviluppatore con codice custom

**Se hai codice custom che usa l'API:**

```javascript
// PRIMA (v1.0)
const config = themeManager.getConfig();
themeManager.applyTheme('theme-02');
themeManager.saveConfig({ ...config, theme: 'theme-03' });

// DOPO (v2.0) - Aggiorna a:
const theme = themeManager.getTheme();
themeManager.applyPreset('ocean');
themeManager.updateTheme({ primaryColor: '#0284c7' });
```

**Azione richiesta:** ✅ Aggiorna codice custom (compatibilità mantenuta)

---

## 🔄 Processo di Migrazione Manuale

### Opzione A: Mantenere Tema Attuale

**NON fare nulla.** Il sistema continua a funzionare.

### Opzione B: Aggiornare e Usare Nuove Features

**Step 1:** Reset configurazione

```javascript
// Apri console browser (F12)
themeManager.reset();
```

**Step 2:** Vai a setup nuovo

```javascript
window.location.href = 'setup-new.html';
```

**Step 3:** Configura tema con nuovo sistema
- Scegli preset o custom
- Imposta logo
- Configura colori brand

**Step 4:** Salva e lancia

---

## 📊 Conversione Dati

### Mapping Automatico

Il sistema converte automaticamente:

```javascript
// VECCHIO FORMATO (v1.0)
{
  projectName: "Il Mio Gestionale",
  theme: "theme-02",
  logo: "data:image/png;base64...",
  configured: true
}

// CONVERTITO IN (v2.0)
{
  projectName: "Il Mio Gestionale",
  logo: "data:image/png;base64...",
  configured: true,
  
  // Colori estratti da theme-02 (Ocean Blue)
  primaryColor: "#0284c7",
  secondaryColor: "#0891b2",
  accentColor: "#06b6d4",
  backgroundColor: "#fafcfe",
  surfaceColor: "#ffffff",
  sidebarColor: "#f0f9ff",
  navbarColor: "#ffffff",
  chartColors: ["#0284c7", "#0ea5e9", "#38bdf8", ...]
  
  // Meta
  darkMode: false,
  createdAt: "2026-05-11T10:00:00.000Z",
  lastModified: "2026-05-11T10:00:00.000Z"
}
```

---

## 🎨 Migrare Temi Custom CSS

### Se hai temi custom in `themes.css`:

**PRIMA (v1.0):**

```css
/* themes.css */
[data-theme="my-custom"] {
  --primary: #FF6B6B;
  --secondary: #4ECDC4;
  --accent: #FFE66D;
  /* ... */
}
```

**DOPO (v2.0):**

**Opzione 1:** Crea preset in `theme-manager-v2.js`

```javascript
getPresetThemes() {
  return {
    // ... preset esistenti ...
    
    myCustom: {
      name: 'My Custom Theme',
      description: 'Il mio tema personalizzato',
      primaryColor: '#FF6B6B',
      secondaryColor: '#4ECDC4',
      accentColor: '#FFE66D',
      backgroundColor: '#FAFAFA',
      surfaceColor: '#FFFFFF',
      sidebarColor: '#F5F5F5',
      navbarColor: '#FFFFFF',
      chartColors: ['#FF6B6B', '#4ECDC4', '#FFE66D', ...]
    }
  };
}
```

**Opzione 2:** Applica via console

```javascript
themeManager.updateTheme({
  primaryColor: '#FF6B6B',
  secondaryColor: '#4ECDC4',
  accentColor: '#FFE66D',
  // ...
});
```

---

## 🔧 Aggiornamento File HTML

### File da Aggiornare

Se hai file custom, aggiorna i riferimenti:

**1. Header CSS:**

```html
<!-- AGGIUNGI nuovo CSS -->
<link rel="stylesheet" href="css/themes-new.css">

<!-- Mantieni vecchio per compatibilità -->
<link rel="stylesheet" href="css/themes.css">
```

**2. Script JS:**

```html
<!-- SOSTITUISCI -->
<script src="js/theme-manager.js"></script>

<!-- CON -->
<script src="js/theme-manager-v2.js"></script>
```

**3. Routing Setup:**

```javascript
// PRIMA
if (!config.configured) {
  window.location.href = 'setup.html';
}

// DOPO
if (!themeManager.isConfigured()) {
  window.location.href = 'setup-new.html';
}
```

---

## 📚 API Deprecate vs. Nuove

### Deprecate (Funzionano ma sconsigliati)

```javascript
// ⚠️ DEPRECATO
themeManager.getConfig()
themeManager.loadConfig()
themeManager.saveConfig(config)
themeManager.applyAll()
themeManager.markConfigured()
```

### Nuove (Raccomandate)

```javascript
// ✅ NUOVO
themeManager.getTheme()
themeManager.loadTheme()
themeManager.saveTheme(theme)
themeManager.applyTheme()
themeManager.markAsConfigured()
themeManager.isConfigured()
themeManager.setColors(colors)
themeManager.updateTheme(updates)
themeManager.applyPreset(name)
```

---

## 🧪 Testing Post-Migrazione

### Checklist Verifica

- [ ] ✅ App si apre correttamente
- [ ] ✅ Nome progetto visualizzato
- [ ] ✅ Logo visibile (se presente)
- [ ] ✅ Colori applicati correttamente
- [ ] ✅ Bottoni operativi colori fissi (rosso, verde, grigio)
- [ ] ✅ Alert sistema colori fissi
- [ ] ✅ Tabelle grigio neutro
- [ ] ✅ Login funzionante
- [ ] ✅ Dashboard carica
- [ ] ✅ Responsive su mobile

### Test Rapido Console

```javascript
// 1. Verifica configurazione
console.log('Configurato:', themeManager.isConfigured());

// 2. Verifica tema
console.log('Tema:', themeManager.getTheme());

// 3. Test cambio colore
themeManager.setColors({ primary: '#6366f1' });

// 4. Verifica persistenza
localStorage.getItem('projectTheme');
```

---

## 🐛 Problemi Comuni & Soluzioni

### Problema 1: Tema non si applica

**Soluzione:**

```javascript
// Console (F12)
themeManager.applyTheme();

// Se persiste
themeManager.reset();
location.reload();
```

### Problema 2: Logo scomparso

**Soluzione:**

```javascript
// Verifica logo salvato
const logo = themeManager.getLogo();
console.log('Logo presente:', logo ? 'Sì' : 'No');

// Se assente, ricaricalo
themeManager.setLogo('data:image/png;base64...');
```

### Problema 3: Colori bottoni cambiati

**Causa:** Probabilmente stai usando variabili sbagliate nel CSS custom.

**Soluzione:** Usa sempre le variabili fisse:

```css
/* ✅ CORRETTO */
.btn-delete { background: var(--btn-delete); }

/* ❌ SBAGLIATO */
.btn-delete { background: var(--primary); }
```

### Problema 4: Setup page non carica

**Soluzione:**

```javascript
// Verifica path corretto
window.location.href = 'setup-new.html'; // NON 'setup.html'

// Verifica file esistente
fetch('setup-new.html')
  .then(r => console.log('File presente:', r.ok));
```

---

## 🔄 Rollback al Vecchio Sistema

Se per qualsiasi motivo vuoi tornare al vecchio sistema:

**Step 1:** Ripristina file HTML

```html
<!-- Rimuovi -->
<link rel="stylesheet" href="css/themes-new.css">
<script src="js/theme-manager-v2.js"></script>

<!-- Ripristina -->
<link rel="stylesheet" href="css/themes.css">
<script src="js/theme-manager.js"></script>
```

**Step 2:** Pulisci localStorage

```javascript
localStorage.removeItem('projectTheme');
```

**Step 3:** Ricarica

```javascript
location.reload();
```

---

## 📈 Vantaggi Migrazione

Migrando al nuovo sistema ottieni:

✅ **Personalizzazione Completa**
- Colori brand custom
- Live preview real-time
- 6 preset professionali

✅ **UX Migliorata**
- Setup moderno e intuitivo
- Logo drag & drop
- Feedback immediato

✅ **Funzionalità Avanzate**
- Export/Import tema
- Dark mode ready
- API completa

✅ **Future-Proof**
- Preparato per nuove features
- Sistema scalabile
- Community themes (futuro)

---

## 🆘 Supporto Migrazione

**Documentazione:**
- 📚 `TEMA_DINAMICO_README.md` - Completa
- 🚀 `TEMA_QUICK_START.md` - Rapida
- 📝 `SISTEMA_TEMA_RIEPILOGO.md` - Overview

**Test:**
- 🧪 `theme-test.html` - Verifica sistema

**Help:**
- 💬 GitHub Issues
- 📧 Email support

---

## ✅ Checklist Migrazione

- [ ] ✅ Letto questa guida
- [ ] ✅ Backup configurazione attuale
- [ ] ✅ File HTML aggiornati
- [ ] ✅ Test eseguiti
- [ ] ✅ Tema funzionante
- [ ] ✅ Documentazione consultata

---

**Migrazione completata! 🎉**

_Benvenuto nel nuovo sistema tema v2.0!_

---

_Ultima modifica: 11 Maggio 2026_
_Versione: 2.0.0_
