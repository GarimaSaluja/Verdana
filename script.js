/* ============================================================
   VERDANA — Plant Care Studio  |  script.js
   ============================================================ */

// ── Plant Database ───────────────────────────────────────────
const PLANTS_DB = [
  { id: 1, name: "Monstera Deliciosa", emoji: "🌿", scientific: "Monstera deliciosa", difficulty: "easy", light: "bright_indirect", water: "Weekly", humidity: "High", soil: "Well-draining", fertilizer: "Monthly (spring/summer)", temp: "18–30°C", category: "tropical", tags: ["easy", "trending", "air-purifying"], bg: "linear-gradient(135deg,#c8e6c0,#a5d6a7)", height: "180px", fs: "4.5rem", description: "The iconic split-leaf plant, perfect for any home." },
  { id: 2, name: "Peace Lily", emoji: "🌸", scientific: "Spathiphyllum wallisii", difficulty: "easy", light: "low_light", water: "Weekly", humidity: "High", soil: "Moist", fertilizer: "Every 6 weeks", temp: "18–30°C", category: "flowering", tags: ["easy", "low_light", "air-purifying"], bg: "linear-gradient(135deg,#e8f5e9,#f3e5f5)", height: "150px", fs: "3.5rem", description: "Elegant white blooms, thrives in low light." },
  { id: 3, name: "Snake Plant", emoji: "🌱", scientific: "Sansevieria trifasciata", difficulty: "easy", light: "low_light", water: "Every 2-3 weeks", humidity: "Low", soil: "Sandy/dry", fertilizer: "Twice a year", temp: "15–30°C", category: "succulent", tags: ["easy", "low_light", "beginner"], bg: "linear-gradient(135deg,#dcedc8,#f9fbe7)", height: "200px", fs: "3rem", description: "Nearly indestructible. Perfect for beginners." },
  { id: 4, name: "Fiddle Leaf Fig", emoji: "🪴", scientific: "Ficus lyrata", difficulty: "hard", light: "bright_indirect", water: "Weekly", humidity: "Medium", soil: "Well-draining", fertilizer: "Monthly (spring)", temp: "16–24°C", category: "tropical", tags: ["hard", "statement", "trending"], bg: "linear-gradient(135deg,#c8e6c0,#ffe0b2)", height: "220px", fs: "5rem", description: "The diva of indoor plants. Dramatic and stunning." },
  { id: 5, name: "Pothos", emoji: "🍃", scientific: "Epipremnum aureum", difficulty: "easy", light: "low_light", water: "Every 1-2 weeks", humidity: "Low", soil: "Any well-draining", fertilizer: "Every 3 months", temp: "15–30°C", category: "trailing", tags: ["easy", "trailing", "beginner"], bg: "linear-gradient(135deg,#a5d6a7,#c5e1a5)", height: "140px", fs: "3.5rem", description: "The ultimate easy-care trailing vine." },
  { id: 6, name: "Aloe Vera", emoji: "🌵", scientific: "Aloe barbadensis", difficulty: "easy", light: "bright_direct", water: "Every 2-3 weeks", humidity: "Low", soil: "Cactus/sandy", fertilizer: "Once in spring", temp: "13–27°C", category: "succulent", tags: ["easy", "succulent", "medicinal"], bg: "linear-gradient(135deg,#f9fbe7,#dcedc8)", height: "160px", fs: "4rem", description: "Medicinal and striking. Almost thrives on neglect." },
  { id: 7, name: "Bird of Paradise", emoji: "🌺", scientific: "Strelitzia reginae", difficulty: "medium", light: "bright_direct", water: "Weekly", humidity: "Medium", soil: "Well-draining", fertilizer: "Monthly", temp: "18–30°C", category: "tropical", tags: ["medium", "statement", "tropical"], bg: "linear-gradient(135deg,#fff9c4,#ffcc80)", height: "200px", fs: "4.5rem", description: "Dramatic tropical statement plant." },
  { id: 8, name: "ZZ Plant", emoji: "🪴", scientific: "Zamioculcas zamiifolia", difficulty: "easy", light: "low_light", water: "Every 2-3 weeks", humidity: "Low", soil: "Well-draining", fertilizer: "Twice a year", temp: "15–30°C", category: "tropical", tags: ["easy", "low_light", "drought-tolerant"], bg: "linear-gradient(135deg,#e8f5e9,#c8e6c0)", height: "170px", fs: "3.5rem", description: "Glossy, architectural leaves. Survives anything." },
  { id: 9, name: "Calathea", emoji: "🍀", scientific: "Calathea orbifolia", difficulty: "hard", light: "medium", water: "Weekly (distilled)", humidity: "Very High", soil: "Moist, well-draining", fertilizer: "Monthly", temp: "18–24°C", category: "tropical", tags: ["hard", "patterned", "humidity-lover"], bg: "linear-gradient(135deg,#e0f2f1,#b2dfdb)", height: "160px", fs: "4rem", description: "Living art with stunning leaf patterns." },
  { id: 10, name: "Rubber Plant", emoji: "🌿", scientific: "Ficus elastica", difficulty: "medium", light: "bright_indirect", water: "Every 1-2 weeks", humidity: "Medium", soil: "Well-draining", fertilizer: "Monthly (spring)", temp: "15–27°C", category: "tropical", tags: ["medium", "statement", "easy-going"], bg: "linear-gradient(135deg,#c8e6c0,#80cbc4)", height: "190px", fs: "4rem", description: "Bold, glossy leaves with a sculptural form." },
  { id: 11, name: "String of Pearls", emoji: "🌾", scientific: "Senecio rowleyanus", difficulty: "medium", light: "bright_indirect", water: "Every 2 weeks", humidity: "Low", soil: "Cactus mix", fertilizer: "Monthly (spring)", temp: "18–24°C", category: "succulent", tags: ["medium", "succulent", "trailing"], bg: "linear-gradient(135deg,#f9fbe7,#e8f5e9)", height: "150px", fs: "3rem", description: "Cascading strings of perfect pearl-shaped leaves." },
  { id: 12, name: "Orchid", emoji: "🌷", scientific: "Phalaenopsis spp.", difficulty: "medium", light: "bright_indirect", water: "Weekly (soak)", humidity: "High", soil: "Orchid bark", fertilizer: "Weekly diluted", temp: "16–29°C", category: "flowering", tags: ["medium", "flowering", "elegant"], bg: "linear-gradient(135deg,#f3e5f5,#e1bee7)", height: "170px", fs: "4rem", description: "Sophisticated blooms that last for months." },
];

