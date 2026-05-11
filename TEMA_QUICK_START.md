# 🎨 Guida Rapida - Sistema Tema Custom

## 🚀 Quick Start

### 1️⃣ Prima Configurazione

All'avvio dell'app, verrai indirizzato automaticamente alla pagina di configurazione:

```
🏠 welcome.html → ⚙️ setup-new.html → 🔐 login.html → 📊 index.html
```

### 2️⃣ Configura il Tuo Tema

**Nella pagina Setup:**

1. **Nome Progetto** 📝
   - Inserisci il nome della tua azienda/progetto
   - Es: "Azienda ABC Gestionale"

2. **Scegli Tema** 🎨
   - Clicca un preset rapido, oppure
   - Personalizza i colori manualmente

3. **Carica Logo** 🖼️ (Opzionale)
   - Click o drag & drop
   - Formato: PNG, JPG, SVG
   - Dimensione max: 2MB

4. **Lancia App** 🚀
   - Click su "Avvia Dashboard"
   - Il tema verrà applicato automaticamente

---

## 🎨 Preset Temi Disponibili

| Tema | Descrizione | Colori |
|------|-------------|--------|
| **Modern Indigo** | Elegante e professionale | 🟣 Indigo, Viola, Ambra |
| **Ocean Blue** | Fresco e pulito | 🔵 Blu oceano, Cyan |
| **Forest Green** | Naturale e calmo | 🟢 Verde smeraldo |
| **Sunset Orange** | Caldo e accogliente | 🟠 Arancione, Ambra |
| **Royal Purple** | Lussuoso e premium | 🟣 Viola reale |
| **Slate Minimal** | Neutro e versatile | ⚫ Grigio, Slate |

---

## ✨ Cosa Puoi Personalizzare

### ✅ MODIFICABILI (Branding Visual)

- ✅ **Colore Primario** - Brand principale
- ✅ **Colore Secondario** - Accent e variazioni
- ✅ **Sfondo App** - Background generale
- ✅ **Sidebar** - Barra laterale
- ✅ **Navbar** - Barra superiore
- ✅ **Cards** - Carte e widget
- ✅ **Grafici** - Colori charts
- ✅ **Logo** - Logo aziendale
- ✅ **Nome Progetto** - Titolo applicazione

### ❌ NON MODIFICABILI (Componenti Operativi)

Questi restano **SEMPRE** con i colori standard:

- ❌ **Bottone Elimina** - Rosso
- ❌ **Bottone Salva** - Verde
- ❌ **Bottone Annulla** - Grigio
- ❌ **Alert Success** - Verde
- ❌ **Alert Warning** - Arancione
- ❌ **Alert Danger** - Rosso
- ❌ **Tabelle** - Grigio neutro
- ❌ **Bordi e Stati** - Colori sistema

---

## 💡 Tips & Tricks

### Scegliere i Colori

**Buone Pratiche:**
- ✅ Usa preset come base
- ✅ Mantieni contrasto leggibile (min 4.5:1)
- ✅ Testa su sfondo chiaro
- ✅ Evita colori troppo saturi

**Esempi Palette:**

```
Brand Tech:
Primario: #6366f1 (Indigo)
Secondario: #8b5cf6 (Viola)
Accent: #ec4899 (Rosa)

Brand Eco:
Primario: #059669 (Verde)
Secondario: #10b981 (Smeraldo)
Accent: #34d399 (Verde chiaro)

Brand Corporate:
Primario: #0284c7 (Blu)
Secondario: #0891b2 (Cyan)
Accent: #06b6d4 (Acqua)
```

### Logo Perfetto

**Requisiti:**
- Formato: PNG trasparente
- Dimensione: 200x200px (consigliata)
- Peso: < 2MB
- Qualità: Alta risoluzione

**Dove usarlo:**
- 📱 Sidebar
- 🔐 Pagina login
- 📊 Dashboard
- 📧 Email (futuro)

---

## 🔧 Modificare Tema Dopo Setup

### Metodo 1: Reset Completo

Apri console browser (F12) e digita:

```javascript
themeManager.reset();
window.location.href = 'setup-new.html';
```

### Metodo 2: Modifica Rapida (via console)

```javascript
// Cambia solo il colore primario
themeManager.setColors({ primary: '#6366f1' });

// Cambia nome progetto
themeManager.setProjectName('Nuovo Nome');

// Applica preset
themeManager.applyPreset('ocean');
```

---

## 📊 Live Preview

**Durante la configurazione**, la preview mostra in tempo reale:

- ✨ Nome progetto aggiornato
- ✨ Colori applicati a:
  - Navbar
  - Cards statistiche
  - Grafici
  - Tabelle
- ✨ Effetto hover su elementi

**Prova prima di salvare!**

---

## 🐛 Risoluzione Problemi Comuni

### Tema non si applica

```javascript
// Verifica configurazione
console.log(themeManager.isConfigured());

// Verifica tema salvato
console.log(themeManager.getTheme());

// Riapplica manualmente
themeManager.applyTheme();
```

### Logo non appare

```javascript
// Verifica logo salvato
console.log(themeManager.getLogo());

// Ricarica logo
const logo = 'data:image/png;base64,...';
themeManager.setLogo(logo);
```

### Reset tutto

```javascript
// Reset completo
themeManager.reset();
location.reload();
```

---

## 🎯 Esempi Pratici

### Esempio 1: Brand Tech Startup

```javascript
themeManager.updateTheme({
  projectName: 'TechFlow SaaS',
  primaryColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  accentColor: '#ec4899',
  backgroundColor: '#fafafa',
  sidebarColor: '#ffffff'
});
```

**Risultato:** Look moderno, tech, premium

### Esempio 2: Brand Eco/Bio

```javascript
themeManager.updateTheme({
  projectName: 'EcoVita Organic',
  primaryColor: '#059669',
  secondaryColor: '#10b981',
  accentColor: '#34d399',
  backgroundColor: '#f7fef9',
  sidebarColor: '#f0fdf4'
});
```

**Risultato:** Atmosfera naturale, verde, calma

### Esempio 3: Brand Corporate

```javascript
themeManager.updateTheme({
  projectName: 'CorpFinance Pro',
  primaryColor: '#0284c7',
  secondaryColor: '#0891b2',
  accentColor: '#06b6d4',
  backgroundColor: '#fafcfe',
  sidebarColor: '#f0f9ff'
});
```

**Risultato:** Professionale, corporate, affidabile

---

## 📱 Responsive

Il tema si adatta automaticamente a:
- 💻 Desktop
- 📱 Tablet
- 📲 Mobile

Tutti i colori e il branding rimangono coerenti su ogni dispositivo.

---

## 🔮 Funzionalità Future

- [ ] Dark Mode completo
- [ ] Multi-tema (switch rapido)
- [ ] Template marketplace
- [ ] Font personalizzati
- [ ] Animazioni custom
- [ ] Export/Share tema

---

## ✅ Checklist Setup Perfetto

Prima di lanciare l'app, verifica:

- [ ] ✅ Nome progetto inserito
- [ ] ✅ Colori scelti (preset o custom)
- [ ] ✅ Logo caricato (se disponibile)
- [ ] ✅ Preview controllata
- [ ] ✅ Contrasto colori verificato
- [ ] ✅ Click su "Avvia Dashboard"

---

## 🆘 Hai Bisogno di Aiuto?

**Documentazione Completa:**
📚 Leggi `TEMA_DINAMICO_README.md`

**Supporto:**
- 💬 GitHub Issues
- 📧 Email support

---

**Buona personalizzazione! 🎨✨**
