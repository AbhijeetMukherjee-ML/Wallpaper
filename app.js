// 1. Wallpaper Database Config (Clean Numbered 24-Hour Sequence)
const wallpapers = [
  { name: "12 AM - Darkest Midnight Abyss",     file: "wallpaper_00_midnight_abyss.jpg" },
  { name: "01 AM - Midnight Blue Aurora",      file: "wallpaper_01_blue_aurora.jpg" },
  { name: "02 AM - Deep Starry Night Sky",     file: "wallpaper_02_starry_night.jpg" },
  { name: "03 AM - Swirling Night Galaxy",     file: "wallpaper_03_night_galaxy.jpg" },
  { name: "04 AM - Pre-Dawn Crimson Sky",      file: "wallpaper_04_predawn_crimson.jpg" },
  { name: "05 AM - Soft Dawn Pink Horizon",    file: "wallpaper_05_dawn_pink.jpg" },
  { name: "06 AM - Sunrise Golden Orange",     file: "wallpaper_06_sunrise_orange.jpg" },
  { name: "07 AM - Early Morning Sunlit Sky",  file: "wallpaper_07_morning_sunlit.jpg" },
  { name: "08 AM - Warm Morning Sunshine",     file: "wallpaper_08_morning_sunshine.jpg" },
  { name: "09 AM - Golden Morning Light",      file: "wallpaper_09_golden_morning.jpg" },
  { name: "10 AM - Bright Blue Morning Sky",   file: "wallpaper_10_bright_morning.jpg" },
  { name: "11 AM - Clear Morning Atmosphere",  file: "wallpaper_11_pre_noon_blue.jpg" },
  { name: "12 PM - Peak Midday Brightness",    file: "wallpaper_12_peak_noon.jpg" },
  { name: "01 PM - High Midday Afternoon",     file: "wallpaper_13_midday_afternoon.jpg" },
  { name: "02 PM - Clear Afternoon Sun",       file: "wallpaper_14_afternoon_sun.jpg" },
  { name: "03 PM - Snowy Mountain Blue Sky",   file: "wallpaper_15_snowy_mountain_sky.jpg" },
  { name: "04 PM - Vibrant Afternoon Blue Sky", file: "wallpaper_16_vibrant_afternoon.jpg" },
  { name: "05 PM - Golden Hour Blue Sky",      file: "wallpaper_17_golden_hour_sky.jpg" },
  { name: "06 PM - Golden Hour Sky",          file: "wallpaper_18_golden_hour.jpg" },
  { name: "07 PM - Golden Orange Sunset",      file: "wallpaper_19_golden_sunset.jpg" },
  { name: "08 PM - Purple Dusk Sky",          file: "wallpaper_20_purple_dusk.jpg" },
  { name: "09 PM - Deep Violet Twilight",      file: "wallpaper_21_violet_twilight.jpg" },
  { name: "10 PM - Night Landscape & Ambient Sky", file: "wallpaper_22_night_landscape.jpg" },
  { name: "11 PM - Night Sky Nebula",          file: "wallpaper_23_night_nebula.jpg" }
];

// 24-Hour Wallpaper Schedule mapping
// Night (9 PM to 5 AM: Hours 21, 22, 23, 0, 1, 2, 3, 4) strictly uses pitch-dark night images!
const hourlyWallpapers = {
  // ── Pitch Dark Night Window (9 PM to 5 AM) ──
  21: "wallpaper_03_night_galaxy.jpg",     // 09 PM Night (Swirling Galaxy)
  22: "wallpaper_01_blue_aurora.jpg",      // 10 PM Night (Midnight Aurora)
  23: "wallpaper_02_starry_night.jpg",     // 11 PM Night (Deep Starry Sky)
  0:  "wallpaper_00_midnight_abyss.jpg",   // 12 AM Midnight (Midnight Abyss)
  1:  "wallpaper_01_blue_aurora.jpg",      // 01 AM Night (Midnight Aurora)
  2:  "wallpaper_02_starry_night.jpg",     // 02 AM Night (Deep Starry Sky)
  3:  "wallpaper_03_night_galaxy.jpg",     // 03 AM Night (Swirling Galaxy)
  4:  "wallpaper_00_midnight_abyss.jpg",   // 04 AM Night (Midnight Abyss)

  // ── Daytime Window (5 AM to 9 PM) ──
  5:  "wallpaper_04_predawn_crimson.jpg",  // 05 AM Pre-Dawn Crimson
  6:  "wallpaper_05_dawn_pink.jpg",        // 06 AM Dawn Pink
  7:  "wallpaper_06_sunrise_orange.jpg",   // 07 AM Sunrise Orange
  8:  "wallpaper_08_morning_sunshine.jpg", // 08 AM Morning Sunshine
  9:  "wallpaper_09_golden_morning.jpg",  // 09 AM Golden Morning Light
  10: "wallpaper_10_bright_morning.jpg",   // 10 AM Bright Blue Morning Sky
  11: "wallpaper_07_morning_sunlit.jpg",   // 11 AM Clear Pre-Noon Sky
  12: "wallpaper_12_peak_noon.jpg",        // 12 PM Peak Midday Sunshine
  13: "wallpaper_13_midday_afternoon.jpg", // 01 PM High Midday Afternoon
  14: "wallpaper_14_afternoon_sun.jpg",    // 02 PM Clear Afternoon Sun
  15: "wallpaper_15_snowy_mountain_sky.jpg",// 03 PM Snowy Mountain Blue Sky
  16: "wallpaper_16_vibrant_afternoon.jpg",// 04 PM Vibrant Afternoon Blue
  17: "wallpaper_17_golden_hour_sky.jpg",  // 05 PM Golden Hour Blue Sky
  18: "wallpaper_18_golden_hour.jpg",      // 06 PM Golden Hour Sky
  19: "wallpaper_19_golden_sunset.jpg",    // 07 PM Golden Orange Sunset
  20: "wallpaper_20_purple_dusk.jpg"       // 08 PM Dusk Purple Sky
};