// ── Light Meter Presets ──────────────────────────────────────
const LIGHT_SCANS = {
  south_window: { lux: 8000, label: "Bright Direct Light", color: "#ffd54f", bar: 95, emoji: "☀️", desc: "Intense direct sunlight — great for sun-loving plants!", plants: ["Aloe Vera", "Cacti & Succulents", "Bird of Paradise", "Herbs"] },
  north_window: { lux: 500, label: "Low Light", color: "#b39ddb", bar: 20, emoji: "🌑", desc: "Soft cool light — perfect for shade-tolerant plants.", plants: ["Peace Lily", "ZZ Plant", "Pothos", "Snake Plant"] },
  open_garden: { lux: 50000, label: "Full Outdoor Sun", color: "#ff8f00", bar: 100, emoji: "🌞", desc: "Full outdoor sunlight — ideal for vegetables and sun-lovers.", plants: ["Rose", "Tomatoes", "Bird of Paradise", "Most Herbs"] },
  dark_corner: { lux: 50, label: "Very Low Light", color: "#7e57c2", bar: 8, emoji: "🖤", desc: "Very little natural light — consider adding a grow light!", plants: ["ZZ Plant", "Cast Iron Plant", "Snake Plant (barely)"] },
  bright_room: { lux: 2500, label: "Bright Indirect Light", color: "#aed581", bar: 60, emoji: "✨", desc: "Bright filtered light — the sweet spot for most houseplants.", plants: ["Monstera", "Fiddle Leaf Fig", "Rubber Plant", "Orchid"] },
  shaded_balcony: { lux: 1500, label: "Medium Indirect Light", color: "#80cbc4", bar: 40, emoji: "🌇", desc: "Good filtered outdoor light — brightness without harsh sun.", plants: ["Ferns", "Calathea", "Peace Lily", "String of Pearls"] },
};

// ── Chatbot replies (keyword-matched, no API) ─────────────────
const BOT_REPLIES = {
  yellow: "Yellow leaves = overwatering 💧 Let the soil dry out between waterings and check for root rot.",
  water: "Most houseplants like watering once a week. Check if top inch of soil is dry first! 🌱",
  light: "Most plants love bright indirect light — near a window but NOT in direct sun. ☀️",
  brown: "Brown tips = low humidity or underwatering. Try misting leaves or a pebble tray. 💨",
  droop: "Drooping = thirsty plant! Give it a good drink, it should perk up in a few hours. 💧",
  repot: "Repot when roots escape drainage holes — usually every 1–2 years. 🪴",
  soil: "Use well-draining soil for most plants. Succulents need a sandy/cactus mix. 🌱",
  beginner: "Best beginner plants: Snake Plant, Pothos, ZZ Plant, Peace Lily — nearly unkillable! 🌿",
  default: "Great question! 🌿 Most plants need bright indirect light, water when soil is dry, no cold drafts.",
};

