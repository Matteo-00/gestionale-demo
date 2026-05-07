# 🎨 Gestionale Demo - Sistema Multi-Tema

## 📋 Descrizione

Questo è un gestionale web professionale e riutilizzabile, completamente neutro e personalizzabile per demo a clienti.

**Caratteristiche principali:**
- ✅ 4 temi professionali predefiniti (stile SaaS moderno)
- ✅ Branding dinamico (nome e logo personalizzabili)
- ✅ Interfaccia onboarding per configurazione rapida
- ✅ Design responsive e moderno
- ✅ Architettura basata su CSS Variables per facile estensione

---

## 🚀 Come Iniziare

### Opzione A: Landing Page Automatica (Consigliata)

Apri **`welcome.html`** nel browser.

Questa pagina smart:
- ✅ Verifica se sei già autenticato → Dashboard
- ✅ Verifica se hai configurato il progetto → Login
- ✅ Altrimenti → Setup iniziale

### Opzione B: Configurazione Diretta

### 1. Prima Configurazione

Al primo avvio, apri il file **`setup.html`** nel browser.

Questa pagina ti permetterà di:
- Inserire il nome del tuo progetto/ristorante
- Scegliere uno dei 4 temi predefiniti
- Caricare un logo personalizzato (opzionale)
- Vedere una preview live delle modifiche

Quando sei soddisfatto, clicca su **"Apri la Demo"**.

### 2. Login

Dopo la configurazione, verrai reindirizzato alla pagina di **login**.

Usa le credenziali configurate nel tuo database Supabase.

### 3. Dashboard Principale

Dopo il login, accederai alla dashboard completa con:
- Home (gestione acquisti)
- Archivio
- Fornitori/Prodotti
- Statistiche

Tutto personalizzato con il tema e branding scelti!

---

## 🎨 Temi Professionali

### 6 Temi Premium Enterprise

Tutti i temi sono stati progettati con standard di design moderno SaaS e aspetto professionale.

#### 1. **Slate Professional** (Default)
- Design: Enterprise elegante con toni antracite
- Stile: Professionale, pulito, raffinato
- Perfetto per: Dashboard business, SaaS B2B, applicazioni corporate

#### 2. **Soft Light**
- Design: Moderno SaaS con blu tenue
- Stile: Luminoso, chiaro, minimal
- Perfetto per: Demo generiche, presentazioni, onboarding

#### 3. **Midnight Executive**
- Design: Dark premium professionale
- Stile: Elegante, sofisticato, alto contrasto
- Perfetto per: Presentazioni serali, demo tech, dashboard enterprise

#### 4. **Forest Minimal**
- Design: Naturale raffinato con verde salvia
- Stile: Caldo, accogliente, organico
- Perfetto per: Ristoranti biologici, green business, settore food

#### 5. **Arctic Glass**
- Design: Ultra clean con accenti ghiaccio
- Stile: Fresco, pulito, moderno
- Perfetto per: Applicazioni medicali, tech, progetti innovativi

#### 6. **Carbon Neutral**
- Design: Dark graphite moderno minimal
- Stile: Sobrio, neutro, professionale
- Perfetto per: Dashboard analitiche, admin panel, tool developer

**Caratteristiche Design:**
- ✅ Colori studiati con palette coerenti
- ✅ Contrasti ottimali per leggibilità
- ✅ Ombre sottili e gerarchiche
- ✅ Tipografia premium (Inter)
- ✅ Design responsive perfetto

---

## 📁 Struttura del Progetto

```
/
├── welcome.html            # 🎯 Landing page intelligente (punto di ingresso)
├── setup.html              # Pagina di configurazione iniziale
├── login.html              # Pagina di login
├── index.html              # Dashboard principale
├── css/
│   ├── themes.css          # Sistema temi (4 temi predefiniti)
│   ├── style.css           # Stili principali
│   └── mobile-responsive.css
├── js/
│   ├── theme-manager.js    # Gestore temi e configurazione
│   ├── app.js              # Logica applicazione
│   ├── supabase.js         # Connessione database
│   └── config.js           # Configurazione API
└── assets/                 # Immagini e risorse
```

---

## 🛠️ Personalizzazione Avanzata

### Aggiungere un Nuovo Tema

1. Apri **`css/themes.css`**
2. Crea un nuovo blocco con il pattern:

```css
[data-theme="nome-tema"] {
  --primary: #tuo-colore;
  --primary-dark: #tuo-colore-scuro;
  --bg: #sfondo;
  --text: #testo;
  /* ... altre variabili */
}
```

3. Apri **`js/theme-manager.js`**
4. Aggiungi il tema all'array in `getAvailableThemes()`:

```javascript
{
  id: 'nome-tema',
  name: 'Nome Visualizzato',
  description: 'Descrizione del tema',
  preview: {
    bg: '#colore-bg',
    card: '#colore-card',
    primary: '#colore-primario',
    text: '#colore-testo'
  }
}
```

5. Ricarica **`setup.html`** e il nuovo tema sarà disponibile!

### Resettare la Configurazione

Apri la console del browser (F12) e digita:

```javascript
themeManager.reset();
location.reload();
```

Verrai reindirizzato alla pagina di configurazione.

---

## 🔧 Tecnologie Utilizzate

- **Frontend:** HTML5, CSS3 (CSS Variables), JavaScript ES6+
- **Backend:** Supabase (Database e Auth)
- **Charts:** Chart.js
- **Icons:** Emoji e caratteri speciali
- **Fonts:** Inter, Playfair Display (Google Fonts)

---

## 📝 Note per lo Sviluppo

### Configurazione Salvata

La configurazione (nome, tema, logo) viene salvata in **localStorage**:

```javascript
{
  projectName: "Nome Progetto",
  theme: "light-minimal",
  logo: "data:image/png;base64,...",
  configured: true
}
```

### CSS Variables Principali

Tutte le variabili CSS utilizzate:

```css
--primary, --primary-dark, --primary-light, --primary-pale
--bg, --card, --card-subtle
--text, --text-light
--border, --border-light
--muted, --error, --error-bg
--shadow, --shadow-md, --shadow-lg, --shadow-xl
```

I temi sovrascrivono dinamicamente queste variabili.

### Flusso di Navigazione

```
setup.html → login.html → index.html
    ↑            ↓
    └────────────┘
  (se non configurato)
```

---

## ⚠️ File da NON Committare

Assicurati di aggiungere al `.gitignore`:

```
js/config.js          # Contiene API keys
.env                  # Variabili ambiente
node_modules/         # Se usi npm
.DS_Store             # File macOS
```

---

## 🎯 Casi d'Uso

Questo gestionale è perfetto per:

✅ **Demo a potenziali clienti** - Mostra un prodotto personalizzato in pochi secondi  
✅ **Presentazioni commerciali** - Cambia tema e logo al volo  
✅ **Prototipazione rapida** - Testa diversi stili visivi  
✅ **White-label SaaS** - Base per prodotti rivendibili  
✅ **Portfolio progetti** - Mostra versatilità del tuo lavoro

---

## 📞 Supporto

Per domande o problemi:
- Controlla la console del browser (F12) per errori
- Verifica la configurazione Supabase
- Assicurati che JavaScript sia abilitato
- Prova a resettare la configurazione (vedi sopra)

---

## 📜 Licenza

Progetto interno. Non distribuire senza autorizzazione.

---

**Buon lavoro! 🚀**