// Global State
let currentWpIndex = 0;
let slideshowTimer = null;
let settings = {
  accentHue: 195,
  isLightMode: false,
  slideshowEnabled: false, // Default false, since bound to time
  slideshowInterval: 60,
  kenburnsStyle: "random",
  particleEffect: "stars",
  particleDensity: 100,
  particleSpeed: 3,
  clockStyle: "digital",
  showNotes: true,
  showTodo: true,
  showPomodoro: true,
  showSearch: true,
  
  // Day/Night celestial parameters
  celestialEnabled: true,
  timeSyncEnabled: true,
  demoTimeMinutes: 720 // 12:00 PM
};

// DOM Cache
const layers = [document.getElementById('bg-layer-1'), document.getElementById('bg-layer-2')];
let activeLayerIndex = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadSavedSettings();
  setupSettingsUI();
  setupWallpaperManager();
  setupParticles();
  setupWidgets();
  setupNotepadAndTodo();
  setupSoundscapes();
  setupCelestialCycle();

  // Slide settings trigger
  const settingsPanel = document.getElementById('settings-panel');
  document.getElementById('btn-settings-trigger').addEventListener('click', () => {
    settingsPanel.classList.add('open');
  });
  document.getElementById('btn-close-settings').addEventListener('click', () => {
    settingsPanel.classList.remove('open');
  });
});

// Load Settings from LocalStorage
function loadSavedSettings() {
  const saved = localStorage.getItem('wallpaper_dashboard_settings');
  if (saved) {
    try {
      settings = { ...settings, ...JSON.parse(saved) };
    } catch (e) {
      console.error("Failed to parse settings", e);
    }
  }
  
  // Set accent hue
  document.documentElement.style.setProperty('--accent-hue', settings.accentHue);
  if (settings.isLightMode) {
    document.body.setAttribute('data-theme', 'light');
    document.getElementById('theme-light-toggle').checked = true;
  } else {
    document.body.setAttribute('data-theme', 'dark');
    document.getElementById('theme-light-toggle').checked = false;
  }
}

// Save Settings to LocalStorage
function saveSettings() {
  localStorage.setItem('wallpaper_dashboard_settings', JSON.stringify(settings));
}