// ── App State ────────────────────────────────────────────────
let currentUser = null;
let myPlants = [];
let careTasks = [];
let historyLog = [];
let currentFilter = 'all';
let currentCalMonth = new Date().getMonth();
let currentCalYear = new Date().getFullYear();
let uploadedImage = null;
let toastTimer;

// ── Init ─────────────────────────────────────────────────────
window.onload = () => {
  const saved = localStorage.getItem('verdana_user');
  if (saved) { currentUser = JSON.parse(saved); loadUserData(); showApp(); }
};

function loadUserData() {
  myPlants = JSON.parse(localStorage.getItem(`plants_${currentUser.email}`) || '[]');
  careTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.email}`) || '[]');
  historyLog = JSON.parse(localStorage.getItem(`history_${currentUser.email}`) || '[]');
}
function saveUserData() {
  localStorage.setItem(`plants_${currentUser.email}`, JSON.stringify(myPlants));
  localStorage.setItem(`tasks_${currentUser.email}`, JSON.stringify(careTasks));
  localStorage.setItem(`history_${currentUser.email}`, JSON.stringify(historyLog));
}

// ── Auth ─────────────────────────────────────────────────────
function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showPopup('⚠️ Invalid Email', 'Please enter a valid email.\nExample: yourname@gmail.com');
    return;
  }
  const raw = email.split('@')[0];
  const name = raw.charAt(0).toUpperCase() + raw.slice(1);
  currentUser = { email, name };
  localStorage.setItem('verdana_user', JSON.stringify(currentUser));
  loadUserData(); showApp();
  addHistory('login', '🔑', 'Signed in', `Welcome back, ${name}!`);
}

function handleSignup() {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showPopup('⚠️ Missing Info', 'Please enter your name and a valid email address.');
    return;
  }
  currentUser = { email, name };
  localStorage.setItem('verdana_user', JSON.stringify(currentUser));
  loadUserData(); showApp();
  addHistory('signup', '🌱', 'Account Created', `Welcome to Verdana, ${name}!`);
}

function showApp() {
  document.getElementById('loginPage').className = 'login-page hidden';
  document.getElementById('mainApp').classList.remove('hidden');
  document.getElementById('sidebarUserName').textContent = currentUser.name;
  document.getElementById('userAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
  // Profile pill click → show info popup
  const pill = document.getElementById('userPill');
  pill.style.cursor = 'pointer';
  pill.onclick = () => showPopup('👤 Profile', `Name:  ${currentUser.name}\nEmail: ${currentUser.email}`);
  renderMasonryGrid(); renderEncyclopedia(); renderCalendar();
  updateStats(); renderMyPlants(); renderHistory();
}

function logout() {
  localStorage.removeItem('verdana_user'); currentUser = null;
  document.getElementById('mainApp').classList.add('hidden');
  document.getElementById('loginPage').className = 'login-page active';
}
function showSignup() { document.getElementById('loginCard').classList.add('hidden'); document.getElementById('signupCard').classList.remove('hidden'); }
function showLogin() { document.getElementById('signupCard').classList.add('hidden'); document.getElementById('loginCard').classList.remove('hidden'); }

// ── Tab Navigation ────────────────────────────────────────────
function switchTab(tabName, el) {
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`tab-${tabName}`).classList.add('active');
  if (el) el.classList.add('active');
  if (tabName === 'calendar') renderCalendar();
  if (tabName === 'history') renderHistory();
  if (tabName === 'myplants') renderMyPlants();
  if (window.innerWidth <= 900) document.getElementById('sidebar').classList.remove('open');
}
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); }

// ── Reusable plant card HTML ──────────────────────────────────
function makePlantCard(p, height, fontSize) {
  const tagColor = t => t.includes('easy') ? 'easy' : t.includes('hard') ? 'hard' : t.includes('medium') ? 'medium' : 'light';
  return `<div class="masonry-card" onclick="openPlantModal(${p.id})" style="--h:${height};--fs:${fontSize}">
    <div class="masonry-thumb" style="background:${p.bg}"><span>${p.emoji}</span></div>
    <div class="masonry-card-body">
      <h4>${p.name}</h4><p>${p.description || p.scientific}</p>
      <div class="masonry-tags">${p.tags.map(t => `<span class="tag tag-${tagColor(t)}">${t}</span>`).join('')}</div>
    </div>
    <button class="masonry-add-btn" onclick="event.stopPropagation(); addPlantFromDB(${p.id})">+ Add to My Plants</button>
  </div>`;
}
function renderMasonryGrid() {
  document.getElementById('masonryGrid').innerHTML = PLANTS_DB.map(p => makePlantCard(p, p.height, p.fs)).join('');
}

// ── Encyclopedia ──────────────────────────────────────────────
function renderEncyclopedia(filter = 'all', search = '') {
  const filterKey = { easy: 'difficulty', medium: 'difficulty', hard: 'difficulty', low_light: 'light', succulent: 'category' };
  let plants = [...PLANTS_DB];
  if (search) plants = plants.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.includes(search.toLowerCase())));
  if (filter !== 'all') plants = plants.filter(p => p[filterKey[filter]] === filter);
  document.getElementById('encGrid').innerHTML = plants.map(p => makePlantCard(p, '140px', '3rem')).join('');
}
function filterEncyclopedia() { renderEncyclopedia(currentFilter, document.getElementById('encSearch').value); }
function filterEnc(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderEncyclopedia(filter, document.getElementById('encSearch').value);
}

// ── My Plants ─────────────────────────────────────────────────
function addPlantFromDB(id) {
  const plant = PLANTS_DB.find(p => p.id === id);
  if (!plant) return;
  if (myPlants.find(p => p.id === id)) { showToast(`${plant.name} is already in your collection!`); return; }
  myPlants.push({ ...plant, addedAt: new Date().toISOString(), lastWatered: null });
  saveUserData(); updateStats(); updatePlantCount();
  showToast(`${plant.emoji} ${plant.name} added!`);
  addHistory('add', plant.emoji, `Added ${plant.name}`, 'From encyclopedia');
}

function renderMyPlants() {
  const grid = document.getElementById('myPlantsGrid'), empty = document.getElementById('emptyPlants');
  if (!myPlants.length) { empty.classList.remove('hidden'); grid.innerHTML = ''; return; }
  empty.classList.add('hidden');
  grid.innerHTML = myPlants.map(p => `<div class="plant-card" onclick="openPlantModal(${p.id})">
    <div class="plant-card-thumb" style="background:${p.bg}">
      <span style="font-size:3.5rem">${p.emoji}</span>
      <span class="plant-health-badge health-good">✅ Healthy</span>
    </div>
    <div class="plant-card-body"><h4>${p.name}</h4><p>${p.scientific}</p>
      <div class="plant-card-actions">
        <button class="card-action-btn btn-water"  onclick="event.stopPropagation(); waterPlant(${p.id})">💧 Water</button>
        <button class="card-action-btn btn-view"   onclick="event.stopPropagation(); openPlantModal(${p.id})">👁️ View</button>
        <button class="card-action-btn btn-remove" onclick="event.stopPropagation(); removePlant(${p.id})">🗑️</button>
      </div>
    </div>
  </div>`).join('');
}

function waterPlant(id) {
  const p = myPlants.find(p => p.id === id); if (!p) return;
  p.lastWatered = new Date().toISOString(); saveUserData();
  showToast(`💧 ${p.name} watered!`);
  addHistory('water', '💧', `Watered ${p.name}`, new Date().toLocaleDateString());
  updateStats();
}
function removePlant(id) {
  const p = myPlants.find(p => p.id === id);
  myPlants = myPlants.filter(p => p.id !== id);
  saveUserData(); renderMyPlants(); updateStats(); updatePlantCount();
  if (p) { showToast(`${p.name} removed`); addHistory('remove', '🗑️', `Removed ${p.name}`, ''); }
}

// ── Stats ─────────────────────────────────────────────────────
function updateStats() {
  const today = new Date().toDateString();
  document.getElementById('totalPlants').textContent = myPlants.length;
  document.getElementById('waterToday').textContent = careTasks.filter(t => t.type === 'water' && new Date(t.date).toDateString() === today).length;
  document.getElementById('tasksToday').textContent = careTasks.filter(t => t.done && new Date(t.date).toDateString() === today).length;
  document.getElementById('identified').textContent = localStorage.getItem(`identified_${currentUser.email}`) || '0';
}
function updatePlantCount() { document.getElementById('plantCount').textContent = myPlants.length; }

// ── Identify Plant (DB-based, no API needed) ──────────────────
function handleImageUpload(event) {
  const file = event.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    uploadedImage = e.target.result.split(',')[1];
    document.getElementById('uploadPreview').src = e.target.result;
    document.getElementById('uploadPreview').classList.remove('hidden');
    document.getElementById('uploadContent').classList.add('hidden');
    document.getElementById('analyzeBtn').disabled = false;
  };
  reader.readAsDataURL(file);
}
function startIdentification() {
  document.getElementById('step1Card').classList.add('hidden');
  document.getElementById('step2Card').classList.remove('hidden');
}
function getCareGuide() {
  document.getElementById('step2Card').classList.add('hidden');
  document.getElementById('step3Card').classList.remove('hidden');
  // Pick a plant based on experience + sunlight preference
  const exp = document.querySelector('input[name="experience"]:checked')?.value || 'beginner';
  const sun = document.querySelector('input[name="sunlight"]:checked')?.value || 'partial';
  const diffMap = { beginner: 'easy', intermediate: 'medium', experienced: 'hard' };
  const target = diffMap[exp] || 'easy';
  const matches = PLANTS_DB.filter(p => p.difficulty === target && p.light.includes(sun.split('_')[0]));
  const plant = matches[0] || PLANTS_DB.filter(p => p.difficulty === target)[0] || PLANTS_DB[0];
  const metrics = [['💧', 'Watering', plant.water], ['☀️', 'Light', plant.light.replace('_', ' ')], ['💨', 'Humidity', plant.humidity], ['🌡️', 'Temp', plant.temp], ['🌱', 'Soil', plant.soil], ['🧪', 'Fertilizer', plant.fertilizer]];
  document.getElementById('careGuideResult').innerHTML = `<div class="care-card">
    <div class="care-card-header"><span class="care-card-emoji">${plant.emoji}</span>
      <div><h3>${plant.name}</h3><p>${plant.scientific} · Matched from database</p></div></div>
    <p style="color:var(--text-soft);font-size:.88rem;margin-bottom:1rem;font-style:italic">${plant.description}</p>
    <div class="care-metrics">${metrics.map(([i, l, v]) => `<div class="care-metric"><span class="cm-icon">${i}</span><div><span class="cm-label">${l}</span><span class="cm-value">${v}</span></div></div>`).join('')}</div>
    <div class="care-tips"><h4>💡 Care Tips</h4>
      <div class="tip-item"><span>✦</span>Water when top inch of soil feels dry</div>
      <div class="tip-item"><span>✦</span>Wipe leaves monthly to remove dust</div>
      <div class="tip-item"><span>✦</span>Rotate every few weeks for even growth</div>
      <div class="tip-item"><span>✦</span>Avoid cold drafts and heating vents</div>
    </div></div>`;
  document.getElementById('resultActions').classList.remove('hidden');
  const cnt = parseInt(localStorage.getItem(`identified_${currentUser.email}`) || '0') + 1;
  localStorage.setItem(`identified_${currentUser.email}`, cnt);
  addHistory('identify', '📸', `Matched: ${plant.name}`, `For ${exp} level`);
  window._identifiedPlant = plant;
}
function saveToMyPlants() {
  const plant = window._identifiedPlant; if (!plant) return;
  if (myPlants.find(p => p.id === plant.id)) { showToast('Already in collection!'); return; }
  myPlants.push({ ...plant, addedAt: new Date().toISOString(), lastWatered: null });
  saveUserData(); updateStats(); updatePlantCount();
  showToast(`💚 ${plant.name} saved!`);
}
function resetIdentify() {
  uploadedImage = null; window._identifiedPlant = null;
  document.getElementById('step1Card').classList.remove('hidden');
  ['step2Card', 'step3Card'].forEach(id => document.getElementById(id).classList.add('hidden'));
  document.getElementById('uploadPreview').classList.add('hidden');
  document.getElementById('uploadContent').classList.remove('hidden');
  document.getElementById('analyzeBtn').disabled = true;
  document.getElementById('resultActions').classList.add('hidden');
  document.querySelectorAll('.identify-card input[type=radio]').forEach(r => r.checked = false);
  document.getElementById('plantImageInput').value = '';
}

// ── Calendar ──────────────────────────────────────────────────
function renderCalendar() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  document.getElementById('calMonthTitle').textContent = `${months[currentCalMonth]} ${currentCalYear}`;
  const firstDay = new Date(currentCalYear, currentCalMonth, 1).getDay();
  const daysInMonth = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();
  const today = new Date();
  let html = '';
  for (let i = 0; i < firstDay; i++) html += `<div class="cal-day empty"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentCalYear}-${String(currentCalMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayTasks = careTasks.filter(t => t.date === dateStr);
    const isToday = d === today.getDate() && currentCalMonth === today.getMonth() && currentCalYear === today.getFullYear();
    const dots = dayTasks.slice(0, 3).map(t => `<span class="task-dot dot-${t.type}"></span>`).join('');
    html += `<div class="cal-day ${isToday ? 'today' : ''} ${dayTasks.length ? 'has-task' : ''}" onclick="showDayTasks('${dateStr}')">
      ${d}${dots ? `<div class="task-dots">${dots}</div>` : ''}
    </div>`;
  }
  document.getElementById('calGrid').innerHTML = html;
  updateTaskDropdown(); renderTodayTasks();
}
function changeMonth(dir) {
  currentCalMonth += dir;
  if (currentCalMonth > 11) { currentCalMonth = 0; currentCalYear++; }
  if (currentCalMonth < 0) { currentCalMonth = 11; currentCalYear--; }
  renderCalendar();
}
function addCalendarTask() {
  const plant = document.getElementById('taskPlantSelect').value;
  const type = document.getElementById('taskType').value;
  const date = document.getElementById('taskDate').value;
  const note = document.getElementById('taskNote').value;
  if (!plant || !date) { showToast('Please select a plant and date'); return; }
  careTasks.push({ id: Date.now(), plant, type, date, note, done: false });
  saveUserData(); renderCalendar();
  showToast(`✅ Task added for ${plant}`);
  addHistory('task', '📅', `Scheduled ${type} for ${plant}`, date);
  document.getElementById('taskNote').value = '';
  document.getElementById('taskDate').value = '';
}
function updateTaskDropdown() {
  const sel = document.getElementById('taskPlantSelect'), cur = sel.value;
  sel.innerHTML = '<option value="">Select plant...</option>';
  myPlants.forEach(p => sel.innerHTML += `<option value="${p.name}" ${cur === p.name ? 'selected' : ''}>${p.emoji} ${p.name}</option>`);
  PLANTS_DB.slice(0, 5).forEach(p => { if (!myPlants.find(m => m.id === p.id)) sel.innerHTML += `<option value="${p.name}">${p.emoji} ${p.name}</option>`; });
}
function renderTodayTasks() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const tasks = careTasks.filter(t => t.date === dateStr);
  document.getElementById('todayTasks').innerHTML = tasks.length
    ? tasks.map(t => `<div class="task-item">
        <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTask(${t.id})" id="task-${t.id}"/>
        <label for="task-${t.id}" style="${t.done ? 'text-decoration:line-through;opacity:.6' : ''}">
          ${getTaskEmoji(t.type)} ${t.type} · ${t.plant}
        </label>
      </div>`).join('')
    : '<p class="no-tasks">No tasks today 🌿</p>';
}
function showDayTasks(ds) {
  const tasks = careTasks.filter(t => t.date === ds), [, m, d] = ds.split('-');
  tasks.length ? showToast(`${tasks.length} task(s) on ${d}/${m}: ${tasks.map(t => t.type).join(', ')}`) : showToast(`No tasks on ${d}/${m}`);
}
function toggleTask(id) {
  const task = careTasks.find(t => t.id === id); if (!task) return;
  task.done = !task.done; saveUserData(); updateStats(); renderTodayTasks();
  if (task.done) addHistory('complete', '✅', `Completed ${task.type}`, `For ${task.plant}`);
}
function getTaskEmoji(type) { return { water: '💧', fertilize: '🌱', prune: '✂️', repot: '🪴', mist: '🌫️' }[type] || '📋'; }

