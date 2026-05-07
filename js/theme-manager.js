// ===================================
// THEME MANAGER - Gestionale Demo
// Gestisce temi, logo e branding dinamico
// ===================================

class ThemeManager {
  constructor() {
    this.config = this.loadConfig();
  }

  // Carica configurazione da localStorage
  loadConfig() {
    const saved = localStorage.getItem('demoConfig');
    if (saved) {
      return JSON.parse(saved);
    }
    // Configurazione di default
    return {
      projectName: 'Gestionale Demo',
      theme: 'theme-01',
      logo: null,
      configured: false
    };
  }

  // Salva configurazione
  saveConfig(config) {
    this.config = { ...this.config, ...config };
    localStorage.setItem('demoConfig', JSON.stringify(this.config));
  }

  // Applica tema
  applyTheme(themeName) {
    if (!themeName) themeName = this.config.theme;
    document.documentElement.setAttribute('data-theme', themeName);
    this.config.theme = themeName;
  }

  // Applica nome progetto
  applyProjectName(name) {
    if (!name) name = this.config.projectName;
    
    // Aggiorna tutti gli elementi con la classe 'project-name'
    document.querySelectorAll('.project-name').forEach(el => {
      el.textContent = name;
    });
    
    // Aggiorna il titolo della pagina
    const title = document.querySelector('title');
    if (title) {
      title.textContent = name;
    }
    
    // Aggiorna logo-title nella sidebar
    const logoTitle = document.querySelector('.logo-title');
    if (logoTitle) {
      logoTitle.textContent = name;
    }
    
    this.config.projectName = name;
  }

  // Applica logo
  applyLogo(logoDataUrl) {
    if (!logoDataUrl) logoDataUrl = this.config.logo;
    
    if (logoDataUrl) {
      // Aggiorna tutte le immagini del logo
      document.querySelectorAll('.sidebar-logo, .logo-image').forEach(img => {
        img.src = logoDataUrl;
      });
    }
    
    this.config.logo = logoDataUrl;
  }

  // Applica tutta la configurazione
  applyAll() {
    this.applyTheme();
    this.applyProjectName();
    this.applyLogo();
  }

  // Verifica se è configurato
  isConfigured() {
    return this.config.configured === true;
  }

  // Marca come configurato
  markConfigured() {
    this.config.configured = true;
    this.saveConfig(this.config);
  }

  // Reset configurazione
  reset() {
    localStorage.removeItem('demoConfig');
    this.config = this.loadConfig();
  }

  // Ottieni configurazione corrente
  getConfig() {
    return { ...this.config };
  }

  // Ottieni lista temi disponibili
  getAvailableThemes() {
    return [
      {
        id: 'theme-01',
        number: '01',
        name: 'Slate Minimal',
        description: 'Grigio neutro elegante',
        category: 'Light',
        preview: {
          bg: '#fcfcfd',
          card: '#ffffff',
          primary: '#64748b',
          text: '#0f172a',
          accent: '#0f172a'
        }
      },
      {
        id: 'theme-02',
        number: '02',
        name: 'Ocean Professional',
        description: 'Blu oceano raffinato',
        category: 'Light',
        preview: {
          bg: '#fafcfe',
          card: '#ffffff',
          primary: '#0284c7',
          text: '#0c4a6e',
          accent: '#075985'
        }
      },
      {
        id: 'theme-03',
        number: '03',
        name: 'Midnight Dark',
        description: 'Dark elegante minimal',
        category: 'Dark',
        preview: {
          bg: '#0f172a',
          card: '#1e293b',
          primary: '#94a3b8',
          text: '#f1f5f9',
          accent: '#e2e8f0'
        }
      },
      {
        id: 'theme-04',
        number: '04',
        name: 'Forest Calm',
        description: 'Verde naturale elegante',
        category: 'Light',
        preview: {
          bg: '#f7fef9',
          card: '#ffffff',
          primary: '#059669',
          text: '#064e3b',
          accent: '#047857'
        }
      },
      {
        id: 'theme-05',
        number: '05',
        name: 'Arctic Light',
        description: 'Azzurro ghiaccio pulito',
        category: 'Light',
        preview: {
          bg: '#f0fdfe',
          card: '#ffffff',
          primary: '#0891b2',
          text: '#164e63',
          accent: '#0284c7'
        }
      },
      {
        id: 'theme-06',
        number: '06',
        name: 'Warm Sand',
        description: 'Beige caldo professionale',
        category: 'Light',
        preview: {
          bg: '#fefce8',
          card: '#ffffff',
          primary: '#92400e',
          text: '#713f12',
          accent: '#a16207'
        }
      },
      {
        id: 'theme-07',
        number: '07',
        name: 'Carbon Dark',
        description: 'Graphite dark minimal',
        category: 'Dark',
        preview: {
          bg: '#1e293b',
          card: '#334155',
          primary: '#94a3b8',
          text: '#e2e8f0',
          accent: '#cbd5e1'
        }
      },
      {
        id: 'theme-08',
        number: '08',
        name: 'Lavender Soft',
        description: 'Lavanda delicata',
        category: 'Light',
        preview: {
          bg: '#faf5ff',
          card: '#ffffff',
          primary: '#7c3aed',
          text: '#5b21b6',
          accent: '#8b5cf6'
        }
      }
    ];
  }

  // Ottieni valore di una variabile CSS corrente
  getCSSVariable(varName) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
  }

  // Ottieni colore primario corrente
  getPrimaryColor() {
    return this.getCSSVariable('--primary');
  }

  // Ottieni colore primario scuro corrente
  getPrimaryDarkColor() {
    return this.getCSSVariable('--primary-dark');
  }

  // Ottieni colore testo corrente
  getTextColor() {
    return this.getCSSVariable('--text');
  }
}

// Istanza globale
const themeManager = new ThemeManager();

// Export per uso in altri moduli (se necessario)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}