// Settings UI interaction bindings
function setupSettingsUI() {
  // Accent picker
  const dotsContainer = document.getElementById('accent-picker-container');
  dotsContainer.innerHTML = '';
  
  const hues = [195, 160, 280, 340, 40, 10, 80, 220];
  hues.forEach(hue => {
    const dot = document.createElement('div');
    dot.className = `accent-dot ${settings.accentHue == hue ? 'selected' : ''}`;
    dot.style.backgroundColor = `hsl(${hue}, 85%, 60%)`;
    dot.dataset.hue = hue;
    dot.addEventListener('click', () => {
      document.querySelectorAll('.accent-dot').forEach(d => d.classList.remove('selected'));
      dot.classList.add('selected');
      settings.accentHue = hue;
      document.documentElement.style.setProperty('--accent-hue', hue);
      saveSettings();
    });
    dotsContainer.appendChild(dot);
  });

  // Light mode toggle
  const lightToggle = document.getElementById('theme-light-toggle');
  lightToggle.addEventListener('change', (e) => {
    settings.isLightMode = e.target.checked;
    document.body.setAttribute('data-theme', settings.isLightMode ? 'light' : 'dark');
    saveSettings();
  });

  // Slideshow togglers
  const slideshowToggle = document.getElementById('slideshow-toggle');
  slideshowToggle.checked = settings.slideshowEnabled;
  slideshowToggle.addEventListener('change', (e) => {
    settings.slideshowEnabled = e.target.checked;
    toggleSlideshowTimer();
    saveSettings();
  });

  const slideshowIntervalSlider = document.getElementById('slideshow-interval');
  slideshowIntervalSlider.value = settings.slideshowInterval;
  slideshowIntervalSlider.addEventListener('change', (e) => {
    settings.slideshowInterval = parseInt(e.target.value);
    toggleSlideshowTimer();
    saveSettings();
  });

  // Ken burns selector
  const kbSelect = document.getElementById('kenburns-style');
  kbSelect.value = settings.kenburnsStyle;
  kbSelect.addEventListener('change', (e) => {
    settings.kenburnsStyle = e.target.value;
    updateWallpaperAnimation();
    saveSettings();
  });

  // Particles settings
  const partSelect = document.getElementById('particle-effect-type');
  partSelect.value = settings.particleEffect;
  partSelect.addEventListener('change', (e) => {
    settings.particleEffect = e.target.value;
    initParticleSystem();
    saveSettings();
  });

  const densitySlider = document.getElementById('particle-density');
  densitySlider.value = settings.particleDensity;
  densitySlider.addEventListener('change', (e) => {
    settings.particleDensity = parseInt(e.target.value);
    initParticleSystem();
    saveSettings();
  });

  const speedSlider = document.getElementById('particle-speed');
  speedSlider.value = settings.particleSpeed;
  speedSlider.addEventListener('change', (e) => {
    settings.particleSpeed = parseInt(e.target.value);
    saveSettings();
  });

  // Clock Layout selector
  const clockSelect = document.getElementById('clock-style');
  clockSelect.value = settings.clockStyle;
  clockSelect.addEventListener('change', (e) => {
    settings.clockStyle = e.target.value;
    updateClockLayout();
    saveSettings();
  });

  // Widget Toggles
  const widgetToggles = [
    { id: 'toggle-widget-notes', widgetId: 'widget-notes', settingsKey: 'showNotes' },
    { id: 'toggle-widget-todo', widgetId: 'widget-todo', settingsKey: 'showTodo' },
    { id: 'toggle-widget-pomodoro', widgetId: 'widget-pomodoro', settingsKey: 'showPomodoro' },
    { id: 'toggle-widget-search', widgetId: 'search-widget-form', settingsKey: 'showSearch' }
  ];

  widgetToggles.forEach(t => {
    const el = document.getElementById(t.id);
    el.checked = settings[t.settingsKey];
    const wNode = document.getElementById(t.widgetId);
    if (!settings[t.settingsKey]) wNode.classList.add('hidden-widget');
    
    el.addEventListener('change', (e) => {
      settings[t.settingsKey] = e.target.checked;
      if (settings[t.settingsKey]) {
        wNode.classList.remove('hidden-widget');
      } else {
        wNode.classList.add('hidden-widget');
      }
      saveSettings();
    });
  });

  // Wallpaper preview grid
  const grid = document.getElementById('settings-wallpaper-grid');
  grid.innerHTML = '';
  wallpapers.forEach((wp, index) => {
    const card = document.createElement('div');
    card.className = `wallpaper-thumb ${index === currentWpIndex ? 'selected' : ''}`;
    card.style.backgroundImage = `url('repo/${wp.file}')`;
    card.title = wp.name;
    card.addEventListener('click', () => {
      // If time sync is on, user can click to preview, but it will sync back on next interval
      document.querySelectorAll('.wallpaper-thumb').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      changeWallpaper(index);
    });
    grid.appendChild(card);
  });
}

// 4. Wallpaper Transitions & Ken Burns Panning
function setupWallpaperManager() {
  const initialIndex = parseInt(localStorage.getItem('current_wallpaper_index') || "0");
  currentWpIndex = (initialIndex >= 0 && initialIndex < wallpapers.length) ? initialIndex : 0;
  
  layers[0].style.backgroundImage = `url('repo/${wallpapers[currentWpIndex].file}')`;
  updateWallpaperAnimation();
  updateWallpaperInfoText();
  
  document.getElementById('btn-next-wp').addEventListener('click', () => {
    const nextIdx = (currentWpIndex + 1) % wallpapers.length;
    changeWallpaper(nextIdx);
  });
  document.getElementById('btn-prev-wp').addEventListener('click', () => {
    const prevIdx = (currentWpIndex - 1 + wallpapers.length) % wallpapers.length;
    changeWallpaper(prevIdx);
  });
  
  const playPauseBtn = document.getElementById('btn-play-pause');
  playPauseBtn.addEventListener('click', () => {
    settings.slideshowEnabled = !settings.slideshowEnabled;
    document.getElementById('slideshow-toggle').checked = settings.slideshowEnabled;
    toggleSlideshowTimer();
    updatePlayPauseButton();
    saveSettings();
  });
  
  toggleSlideshowTimer();
  updatePlayPauseButton();
}

