// VaccinePro - Application Logic

// State Management
const state = {
  currentScreen: 'welcome',
  selectedProduct: 'AI_H9N2',
  currentTab: 'today'
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Setup event listeners
  setupWelcomeListeners();
  setupDashboardListeners();
  setupProductSelector();
  setupBottomNavigation();
  
  // Update current date
  updateCurrentDate();
}

// Welcome Page Functions
function setupWelcomeListeners() {
  const getStartedBtn = document.getElementById('getStartedBtn');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', navigateToDashboard);
  }
}

function navigateToDashboard() {
  state.currentScreen = 'dashboard';
  document.getElementById('welcomePage').classList.add('hidden');
  document.getElementById('dashboard').classList.add('active');
}

// Dashboard Functions
function setupDashboardListeners() {
  // Setup any dashboard-specific listeners
}

// Product Selector
function setupProductSelector() {
  const productChips = document.querySelectorAll('.product-chip');
  productChips.forEach(chip => {
    chip.addEventListener('click', () => {
      // Remove active class from all chips
      productChips.forEach(c => c.classList.remove('active'));
      // Add active class to clicked chip
      chip.classList.add('active');
      // Update state
      state.selectedProduct = chip.dataset.product;
      // Filter tasks based on selected product
      filterTasksByProduct(state.selectedProduct);
    });
  });
}

function filterTasksByProduct(productId) {
  const criticalTasks = document.querySelectorAll('.critical-task');
  const todayTasks = document.querySelectorAll('.task-card');
  
  criticalTasks.forEach(task => {
    const taskProduct = task.dataset.product;
    if (productId === 'ALL' || taskProduct === productId) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
  
  todayTasks.forEach(task => {
    const taskProduct = task.dataset.product;
    if (productId === 'ALL' || taskProduct === productId || taskProduct === 'ALL') {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  });
  
  // Update critical count
  updateCriticalCount();
}

function updateCriticalCount() {
  const visibleCriticalTasks = document.querySelectorAll('.critical-task:not([style*="display: none"])');
  const countElement = document.querySelector('.critical-count');
  if (countElement) {
    countElement.textContent = `${visibleCriticalTasks.length} items`;
  }
}

// Bottom Navigation
function setupBottomNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all items
      navItems.forEach(i => i.classList.remove('active'));
      // Add active class to clicked item
      item.classList.add('active');
      // Update state
      state.currentTab = item.dataset.tab;
      // Switch content
      switchTabContent(state.currentTab);
    });
  });
}

function switchTabContent(tab) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.add('hidden');
  });
  
  // Show selected tab content
  const selectedContent = document.getElementById(`${tab}Tab`);
  if (selectedContent) {
    selectedContent.classList.remove('hidden');
  }
}

// Update Current Date
function updateCurrentDate() {
  const dateElement = document.getElementById('currentDate');
  if (dateElement) {
    const now = new Date();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${weekdays[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
    dateElement.textContent = formattedDate;
  }
}

// FAB Click Handler
function handleFabClick() {
  alert('Create New Task - Feature coming soon!');
}

// Notification Click Handler
function handleNotificationClick() {
  alert('3 Critical Notifications:\n\n1. QC Sterility Test Due\n2. Equipment Calibration Overdue\n3. Material Expiry Alert');
}

// Settings Click Handler
function handleSettingsClick() {
  alert('Settings - Feature coming soon!');
}
