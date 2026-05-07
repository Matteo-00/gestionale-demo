# 📝 TODO - Miglioramenti Futuri

## 🎨 Sistema Temi

### Alta Priorità
- [ ] **Refactoring colori Chart.js** (app.js)
  - Sostituire tutti i colori hardcoded (#D4C8AB, etc.) con `themeManager.getPrimaryColor()`
  - File interessati: `js/app.js` (linee 670, 1103, 1105, 1237, 1239, 1316, 1318, 1451, 1453, 1586, 1588, 1717, 1719)
  - Funzioni da aggiornare:
    - `renderStats()` - Grafici statistiche
    - Tutti i chart configurations

- [ ] **CSS Variables complete**
  - Rimuovere ultimi colori hardcoded in `css/style.css`
  - Linee con gradienti fissi da rendere dinamici (1697, 1707, 1717)

### Media Priorità
- [ ] **Nuovi Temi**
  - Forest Green (verde naturale per eco/bio)
  - Ocean Blue (blu oceano per mare/nautical)
  - Sunset Orange (arancione caldo per casual dining)
  - Monochrome (bianco/nero/grigio minimalista)

- [ ] **Personalizzazione Avanzata**
  - Color picker per colori custom
  - Salvataggio di temi personalizzati
  - Esportazione/importazione configurazione JSON
  - Template predefiniti per settore (ristorante, hotel, retail, etc.)

- [ ] **Preview Migliorata**
  - Anteprima più realistica in setup.html
  - Screenshot reali invece di preview minimale
  - Comparazione side-by-side di temi

### Bassa Priorità
- [ ] **Multi-lingua**
  - Supporto IT/EN per interfaccia setup
  - Traduzioni per tutti i testi UI

- [ ] **Accessibilità**
  - Verificare contrasto colori per WCAG AA
  - Modalità alto contrasto
  - Dark mode system preference auto-detection

- [ ] **Performance**
  - Lazy loading per temi non utilizzati
  - Minificazione CSS/JS per produzione
  - Service Worker per caching

## 🐛 Bug da Verificare

- [ ] Logo placeholder quando non caricato
- [ ] Transizione login con logo dinamico su temi dark
- [ ] Reset configurazione da UI (invece che console)
- [ ] Validazione input (nome vuoto, logo troppo grande)

## 📚 Documentazione

- [ ] Video tutorial setup
- [ ] Screenshots di ogni tema
- [ ] FAQ estesa
- [ ] Guida troubleshooting dettagliata

## 🔐 Sicurezza

- [ ] Validazione upload logo (tipo, dimensione, contenuto)
- [ ] Sanitizzazione input nome progetto
- [ ] CSP (Content Security Policy) headers
- [ ] HTTPS enforcement in produzione

## 🧪 Testing

- [ ] Test browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Test responsive (mobile, tablet, desktop)
- [ ] Test accessibilità
- [ ] Test performance

---

**Note:**
- Usare questo file per tracciare miglioramenti incrementali
- Prioritizzare in base a feedback clienti
- Ogni task completato → aggiornare CHANGELOG.md
