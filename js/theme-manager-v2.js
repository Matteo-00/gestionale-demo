// ===================================
// PROJECT THEME MANAGER v2.0
// Sistema Tema Dinamico Custom - SaaS Premium
// ===================================

/**
 * TypeScript-like Structure (Commented for clarity)
 * 
 * interface ProjectTheme {
 *   projectName: string
 *   logo: string | null
 * 
 *   // Colori Brand
 *   primaryColor: string
 *   secondaryColor: string
 *   accentColor: string
 * 
 *   // Backgrounds
 *   backgroundColor: string
 *   surfaceColor: string
 * 
 *   // Navigation
 *   sidebarColor: string
 *   navbarColor: string
 * 
 *   // Charts
 *   chartColors: string[]
 * 
 *   // Meta
 *   configured: boolean
 *   darkMode: boolean
 *   createdAt: string
 *   lastModified: string
 * }
 */

class ProjectThemeManager {
  constructor() {
    this.storageKey = 'projectTheme';
    this.theme = this.loadTheme();
    this.applyTheme();
  }

  // === GESTIONE PERSISTENZA === //

  loadTheme() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Errore nel caricamento del tema:', error);
    }
    
    // Tema di default
    return this.getDefaultTheme();
  }

  saveTheme(theme = null) {
    const themeToSave = theme || this.theme;
    themeToSave.lastModified = new Date().toISOString();
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(themeToSave));
      this.theme = themeToSave;
      return true;
    } catch (error) {
      console.error('Errore nel salvataggio del tema:', error);
      return false;
    }
  }

  getDefaultTheme() {
    return {
      // Meta
      configured: false,
      darkMode: false,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      
      // Branding
      projectName: 'Gestionale Demo',
      logo: null,
      
      // Colori Brand (Default: Indigo Modern)
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      accentColor: '#f59e0b',
      
      // Backgrounds
      backgroundColor: '#fafafa',
      surfaceColor: '#ffffff',
      
      // Navigation
      sidebarColor: '#ffffff',
      navbarColor: '#ffffff',
      
      // Charts (Default: Modern Gradient)
      chartColors: [
        '#6366f1', // Indigo
        '#8b5cf6', // Purple
        '#ec4899', // Pink
        '#f59e0b', // Amber
        '#10b981', // Emerald
        '#3b82f6'  // Blue
      ]
    };
  }

  // === APPLICAZIONE TEMA === //

  applyTheme(theme = null) {
    const themeToApply = theme || this.theme;
    
    // Applica CSS Variables dinamicamente
    const root = document.documentElement;
    
    // Colori Primari
    root.style.setProperty('--primary', themeToApply.primaryColor);
    root.style.setProperty('--primary-dark', this.darkenColor(themeToApply.primaryColor, 10));
    root.style.setProperty('--primary-light', this.lightenColor(themeToApply.primaryColor, 10));
    root.style.setProperty('--primary-pale', this.lightenColor(themeToApply.primaryColor, 40));
    
    // Colori Secondari
    root.style.setProperty('--secondary', themeToApply.secondaryColor);
    root.style.setProperty('--secondary-dark', this.darkenColor(themeToApply.secondaryColor, 10));
    root.style.setProperty('--secondary-light', this.lightenColor(themeToApply.secondaryColor, 10));
    
    // Accent
    root.style.setProperty('--accent', themeToApply.accentColor);
    root.style.setProperty('--accent-dark', this.darkenColor(themeToApply.accentColor, 10));
    root.style.setProperty('--accent-light', this.lightenColor(themeToApply.accentColor, 10));
    
    // Backgrounds
    root.style.setProperty('--bg', themeToApply.backgroundColor);
    root.style.setProperty('--bg-secondary', this.darkenColor(themeToApply.backgroundColor, 3));
    
    // Surfaces
    root.style.setProperty('--surface', themeToApply.surfaceColor);
    root.style.setProperty('--surface-elevated', themeToApply.surfaceColor);
    root.style.setProperty('--card', themeToApply.surfaceColor);
    root.style.setProperty('--card-subtle', this.darkenColor(themeToApply.surfaceColor, 2));
    
    // Sidebar
    root.style.setProperty('--sidebar-bg', themeToApply.sidebarColor);
    root.style.setProperty('--sidebar-border', this.darkenColor(themeToApply.sidebarColor, 8));
    root.style.setProperty('--sidebar-hover', this.darkenColor(themeToApply.sidebarColor, 4));
    root.style.setProperty('--sidebar-active', this.darkenColor(themeToApply.sidebarColor, 6));
    
    // Navbar
    root.style.setProperty('--navbar-bg', themeToApply.navbarColor);
    root.style.setProperty('--navbar-border', this.darkenColor(themeToApply.navbarColor, 8));
    
    // Charts
    themeToApply.chartColors.forEach((color, index) => {
      root.style.setProperty(`--chart-${index + 1}`, color);
    });
    
    // Dark Mode
    if (themeToApply.darkMode) {
      root.setAttribute('data-mode', 'dark');
    } else {
      root.removeAttribute('data-mode');
    }
    
    // Applica Nome Progetto
    this.applyProjectName(themeToApply.projectName);
    
    // Applica Logo
    if (themeToApply.logo) {
      this.applyLogo(themeToApply.logo);
    }
  }

  // === UTILITY COLORI === //

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  darkenColor(hex, percent) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;
    
    const factor = (100 - percent) / 100;
    return this.rgbToHex(
      Math.round(rgb.r * factor),
      Math.round(rgb.g * factor),
      Math.round(rgb.b * factor)
    );
  }

  lightenColor(hex, percent) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;
    
    const factor = percent / 100;
    return this.rgbToHex(
      Math.round(rgb.r + (255 - rgb.r) * factor),
      Math.round(rgb.g + (255 - rgb.g) * factor),
      Math.round(rgb.b + (255 - rgb.b) * factor)
    );
  }

  // === BRANDING === //

  applyProjectName(name) {
    // Aggiorna titolo pagina
    document.title = name;
    
    // Aggiorna tutti gli elementi con classe project-name
    document.querySelectorAll('.project-name').forEach(el => {
      el.textContent = name;
    });
    
    // Aggiorna logo-title nella sidebar
    const logoTitle = document.querySelector('.logo-title');
    if (logoTitle) {
      logoTitle.textContent = name;
    }
  }

  applyLogo(logoDataUrl) {
    // Aggiorna tutte le immagini logo
    document.querySelectorAll('.project-logo, .logo-image').forEach(img => {
      img.src = logoDataUrl;
      img.style.display = 'block';
    });
    
    // Nascondi placeholder se presente
    document.querySelectorAll('.logo-placeholder').forEach(el => {
      el.style.display = 'none';
    });
  }

  // === CONFIGURAZIONE === //

  updateTheme(updates) {
    this.theme = { ...this.theme, ...updates };
    this.saveTheme();
    this.applyTheme();
  }

  setProjectName(name) {
    this.theme.projectName = name;
    this.saveTheme();
    this.applyProjectName(name);
  }

  setLogo(logoDataUrl) {
    this.theme.logo = logoDataUrl;
    this.saveTheme();
    this.applyLogo(logoDataUrl);
  }

  setColors(colors) {
    if (colors.primary) this.theme.primaryColor = colors.primary;
    if (colors.secondary) this.theme.secondaryColor = colors.secondary;
    if (colors.accent) this.theme.accentColor = colors.accent;
    if (colors.background) this.theme.backgroundColor = colors.background;
    if (colors.surface) this.theme.surfaceColor = colors.surface;
    if (colors.sidebar) this.theme.sidebarColor = colors.sidebar;
    if (colors.navbar) this.theme.navbarColor = colors.navbar;
    
    this.saveTheme();
    this.applyTheme();
  }

  setChartColors(colors) {
    this.theme.chartColors = colors;
    this.saveTheme();
    this.applyTheme();
  }

  toggleDarkMode() {
    this.theme.darkMode = !this.theme.darkMode;
    this.saveTheme();
    this.applyTheme();
  }

  markAsConfigured() {
    this.theme.configured = true;
    this.saveTheme();
  }

  isConfigured() {
    return this.theme.configured === true;
  }

  // === PRESET TEMI === //

  getPresetThemes() {
    return {
      // Palette professionali soft e moderne
      sandPro: {
        name: 'Sand Professional',
        description: 'Beige caldo elegante',
        primaryColor: '#a8a29e',
        secondaryColor: '#d6d3d1',
        accentColor: '#e7e5e4',
        backgroundColor: '#fafaf9',
        surfaceColor: '#ffffff',
        sidebarColor: '#f5f5f4',
        navbarColor: '#ffffff',
        chartColors: ['#a8a29e', '#d6d3d1', '#e7e5e4', '#f5f5f4', '#78716c', '#57534e']
      },
      slateModern: {
        name: 'Slate Modern',
        description: 'Grigio contemporaneo',
        primaryColor: '#64748b',
        secondaryColor: '#94a3b8',
        accentColor: '#cbd5e1',
        backgroundColor: '#f8fafc',
        surfaceColor: '#ffffff',
        sidebarColor: '#f1f5f9',
        navbarColor: '#ffffff',
        chartColors: ['#94a3b8', '#cbd5e1', '#e2e8f0', '#f1f5f9', '#64748b', '#475569']
      },
      softBlue: {
        name: 'Soft Blue SaaS',
        description: 'Azzurro delicato',
        primaryColor: '#38bdf8',
        secondaryColor: '#7dd3fc',
        accentColor: '#bae6fd',
        backgroundColor: '#f0f9ff',
        surfaceColor: '#ffffff',
        sidebarColor: '#e0f2fe',
        navbarColor: '#ffffff',
        chartColors: ['#7dd3fc', '#bae6fd', '#e0f2fe', '#f0f9ff', '#38bdf8', '#0ea5e9']
      },
      minimalLight: {
        name: 'Minimal Light',
        description: 'Bianco pulito',
        primaryColor: '#71717a',
        secondaryColor: '#a1a1aa',
        accentColor: '#d4d4d8',
        backgroundColor: '#fafafa',
        surfaceColor: '#ffffff',
        sidebarColor: '#f4f4f5',
        navbarColor: '#ffffff',
        chartColors: ['#a1a1aa', '#d4d4d8', '#e4e4e7', '#f4f4f5', '#71717a', '#52525b']
      },
      elegantDark: {
        name: 'Elegant Dark',
        description: 'Scuro raffinato',
        primaryColor: '#71717a',
        secondaryColor: '#a1a1aa',
        accentColor: '#d4d4d8',
        backgroundColor: '#18181b',
        surfaceColor: '#27272a',
        sidebarColor: '#1f1f23',
        navbarColor: '#27272a',
        chartColors: ['#71717a', '#a1a1aa', '#d4d4d8', '#e4e4e7', '#52525b', '#3f3f46']
      },
      warmGray: {
        name: 'Warm Gray',
        description: 'Grigio caldo neutro',
        primaryColor: '#78716c',
        secondaryColor: '#a8a29e',
        accentColor: '#d6d3d1',
        backgroundColor: '#fafaf9',
        surfaceColor: '#ffffff',
        sidebarColor: '#f5f5f4',
        navbarColor: '#ffffff',
        chartColors: ['#a8a29e', '#d6d3d1', '#e7e5e4', '#f5f5f4', '#78716c', '#57534e']
      },
      sageGreen: {
        name: 'Sage Green',
        description: 'Verde salvia soft',
        primaryColor: '#4ade80',
        secondaryColor: '#86efac',
        accentColor: '#bbf7d0',
        backgroundColor: '#f0fdf4',
        surfaceColor: '#ffffff',
        sidebarColor: '#dcfce7',
        navbarColor: '#ffffff',
        chartColors: ['#86efac', '#bbf7d0', '#dcfce7', '#f0fdf4', '#4ade80', '#22c55e']
      },
      graphite: {
        name: 'Graphite Premium',
        description: 'Grafite metallico',
        primaryColor: '#6b7280',
        secondaryColor: '#9ca3af',
        accentColor: '#d1d5db',
        backgroundColor: '#f9fafb',
        surfaceColor: '#ffffff',
        sidebarColor: '#f3f4f6',
        navbarColor: '#ffffff',
        chartColors: ['#9ca3af', '#d1d5db', '#e5e7eb', '#f3f4f6', '#6b7280', '#4b5563']
      },
      neutralWhite: {
        name: 'Neutral White',
        description: 'Bianco neutro puro',
        primaryColor: '#737373',
        secondaryColor: '#a3a3a3',
        accentColor: '#d4d4d4',
        backgroundColor: '#fafafa',
        surfaceColor: '#ffffff',
        sidebarColor: '#f5f5f5',
        navbarColor: '#ffffff',
        chartColors: ['#a3a3a3', '#d4d4d4', '#e5e5e5', '#f5f5f5', '#737373', '#525252']
      },
      midnightSoft: {
        name: 'Midnight Soft',
        description: 'Blu notte morbido',
        primaryColor: '#60a5fa',
        secondaryColor: '#93c5fd',
        accentColor: '#bfdbfe',
        backgroundColor: '#eff6ff',
        surfaceColor: '#ffffff',
        sidebarColor: '#dbeafe',
        navbarColor: '#ffffff',
        chartColors: ['#93c5fd', '#bfdbfe', '#dbeafe', '#eff6ff', '#60a5fa', '#3b82f6']
      },
      softCorporate: {
        name: 'Soft Corporate',
        description: 'Corporate elegante',
        primaryColor: '#0284c7',
        secondaryColor: '#38bdf8',
        accentColor: '#7dd3fc',
        backgroundColor: '#f0f9ff',
        surfaceColor: '#ffffff',
        sidebarColor: '#e0f2fe',
        navbarColor: '#ffffff',
        chartColors: ['#38bdf8', '#7dd3fc', '#bae6fd', '#e0f2fe', '#0284c7', '#0369a1']
      },
      cleanDashboard: {
        name: 'Clean Dashboard',
        description: 'Dashboard moderno',
        primaryColor: '#64748b',
        secondaryColor: '#94a3b8',
        accentColor: '#cbd5e1',
        backgroundColor: '#f8fafc',
        surfaceColor: '#ffffff',
        sidebarColor: '#f1f5f9',
        navbarColor: '#ffffff',
        chartColors: ['#94a3b8', '#cbd5e1', '#e2e8f0', '#f1f5f9', '#64748b', '#475569']
      }
    };
  }

  applyPreset(presetName) {
    const presets = this.getPresetThemes();
    const preset = presets[presetName];
    
    if (preset) {
      this.updateTheme({
        primaryColor: preset.primaryColor,
        secondaryColor: preset.secondaryColor,
        accentColor: preset.accentColor,
        backgroundColor: preset.backgroundColor,
        surfaceColor: preset.surfaceColor,
        sidebarColor: preset.sidebarColor,
        navbarColor: preset.navbarColor,
        chartColors: preset.chartColors
      });
    }
  }

  // === RESET === //

  reset() {
    localStorage.removeItem(this.storageKey);
    this.theme = this.getDefaultTheme();
    this.applyTheme();
  }

  // === EXPORT/IMPORT === //

  exportTheme() {
    return JSON.stringify(this.theme, null, 2);
  }

  importTheme(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      this.theme = { ...this.getDefaultTheme(), ...imported };
      this.saveTheme();
      this.applyTheme();
      return true;
    } catch (error) {
      console.error('Errore nell\'importazione del tema:', error);
      return false;
    }
  }

  // === GETTERS === //

  getTheme() {
    return { ...this.theme };
  }

  getProjectName() {
    return this.theme.projectName;
  }

  getLogo() {
    return this.theme.logo;
  }

  getColors() {
    return {
      primary: this.theme.primaryColor,
      secondary: this.theme.secondaryColor,
      accent: this.theme.accentColor,
      background: this.theme.backgroundColor,
      surface: this.theme.surfaceColor,
      sidebar: this.theme.sidebarColor,
      navbar: this.theme.navbarColor
    };
  }

  getChartColors() {
    return [...this.theme.chartColors];
  }

  isDarkMode() {
    return this.theme.darkMode;
  }
}

// Istanza globale
const themeManager = new ProjectThemeManager();

// Esponi globalmente per compatibilità
window.themeManager = themeManager;

// Auto-apply al caricamento
document.addEventListener('DOMContentLoaded', () => {
  themeManager.applyTheme();
});
