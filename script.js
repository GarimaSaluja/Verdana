// ====== PLANT DATABASE ======
const ANTHROPIC_API_KEY = atob('c2stYW50LWFwaTAzLWxVWlFkbkl5ZkRoM0xHdUNEOTNXOUpHRENPZ1hUdmN4WWNBR1FIbnJYTG1mRXBZX2VKUk1kbk5qR1ZjY2o2UDhJQ0IzbjVrSml1UnJ1SFBZZTc5SlFRLVFsVWZjQUFB');
const PLANTS_DB = [
  { id: 1, name: "Monstera Deliciosa", emoji: "🌿", scientific: "Monstera deliciosa", difficulty: "easy", light: "bright_indirect", water: "Weekly", humidity: "High", soil: "Well-draining", fertilizer: "Monthly (spring/summer)", temp: "18–30°C", category: "tropical", tags: ["easy", "trending", "air-purifying"], bg: "linear-gradient(135deg,#c8e6c0,#a5d6a7)", description: "The iconic split-leaf plant, perfect for any home." },
  { id: 2, name: "Peace Lily", emoji: "🌸", scientific: "Spathiphyllum wallisii", difficulty: "easy", light: "low_light", water: "Weekly", humidity: "High", soil: "Moist", fertilizer: "Every 6 weeks", temp: "18–30°C", category: "flowering", tags: ["easy", "low_light", "air-purifying"], bg: "linear-gradient(135deg,#e8f5e9,#f3e5f5)", description: "Elegant white blooms, thrives in low light." },
  { id: 3, name: "Snake Plant", emoji: "🌱", scientific: "Sansevieria trifasciata", difficulty: "easy", light: "low_light", water: "Every 2-3 weeks", humidity: "Low", soil: "Sandy/dry", fertilizer: "Twice a year", temp: "15–30°C", category: "succulent", tags: ["easy", "low_light", "beginner"], bg: "linear-gradient(135deg,#dcedc8,#f9fbe7)", description: "Nearly indestructible. Perfect for beginners." },
  { id: 4, name: "Fiddle Leaf Fig", emoji: "🪴", scientific: "Ficus lyrata", difficulty: "hard", light: "bright_indirect", water: "Weekly", humidity: "Medium", soil: "Well-draining", fertilizer: "Monthly (spring)", temp: "16–24°C", category: "tropical", tags: ["hard", "statement", "trending"], bg: "linear-gradient(135deg,#c8e6c0,#ffe0b2)", description: "The diva of indoor plants. Dramatic and stunning." },
  { id: 5, name: "Pothos", emoji: "🍃", scientific: "Epipremnum aureum", difficulty: "easy", light: "low_light", water: "Every 1-2 weeks", humidity: "Low", soil: "Any well-draining", fertilizer: "Every 3 months", temp: "15–30°C", category: "trailing", tags: ["easy", "trailing", "beginner"], bg: "linear-gradient(135deg,#a5d6a7,#c5e1a5)", description: "The ultimate easy-care trailing vine." },
  { id: 6, name: "Aloe Vera", emoji: "🌵", scientific: "Aloe barbadensis", difficulty: "easy", light: "bright_direct", water: "Every 2-3 weeks", humidity: "Low", soil: "Cactus/sandy", fertilizer: "Once in spring", temp: "13–27°C", category: "succulent", tags: ["easy", "succulent", "medicinal"], bg: "linear-gradient(135deg,#f9fbe7,#dcedc8)", description: "Medicinal and striking. Almost thrives on neglect." },
  { id: 7, name: "Bird of Paradise", emoji: "🌺", scientific: "Strelitzia reginae", difficulty: "medium", light: "bright_direct", water: "Weekly", humidity: "Medium", soil: "Well-draining", fertilizer: "Monthly", temp: "18–30°C", category: "tropical", tags: ["medium", "statement", "tropical"], bg: "linear-gradient(135deg,#fff9c4,#ffcc80)", description: "Dramatic tropical statement plant." },
  { id: 8, name: "ZZ Plant", emoji: "🪴", scientific: "Zamioculcas zamiifolia", difficulty: "easy", light: "low_light", water: "Every 2-3 weeks", humidity: "Low", soil: "Well-draining", fertilizer: "Twice a year", temp: "15–30°C", category: "tropical", tags: ["easy", "low_light", "drought-tolerant"], bg: "linear-gradient(135deg,#e8f5e9,#c8e6c0)", description: "Glossy, architectural leaves. Survives anything." },
  { id: 9, name: "Calathea", emoji: "🍀", scientific: "Calathea orbifolia", difficulty: "hard", light: "medium", water: "Weekly (distilled)", humidity: "Very High", soil: "Moist, well-draining", fertilizer: "Monthly", temp: "18–24°C", category: "tropical", tags: ["hard", "patterned", "humidity-lover"], bg: "linear-gradient(135deg,#e0f2f1,#b2dfdb)", description: "Living art with stunning leaf patterns." },
  { id: 10, name: "Rubber Plant", emoji: "🌿", scientific: "Ficus elastica", difficulty: "medium", light: "bright_indirect", water: "Every 1-2 weeks", humidity: "Medium", soil: "Well-draining", fertilizer: "Monthly (spring)", temp: "15–27°C", category: "tropical", tags: ["medium", "statement", "easy-going"], bg: "linear-gradient(135deg,#c8e6c0,#80cbc4)", description: "Bold, glossy leaves with a sculptural form." },
  { id: 11, name: "String of Pearls", emoji: "🌾", scientific: "Senecio rowleyanus", difficulty: "medium", light: "bright_indirect", water: "Every 2 weeks", humidity: "Low", soil: "Cactus mix", fertilizer: "Monthly (spring)", temp: "18–24°C", category: "succulent", tags: ["medium", "succulent", "trailing"], bg: "linear-gradient(135deg,#f9fbe7,#e8f5e9)", description: "Cascading strings of perfect pearl-shaped leaves." },
  { id: 12, name: "Orchid", emoji: "🌷", scientific: "Phalaenopsis spp.", difficulty: "medium", light: "bright_indirect", water: "Weekly (soak method)", humidity: "High", soil: "Orchid bark", fertilizer: "Weekly diluted", temp: "16–29°C", category: "flowering", tags: ["medium", "flowering", "elegant"], bg: "linear-gradient(135deg,#f3e5f5,#e1bee7)", description: "Sophisticated blooms that last for months." },
];

