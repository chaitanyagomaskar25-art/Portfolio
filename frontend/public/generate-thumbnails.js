const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'projects');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function createSvg(content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080D1A"/>
      <stop offset="100%" stop-color="#03060B"/>
    </linearGradient>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111827" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0B0F19" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#EC4899"/>
    </linearGradient>
    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#EF4444"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="800" height="500" fill="url(#bg)"/>
  
  <!-- Subtle Grid Lines -->
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    <line x1="0" y1="50" x2="800" y2="50"/>
    <line x1="0" y1="120" x2="800" y2="120"/>
    <line x1="0" y1="200" x2="800" y2="200"/>
    <line x1="0" y1="300" x2="800" y2="300"/>
    <line x1="0" y1="400" x2="800" y2="400"/>
    <line x1="100" y1="0" x2="100" y2="500"/>
    <line x1="240" y1="0" x2="240" y2="500"/>
    <line x1="400" y1="0" x2="400" y2="500"/>
    <line x1="560" y1="0" x2="560" y2="500"/>
    <line x1="700" y1="0" x2="700" y2="500"/>
  </g>

  ${content}
</svg>`;
}

// 1. Expense Tracker API
const expenseTracker = createSvg(`
  <!-- Top App Navigation -->
  <rect x="30" y="30" width="740" height="50" rx="12" fill="url(#cardBg)" stroke="#10B981" stroke-opacity="0.25"/>
  <circle cx="55" cy="55" r="7" fill="#10B981"/>
  <text x="75" y="60" fill="#F8FAFC" font-family="system-ui, sans-serif" font-weight="700" font-size="16">ExpenseTracker.api</text>
  <rect x="235" y="44" width="85" height="22" rx="6" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-opacity="0.4"/>
  <text x="245" y="59" fill="#34D399" font-family="monospace" font-size="11" font-weight="600">FastAPI + Py</text>
  <rect x="330" y="44" width="85" height="22" rx="6" fill="#38BDF8" fill-opacity="0.15" stroke="#38BDF8" stroke-opacity="0.4"/>
  <text x="340" y="59" fill="#38BDF8" font-family="monospace" font-size="11" font-weight="600">Streamlit</text>

  <!-- Metric Cards -->
  <g transform="translate(30, 95)">
    <rect x="0" y="0" width="230" height="90" rx="12" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="20" y="32" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">Total Expenses</text>
    <text x="20" y="64" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="24" font-weight="700">$2,450.80</text>
    <text x="160" y="62" fill="#10B981" font-family="monospace" font-size="12">+12.4%</text>
  </g>
  <g transform="translate(285, 95)">
    <rect x="0" y="0" width="230" height="90" rx="12" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="20" y="32" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">Monthly Budget</text>
    <text x="20" y="64" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="24" font-weight="700">$4,000.00</text>
    <text x="165" y="62" fill="#38BDF8" font-family="monospace" font-size="12">61.2%</text>
  </g>
  <g transform="translate(540, 95)">
    <rect x="0" y="0" width="230" height="90" rx="12" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="20" y="32" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">Net Savings</text>
    <text x="20" y="64" fill="#34D399" font-family="system-ui, sans-serif" font-size="24" font-weight="700">$1,549.20</text>
  </g>

  <!-- Analytics Chart Panel -->
  <g transform="translate(30, 205)">
    <rect x="0" y="0" width="485" height="265" rx="14" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="25" y="35" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="15" font-weight="600">Spending Trends & Analytics</text>
    <!-- Grid -->
    <line x1="25" y1="70" x2="455" y2="70" stroke="#ffffff" stroke-opacity="0.05"/>
    <line x1="25" y1="120" x2="455" y2="120" stroke="#ffffff" stroke-opacity="0.05"/>
    <line x1="25" y1="170" x2="455" y2="170" stroke="#ffffff" stroke-opacity="0.05"/>
    <line x1="25" y1="220" x2="455" y2="220" stroke="#ffffff" stroke-opacity="0.05"/>
    <!-- Area Chart -->
    <path d="M 35 210 Q 90 140, 150 160 T 260 110 T 360 85 T 445 60 L 445 220 L 35 220 Z" fill="url(#emeraldGrad)" fill-opacity="0.18"/>
    <path d="M 35 210 Q 90 140, 150 160 T 260 110 T 360 85 T 445 60" fill="none" stroke="#10B981" stroke-width="3.5" filter="url(#glow)"/>
    <!-- Data points -->
    <circle cx="150" cy="160" r="4.5" fill="#F8FAFC" stroke="#10B981" stroke-width="2"/>
    <circle cx="260" cy="110" r="4.5" fill="#F8FAFC" stroke="#10B981" stroke-width="2"/>
    <circle cx="360" cy="85" r="4.5" fill="#F8FAFC" stroke="#10B981" stroke-width="2"/>
    <circle cx="445" cy="60" r="4.5" fill="#F8FAFC" stroke="#10B981" stroke-width="2"/>
  </g>

  <!-- Categories Breakdown -->
  <g transform="translate(535, 205)">
    <rect x="0" y="0" width="235" height="265" rx="14" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="20" y="35" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Categories (Pandas)</text>
    
    <text x="20" y="70" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Food & Groceries</text>
    <rect x="20" y="78" width="195" height="7" rx="3.5" fill="#ffffff" fill-opacity="0.06"/>
    <rect x="20" y="78" width="140" height="7" rx="3.5" fill="#10B981"/>

    <text x="20" y="115" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Utilities & Bills</text>
    <rect x="20" y="123" width="195" height="7" rx="3.5" fill="#ffffff" fill-opacity="0.06"/>
    <rect x="20" y="123" width="105" height="7" rx="3.5" fill="#38BDF8"/>

    <text x="20" y="160" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Travel & Transit</text>
    <rect x="20" y="168" width="195" height="7" rx="3.5" fill="#ffffff" fill-opacity="0.06"/>
    <rect x="20" y="168" width="80" height="7" rx="3.5" fill="#F59E0B"/>

    <text x="20" y="205" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Entertainment</text>
    <rect x="20" y="213" width="195" height="7" rx="3.5" fill="#ffffff" fill-opacity="0.06"/>
    <rect x="20" y="213" width="55" height="7" rx="3.5" fill="#A855F7"/>
  </g>
`);

// 2. RationSaathi
const rationSaathi = createSvg(`
  <!-- Top App Navigation -->
  <rect x="30" y="30" width="740" height="50" rx="12" fill="url(#cardBg)" stroke="#14B8A6" stroke-opacity="0.25"/>
  <circle cx="55" cy="55" r="7" fill="#14B8A6"/>
  <text x="75" y="60" fill="#F8FAFC" font-family="system-ui, sans-serif" font-weight="700" font-size="16">RationSaathi</text>
  <rect x="200" y="44" width="115" height="22" rx="6" fill="#F59E0B" fill-opacity="0.15" stroke="#F59E0B" stroke-opacity="0.4"/>
  <text x="210" y="59" fill="#FBBF24" font-family="monospace" font-size="11" font-weight="600">● In Progress</text>
  <rect x="325" y="44" width="105" height="22" rx="6" fill="#14B8A6" fill-opacity="0.15" stroke="#14B8A6" stroke-opacity="0.4"/>
  <text x="335" y="59" fill="#2DD4BF" font-family="monospace" font-size="11" font-weight="600">Social Impact</text>

  <!-- Left Overview Panel -->
  <g transform="translate(30, 95)">
    <rect x="0" y="0" width="460" height="375" rx="14" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="25" y="38" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="16" font-weight="700">Digital Village Ration Assistance</text>
    <text x="25" y="60" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">Real-time fair price shop inventory, token scheduling & alerts</text>
    
    <!-- Status Cards -->
    <g transform="translate(25, 80)">
      <rect x="0" y="0" width="195" height="90" rx="10" fill="#ffffff" fill-opacity="0.03" stroke="#14B8A6" stroke-opacity="0.2"/>
      <text x="15" y="30" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Ration Stock Available</text>
      <text x="15" y="62" fill="#2DD4BF" font-family="system-ui, sans-serif" font-size="22" font-weight="700">Wheat: 94%</text>
    </g>
    <g transform="translate(235, 80)">
      <rect x="0" y="0" width="195" height="90" rx="10" fill="#ffffff" fill-opacity="0.03" stroke="#38BDF8" stroke-opacity="0.2"/>
      <text x="15" y="30" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Rice Allocation</text>
      <text x="15" y="62" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="22" font-weight="700">Rice: 88%</text>
    </g>

    <!-- Token Queue Scheduler -->
    <g transform="translate(25, 190)">
      <rect x="0" y="0" width="405" height="155" rx="10" fill="#ffffff" fill-opacity="0.02" stroke="#ffffff" stroke-opacity="0.05"/>
      <text x="20" y="32" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Active Distribution Slot Queue</text>
      
      <rect x="20" y="50" width="365" height="40" rx="6" fill="#14B8A6" fill-opacity="0.1"/>
      <text x="35" y="74" fill="#2DD4BF" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Slot #042 — Ward 3 (Active Now)</text>
      
      <rect x="20" y="100" width="365" height="40" rx="6" fill="#ffffff" fill-opacity="0.03"/>
      <text x="35" y="124" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">Slot #043 — Ward 4 (Scheduled 2:30 PM)</text>
    </g>
  </g>

  <!-- Right Details & Live WebSockets -->
  <g transform="translate(510, 95)">
    <rect x="0" y="0" width="260" height="375" rx="14" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="20" y="35" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Live Services</text>

    <g transform="translate(20, 60)">
      <circle cx="12" cy="12" r="10" fill="#14B8A6" fill-opacity="0.2"/>
      <circle cx="12" cy="12" r="4" fill="#2DD4BF"/>
      <text x="32" y="16" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="12" font-weight="500">Socket.IO Broadcast</text>
    </g>

    <g transform="translate(20, 110)">
      <circle cx="12" cy="12" r="10" fill="#38BDF8" fill-opacity="0.2"/>
      <circle cx="12" cy="12" r="4" fill="#38BDF8"/>
      <text x="32" y="16" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="12" font-weight="500">MERN Architecture</text>
    </g>

    <g transform="translate(20, 160)">
      <circle cx="12" cy="12" r="10" fill="#F59E0B" fill-opacity="0.2"/>
      <circle cx="12" cy="12" r="4" fill="#F59E0B"/>
      <text x="32" y="16" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="12" font-weight="500">Village Accessibility</text>
    </g>

    <rect x="20" y="240" width="220" height="100" rx="10" fill="#14B8A6" fill-opacity="0.08" stroke="#14B8A6" stroke-opacity="0.25"/>
    <text x="32" y="270" fill="#2DD4BF" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Beneficiary Hotline</text>
    <text x="32" y="295" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Automated SMS & Web alerts</text>
    <text x="32" y="315" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">for stock deliveries.</text>
  </g>
`);

// 3. Gallery App
const galleryApp = createSvg(`
  <!-- Top App Navigation -->
  <rect x="30" y="30" width="740" height="50" rx="12" fill="url(#cardBg)" stroke="#3B82F6" stroke-opacity="0.25"/>
  <circle cx="55" cy="55" r="7" fill="#3B82F6"/>
  <text x="75" y="60" fill="#F8FAFC" font-family="system-ui, sans-serif" font-weight="700" font-size="16">Interactive Gallery</text>
  
  <!-- Filter Pills -->
  <rect x="250" y="44" width="60" height="22" rx="6" fill="#3B82F6" fill-opacity="0.2" stroke="#3B82F6" stroke-opacity="0.4"/>
  <text x="265" y="59" fill="#93C5FD" font-family="monospace" font-size="11" font-weight="600">All</text>
  <text x="330" y="59" fill="#64748B" font-family="monospace" font-size="11">Nature</text>
  <text x="395" y="59" fill="#64748B" font-family="monospace" font-size="11">Architecture</text>
  <text x="500" y="59" fill="#64748B" font-family="monospace" font-size="11">Portraits</text>

  <!-- Masonry Gallery Grid Simulation -->
  <g transform="translate(30, 95)">
    <!-- Column 1 -->
    <rect x="0" y="0" width="235" height="160" rx="10" fill="#1E293B" stroke="#ffffff" stroke-opacity="0.08"/>
    <path d="M 0 100 L 80 40 L 150 110 L 235 60 L 235 160 L 0 160 Z" fill="#3B82F6" fill-opacity="0.25"/>
    <circle cx="60" cy="50" r="16" fill="#60A5FA" fill-opacity="0.6"/>

    <rect x="0" y="175" width="235" height="200" rx="10" fill="#1E293B" stroke="#ffffff" stroke-opacity="0.08"/>
    <path d="M 0 120 Q 80 60, 160 120 T 235 100 L 235 200 L 0 200 Z" fill="#8B5CF6" fill-opacity="0.25"/>

    <!-- Column 2 -->
    <rect x="252" y="0" width="235" height="220" rx="10" fill="#1E293B" stroke="#ffffff" stroke-opacity="0.08"/>
    <path d="M 252 140 L 320 80 L 400 150 L 487 70 L 487 220 L 252 220 Z" fill="#06B6D4" fill-opacity="0.25"/>

    <rect x="252" y="235" width="235" height="140" rx="10" fill="#1E293B" stroke="#ffffff" stroke-opacity="0.08"/>
    <circle cx="360" cy="300" r="35" fill="#EC4899" fill-opacity="0.3"/>

    <!-- Column 3 -->
    <rect x="505" y="0" width="235" height="150" rx="10" fill="#1E293B" stroke="#ffffff" stroke-opacity="0.08"/>
    <path d="M 505 100 Q 580 40, 640 100 T 740 80 L 740 150 L 505 150 Z" fill="#10B981" fill-opacity="0.25"/>

    <rect x="505" y="165" width="235" height="210" rx="10" fill="#1E293B" stroke="#ffffff" stroke-opacity="0.08"/>
    <polygon points="540,320 620,220 700,320" fill="#F59E0B" fill-opacity="0.3"/>
  </g>
`);

// 4. Nexora (Real-time chat)
const nexora = createSvg(`
  <!-- Top App Navigation -->
  <rect x="30" y="30" width="740" height="50" rx="12" fill="url(#cardBg)" stroke="#8B5CF6" stroke-opacity="0.25"/>
  <circle cx="55" cy="55" r="7" fill="#8B5CF6"/>
  <text x="75" y="60" fill="#F8FAFC" font-family="system-ui, sans-serif" font-weight="700" font-size="16">Nexora — Real-Time Chat</text>
  <rect x="300" y="44" width="115" height="22" rx="6" fill="#8B5CF6" fill-opacity="0.15" stroke="#8B5CF6" stroke-opacity="0.4"/>
  <text x="310" y="59" fill="#C4B5FD" font-family="monospace" font-size="11" font-weight="600">Socket.IO WS</text>
  <rect x="425" y="44" width="100" height="22" rx="6" fill="#F59E0B" fill-opacity="0.15" stroke="#F59E0B" stroke-opacity="0.4"/>
  <text x="435" y="59" fill="#FBBF24" font-family="monospace" font-size="11" font-weight="600">● In Progress</text>

  <!-- Left Sidebar (Channels & Users) -->
  <g transform="translate(30, 95)">
    <rect x="0" y="0" width="220" height="375" rx="14" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="20" y="35" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12" font-weight="600">CHANNELS</text>
    
    <rect x="15" y="50" width="190" height="32" rx="6" fill="#8B5CF6" fill-opacity="0.15"/>
    <text x="30" y="71" fill="#C4B5FD" font-family="system-ui, sans-serif" font-size="13" font-weight="600"># general-chat</text>
    
    <text x="30" y="110" fill="#64748B" font-family="system-ui, sans-serif" font-size="13"># developers</text>
    <text x="30" y="145" fill="#64748B" font-family="system-ui, sans-serif" font-size="13"># announcements</text>

    <text x="20" y="200" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12" font-weight="600">ACTIVE USERS (8)</text>
    <circle cx="28" cy="225" r="5" fill="#10B981"/>
    <text x="42" y="229" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="12">Alex Rivers</text>
    <circle cx="28" cy="255" r="5" fill="#10B981"/>
    <text x="42" y="259" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="12">Sophia Chen</text>
    <circle cx="28" cy="285" r="5" fill="#10B981"/>
    <text x="42" y="289" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="12">Marcus Vance</text>
  </g>

  <!-- Right Chat Room -->
  <g transform="translate(265, 95)">
    <rect x="0" y="0" width="505" height="375" rx="14" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    
    <!-- Messages -->
    <g transform="translate(25, 30)">
      <circle cx="16" cy="16" r="16" fill="#8B5CF6" fill-opacity="0.3"/>
      <text x="11" y="21" fill="#C4B5FD" font-family="system-ui, sans-serif" font-size="12" font-weight="700">A</text>
      <text x="42" y="14" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Alex Rivers</text>
      <text x="120" y="14" fill="#64748B" font-family="system-ui, sans-serif" font-size="10">10:42 AM</text>
      <rect x="42" y="22" width="310" height="40" rx="8" fill="#ffffff" fill-opacity="0.04"/>
      <text x="54" y="46" fill="#CBD5E1" font-family="system-ui, sans-serif" font-size="12">Has the new WebSocket room channel merged?</text>
    </g>

    <g transform="translate(25, 110)">
      <circle cx="16" cy="16" r="16" fill="#10B981" fill-opacity="0.3"/>
      <text x="11" y="21" fill="#34D399" font-family="system-ui, sans-serif" font-size="12" font-weight="700">S</text>
      <text x="42" y="14" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Sophia Chen</text>
      <text x="125" y="14" fill="#64748B" font-family="system-ui, sans-serif" font-size="10">10:44 AM</text>
      <rect x="42" y="22" width="350" height="40" rx="8" fill="#8B5CF6" fill-opacity="0.18" stroke="#8B5CF6" stroke-opacity="0.3"/>
      <text x="54" y="46" fill="#EDE9FE" font-family="system-ui, sans-serif" font-size="12">Yes! Socket.IO is broadcasting with sub-25ms latency.</text>
    </g>

    <!-- Typing bar -->
    <g transform="translate(25, 305)">
      <rect x="0" y="0" width="455" height="45" rx="10" fill="#ffffff" fill-opacity="0.04" stroke="#ffffff" stroke-opacity="0.1"/>
      <text x="15" y="28" fill="#64748B" font-family="system-ui, sans-serif" font-size="12">Type a message in #general-chat...</text>
      <circle cx="430" cy="22" r="14" fill="#8B5CF6"/>
      <polygon points="426,17 436,22 426,27" fill="#ffffff"/>
    </g>
  </g>
`);

// 5. Connectly (Social Platform)
const connectly = createSvg(`
  <!-- Top App Navigation -->
  <rect x="30" y="30" width="740" height="50" rx="12" fill="url(#cardBg)" stroke="#3B82F6" stroke-opacity="0.25"/>
  <circle cx="55" cy="55" r="7" fill="#3B82F6"/>
  <text x="75" y="60" fill="#F8FAFC" font-family="system-ui, sans-serif" font-weight="700" font-size="16">Connectly — Social Platform</text>
  <rect x="305" y="44" width="115" height="22" rx="6" fill="#3B82F6" fill-opacity="0.15" stroke="#3B82F6" stroke-opacity="0.4"/>
  <text x="315" y="59" fill="#93C5FD" font-family="monospace" font-size="11" font-weight="600">Full Stack MERN</text>

  <!-- Left Sidebar Feed Profile -->
  <g transform="translate(30, 95)">
    <rect x="0" y="0" width="220" height="375" rx="14" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <circle cx="110" cy="65" r="32" fill="#3B82F6" fill-opacity="0.25"/>
    <text x="110" y="72" text-anchor="middle" fill="#93C5FD" font-family="system-ui, sans-serif" font-size="20" font-weight="700">CG</text>
    <text x="110" y="120" text-anchor="middle" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="15" font-weight="700">Chaitanya</text>
    <text x="110" y="140" text-anchor="middle" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">Full-Stack Engineer</text>
    
    <line x1="20" y1="165" x2="200" y2="165" stroke="#ffffff" stroke-opacity="0.06"/>
    
    <text x="40" y="195" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">Followers</text>
    <text x="180" y="195" text-anchor="end" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="13" font-weight="700">1,280</text>
    
    <text x="40" y="225" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">Posts</text>
    <text x="180" y="225" text-anchor="end" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="13" font-weight="700">64</text>
  </g>

  <!-- Central Feed Card -->
  <g transform="translate(265, 95)">
    <rect x="0" y="0" width="505" height="375" rx="14" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    
    <!-- User Post Header -->
    <circle cx="45" cy="45" r="18" fill="#3B82F6"/>
    <text x="45" y="51" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="700">CG</text>
    <text x="75" y="42" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Chaitanya Gomaskar</text>
    <text x="75" y="58" fill="#64748B" font-family="system-ui, sans-serif" font-size="11">2 hours ago · Public</text>

    <!-- Post Content -->
    <text x="30" y="95" fill="#CBD5E1" font-family="system-ui, sans-serif" font-size="13">Excited to deploy our real-time social feeds with MERN and Socket.IO!</text>
    
    <!-- Media Card -->
    <rect x="30" y="115" width="445" height="170" rx="10" fill="#1E293B" stroke="#ffffff" stroke-opacity="0.06"/>
    <path d="M 30 220 Q 150 140, 270 200 T 475 160 L 475 285 L 30 285 Z" fill="url(#blueGrad)" fill-opacity="0.3"/>
    
    <!-- Reaction Counters -->
    <g transform="translate(35, 315)">
      <text x="0" y="18" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="12">❤️ 142 Likes</text>
      <text x="110" y="18" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">💬 28 Comments</text>
      <text x="235" y="18" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">↗️ 15 Shares</text>
    </g>
  </g>
`);

// 6. Music Player
const musicPlayer = createSvg(`
  <!-- Top App Navigation -->
  <rect x="30" y="30" width="740" height="50" rx="12" fill="url(#cardBg)" stroke="#10B981" stroke-opacity="0.25"/>
  <circle cx="55" cy="55" r="7" fill="#10B981"/>
  <text x="75" y="60" fill="#F8FAFC" font-family="system-ui, sans-serif" font-weight="700" font-size="16">Web Audio Player</text>
  <rect x="240" y="44" width="115" height="22" rx="6" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-opacity="0.4"/>
  <text x="250" y="59" fill="#34D399" font-family="monospace" font-size="11" font-weight="600">React + Motion</text>

  <!-- Turntable & Equalizer Center Card -->
  <g transform="translate(30, 95)">
    <rect x="0" y="0" width="450" height="375" rx="14" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    
    <!-- Vinyl Disc Graphic -->
    <g transform="translate(225, 140)">
      <circle cx="0" cy="0" r="85" fill="#0F172A" stroke="#334155" stroke-width="4"/>
      <circle cx="0" cy="0" r="65" fill="none" stroke="#1E293B" stroke-width="1.5" stroke-dasharray="4 3"/>
      <circle cx="0" cy="0" r="45" fill="none" stroke="#1E293B" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="28" fill="#10B981"/>
      <circle cx="0" cy="0" r="7" fill="#0F172A"/>
    </g>

    <!-- Track Details -->
    <text x="225" y="260" text-anchor="middle" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="16" font-weight="700">Synthwave Horizons</text>
    <text x="225" y="280" text-anchor="middle" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">Cosmic Soundscapes</text>

    <!-- Scrubber -->
    <rect x="50" y="305" width="350" height="6" rx="3" fill="#ffffff" fill-opacity="0.1"/>
    <rect x="50" y="305" width="220" height="6" rx="3" fill="#10B981"/>
    <circle cx="270" cy="308" r="6" fill="#F8FAFC"/>
    
    <!-- Player Controls -->
    <g transform="translate(225, 342)">
      <circle cx="0" cy="0" r="18" fill="#10B981"/>
      <polygon points="-4,-7 8,0 -4,7" fill="#04110B"/>
      <!-- Prev & Next -->
      <polygon points="-38,-5 -28,0 -38,5" fill="#94A3B8"/>
      <polygon points="38,-5 28,0 38,5" fill="#94A3B8"/>
    </g>
  </g>

  <!-- Right Playlist & EQ Waveform -->
  <g transform="translate(500, 95)">
    <rect x="0" y="0" width="270" height="375" rx="14" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="20" y="35" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Active Queue</text>
    
    <!-- Animated EQ Bars -->
    <g transform="translate(20, 55)">
      <rect x="0" y="10" width="4" height="24" rx="2" fill="#10B981"/>
      <rect x="8" y="2" width="4" height="32" rx="2" fill="#10B981"/>
      <rect x="16" y="14" width="4" height="20" rx="2" fill="#10B981"/>
      <rect x="24" y="6" width="4" height="28" rx="2" fill="#10B981"/>
      <rect x="32" y="16" width="4" height="18" rx="2" fill="#10B981"/>
      <rect x="40" y="4" width="4" height="30" rx="2" fill="#10B981"/>
      <rect x="48" y="12" width="4" height="22" rx="2" fill="#10B981"/>
    </g>

    <!-- Playlist Items -->
    <g transform="translate(20, 110)">
      <rect x="0" y="0" width="230" height="42" rx="8" fill="#10B981" fill-opacity="0.12"/>
      <text x="12" y="20" fill="#34D399" font-family="system-ui, sans-serif" font-size="12" font-weight="600">01. Synthwave Horizons</text>
      <text x="12" y="34" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="10">3:42</text>
    </g>
    <g transform="translate(20, 162)">
      <rect x="0" y="0" width="230" height="42" rx="8" fill="#ffffff" fill-opacity="0.03"/>
      <text x="12" y="20" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="12">02. Neon Night Drive</text>
      <text x="12" y="34" fill="#64748B" font-family="system-ui, sans-serif" font-size="10">4:15</text>
    </g>
    <g transform="translate(20, 214)">
      <rect x="0" y="0" width="230" height="42" rx="8" fill="#ffffff" fill-opacity="0.03"/>
      <text x="12" y="20" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="12">03. Cybernetic Echoes</text>
      <text x="12" y="34" fill="#64748B" font-family="system-ui, sans-serif" font-size="10">2:58</text>
    </g>
  </g>
`);

// 7. CollabSphere
const collabSphere = createSvg(`
  <!-- Top App Navigation -->
  <rect x="30" y="30" width="740" height="50" rx="12" fill="url(#cardBg)" stroke="#14B8A6" stroke-opacity="0.25"/>
  <circle cx="55" cy="55" r="7" fill="#14B8A6"/>
  <text x="75" y="60" fill="#F8FAFC" font-family="system-ui, sans-serif" font-weight="700" font-size="16">CollabSphere — Team Hub</text>
  <rect x="290" y="44" width="100" height="22" rx="6" fill="#14B8A6" fill-opacity="0.15" stroke="#14B8A6" stroke-opacity="0.4"/>
  <text x="300" y="59" fill="#2DD4BF" font-family="monospace" font-size="11" font-weight="600">MERN Stack</text>

  <!-- Workspace Grid (Kanban & Team) -->
  <g transform="translate(30, 95)">
    <!-- Column 1: Backlog -->
    <rect x="0" y="0" width="235" height="375" rx="12" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="20" y="32" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12" font-weight="600">TO DO (3)</text>
    
    <rect x="15" y="48" width="205" height="85" rx="8" fill="#ffffff" fill-opacity="0.03" stroke="#ffffff" stroke-opacity="0.06"/>
    <text x="28" y="72" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="12" font-weight="600">API Documentation</text>
    <rect x="28" y="86" width="60" height="18" rx="4" fill="#3B82F6" fill-opacity="0.2"/>
    <text x="36" y="99" fill="#60A5FA" font-family="monospace" font-size="10">Backend</text>

    <rect x="15" y="145" width="205" height="85" rx="8" fill="#ffffff" fill-opacity="0.03" stroke="#ffffff" stroke-opacity="0.06"/>
    <text x="28" y="169" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Database Indexing</text>
    <rect x="28" y="183" width="70" height="18" rx="4" fill="#10B981" fill-opacity="0.2"/>
    <text x="36" y="196" fill="#34D399" font-family="monospace" font-size="10">MongoDB</text>

    <!-- Column 2: In Progress -->
    <rect x="252" y="0" width="235" height="375" rx="12" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="272" y="32" fill="#2DD4BF" font-family="system-ui, sans-serif" font-size="12" font-weight="600">IN PROGRESS (2)</text>

    <rect x="267" y="48" width="205" height="95" rx="8" fill="#14B8A6" fill-opacity="0.08" stroke="#14B8A6" stroke-opacity="0.3"/>
    <text x="280" y="72" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Live Team Presence</text>
    <rect x="280" y="86" width="75" height="18" rx="4" fill="#14B8A6" fill-opacity="0.2"/>
    <text x="288" y="99" fill="#2DD4BF" font-family="monospace" font-size="10">Socket.IO</text>
    <circle cx="450" cy="120" r="10" fill="#14B8A6"/>
    <text x="446" y="124" fill="#ffffff" font-family="system-ui, sans-serif" font-size="9" font-weight="700">CG</text>

    <!-- Column 3: Done -->
    <rect x="505" y="0" width="235" height="375" rx="12" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="525" y="32" fill="#10B981" font-family="system-ui, sans-serif" font-size="12" font-weight="600">COMPLETED (4)</text>

    <rect x="520" y="48" width="205" height="85" rx="8" fill="#ffffff" fill-opacity="0.03" stroke="#10B981" stroke-opacity="0.2"/>
    <text x="533" y="72" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="12" font-weight="600">JWT Auth Gateway</text>
    <rect x="533" y="86" width="60" height="18" rx="4" fill="#10B981" fill-opacity="0.2"/>
    <text x="541" y="99" fill="#34D399" font-family="monospace" font-size="10">Security</text>
  </g>
`);

// 8. Agile Issue Tracker
const agileIssueTracker = createSvg(`
  <!-- Top App Navigation -->
  <rect x="30" y="30" width="740" height="50" rx="12" fill="url(#cardBg)" stroke="#3B82F6" stroke-opacity="0.25"/>
  <circle cx="55" cy="55" r="7" fill="#3B82F6"/>
  <text x="75" y="60" fill="#F8FAFC" font-family="system-ui, sans-serif" font-weight="700" font-size="16">Agile Issue Tracker</text>
  <rect x="250" y="44" width="125" height="22" rx="6" fill="#3B82F6" fill-opacity="0.15" stroke="#3B82F6" stroke-opacity="0.4"/>
  <text x="260" y="59" fill="#93C5FD" font-family="monospace" font-size="11" font-weight="600">TanStack Query</text>

  <!-- Sprint Header -->
  <g transform="translate(30, 95)">
    <rect x="0" y="0" width="740" height="60" rx="10" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="25" y="35" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="15" font-weight="700">Sprint 14 — Active Issue Backlog</text>
    <rect x="620" y="18" width="95" height="26" rx="6" fill="#3B82F6" fill-opacity="0.2"/>
    <text x="635" y="35" fill="#60A5FA" font-family="system-ui, sans-serif" font-size="11" font-weight="600">+ New Issue</text>
  </g>

  <!-- Issue Board Columns -->
  <g transform="translate(30, 170)">
    <!-- High Priority -->
    <rect x="0" y="0" width="355" height="300" rx="12" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="20" y="32" fill="#EF4444" font-family="system-ui, sans-serif" font-size="12" font-weight="700">● HIGH PRIORITY (2)</text>

    <rect x="15" y="48" width="325" height="75" rx="8" fill="#EF4444" fill-opacity="0.06" stroke="#EF4444" stroke-opacity="0.2"/>
    <text x="30" y="74" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="13" font-weight="600">#ISSUE-104: Query Cache Revalidation</text>
    <text x="30" y="98" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Optimistic UI update on stale token</text>

    <rect x="15" y="135" width="325" height="75" rx="8" fill="#ffffff" fill-opacity="0.02" stroke="#ffffff" stroke-opacity="0.06"/>
    <text x="30" y="161" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="13" font-weight="600">#ISSUE-108: Mobile Responsive Drawer</text>
    <text x="30" y="185" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Fix touch scroll lock on iOS</text>

    <!-- Normal Priority -->
    <rect x="385" y="0" width="355" height="300" rx="12" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="405" y="32" fill="#3B82F6" font-family="system-ui, sans-serif" font-size="12" font-weight="700">● RESOLVED & REVIEWED (3)</text>

    <rect x="400" y="48" width="325" height="75" rx="8" fill="#10B981" fill-opacity="0.06" stroke="#10B981" stroke-opacity="0.2"/>
    <text x="415" y="74" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="13" font-weight="600">#ISSUE-098: TanStack Query Hydration</text>
    <text x="415" y="98" fill="#34D399" font-family="system-ui, sans-serif" font-size="11">✓ Verified in production</text>
  </g>
`);

// 9. TeamFlow
const teamFlow = createSvg(`
  <!-- Top App Navigation -->
  <rect x="30" y="30" width="740" height="50" rx="12" fill="url(#cardBg)" stroke="#10B981" stroke-opacity="0.25"/>
  <circle cx="55" cy="55" r="7" fill="#10B981"/>
  <text x="75" y="60" fill="#F8FAFC" font-family="system-ui, sans-serif" font-weight="700" font-size="16">TeamFlow — Project Manager</text>
  <rect x="310" y="44" width="115" height="22" rx="6" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-opacity="0.4"/>
  <text x="320" y="59" fill="#34D399" font-family="monospace" font-size="11" font-weight="600">MERN Platform</text>

  <!-- Main Roadmap Dashboard -->
  <g transform="translate(30, 95)">
    <rect x="0" y="0" width="740" height="375" rx="14" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    
    <text x="30" y="40" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="16" font-weight="700">Q4 Engineering Milestones & Sprint Progress</text>
    
    <!-- Timeline bars -->
    <g transform="translate(30, 70)">
      <text x="0" y="25" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">Sprint 1: Core REST APIs</text>
      <rect x="190" y="10" width="480" height="24" rx="6" fill="#10B981" fill-opacity="0.2"/>
      <rect x="190" y="10" width="480" height="24" rx="6" fill="#10B981"/>
      <text x="640" y="27" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11" font-weight="700">100%</text>

      <text x="0" y="75" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">Sprint 2: Team Auth & Roles</text>
      <rect x="190" y="60" width="480" height="24" rx="6" fill="#38BDF8" fill-opacity="0.15"/>
      <rect x="190" y="60" width="420" height="24" rx="6" fill="#38BDF8"/>
      <text x="580" y="77" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11" font-weight="700">88%</text>

      <text x="0" y="125" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">Sprint 3: Task Board UI</text>
      <rect x="190" y="110" width="480" height="24" rx="6" fill="#A855F7" fill-opacity="0.15"/>
      <rect x="190" y="110" width="310" height="24" rx="6" fill="#A855F7"/>
      <text x="470" y="127" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11" font-weight="700">65%</text>

      <text x="0" y="175" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">Sprint 4: Analytics Reports</text>
      <rect x="190" y="160" width="480" height="24" rx="6" fill="#F59E0B" fill-opacity="0.15"/>
      <rect x="190" y="160" width="160" height="24" rx="6" fill="#F59E0B"/>
      <text x="320" y="177" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11" font-weight="700">35%</text>
    </g>

    <!-- Team Avatars Row -->
    <g transform="translate(30, 310)">
      <text x="0" y="18" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">Assigned Engineers:</text>
      <circle cx="160" cy="14" r="14" fill="#10B981"/>
      <text x="156" y="18" fill="#04110B" font-family="system-ui, sans-serif" font-size="10" font-weight="700">CG</text>
      <circle cx="195" cy="14" r="14" fill="#38BDF8"/>
      <text x="191" y="18" fill="#04110B" font-family="system-ui, sans-serif" font-size="10" font-weight="700">AK</text>
      <circle cx="230" cy="14" r="14" fill="#F59E0B"/>
      <text x="226" y="18" fill="#04110B" font-family="system-ui, sans-serif" font-size="10" font-weight="700">RN</text>
    </g>
  </g>
`);

// 10. CareCircle (Hackathon Project)
const careCircle = createSvg(`
  <!-- Top App Navigation -->
  <rect x="30" y="30" width="740" height="50" rx="12" fill="url(#cardBg)" stroke="#8B5CF6" stroke-opacity="0.25"/>
  <circle cx="55" cy="55" r="7" fill="#8B5CF6"/>
  <text x="75" y="60" fill="#F8FAFC" font-family="system-ui, sans-serif" font-weight="700" font-size="16">CareCircle</text>
  <rect x="175" y="44" width="150" height="22" rx="6" fill="#EC4899" fill-opacity="0.15" stroke="#EC4899" stroke-opacity="0.4"/>
  <text x="185" y="59" fill="#F472B6" font-family="monospace" font-size="11" font-weight="700">★ Hackathon Project</text>
  <rect x="335" y="44" width="100" height="22" rx="6" fill="#8B5CF6" fill-opacity="0.15" stroke="#8B5CF6" stroke-opacity="0.4"/>
  <text x="345" y="59" fill="#C4B5FD" font-family="monospace" font-size="11" font-weight="600">Full Stack MERN</text>

  <!-- Hackathon Spotlight Banner -->
  <g transform="translate(30, 95)">
    <rect x="0" y="0" width="740" height="85" rx="12" fill="url(#purpleGrad)" fill-opacity="0.15" stroke="#8B5CF6" stroke-opacity="0.4"/>
    <text x="30" y="35" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="16" font-weight="700">Emergency & Community Care Dispatch Hub</text>
    <text x="30" y="60" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="12">Rapid response platform connecting vulnerable community members with local caregivers.</text>
    <rect x="580" y="25" width="130" height="36" rx="8" fill="#EC4899"/>
    <text x="605" y="48" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="700">SOS DISPATCH</text>
  </g>

  <!-- Left: Live Incident Stream -->
  <g transform="translate(30, 195)">
    <rect x="0" y="0" width="460" height="275" rx="14" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="25" y="35" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Active Community Care Requests</text>
    
    <g transform="translate(25, 55)">
      <rect x="0" y="0" width="410" height="55" rx="8" fill="#ffffff" fill-opacity="0.03" stroke="#10B981" stroke-opacity="0.3"/>
      <circle cx="25" cy="28" r="6" fill="#10B981"/>
      <text x="45" y="26" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Medical Assistance · Ward 7</text>
      <text x="45" y="44" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Caregiver En Route · ETA 8 mins</text>
    </g>

    <g transform="translate(25, 120)">
      <rect x="0" y="0" width="410" height="55" rx="8" fill="#ffffff" fill-opacity="0.03" stroke="#38BDF8" stroke-opacity="0.3"/>
      <circle cx="25" cy="28" r="6" fill="#38BDF8"/>
      <text x="45" y="26" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Elderly Grocery Delivery · Sector 4</text>
      <text x="45" y="44" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Matched with volunteer Chaitanya Gomaskar</text>
    </g>

    <g transform="translate(25, 185)">
      <rect x="0" y="0" width="410" height="55" rx="8" fill="#ffffff" fill-opacity="0.03" stroke="#F59E0B" stroke-opacity="0.3"/>
      <circle cx="25" cy="28" r="6" fill="#F59E0B"/>
      <text x="45" y="26" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Prescription Refill · Downtown</text>
      <text x="45" y="44" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Waiting for volunteer pickup</text>
    </g>
  </g>

  <!-- Right: Vitals / Impact -->
  <g transform="translate(510, 195)">
    <rect x="0" y="0" width="260" height="275" rx="14" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="20" y="35" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Impact Metrics</text>
    
    <g transform="translate(20, 55)">
      <text x="0" y="20" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Resolved Requests</text>
      <text x="0" y="48" fill="#A855F7" font-family="system-ui, sans-serif" font-size="24" font-weight="700">184+</text>
    </g>
    <g transform="translate(20, 125)">
      <text x="0" y="20" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Average Response Time</text>
      <text x="0" y="48" fill="#34D399" font-family="system-ui, sans-serif" font-size="24" font-weight="700">6.4 mins</text>
    </g>
    <g transform="translate(20, 195)">
      <text x="0" y="20" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Registered Caregivers</text>
      <text x="0" y="48" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="24" font-weight="700">92 Volunteers</text>
    </g>
  </g>
`);

fs.writeFileSync(path.join(dir, 'expense-tracker.svg'), expenseTracker);
fs.writeFileSync(path.join(dir, 'rationsaathi.svg'), rationSaathi);
fs.writeFileSync(path.join(dir, 'gallery-app.svg'), galleryApp);
fs.writeFileSync(path.join(dir, 'nexora.svg'), nexora);
fs.writeFileSync(path.join(dir, 'connectly.svg'), connectly);
fs.writeFileSync(path.join(dir, 'music-player.svg'), musicPlayer);
fs.writeFileSync(path.join(dir, 'collabsphere.svg'), collabSphere);
fs.writeFileSync(path.join(dir, 'agile-issue-tracker.svg'), agileIssueTracker);
fs.writeFileSync(path.join(dir, 'teamflow.svg'), teamFlow);
fs.writeFileSync(path.join(dir, 'carecircle.svg'), careCircle);

console.log('All 10 project SVG thumbnails generated successfully!');
