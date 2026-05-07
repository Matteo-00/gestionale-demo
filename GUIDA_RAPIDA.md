# 🚀 GUIDA RAPIDA - Gestionale Demo

## ⚡ Avvio Veloce (3 minuti)

### Passo 1: Apri la pagina di configurazione
```
Apri nel browser: setup.html
```

### Passo 2: Configura il tuo gestionale
1. **Nome:** Inserisci il nome del tuo progetto/ristorante
2. **Tema:** Scegli uno dei 4 temi disponibili
3. **Logo:** (Opzionale) Carica il tuo logo
4. Clicca **"Apri la Demo"**

### Passo 3: Login
Usa le credenziali configurate nel database Supabase.

### Passo 4: Usa il gestionale!
Accedi alla dashboard completa personalizzata.

---

## 🎨 Temi Disponibili

| Tema | Stile | Ideale per |
|------|-------|------------|
| **Light Minimal** | Chiaro e pulito (Notion/Stripe) | Demo generiche, SaaS |
| **Dark Graphite** | Scuro premium (Vercel/GitHub) | Presentazioni tech |
| **Warm Neutral** | Crema/Beige elegante | Ristoranti, Hotel |
| **Midnight Blue** | Navy scuro enterprise | Dashboard B2B |

---

## 🔄 Riconfigurare

Vuoi cambiare tema o logo?

1. Apri di nuovo `setup.html`
2. Modifica le impostazioni
3. Clicca "Apri la Demo"

---

## 📁 File Principali

- **`welcome.html`** - Landing page (punto di ingresso)
- **`setup.html`** - Configurazione iniziale
- **`login.html`** - Autenticazione
- **`index.html`** - Dashboard principale

---

## ⚙️ Configurazione Database

1. Vai su [Supabase](https://supabase.com)
2. Crea un progetto
3. Configura le tabelle (vedi `SETUP_SUPABASE.md`)
4. Aggiorna credenziali in `login.html` e `js/supabase.js`

---

## 🆘 Problemi Comuni

### "Non riesco a fare login"
- Verifica credenziali Supabase
- Controlla che l'email sia confermata
- Apri console browser (F12) per vedere errori

### "Il tema non cambia"
- Svuota cache del browser (Ctrl+Shift+R)
- Verifica che JavaScript sia abilitato
- Controlla console per errori

### "Il logo non appare"
- Usa immagini PNG/JPG sotto 2MB
- Verifica che il file sia valido
- Ricarica la pagina

### "Voglio resettare tutto"
Console browser (F12):
```javascript
themeManager.reset();
location.reload();
```

---

## 📞 Supporto

Per problemi o domande:
- Controlla `README_DEMO.md` per documentazione completa
- Verifica `CHANGELOG.md` per novità recenti
- Apri console browser per debug

---

**Buon lavoro! 🎯**