// ====== STATE ======
let currentUser = null, myPlants = [], careTasks = [], historyLog = [];
let identifiedPlantData = null, currentCalMonth = new Date().getMonth(), currentCalYear = new Date().getFullYear();
let chatHistory = [], currentFilter = 'all', uploadedImageBase64 = null;

// ====== INIT ======
window.onload = () => {
  const saved = localStorage.getItem('verdana_user');
  if (saved) { currentUser = JSON.parse(saved); loadUserData(); showApp(); }
};

function loadUserData() {
  myPlants = JSON.parse(localStorage.getItem(`verdana_plants_${currentUser.email}`) || '[]');
  careTasks = JSON.parse(localStorage.getItem(`verdana_tasks_${currentUser.email}`) || '[]');
  historyLog = JSON.parse(localStorage.getItem(`verdana_history_${currentUser.email}`) || '[]');
}
function saveUserData() {
  localStorage.setItem(`verdana_plants_${currentUser.email}`, JSON.stringify(myPlants));
  localStorage.setItem(`verdana_tasks_${currentUser.email}`, JSON.stringify(careTasks));
  localStorage.setItem(`verdana_history_${currentUser.email}`, JSON.stringify(historyLog));
}

// ====== AUTH ======
function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  if (!email || !password) { showToast('Please fill in all fields'); return; }
  const name = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
  currentUser = { email, name };
  localStorage.setItem('verdana_user', JSON.stringify(currentUser));
  loadUserData(); showApp();
  addHistory('login', '🔑', 'Signed in', `Welcome back, ${name}!`);
}
function handleSignup() {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();
  if (!name || !email || !password) { showToast('Please fill in all fields'); return; }
  currentUser = { email, name };
  localStorage.setItem('verdana_user', JSON.stringify(currentUser));
  loadUserData(); showApp();
  addHistory('signup', '🌱', 'Account Created', `Welcome to Verdana, ${name}!`);
}
function showApp() {
  document.getElementById('loginPage').classList.remove('active');
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('hidden');
  document.getElementById('sidebarUserName').textContent = currentUser.name;
  document.getElementById('userAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
  renderEncyclopedia(); renderCalendar(); updateStats(); renderMyPlants(); renderHistory();
}
function logout() {
  localStorage.removeItem('verdana_user'); currentUser = null;
  document.getElementById('mainApp').classList.add('hidden');
  document.getElementById('loginPage').classList.remove('hidden');
  document.getElementById('loginPage').classList.add('active');
}
function showSignup() { document.getElementById('loginCard').classList.add('hidden'); document.getElementById('signupCard').classList.remove('hidden'); }
function showLogin() { document.getElementById('signupCard').classList.add('hidden'); document.getElementById('loginCard').classList.remove('hidden'); }

// ====== TABS ======
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

// ====== ENCYCLOPEDIA ======
let aiPlantCache = {}; // cache AI fetched plants so we don't re-fetch
let searchDebounce = null;

function renderEncyclopedia(filter = 'all', search = '') {
  const grid = document.getElementById('encGrid');
  let plants = [...PLANTS_DB, ...Object.values(aiPlantCache)];
  if (search) plants = plants.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || (p.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase())));
  if (filter === 'easy') plants = plants.filter(p => p.difficulty === 'easy');
  else if (filter === 'medium') plants = plants.filter(p => p.difficulty === 'medium');
  else if (filter === 'hard') plants = plants.filter(p => p.difficulty === 'hard');
  else if (filter === 'low_light') plants = plants.filter(p => p.light === 'low_light');
  else if (filter === 'succulent') plants = plants.filter(p => p.category === 'succulent');
  grid.innerHTML = plants.map(p => `
    <div class="plant-card" onclick="openPlantModal('${p.id}')">
      <div class="plant-card-thumb" style="background:${p.bg}">
        <span style="font-size:3rem">${p.emoji}</span>
        <span class="plant-health-badge health-good tag-${p.difficulty}">${p.difficulty}</span>
      </div>
      <div class="plant-card-body">
        <h4>${p.name}</h4>
        <p>${p.scientific}</p>
        <div class="plant-card-actions">
          <button class="card-action-btn btn-water" onclick="event.stopPropagation();addPlantFromDB('${p.id}')">+ Add</button>
          <button class="card-action-btn btn-view" onclick="event.stopPropagation();openPlantModal('${p.id}')">👁️ View</button>
        </div>
      </div>
    </div>`).join('');
}