function changeWallpaper(index) {
  if (index === currentWpIndex) return;
  currentWpIndex = index;
  localStorage.setItem('current_wallpaper_index', currentWpIndex);
  
  const thumbs = document.querySelectorAll('.wallpaper-thumb');
  thumbs.forEach((t, idx) => {
    if (idx === currentWpIndex) t.classList.add('selected');
    else t.classList.remove('selected');
  });

  const nextLayerIndex = 1 - activeLayerIndex;
  const nextLayer = layers[nextLayerIndex];
  const activeLayer = layers[activeLayerIndex];

  nextLayer.style.backgroundImage = `url('repo/${wallpapers[currentWpIndex].file}')`;
  
  resetKenBurns(nextLayer);
  applyKenBurns(nextLayer);
  
  nextLayer.classList.add('active');
  activeLayer.classList.remove('active');

  activeLayerIndex = nextLayerIndex;
  updateWallpaperInfoText();
  
  if (settings.slideshowEnabled) {
    toggleSlideshowTimer();
  }
}

function resetKenBurns(layer) {
  layer.classList.remove('kenburns-zoom-in', 'kenburns-zoom-out', 'kenburns-pan-left', 'kenburns-pan-right');
}

function applyKenBurns(layer) {
  if (settings.kenburnsStyle === "none") return;
  
  let animType = settings.kenburnsStyle;
  if (animType === "random") {
    const styles = ["zoom-in", "zoom-out", "pan-left", "pan-right"];
    animType = styles[Math.floor(Math.random() * styles.length)];
  }
  
  layer.classList.add(`kenburns-${animType}`);
}

function updateWallpaperAnimation() {
  layers.forEach(layer => {
    resetKenBurns(layer);
  });
  applyKenBurns(layers[activeLayerIndex]);
}

function updateWallpaperInfoText() {
  document.getElementById('selected-wallpaper-info').innerText = wallpapers[currentWpIndex].name;
}

function toggleSlideshowTimer() {
  if (slideshowTimer) {
    clearInterval(slideshowTimer);
    slideshowTimer = null;
  }
  
  if (settings.slideshowEnabled && !settings.timeSyncEnabled) {
    slideshowTimer = setInterval(() => {
      const nextIdx = (currentWpIndex + 1) % wallpapers.length;
      changeWallpaper(nextIdx);
    }, settings.slideshowInterval * 1000);
  }
  updatePlayPauseButton();
}

function updatePlayPauseButton() {
  const btn = document.getElementById('btn-play-pause');
  if (settings.slideshowEnabled) {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
    btn.title = "Pause Slideshow";
  } else {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    btn.title = "Start Slideshow";
  }
}

// 5. Day/Night Celestial Cycle Mechanics
function setupCelestialCycle() {
  const toggleCel = document.getElementById('toggle-celestial');
  const toggleSync = document.getElementById('toggle-time-sync');
  const demoControl = document.getElementById('demo-time-control');
  const demoSlider = document.getElementById('demo-time-slider');
  
  if (toggleCel) toggleCel.checked = settings.celestialEnabled;
  if (toggleSync) toggleSync.checked = settings.timeSyncEnabled;
  if (demoSlider) demoSlider.value = settings.demoTimeMinutes;
  
  // Apply initial visibility
  const celLayer = document.getElementById('celestial-layer');
  if (celLayer) celLayer.style.opacity = settings.celestialEnabled ? '1' : '0';
  
  if (settings.timeSyncEnabled) {
    if (demoControl) demoControl.style.display = 'none';
    hideSlideshowControls(true);
  } else {
    if (demoControl) demoControl.style.display = 'block';
    hideSlideshowControls(false);
    updateDemoTimeLabel(settings.demoTimeMinutes);
  }

  // Toggles Event Listeners
  if (toggleCel) {
    toggleCel.addEventListener('change', (e) => {
      settings.celestialEnabled = e.target.checked;
      if (celLayer) celLayer.style.opacity = settings.celestialEnabled ? '1' : '0';
      saveSettings();
    });
  }

  if (toggleSync) {
    toggleSync.addEventListener('change', (e) => {
      settings.timeSyncEnabled = e.target.checked;
      if (settings.timeSyncEnabled) {
        if (demoControl) demoControl.style.display = 'none';
        hideSlideshowControls(true);
        settings.slideshowEnabled = false;
        toggleSlideshowTimer();
      } else {
        if (demoControl) demoControl.style.display = 'block';
        hideSlideshowControls(false);
        if (demoSlider) updateDemoTimeLabel(demoSlider.value);
      }
      saveSettings();
      syncCycleToTime();
    });
  }

  if (demoSlider) {
    demoSlider.addEventListener('input', (e) => {
      const mins = parseInt(e.target.value);
      settings.demoTimeMinutes = mins;
      updateDemoTimeLabel(mins);
      syncCycleToTime();
      saveSettings();
    });
  }

  // Start continuous synchronization check
  setInterval(syncCycleToTime, 1000);
  syncCycleToTime();
}