// ── Light Meter ───────────────────────────────────────────────
function runLightScan(type) {
  const scan = LIGHT_SCANS[type]; if (!scan) return;
  document.querySelectorAll('.room-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  // Animate lux counter with ease-out effect
  let start = 0;
  const animate = ts => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / 1500, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    document.getElementById('meterValue').textContent = Math.floor(eased * scan.lux).toLocaleString() + ' lux';
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
  document.getElementById('meterLabel').textContent = scan.label;
  document.getElementById('meterSun').textContent = scan.emoji;
  // Build or reuse the gradient bar
  const visual = document.getElementById('meterVisual');
  let bar = visual.querySelector('.meter-bar-container');
  if (!bar) { bar = document.createElement('div'); bar.className = 'meter-bar-container'; bar.innerHTML = '<div class="meter-bar-fill"></div>'; visual.appendChild(bar); }
  setTimeout(() => { const fill = bar.querySelector('.meter-bar-fill'); fill.style.width = scan.bar + '%'; fill.style.background = `linear-gradient(90deg,var(--green-soft),${scan.color})`; }, 100);
  // Show result card
  const badge = document.getElementById('scanBadge');
  badge.textContent = scan.label; badge.style.background = scan.color + '33'; badge.style.color = scan.color;
  document.getElementById('scanDesc').textContent = scan.desc;
  document.getElementById('scanPlants').innerHTML = `<h5>🌿 Perfect Plants for This Spot:</h5><div class="scan-plant-tags">${scan.plants.map(p => `<span class="scan-tag">${p}</span>`).join('')}</div>`;
  document.getElementById('scanResult').classList.remove('hidden');
  addHistory('scan', '☀️', `Light Scan: ${scan.label}`, `${scan.lux.toLocaleString()} lux`);
}

// ── Plant Detail Modal ────────────────────────────────────────
function openPlantModal(id) {
  const plant = PLANTS_DB.find(p => p.id === id) || myPlants.find(p => p.id === id); if (!plant) return;
  const inCol = myPlants.some(p => p.id === id);
  const tagColor = t => t.includes('easy') ? 'easy' : t.includes('hard') ? 'hard' : 'medium';
  const careRows = [['💧 Watering', plant.water], ['☀️ Light', plant.light?.replace('_', ' ')], ['💨 Humidity', plant.humidity], ['🌱 Soil', plant.soil], ['🧪 Fertilizer', plant.fertilizer], ['🌡️ Temperature', plant.temp]];
  document.getElementById('modalBody').innerHTML = `
    <div class="modal-plant-header">
      <div style="font-size:4rem;width:80px;height:80px;background:${plant.bg};border-radius:20px;display:flex;align-items:center;justify-content:center">${plant.emoji}</div>
      <div><h2>${plant.name}</h2><p>${plant.scientific || 'Unknown'}</p>
        <div style="margin-top:.4rem">${(plant.tags || []).map(t => `<span class="tag tag-${tagColor(t)}" style="margin-right:4px">${t}</span>`).join('')}</div>
      </div>
    </div>
    <div class="modal-tabs">
      <button class="modal-tab active" onclick="showModalSection('care',this)">Care Guide</button>
      <button class="modal-tab"        onclick="showModalSection('about',this)">About</button>
      <button class="modal-tab"        onclick="showModalSection('tips',this)">Tips</button>
    </div>
    <div id="ms-care" class="modal-section active">${careRows.map(([k, v]) => `<div class="modal-care-row"><span>${k}</span><span>${v || 'N/A'}</span></div>`).join('')}</div>
    <div id="ms-about" class="modal-section">
      <p style="color:var(--text-soft);line-height:1.7;font-size:.9rem;margin-bottom:1rem">${plant.description}</p>
      <p style="font-size:.85rem;color:var(--text-muted)">Difficulty: <strong>${plant.difficulty}</strong> · Category: <strong>${plant.category}</strong></p>
    </div>
    <div id="ms-tips" class="modal-section">
      ${['Water when top inch of soil is dry', 'Wipe leaves monthly to remove dust', 'Rotate plant for even growth', 'Avoid cold drafts near windows'].map(tip => `<div class="tip-item"><span>✦</span>${tip}</div>`).join('')}
    </div>
    <div style="margin-top:1.5rem;display:flex;gap:.8rem">
      ${!inCol ? `<button class="btn-primary" style="flex:1" onclick="addPlantFromDB(${plant.id});closeModal()">+ Add to My Plants</button>`
      : `<button class="btn-ghost"   style="flex:1" disabled>✅ In Collection</button>`}
      <button class="btn-ghost" style="flex:1" onclick="addToCalendarQuick('${plant.name}')">📅 Schedule Care</button>
    </div>`;
  document.getElementById('plantModal').classList.remove('hidden');
  document.getElementById('plantModal').classList.add('active');
}
function showModalSection(sec, btn) {
  document.querySelectorAll('.modal-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.modal-tab').forEach(b => b.classList.remove('active'));
  document.getElementById(`ms-${sec}`).classList.add('active'); btn.classList.add('active');
}
function addToCalendarQuick(plantName) {
  closeModal();
  switchTab('calendar', document.querySelector('[data-tab=calendar]'));
  setTimeout(() => { for (let o of document.getElementById('taskPlantSelect').options) { if (o.value === plantName) { o.selected = true; break; } } showToast(`Selected ${plantName} in calendar`); }, 300);
}
function closeModal() {
  document.getElementById('plantModal').classList.remove('active');
  document.getElementById('plantModal').classList.add('hidden');
}

// ── History ───────────────────────────────────────────────────
function addHistory(type, icon, title, detail) {
  historyLog.unshift({ type, icon, title, detail, time: new Date().toISOString(), id: Date.now() });
  if (historyLog.length > 100) historyLog = historyLog.slice(0, 100);
  saveUserData(); renderHistory();
}
function renderHistory() {
  const timeline = document.getElementById('historyTimeline');
  const empty = document.getElementById('emptyHistory');
  const footer = document.getElementById('historyFooter');
  if (!historyLog.length) { empty.classList.remove('hidden'); timeline.innerHTML = ''; footer.classList.add('hidden'); return; }
  empty.classList.add('hidden'); footer.classList.remove('hidden');
  timeline.innerHTML = historyLog.map(h => {
    const d = new Date(h.time);
    const t = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    return `<div class="history-item"><div class="history-icon">${h.icon}</div><div class="history-info"><strong>${h.title}</strong><p>${h.detail}</p></div><div class="history-time">${t}</div></div>`;
  }).join('');
}
function clearHistory() {
  if (confirm('Clear all history?')) { historyLog = []; saveUserData(); renderHistory(); showToast('History cleared'); }
}

// ── Chatbot (keyword-based, no API) ───────────────────────────
function toggleChatbot() { document.getElementById('chatbotPanel').classList.toggle('open'); document.getElementById('chatNotif').style.display = 'none'; }
function handleChatKey(e) { if (e.key === 'Enter') sendChatMessage(); }
function sendSuggestion(text) { document.getElementById('chatInput').value = text; sendChatMessage(); }

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim(); if (!msg) return;
  input.value = '';
  appendChatMsg('user', msg);
  const lower = msg.toLowerCase();
  // Simple keyword matching → pick the best reply
  let reply = BOT_REPLIES.default;
  if (lower.includes('yellow')) reply = BOT_REPLIES.yellow;
  else if (lower.includes('water')) reply = BOT_REPLIES.water;
  else if (lower.includes('light') || lower.includes('sun')) reply = BOT_REPLIES.light;
  else if (lower.includes('brown')) reply = BOT_REPLIES.brown;
  else if (lower.includes('droop') || lower.includes('wilt')) reply = BOT_REPLIES.droop;
  else if (lower.includes('repot')) reply = BOT_REPLIES.repot;
  else if (lower.includes('soil')) reply = BOT_REPLIES.soil;
  else if (lower.includes('beginner') || lower.includes('easy')) reply = BOT_REPLIES.beginner;
  setTimeout(() => appendChatMsg('bot', reply), 500); // small delay for natural feel
  addHistory('chat', '🤖', 'Chat with Verdana', msg.slice(0, 40) + '...');
}
function appendChatMsg(role, text) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = `${role === 'bot' ? '<div class="msg-avatar">🌿</div>' : ''}<div class="msg-bubble">${text.replace(/\n/g, '<br>')}</div>${role === 'user' ? '<div class="msg-avatar" style="background:var(--green-pale)">👤</div>' : ''}`;
  msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight;
}