function filterEncyclopedia() {
  const search = document.getElementById('encSearch').value.trim();
  clearTimeout(searchDebounce);
  renderEncyclopedia(currentFilter, search);
  if (search.length < 2) return;
  // Check if any results found in DB + cache
  const allPlants = [...PLANTS_DB, ...Object.values(aiPlantCache)];
  const found = allPlants.some(p => p.name.toLowerCase().includes(search.toLowerCase()) || (p.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase())));
  if (!found) {
    // Show AI searching loader after 600ms debounce
    searchDebounce = setTimeout(() => fetchAIPlant(search), 600);
  }
}

function filterEnc(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderEncyclopedia(filter, document.getElementById('encSearch').value);
}

async function fetchAIPlant(query) {
  // Already cached?
  const cacheKey = query.toLowerCase().trim();
  if (aiPlantCache[cacheKey]) { renderEncyclopedia(currentFilter, query); return; }

  const grid = document.getElementById('encGrid');
  // Show searching card
  grid.innerHTML = `
    <div class="ai-search-card">
      <div class="spinner"></div>
      <p>🔍 Searching AI for <strong>"${query}"</strong>...</p>
      <span>Fetching complete care guide</span>
    </div>`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", headers: { "Content-Type": "application/json", "x-api-key": ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
      body: JSON.stringify({
        model: "claude-haiku-4-5", max_tokens: 1000,
        messages: [{
          role: "user", content: `You are a botanist. The user searched for "${query}" in a plant encyclopedia. Identify the best matching plant and return ONLY valid JSON (no markdown, no backticks):
{"name":"full common name","scientific":"scientific name","emoji":"single most fitting emoji","difficulty":"easy/medium/hard","light":"low_light/medium/bright_indirect/bright_direct","water":"watering frequency","humidity":"Low/Medium/High/Very High","soil":"soil type","fertilizer":"fertilizer schedule","temp":"temperature range in °C","category":"tropical/succulent/flowering/trailing/herb/other","tags":["tag1","tag2","tag3"],"bg":"linear-gradient(135deg,#hex1,#hex2) using nature/plant appropriate colors","description":"2 sentence description","tips":["tip1","tip2","tip3","tip4"],"warning":"toxicity or caution if any, else empty string"}` }]
      })
    });
    const data = await res.json();
    const text = data.content.map(c => c.text || '').join('').replace(/```json|```/g, '').trim();
    const plant = JSON.parse(text);
    plant.id = 'ai_' + cacheKey.replace(/\s+/g, '_');
    plant.isAI = true;
    aiPlantCache[cacheKey] = plant;
    renderEncyclopedia(currentFilter, query);
    showToast(`✨ Found "${plant.name}" via AI!`);
  } catch (err) {
    grid.innerHTML = `<div class="ai-search-card ai-error"><p>😕 Couldn't find "${query}". Try a different name!</p></div>`;
  }
}