function hideSlideshowControls(hide) {
  const displayVal = hide ? 'none' : 'flex';
  const row1 = document.getElementById('slideshow-toggle-row');
  const row2 = document.getElementById('slideshow-interval-row');
  const nav = document.getElementById('slideshow-nav');
  if (row1) row1.style.display = displayVal;
  if (row2) row2.style.display = displayVal;
  if (nav) nav.style.display = displayVal;
}

function updateDemoTimeLabel(minutes) {
  let h = Math.floor(minutes / 60);
  let m = minutes % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  let displayHour = h % 12;
  displayHour = displayHour === 0 ? 12 : displayHour;
  const displayMin = m < 10 ? '0' + m : m;
  
  const lbl = document.getElementById('demo-time-val');
  if (lbl) lbl.innerText = `${displayHour}:${displayMin} ${ampm}`;
}

// Main scheduler function: Updates background wallpaper and positions sun/moon
function syncCycleToTime() {
  let hour, minute;
  
  if (settings.timeSyncEnabled) {
    const now = new Date();
    hour = now.getHours();
    minute = now.getMinutes();
  } else {
    hour = Math.floor(settings.demoTimeMinutes / 60);
    minute = settings.demoTimeMinutes % 60;
  }

  // 1. Position Sun and Moon
  const sun = document.getElementById('sun-element');
  const moon = document.getElementById('moon-element');
  const glow = document.getElementById('ambient-sky-glow');
  
  const timeVal = hour + (minute / 60); // Fractional hour (0.0 to 23.99)
  
  // Toggle body.is-night class strictly for 9 PM (21:00) to 5 AM (05:00) window
  const isNightTime = (hour >= 21 || hour < 5);
  document.body.classList.toggle('is-night', isNightTime);

  // Day vs Night Ambient Glow Shift
  if (!isNightTime) {
    // DAY TIME (5 AM to 9 PM)
    if (glow) {
      if (timeVal < 8.0) {
        // Sunrise (5 AM - 8 AM)
        glow.style.background = 'linear-gradient(135deg, rgba(255, 112, 67, 0.35), rgba(255, 202, 40, 0.15))';
      } else if (timeVal >= 17.0) {
        // Sunset/Dusk (5 PM - 9 PM)
        glow.style.background = 'linear-gradient(135deg, rgba(142, 36, 170, 0.35), rgba(255, 87, 34, 0.2))';
      } else {
        // Midday (8 AM - 5 PM)
        glow.style.background = 'linear-gradient(135deg, rgba(3, 169, 244, 0.08), rgba(255, 255, 255, 0.04))';
      }
    }
  } else {
    // NIGHT TIME (9 PM to 5 AM)
    if (glow) {
      glow.style.background = 'linear-gradient(135deg, rgba(10, 15, 30, 0.75), rgba(5, 8, 18, 0.6))';
    }
  }

  // 2. Synchronize active wallpaper based on hour
  const targetWpFile = hourlyWallpapers[hour];
  const targetWpIdx = wallpapers.findIndex(wp => wp.file === targetWpFile);
  
  if (targetWpIdx !== -1 && targetWpIdx !== currentWpIndex) {
    changeWallpaper(targetWpIdx);
  }
}

// 6. HTML5 Responsive Canvas Particle Engine
let canvas, ctx;
let particlesList = [];
let cursor = { x: null, y: null, radius: 120 };

function setupParticles() {
  canvas = document.getElementById('particle-canvas');
  ctx = canvas.getContext('2d');
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
  });
  
  window.addEventListener('mouseleave', () => {
    cursor.x = null;
    cursor.y = null;
  });

  initParticleSystem();
  animateParticles();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticleSystem();
}

