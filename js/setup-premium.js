// ===================================
// SETUP PREMIUM CONFIGURATOR
// Design minimal professionale tipo Linear/Notion
// ===================================

class SetupPremiumConfigurator {
  constructor() {
    this.themeManager = window.themeManager;
    this.selectedPreset = null;
    this.currentLogo = null;
    this.init();
  }

  init() {
    this.renderPaletteGrid();
    this.renderPreviewChart();
    this.loadSavedConfig();
    this.attachEventListeners();
  }

  // === PALETTE GRID === //

  renderPaletteGrid() {
    const presets = this.themeManager.getPresetThemes();
    const container = document.getElementById('paletteGrid');
    
    container.innerHTML = '';
    
    Object.keys(presets).forEach((key, index) => {
      const preset = presets[key];
      const card = document.createElement('div');
      card.className = 'palette-card';
      card.dataset.preset = key;
      
      // Auto-select primo preset
      if (index === 0) {
        card.classList.add('active');
        this.selectedPreset = key;
        this.applyPreset(key, preset);
      }
      
      card.innerHTML = `
        <div class="palette-preview">
          <div class="palette-color" style="background: ${preset.backgroundColor}"></div>
          <div class="palette-color" style="background: ${preset.sidebarColor}"></div>
          <div class="palette-color" style="background: ${preset.primaryColor}"></div>
          <div class="palette-color" style="background: ${preset.accentColor}"></div>
        </div>
        <div class="palette-name">${preset.name}</div>
        <div class="palette-desc">${preset.description}</div>
      `;
      
      card.addEventListener('click', () => this.selectPalette(key, preset, card));
      
      container.appendChild(card);
    });
  }

  selectPalette(key, preset, cardElement) {
    // Rimuovi active da tutte le card
    document.querySelectorAll('.palette-card').forEach(c => {
      c.classList.remove('active');
    });
    
    // Aggiungi active alla card selezionata
    cardElement.classList.add('active');
    this.selectedPreset = key;
    
    // Applica preset
    this.applyPreset(key, preset);
  }

  applyPreset(key, preset) {
    // Applica tema
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

  // === PREVIEW === //

  updatePreview() {
    // Aggiorna nome progetto
    const projectName = document.getElementById('projectName').value || 'Gestionale Demo';
    document.getElementById('previewName').textContent = projectName;
    
    // Aggiorna chart
    this.renderPreviewChart();
  }

  renderPreviewChart() {
    const chartContainer = document.getElementById('previewChart');
    const chartColors = this.themeManager.getChartColors();
    const heights = [45, 70, 55, 80, 60, 75];
    
    chartContainer.innerHTML = '';
    
    heights.forEach((height, index) => {
      const bar = document.createElement('div');
      bar.className = 'preview-bar';
      bar.style.height = `${height}%`;
      bar.style.background = chartColors[index % chartColors.length];
      chartContainer.appendChild(bar);
    });
  }

  // === LOGO === //

  handleLogoUpload(file) {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Carica un\'immagine valida (PNG, JPG, SVG)');
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
      alert('File troppo grande. Max 2MB');
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const logoDataUrl = e.target.result;
      this.displayLogo(logoDataUrl);
      this.currentLogo = logoDataUrl;
    };
    
    reader.readAsDataURL(file);
  }

  displayLogo(logoDataUrl) {
    const preview = document.getElementById('logoPreview');
    const uploadArea = document.getElementById('logoUpload');
    
    preview.src = logoDataUrl;
    preview.classList.add('active');
    uploadArea.classList.add('has-logo');
  }

  // === CONFIG === //

  loadSavedConfig() {
    const theme = this.themeManager.getTheme();
    
    // Carica nome
    document.getElementById('projectName').value = theme.projectName;
    
    // Carica logo se presente
    if (theme.logo) {
      this.displayLogo(theme.logo);
      this.currentLogo = theme.logo;
    }
    
    // Aggiorna preview
    this.updatePreview();
  }

  saveAndContinue() {
    // Salva nome progetto
    const projectName = document.getElementById('projectName').value.trim();
    if (projectName) {
      this.themeManager.setProjectName(projectName);
    }
    
    // Salva logo se presente
    if (this.currentLogo) {
      this.themeManager.setLogo(this.currentLogo);
    }
    
    // Marca come configurato
    this.themeManager.markAsConfigured();
    
    // Feedback visivo
    const btn = document.getElementById('btnContinue');
    btn.innerHTML = '<span>✓ Salvato</span>';
    btn.style.background = '#10b981';
    
    // Redirect al login
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 600);
  }

  // === EVENT LISTENERS === //

  attachEventListeners() {
    // Nome progetto - update live
    document.getElementById('projectName').addEventListener('input', () => {
      this.updatePreview();
    });
    
    // Logo upload - click
    document.getElementById('logoUpload').addEventListener('click', () => {
      document.getElementById('logoInput').click();
    });
    
    // Logo upload - file change
    document.getElementById('logoInput').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        this.handleLogoUpload(file);
      }
    });
    
    // Logo upload - drag & drop
    const uploadArea = document.getElementById('logoUpload');
    
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = '#0a0a0a';
      uploadArea.style.background = '#fafafa';
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
    
    // Bottone continua
    document.getElementById('btnContinue').addEventListener('click', () => {
      this.saveAndContinue();
    });
    
    // Enter key su input nome
    document.getElementById('projectName').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.saveAndContinue();
      }
    });
  }
}

// === INIZIALIZZAZIONE === //

document.addEventListener('DOMContentLoaded', () => {
  new SetupPremiumConfigurator();
});