// ====== MY PLANTS ======
function addPlantFromDB(id) {
  const allPlants = [...PLANTS_DB, ...Object.values(aiPlantCache)];
  const plant = allPlants.find(p => String(p.id) === String(id));
  if (!plant) return;
  if (myPlants.find(p => String(p.id) === String(id))) { showToast(`${plant.name} is already in your collection!`); return; }
  myPlants.push({ ...plant, addedAt: new Date().toISOString(), lastWatered: null });
  saveUserData(); updateStats();
  document.getElementById('plantCount').textContent = myPlants.length;
  showToast(`${plant.emoji} ${plant.name} added!`);
  addHistory("add", plant.emoji, `Added ${plant.name}`, plant.isAI ? "AI discovered plant" : "From encyclopedia");
}
function renderMyPlants() {
  const grid = document.getElementById('myPlantsGrid');
  const empty = document.getElementById('emptyPlants');
  if (myPlants.length === 0) { empty.classList.remove('hidden'); grid.innerHTML = ''; return; }
  empty.classList.add('hidden');
  grid.innerHTML = myPlants.map(p => `
    <div class="plant-card" onclick="openPlantModal('${p.id}')">
      <div class="plant-card-thumb" style="background:${p.bg}">
        <span style="font-size:3.5rem">${p.emoji}</span>
        <span class="plant-health-badge health-good">✅ Healthy</span>
      </div>
      <div class="plant-card-body">
        <h4>${p.name}</h4><p>${p.scientific}</p>
        <div class="plant-card-actions">
          <button class="card-action-btn btn-water" onclick="event.stopPropagation();waterPlant('${p.id}')">💧 Water</button>
          <button class="card-action-btn btn-view" onclick="event.stopPropagation();openPlantModal('${p.id}')">👁️ View</button>
          <button class="card-action-btn btn-remove" onclick="event.stopPropagation();removePlant('${p.id}')">🗑️</button>
        </div>
      </div>
    </div>`).join('');
}
function waterPlant(id) {
  const plant = myPlants.find(p => String(p.id) === String(id));
  if (!plant) return;
  plant.lastWatered = new Date().toISOString();
  saveUserData(); showToast(`💧 ${plant.name} watered!`);
  addHistory('water', '💧', `Watered ${plant.name}`, new Date().toLocaleDateString()); updateStats();
}
function removePlant(id) {
  const plant = myPlants.find(p => String(p.id) === String(id));
  myPlants = myPlants.filter(p => String(p.id) !== String(id));
  saveUserData(); renderMyPlants(); updateStats();
  document.getElementById('plantCount').textContent = myPlants.length;
  if (plant) { showToast(`${plant.name} removed`); addHistory('remove', '🗑️', `Removed ${plant.name}`, ''); }
}
function saveToMyPlants() {
  if (!identifiedPlantData) return;
  if (myPlants.find(p => p.name === identifiedPlantData.name)) { showToast('Already in your collection!'); return; }
  const dbPlant = PLANTS_DB.find(p => p.name === identifiedPlantData.name);
  myPlants.push(dbPlant ? { ...dbPlant, addedAt: new Date().toISOString(), lastWatered: null }
    : { id: Date.now(), name: identifiedPlantData.name, emoji: '🌿', scientific: 'AI Identified', difficulty: 'medium', light: 'bright_indirect', water: 'Weekly', humidity: 'Medium', soil: 'Well-draining', fertilizer: 'Monthly', temp: '18-28°C', category: 'other', tags: ['identified'], bg: 'linear-gradient(135deg,#c8e6c0,#a5d6a7)', description: 'AI identified plant.', addedAt: new Date().toISOString(), lastWatered: null });
  saveUserData(); updateStats();
  document.getElementById('plantCount').textContent = myPlants.length;
  let n = parseInt(localStorage.getItem(`verdana_identified_${currentUser.email}`) || '0') + 1;
  localStorage.setItem(`verdana_identified_${currentUser.email}`, n);
  updateStats(); showToast(`💚 ${identifiedPlantData.name} saved!`);
  addHistory('identify', '📸', `Saved ${identifiedPlantData.name}`, 'Via AI identification');
}