// ── Utilities: Toast + Popup ──────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('verdana-toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.id = 'verdana-toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}
function showPopup(title, msg) {
  let overlay = document.getElementById('verdana-popup');
  if (!overlay) {
    overlay = document.createElement('div'); overlay.id = 'verdana-popup';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:9999';
    overlay.innerHTML = `<div style="background:#fff;border-radius:20px;padding:2rem;max-width:320px;width:90%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.2)">
      <div id="popup-title" style="font-size:1.1rem;font-weight:700;margin-bottom:.6rem;color:#2d5a27"></div>
      <div id="popup-msg"   style="font-size:.9rem;color:#555;line-height:1.7;white-space:pre-line;margin-bottom:1.4rem"></div>
      <button onclick="document.getElementById('verdana-popup').style.display='none'"
        style="background:linear-gradient(135deg,#4caf50,#2d5a27);color:#fff;border:none;padding:.7rem 2rem;border-radius:12px;font-size:.9rem;cursor:pointer;font-weight:600">Got it ✓</button>
    </div>`;
    document.body.appendChild(overlay);
  }
  document.getElementById('popup-title').textContent = title;
  document.getElementById('popup-msg').textContent = msg;
  overlay.style.display = 'flex';
}

// ── Drag & Drop for image upload ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const zone = document.getElementById('uploadZone'); if (!zone) return;
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor = 'var(--green-mid)'; });
  zone.addEventListener('dragleave', () => { zone.style.borderColor = ''; });
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.style.borderColor = '';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = ev => {
        uploadedImage = ev.target.result.split(',')[1];
        document.getElementById('uploadPreview').src = ev.target.result;
        document.getElementById('uploadPreview').classList.remove('hidden');
        document.getElementById('uploadContent').classList.add('hidden');
        document.getElementById('analyzeBtn').disabled = false;
      };
      reader.readAsDataURL(file);
    }
  });
});

// Close modal when clicking the dark overlay behind it
document.addEventListener('click', e => { if (e.target.id === 'plantModal') closeModal(); });