class Particle {
  constructor(type) {
    this.type = type;
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    
    if (this.type === "stars") {
      this.size = Math.random() * 1.8 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = -Math.random() * 0.15 - 0.05;
      this.alpha = Math.random() * 0.7 + 0.3;
      this.alphaChange = (Math.random() - 0.5) * 0.01;
    } else if (this.type === "orbs") {
      this.size = Math.random() * 40 + 15;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.12 + 0.03;
      this.color = settings.accentHue;
    } else if (this.type === "rain") {
      this.x = Math.random() * canvas.width;
      this.y = -Math.random() * 100;
      this.length = Math.random() * 18 + 10;
      this.vx = -1 - Math.random() * 0.5;
      this.vy = Math.random() * 12 + 10;
      this.alpha = Math.random() * 0.35 + 0.15;
    } else if (this.type === "snow") {
      this.x = Math.random() * canvas.width;
      this.y = -Math.random() * 50;
      this.size = Math.random() * 3 + 1;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = Math.random() * 1.5 + 0.5;
      this.swing = Math.random() * 2 * Math.PI;
      this.swingSpeed = Math.random() * 0.02 + 0.01;
      this.alpha = Math.random() * 0.6 + 0.2;
    }
  }

  update() {
    const scale = settings.particleSpeed / 3;
    
    if (this.type === "stars") {
      this.x += this.vx * scale;
      this.y += this.vy * scale;
      this.alpha += this.alphaChange;
      
      if (this.alpha > 0.95 || this.alpha < 0.2) this.alphaChange = -this.alphaChange;
      
      if (cursor.x !== null && cursor.y !== null) {
        const dx = this.x - cursor.x;
        const dy = this.y - cursor.y;
        const dist = Math.hypot(dx, dy);
        if (dist < cursor.radius) {
          const force = (cursor.radius - dist) / cursor.radius;
          const forceX = (dx / dist) * force * 1.2;
          const forceY = (dy / dist) * force * 1.2;
          this.x += forceX;
          this.y += forceY;
        }
      }
      
      if (this.y < 0) this.y = canvas.height;
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      
    } else if (this.type === "orbs") {
      this.x += this.vx * scale;
      this.y += this.vy * scale;
      
      if (cursor.x !== null && cursor.y !== null) {
        const dx = cursor.x - this.x;
        const dy = cursor.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 250) {
          this.x += (dx / dist) * 0.4 * scale;
          this.y += (dy / dist) * 0.4 * scale;
        }
      }

      if (this.x - this.size > canvas.width || this.x + this.size < 0 || this.y - this.size > canvas.height || this.y + this.size < 0) {
        this.reset();
      }
      
    } else if (this.type === "rain") {
      this.x += this.vx * scale;
      this.y += this.vy * scale;
      
      if (cursor.x !== null && cursor.y !== null) {
        const dx = this.x - cursor.x;
        const dy = this.y - cursor.y;
        const dist = Math.hypot(dx, dy);
        if (dist < cursor.radius - 30) {
          this.x += (dx / dist) * 4 * scale;
          this.y += 1;
        }
      }
      
      if (this.y > canvas.height || this.x < 0) {
        this.reset();
      }
      
    } else if (this.type === "snow") {
      this.swing += this.swingSpeed;
      this.x += (this.vx + Math.sin(this.swing) * 0.25) * scale;
      this.y += this.vy * scale;
      
      if (cursor.x !== null && cursor.y !== null) {
        const dx = this.x - cursor.x;
        const dy = this.y - cursor.y;
        const dist = Math.hypot(dx, dy);
        if (dist < cursor.radius) {
          this.x += (dx / dist) * 0.8 * scale;
        }
      }
      
      if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
        this.reset();
      }
    }
  }

  draw() {
    if (this.type === "stars") {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === "orbs") {
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      grad.addColorStop(0, `hsla(${settings.accentHue}, var(--accent-saturation), var(--accent-lightness), ${this.alpha})`);
      grad.addColorStop(0.5, `hsla(${settings.accentHue}, var(--accent-saturation), var(--accent-lightness), ${this.alpha * 0.4})`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === "rain") {
      ctx.strokeStyle = `rgba(174, 219, 255, ${this.alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.vx, this.y + this.length);
      ctx.stroke();
    } else if (this.type === "snow") {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function initParticleSystem() {
  particlesList = [];
  if (settings.particleEffect === "none") return;
  
  const count = settings.particleDensity;
  for (let i = 0; i < count; i++) {
    particlesList.push(new Particle(settings.particleEffect));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (settings.particleEffect !== "none") {
    particlesList.forEach(p => {
      p.update();
      p.draw();
    });
  }
  
  requestAnimationFrame(animateParticles);
}

// 7. Interactive Clock, Date, and Custom Greeting
function setupWidgets() {
  updateTime();
  setInterval(updateTime, 1000);
  
  const analogClock = document.getElementById('analog-clock-wrap');
  for (let i = 0; i < 12; i++) {
    const marker = document.createElement('div');
    marker.className = 'clock-marker';
    marker.style.transform = `rotate(${i * 30}deg)`;
    analogClock.appendChild(marker);
  }
  
  updateClockLayout();
  setupFocusTimer();
}

function updateTime() {
  const now = new Date();
  
  // 1. Digital Clock
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  
  document.getElementById('digital-clock').innerHTML = `${hours}:${minutes}<span>:${seconds}</span>`;
  
  // 2. Analog hands
  const secDeg = (now.getSeconds() * 6) + (now.getMilliseconds() * 0.006);
  const minDeg = (now.getMinutes() * 6) + (now.getSeconds() * 0.1);
  const hourDeg = (now.getHours() * 30) + (now.getMinutes() * 0.5);
  
  document.getElementById('second').style.transform = `translate(-50%, 0) rotate(${secDeg}deg)`;
  document.getElementById('minute').style.transform = `translate(-50%, 0) rotate(${minDeg}deg)`;
  document.getElementById('hour').style.transform = `translate(-50%, 0) rotate(${hourDeg}deg)`;
  
  // 3. Date
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  document.getElementById('current-date').innerText = now.toLocaleDateString('en-US', options);
  
  // 4. Greeting string
  const hour = now.getHours();
  let greetingStr = "Good evening";
  if (hour >= 5 && hour < 12) {
    greetingStr = "Good morning";
  } else if (hour >= 12 && hour < 17) {
    greetingStr = "Good afternoon";
  } else if (hour >= 22 || hour < 5) {
    greetingStr = "Good night, rest well";
  }
  document.getElementById('greeting').innerText = greetingStr;
}

function updateClockLayout() {
  const analog = document.getElementById('analog-clock-wrap');
  const digital = document.getElementById('digital-clock');
  
  if (settings.clockStyle === "digital") {
    analog.style.display = "none";
    digital.style.display = "block";
  } else if (settings.clockStyle === "analog") {
    analog.style.display = "block";
    digital.style.display = "none";
  } else {
    analog.style.display = "none";
    digital.style.display = "none";
  }
}

// 8. Focus Pomodoro Timer
let pomodoroTimer = null;
let timerRunning = false;
let timeRemaining = 25 * 60;

function setupFocusTimer() {
  const toggleBtn = document.getElementById('pomodoro-toggle');
  const resetBtn = document.getElementById('pomodoro-reset');
  const display = document.getElementById('pomodoro-time');
  const timerWidget = document.getElementById('widget-pomodoro');
  
  updateTimerDisplay();

  toggleBtn.addEventListener('click', () => {
    if (timerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  resetBtn.addEventListener('click', () => {
    resetTimer();
  });

  function startTimer() {
    timerRunning = true;
    timerWidget.classList.add('timer-active');
    toggleBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
    toggleBtn.title = "Pause Focus Session";
    
    pomodoroTimer = setInterval(() => {
      timeRemaining--;
      updateTimerDisplay();
      
      if (timeRemaining <= 0) {
        clearInterval(pomodoroTimer);
        timerRunning = false;
        timerWidget.classList.remove('timer-active');
        playCompletionBeep();
        alert("Focus Session Complete! Take a short break.");
        resetTimer();
      }
    }, 1000);
  }

  function pauseTimer() {
    timerRunning = false;
    timerWidget.classList.remove('timer-active');
    clearInterval(pomodoroTimer);
    toggleBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    toggleBtn.title = "Resume Focus Session";
  }

  function resetTimer() {
    pauseTimer();
    timeRemaining = 25 * 60;
    updateTimerDisplay();
    toggleBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    toggleBtn.title = "Start Focus Session";
  }

  function updateTimerDisplay() {
    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;
    display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}

function playCompletionBeep() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
    osc.frequency.setValueAtTime(880.00, audioCtx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  } catch (e) {
    console.error("Failed to generate beep", e);
  }
}

// 9. Scribble notepad & To-do list
function setupNotepadAndTodo() {
  const notesField = document.getElementById('scribble-pad');
  notesField.value = localStorage.getItem('wallpaper_scribble_pad') || '';
  
  notesField.addEventListener('input', (e) => {
    localStorage.setItem('wallpaper_scribble_pad', e.target.value);
  });

  // Todo list
  const todoList = document.getElementById('todo-list');
  const todoInput = document.getElementById('new-todo-text');
  const addBtn = document.getElementById('btn-add-todo');
  
  let todos = [];
  try {
    todos = JSON.parse(localStorage.getItem('wallpaper_todos') || '[]');
  } catch (e) {
    todos = [];
  }

  function renderTodos() {
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
      todoList.innerHTML = `<div style="text-align:center;padding:1rem;color:var(--text-muted);font-size:0.8rem;">No pending tasks! Add one below.</div>`;
      return;
    }

    todos.forEach((todo, idx) => {
      const item = document.createElement('div');
      item.className = 'todo-item';
      
      const check = document.createElement('input');
      check.type = 'checkbox';
      check.checked = todo.completed;
      check.id = `todo-${idx}`;
      check.addEventListener('change', () => {
        todos[idx].completed = check.checked;
        saveTodos();
        renderTodos();
      });
      
      const span = document.createElement('span');
      span.textContent = todo.text;
      
      const del = document.createElement('button');
      del.className = 'todo-delete-btn';
      del.title = "Delete task";
      del.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
      del.addEventListener('click', () => {
        todos.splice(idx, 1);
        saveTodos();
        renderTodos();
      });
      
      item.appendChild(check);
      item.appendChild(span);
      item.appendChild(del);
      todoList.appendChild(item);
    });
  }

  function saveTodos() {
    localStorage.setItem('wallpaper_todos', JSON.stringify(todos));
  }

  addBtn.addEventListener('click', () => {
    const txt = todoInput.value.trim();
    if (txt) {
      todos.push({ text: txt, completed: false });
      todoInput.value = '';
      saveTodos();
      renderTodos();
    }
  });

  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addBtn.click();
    }
  });

  renderTodos();
}

// 10. Procedural Web Audio Ambient Soundscape Synthesizer
let audioCtx = null;
let soundNodes = {
  rain: null,
  waves: null,
  masterGain: null
};

function initAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  soundNodes.masterGain = audioCtx.createGain();
  soundNodes.masterGain.gain.setValueAtTime(0.25, audioCtx.currentTime);
  soundNodes.masterGain.connect(audioCtx.destination);
}

function createPinkNoiseNode() {
  const bufferSize = 4096 * 4;
  const node = audioCtx.createScriptProcessor(bufferSize, 1, 1);
  let b0, b1, b2, b3, b4, b5, b6;
  b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
  
  node.onaudioprocess = function(e) {
    const output = e.outputBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }
  };
  return node;
}

function startRainSynthesizer() {
  initAudio();
  
  const rainNoise = createPinkNoiseNode();
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1200, audioCtx.currentTime);
  
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
  
  rainNoise.connect(filter);
  filter.connect(gain);
  gain.connect(soundNodes.masterGain);
  
  let dropletTimer = setInterval(() => {
    if (audioCtx && audioCtx.state !== 'suspended') {
      const osc = audioCtx.createOscillator();
      const clickGain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000 + Math.random() * 2000, audioCtx.currentTime);
      
      clickGain.gain.setValueAtTime(0, audioCtx.currentTime);
      clickGain.gain.linearRampToValueAtTime(0.005 + Math.random() * 0.01, audioCtx.currentTime + 0.002);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
      
      osc.connect(clickGain);
      clickGain.connect(soundNodes.masterGain);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    }
  }, 120);

  soundNodes.rain = {
    noiseNode: rainNoise,
    gainNode: gain,
    timerId: dropletTimer,
    stop: function() {
      clearInterval(dropletTimer);
      rainNoise.disconnect();
      filter.disconnect();
      gain.disconnect();
    }
  };
}

function startWavesSynthesizer() {
  initAudio();
  
  const waveNoise = createPinkNoiseNode();
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(320, audioCtx.currentTime);
  
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.0, audioCtx.currentTime);
  
  waveNoise.connect(filter);
  filter.connect(gain);
  gain.connect(soundNodes.masterGain);
  
  const lfo = audioCtx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime);
  
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.setValueAtTime(0.25, audioCtx.currentTime);
  
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);
  
  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  lfo.start();
  
  soundNodes.waves = {
    noiseNode: waveNoise,
    lfoNode: lfo,
    gainNode: gain,
    stop: function() {
      lfo.stop();
      waveNoise.disconnect();
      filter.disconnect();
      lfoGain.disconnect();
      gain.disconnect();
    }
  };
}

function setupSoundscapes() {
  const rainBtn = document.getElementById('btn-sound-rain');
  const wavesBtn = document.getElementById('btn-sound-waves');
  const volumeSlider = document.getElementById('soundscape-volume');
  
  rainBtn.addEventListener('click', () => {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    if (soundNodes.rain) {
      soundNodes.rain.stop();
      soundNodes.rain = null;
      rainBtn.classList.remove('playing');
    } else {
      startRainSynthesizer();
      rainBtn.classList.add('playing');
    }
  });

  wavesBtn.addEventListener('click', () => {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    if (soundNodes.waves) {
      soundNodes.waves.stop();
      soundNodes.waves = null;
      wavesBtn.classList.remove('playing');
    } else {
      startWavesSynthesizer();
      wavesBtn.classList.add('playing');
    }
  });

  volumeSlider.addEventListener('input', (e) => {
    initAudio();
    if (soundNodes.masterGain) {
      soundNodes.masterGain.gain.setValueAtTime(parseFloat(e.target.value) * 0.5, audioCtx.currentTime);
    }
  });
}