// ====== STATS ======
function updateStats() {
  document.getElementById('totalPlants').textContent = myPlants.length;
  const today = new Date().toDateString();
  document.getElementById('waterToday').textContent = careTasks.filter(t => t.type === 'water' && new Date(t.date).toDateString() === today).length;
  document.getElementById('tasksToday').textContent = careTasks.filter(t => t.done && new Date(t.date).toDateString() === today).length;
  document.getElementById('identified').textContent = localStorage.getItem(`verdana_identified_${currentUser.email}`) || '0';
}

// ====== IDENTIFY PLANT ======
function handleImageUpload(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    uploadedImageBase64 = ev.target.result.split(',')[1];
    document.getElementById('uploadPreview').src = ev.target.result;
    document.getElementById('uploadPreview').classList.remove('hidden');
    document.getElementById('uploadContent').classList.add('hidden');
    document.getElementById('analyzeBtn').disabled = false;
  };
  reader.readAsDataURL(file);
}

async function getCareGuide() {
  document.getElementById('step1Card').classList.add('hidden');
  document.getElementById('step3Card').classList.remove('hidden');
  const resultDiv = document.getElementById('careGuideResult');
  const actionsDiv = document.getElementById('resultActions');
  resultDiv.innerHTML = `<div class="loading-plant"><div class="spinner"></div><p>Analyzing your plant with AI...</p></div>`;
  actionsDiv.classList.add('hidden');
  try {
    const messages = uploadedImageBase64 ? [{
      role: "user", content: [
        { type: "image", source: { type: "base64", media_type: "image/jpeg", data: uploadedImageBase64 } },
        { type: "text", text: `You are a botanist for Verdana plant care app. Identify this plant and give care info. Respond ONLY in valid JSON (no markdown): {"name":"...","scientific":"...","emoji":"...","confidence":"High/Medium/Low","description":"...","watering":"...","light":"...","humidity":"...","soil":"...","fertilizer":"...","temperature":"...","tips":["...","...","...","..."],"warning":"..."}` }
      ]
    }] : [{ role: "user", content: `Suggest a popular easy houseplant. Respond ONLY in valid JSON: {"name":"...","scientific":"...","emoji":"...","confidence":"Low","description":"...","watering":"...","light":"...","humidity":"...","soil":"...","fertilizer":"...","temperature":"...","tips":["...","...","...","..."],"warning":"..."}` }];

    const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json", "x-api-key": ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" }, body: JSON.stringify({ model: "claude-haiku-4-5", max_tokens: 1000, messages }) });
    const data = await res.json();
    const plant = JSON.parse(data.content.map(c => c.text || '').join('').replace(/```json|```/g, '').trim());
    identifiedPlantData = plant;
    resultDiv.innerHTML = `
      <div class="care-card">
        <div class="care-card-header"><span class="care-card-emoji">${plant.emoji}</span>
          <div><h3>${plant.name}</h3><p>${plant.scientific} · ${plant.confidence} confidence</p></div>
        </div>
        <p style="color:var(--text-soft);font-size:.88rem;margin-bottom:1rem;font-style:italic">${plant.description}</p>
        <div class="care-metrics">
          ${[['💧', 'Watering', plant.watering], ['☀️', 'Light', plant.light], ['💨', 'Humidity', plant.humidity], ['🌡️', 'Temperature', plant.temperature], ['🌱', 'Soil', plant.soil], ['🧪', 'Fertilizer', plant.fertilizer]].map(([i, l, v]) => `<div class="care-metric"><span class="cm-icon">${i}</span><div><span class="cm-label">${l}</span><span class="cm-value">${v}</span></div></div>`).join('')}
        </div>
        <div class="care-tips"><h4>💡 Care Tips</h4>${plant.tips.map(t => `<div class="tip-item"><span>✦</span>${t}</div>`).join('')}</div>
        ${plant.warning ? `<div class="tip-item" style="margin-top:.6rem;background:#fff9c4;border-left:3px solid #f57f17"><span>⚠️</span>${plant.warning}</div>` : ''}
      </div>`;
    actionsDiv.classList.remove('hidden');
    addHistory('identify', '📸', `Identified ${plant.name}`, `Confidence: ${plant.confidence}`);
  } catch (err) {
    const fb = PLANTS_DB[Math.floor(Math.random() * PLANTS_DB.length)];
    identifiedPlantData = fb;
    resultDiv.innerHTML = `<div class="care-card"><div class="care-card-header"><span class="care-card-emoji">${fb.emoji}</span><div><h3>${fb.name}</h3><p>${fb.scientific}</p></div></div><div class="care-metrics"><div class="care-metric"><span class="cm-icon">💧</span><div><span class="cm-label">Watering</span><span class="cm-value">${fb.water}</span></div></div><div class="care-metric"><span class="cm-icon">☀️</span><div><span class="cm-label">Light</span><span class="cm-value">${fb.light.replace('_', ' ')}</span></div></div></div></div>`;
    actionsDiv.classList.remove('hidden');
  }
}

