// ===================================
// SETUP CONFIGURATOR
// Gestisce configurazione tema con Live Preview
// ===================================

class SetupConfigurator {
  constructor() {
    this.themeManager = window.themeManager;
    this.init();
  }

  init() {
    this.loadCurrentTheme();
    this.renderPresetThemes();
    this.renderPreviewChart();
    this.attachEventListeners();
  }

  // === CARICAMENTO TEMA CORRENTE === //

  loadCurrentTheme() {
    const theme = this.themeManager.getTheme();
    
    // Carica nome progetto
    document.getElementById('projectName').value = theme.projectName;
    
    // Carica colori
    document.getElementById('primaryColor').value = theme.primaryColor;
    document.getElementById('secondaryColor').value = theme.secondaryColor;
    document.getElementById('accentColor').value = theme.accentColor;
    document.getElementById('backgroundColor').value = theme.backgroundColor;
    
    // Carica logo se presente
    if (theme.logo) {
      this.displayLogo(theme.logo);
    }
    
    // Applica tema per preview
    this.updatePreview();
  }

  // === RENDERING PRESET === //

  renderPresetThemes() {
    const presets = this.themeManager.getPresetThemes();
    const container = document.getElementById('presetThemes');
    
    container.innerHTML = '';
    
    Object.keys(presets).forEach(key => {
      const preset = presets[key];
      const presetEl = document.createElement('div');
      presetEl.className = 'preset-theme';
      presetEl.dataset.preset = key;
      
      presetEl.innerHTML = `
        <div class="preset-name">${preset.name}</div>
        <div class="preset-description">${preset.description}</div>
        <div class="preset-colors">
          <div class="preset-color" style="background: ${preset.primaryColor}"></div>
          <div class="preset-color" style="background: ${preset.secondaryColor}"></div>
          <div class="preset-color" style="background: ${preset.accentColor}"></div>
        </div>
      `;
      
      presetEl.addEventListener('click', () => this.applyPreset(key, preset));
      
      container.appendChild(presetEl);
    });
  }

  applyPreset(key, preset) {
    // Aggiorna visivamente il preset attivo
    document.querySelectorAll('.preset-theme').forEach(el => {
      el.classList.remove('active');
    });
    document.querySelector(`[data-preset="${key}"]`).classList.add('active');
    
    // Aggiorna i color pickers
    document.getElementById('primaryColor').value = preset.primaryColor;
    document.getElementById('secondaryColor').value = preset.secondaryColor;
    document.getElementById('accentColor').value = preset.accentColor;
    document.getElementById('backgroundColor').value = preset.backgroundColor;
    
    // Applica il preset al theme manager (senza salvare ancora)
    this.themeManager.updateTheme({
      primaryColor: preset.primaryColor,
      secondaryColor: preset.secondaryColor,
      accentColor: preset.accentColor,
      backgroundColor: preset.backgroundColor,
      surfaceColor: preset.surfaceColor,
      sidebarColor: preset.sidebarColor,
      navbarColor: preset.navbarColor,
      chartColors: preset.chartColors
    });
    
    // Aggiorna preview
    this.updatePreview();
  }

  // === PREVIEW CHART === //

  renderPreviewChart() {
    const chartContainer = document.getElementById('previewChart');
    const chartColors = this.themeManager.getChartColors();
    
    // Dati fittizi per i bar
    const heights = [60, 80, 45, 90, 70, 85];
    
    chartContainer.innerHTML = '';
    
    heights.forEach((height, index) => {
      const bar = document.createElement('div');
      bar.className = 'preview-chart-bar';
      bar.style.height = `${height}%`;
      bar.style.background = chartColors[index % chartColors.length];
      chartContainer.appendChild(bar);
    });
  }

  // === UPDATE PREVIEW LIVE === //

  updatePreview() {
    // Aggiorna nome progetto nella preview
    const projectName = document.getElementById('projectName').value || 'Gestionale Demo';
    document.getElementById('previewProjectName').textContent = projectName;
    
    // Ri-renderizza chart con nuovi colori
    this.renderPreviewChart();
  }