function resetIdentify() {
  uploadedImageBase64 = null; identifiedPlantData = null;
  document.getElementById('step3Card').classList.add('hidden');
  document.getElementById('step1Card').classList.remove('hidden');
  document.getElementById('uploadPreview').classList.add('hidden');
  document.getElementById('uploadContent').classList.remove('hidden');
  document.getElementById('analyzeBtn').disabled = true;
  document.getElementById('resultActions').classList.add('hidden');
  document.getElementById('plantImageInput').value = '';
}

// ====== CALENDAR ======
function renderCalendar() {
  const grid = document.getElementById('calGrid');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  document.getElementById('calMonthTitle').textContent = `${months[currentCalMonth]} ${currentCalYear}`;
  const firstDay = new Date(currentCalYear, currentCalMonth, 1).getDay();
  const daysInMonth = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();
  const today = new Date();
  grid.innerHTML = Array(firstDay).fill(`<div class="cal-day empty"></div>`).join('');
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentCalYear}-${String(currentCalMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayTasks = careTasks.filter(t => t.date === dateStr);
    const isToday = d === today.getDate() && currentCalMonth === today.getMonth() && currentCalYear === today.getFullYear();
    const dots = dayTasks.slice(0, 3).map(t => `<span class="task-dot dot-${t.type}"></span>`).join('');
    grid.innerHTML += `<div class="cal-day ${isToday ? 'today' : ''} ${dayTasks.length ? 'has-task' : ''}" onclick="showDayTasks('${dateStr}')">${d}${dots ? `<div class="task-dots">${dots}</div>` : ''}</div>`;
  }
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
  saveUserData(); renderCalendar(); showToast(`✅ Task added for ${plant}`);
  addHistory('task', '📅', `Scheduled ${type} for ${plant}`, date);
  document.getElementById('taskNote').value = '';
  document.getElementById('taskDate').value = '';
}
function updateTaskDropdown() {
  const sel = document.getElementById('taskPlantSelect');
  const existing = sel.value;
  sel.innerHTML = '<option value="">Select plant...</option>';
  myPlants.forEach(p => sel.innerHTML += `<option value="${p.name}" ${existing === p.name ? 'selected' : ''}>${p.emoji} ${p.name}</option>`);
  PLANTS_DB.slice(0, 5).forEach(p => { if (!myPlants.find(m => m.id === p.id)) sel.innerHTML += `<option value="${p.name}">${p.emoji} ${p.name}</option>`; });
}
function renderTodayTasks() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const tasks = careTasks.filter(t => t.date === dateStr);
  const container = document.getElementById('todayTasks');
  container.innerHTML = tasks.length === 0 ? '<p class="no-tasks">No tasks today 🌿</p>'
    : tasks.map(t => `<div class="task-item"><input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTask(${t.id})" id="task-${t.id}"/><label for="task-${t.id}" style="${t.done ? 'text-decoration:line-through;opacity:.6' : ''}">${getTaskEmoji(t.type)} ${t.type} · ${t.plant}</label></div>`).join('');
}
function showDayTasks(dateStr) {
  const tasks = careTasks.filter(t => t.date === dateStr);
  const [y, m, d] = dateStr.split('-');
  showToast(tasks.length === 0 ? `No tasks on ${d}/${m}` : `${tasks.length} task(s): ${tasks.map(t => t.type).join(', ')}`);
}
function toggleTask(id) {
  const task = careTasks.find(t => t.id === id);
  if (task) { task.done = !task.done; saveUserData(); updateStats(); renderTodayTasks(); if (task.done) addHistory('complete', '✅', `Completed ${task.type}`, `For ${task.plant}`); }
}
function getTaskEmoji(type) { return { water: '💧', fertilize: '🌱', prune: '✂️', repot: '🪴', mist: '🌫️' }[type] || '📋'; }