  // === LOGO UPLOAD === //

  handleLogoUpload(file) {
    if (!file) return;
    
    // Verifica tipo file
    if (!file.type.startsWith('image/')) {
      alert('Per favore carica un\'immagine valida (PNG, JPG, SVG)');
      return;
    }
    
    // Verifica dimensione (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Il file è troppo grande. Dimensione massima: 2MB');
      return;
    }
    
    // Leggi il file come Data URL
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const logoDataUrl = e.target.result;
      this.displayLogo(logoDataUrl);
      
      // Salva temporaneamente (verrà salvato definitivamente al click su "Avvia")
      this.currentLogo = logoDataUrl;
    };
    
    reader.readAsDataURL(file);
  }

  displayLogo(logoDataUrl) {
    const logoPreview = document.getElementById('logoPreview');
    const uploadArea = document.getElementById('logoUploadArea');
    
    logoPreview.src = logoDataUrl;
    logoPreview.classList.add('active');
    uploadArea.classList.add('has-logo');
  }

  // === EVENT LISTENERS === //

  attachEventListeners() {
    // Nome progetto - update live
    document.getElementById('projectName').addEventListener('input', (e) => {
      this.themeManager.setProjectName(e.target.value);
      this.updatePreview();
    });
    
    // Color pickers - update live
    const colorInputs = [
      'primaryColor',
      'secondaryColor',
      'accentColor',
      'backgroundColor'
    ];
    
    colorInputs.forEach(inputId => {
      document.getElementById(inputId).addEventListener('input', (e) => {
        // Deseleziona preset attivi
        document.querySelectorAll('.preset-theme').forEach(el => {
          el.classList.remove('active');
        });
        
        const colors = {};
        
        if (inputId === 'primaryColor') colors.primary = e.target.value;
        if (inputId === 'secondaryColor') colors.secondary = e.target.value;
        if (inputId === 'accentColor') colors.accent = e.target.value;
        if (inputId === 'backgroundColor') colors.background = e.target.value;
        
        this.themeManager.setColors(colors);
        this.updatePreview();
      });
    });
    
    // Logo Upload - Click
    document.getElementById('logoUploadArea').addEventListener('click', () => {
      document.getElementById('logoInput').click();
    });
    
    // Logo Upload - File Change
    document.getElementById('logoInput').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        this.handleLogoUpload(file);
      }
    });
    
    // Logo Upload - Drag & Drop
    const uploadArea = document.getElementById('logoUploadArea');
    
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = '#6366f1';
      uploadArea.style.background = 'rgba(99, 102, 241, 0.05)';
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = '';
      uploadArea.style.background = '';
    });
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = '';
      uploadArea.style.background = '';
      
      const file = e.dataTransfer.files[0];
      if (file) {
        this.handleLogoUpload(file);
      }
    });
    
    // Bottone Reset
    document.getElementById('btnReset').addEventListener('click', () => {
      if (confirm('Sei sicuro di voler resettare tutte le impostazioni?')) {
        this.themeManager.reset();
        location.reload();
      }
    });
    
    // Bottone Launch
    document.getElementById('btnLaunch').addEventListener('click', () => {
      this.launchApp();
    });
  }

  // === LANCIO APP === //

  launchApp() {
    // Salva il logo se presente
    if (this.currentLogo) {
      this.themeManager.setLogo(this.currentLogo);
    }
    
    // Marca come configurato
    this.themeManager.markAsConfigured();
    
    // Mostra feedback
    const btnLaunch = document.getElementById('btnLaunch');
    btnLaunch.innerHTML = '<span>✅ Configurazione completata!</span>';
    btnLaunch.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    // Reindirizza al login dopo un breve delay
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 800);
  }
}

// === INIZIALIZZAZIONE === //

document.addEventListener('DOMContentLoaded', () => {
  new SetupConfigurator();
});