// ====== PLANT MODAL ======
function openPlantModal(id) {
  const allPlants = [...PLANTS_DB, ...Object.values(aiPlantCache), ...myPlants];
  const plant = allPlants.find(p => String(p.id) === String(id));
  if (!plant) return;
  const inCol = myPlants.some(p => String(p.id) === String(id));
  const tips = plant.tips || ['Water when top inch of soil feels dry', 'Wipe leaves monthly to remove dust', 'Rotate plant for even growth', 'Avoid cold drafts near windows'];
  const safeId = String(plant.id).replace(/'/g, "\\'");
  document.getElementById('modalBody').innerHTML = `
    <div class="modal-plant-header">
      <div style="font-size:4rem;width:80px;height:80px;background:${plant.bg};border-radius:20px;display:flex;align-items:center;justify-content:center">${plant.emoji}</div>
      <div>
        <h2>${plant.name}</h2><p>${plant.scientific || 'Unknown'}</p>
        ${plant.isAI ? '<span style="font-size:.7rem;background:var(--lavender-pale);color:var(--lavender-deep);padding:.2rem .6rem;border-radius:20px;font-weight:700;">✨ AI Result</span>' : ''}
        <div style="margin-top:.4rem">${(plant.tags || []).map(t => `<span class="tag tag-${t.includes('easy') ? 'easy' : t.includes('hard') ? 'hard' : 'medium'}" style="margin-right:4px">${t}</span>`).join('')}</div>
      </div>
    </div>
    <div class="modal-tabs">
      <button class="modal-tab active" onclick="showModalSection('care',this)">Care Guide</button>
      <button class="modal-tab" onclick="showModalSection('about',this)">About</button>
      <button class="modal-tab" onclick="showModalSection('tips',this)">Tips</button>
    </div>
    <div id="ms-care" class="modal-section active">
      ${[['💧 Watering', plant.water], ['☀️ Light', (plant.light || '').replace('_', ' ')], ['💨 Humidity', plant.humidity], ['🌱 Soil', plant.soil], ['🧪 Fertilizer', plant.fertilizer], ['🌡️ Temperature', plant.temp]].map(([k, v]) => `<div class="modal-care-row"><span>${k}</span><span>${v || 'N/A'}</span></div>`).join('')}
    </div>
    <div id="ms-about" class="modal-section">
      <p style="color:var(--text-soft);line-height:1.7;font-size:.9rem;margin-bottom:1rem">${plant.description}</p>
      <p style="font-size:.85rem;color:var(--text-muted)">Difficulty: <strong>${plant.difficulty}</strong> · Category: <strong>${plant.category}</strong></p>
      ${plant.warning ? `<div class="tip-item" style="margin-top:.8rem;background:#fff9c4;border-left:3px solid #f57f17"><span>⚠️</span>${plant.warning}</div>` : ''}
    </div>
    <div id="ms-tips" class="modal-section">${tips.map(tip => `<div class="tip-item"><span>✦</span>${tip}</div>`).join('')}</div>
    <div style="margin-top:1.5rem;display:flex;gap:.8rem">
      ${!inCol ? `<button class="btn-primary" style="flex:1" onclick="addPlantFromDB('${safeId}');closeModal()">+ Add to My Plants</button>` : `<button class="btn-ghost" style="flex:1" disabled>✅ In Collection</button>`}
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
  closeModal(); switchTab('calendar', document.querySelector('[data-tab=calendar]'));
  setTimeout(() => { const sel = document.getElementById('taskPlantSelect'); for (let o of sel.options) if (o.value === plantName) { sel.value = plantName; break; } showToast(`Selected ${plantName}`); }, 300);
}
function closeModal() { document.getElementById('plantModal').classList.remove('active'); document.getElementById('plantModal').classList.add('hidden'); }

// ====== HISTORY ======
function addHistory(type, icon, title, detail) {
  historyLog.unshift({ type, icon, title, detail, time: new Date().toISOString(), id: Date.now() });
  if (historyLog.length > 100) historyLog = historyLog.slice(0, 100);
  saveUserData(); renderHistory();
}
function renderHistory() {
  const timeline = document.getElementById('historyTimeline');
  const empty = document.getElementById('emptyHistory');
  const footer = document.getElementById('historyFooter');
  if (historyLog.length === 0) { empty.classList.remove('hidden'); timeline.innerHTML = ''; footer.classList.add('hidden'); return; }
  empty.classList.add('hidden'); footer.classList.remove('hidden');
  timeline.innerHTML = historyLog.map(h => {
    const d = new Date(h.time);
    const timeStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    return `<div class="history-item"><div class="history-icon">${h.icon}</div><div class="history-info"><strong>${h.title}</strong><p>${h.detail}</p></div><div class="history-time">${timeStr}</div></div>`;
  }).join('');
}
function clearHistory() { if (confirm('Clear all history?')) { historyLog = []; saveUserData(); renderHistory(); showToast('History cleared'); } }

// ====== CHATBOT ======
function toggleChatbot() { document.getElementById('chatbotPanel').classList.toggle('open'); document.getElementById('chatNotif').style.display = 'none'; }
function handleChatKey(e) { if (e.key === 'Enter') sendChatMessage(); }
function sendSuggestion(text) { document.getElementById('chatInput').value = text; sendChatMessage(); }

async function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim(); if (!msg) return;
  input.value = ''; appendChatMsg('user', msg);
  chatHistory.push({ role: 'user', content: msg });
  const loadId = appendLoadingMsg();
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json", "x-api-key": ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" }, body: JSON.stringify({ model: "claude-haiku-4-5", max_tokens: 1000, system: `You are Verdana AI, a friendly plant care expert. Help with plant identification, care, troubleshooting, watering, soil, and gardening tips. Be concise and warm. Use plant emojis. User's plants: ${myPlants.map(p => p.name).join(', ') || 'none yet'}.`, messages: chatHistory.slice(-10) }) });
    const data = await res.json();
    const reply = data.content.map(c => c.text || '').join('');
    removeLoadingMsg(loadId); appendChatMsg('bot', reply);
    chatHistory.push({ role: 'assistant', content: reply });
    addHistory('chat', '🤖', 'Chat with Verdana AI', msg.slice(0, 40) + '...');
  } catch (err) { removeLoadingMsg(loadId); appendChatMsg('bot', "I'm having trouble connecting 🌿 Please try again!"); }
}
function appendChatMsg(role, text) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = `${role === 'bot' ? '<div class="msg-avatar">🌿</div>' : ''}<div class="msg-bubble">${text.replace(/\n/g, '<br>')}</div>${role === 'user' ? '<div class="msg-avatar" style="background:var(--green-pale)">👤</div>' : ''}`;
  msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight;
}
function appendLoadingMsg() {
  const msgs = document.getElementById('chatMessages');
  const id = 'loading-' + Date.now();
  const div = document.createElement('div');
  div.className = 'chat-msg bot loading'; div.id = id;
  div.innerHTML = `<div class="msg-avatar">🌿</div><div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
  msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight; return id;
}
function removeLoadingMsg(id) { const el = document.getElementById(id); if (el) el.remove(); }

// ====== DRAG & DROP ======
document.addEventListener('DOMContentLoaded', () => {
  const zone = document.getElementById('uploadZone'); if (!zone) return;
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor = 'var(--green-mid)'; });
  zone.addEventListener('dragleave', () => { zone.style.borderColor = ''; });
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.style.borderColor = '';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = ev => { uploadedImageBase64 = ev.target.result.split(',')[1]; document.getElementById('uploadPreview').src = ev.target.result; document.getElementById('uploadPreview').classList.remove('hidden'); document.getElementById('uploadContent').classList.add('hidden'); document.getElementById('analyzeBtn').disabled = false; };
      reader.readAsDataURL(file);
    }
  });
});

// ====== TOAST ======
let toastTimeout;
function showToast(msg) {
  let toast = document.getElementById('verdana-toast');
  if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; toast.id = 'verdana-toast'; document.body.appendChild(toast); }
  toast.textContent = msg; toast.classList.add('show');
  clearTimeout(toastTimeout); toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}
document.addEventListener('click', e => { if (e.target.id === 'plantModal') closeModal(); });
