// sampleData.js

// ── Stat Cards (top row) ──────────────────────────────────────────────────────
export const statCardsData = [
  {
    id: 1,
    label: "Contractors",
    value: "128",
    change: 8.4,
    iconName: "HardHat",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    id: 2,
    label: "Suppliers",
    value: "342",
    change: 4.1,
    iconName: "Truck",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
  },
  {
    id: 3,
    label: "Labour",
    value: "1,284",
    change: -2.3,
    iconName: "Users",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    id: 4,
    label: "Active Projects",
    value: "47",
    change: 12.6,
    iconName: "Building2",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
];

// ── Pending Cards (bento row) ─────────────────────────────────────────────────
export const pendingCardsData = [
  {
    id: 1,
    title: "Material Request Pending",
    count: "14",
    metaDot: "#FA8316",
    metaText: "8 Critical Priority",
    buttonLabel: "View All",
    iconName: "Wrench",
    iconBg: "bg-orange-100",
    iconColor: "text-[#FA8316]",
    highlighted: false,
  },
  {
    id: 2,
    title: "Labour Approval Pending",
    count: "32",
    metaDot: "#10B981",
    metaText: "Overnight shift ready",
    buttonLabel: "View All",
    iconName: "UserCog",
    iconBg: "bg-orange-100",
    iconColor: "text-[#FA8316]",
    highlighted: false,
  },
];

// ── Resource Growth Chart ─────────────────────────────────────────────────────
export const resourceGrowthData = [
  { week: "WEEK 01", thisMonth: 420, lastMonth: 390 },
  { week: "WEEK 02", thisMonth: 580, lastMonth: 410 },
  { week: "WEEK 03", thisMonth: 720, lastMonth: 430 },
  { week: "WEEK 04", thisMonth: 890, lastMonth: 460 },
];

// ── Material Categories ───────────────────────────────────────────────────────
export const materialCategoriesData = [
  { id: "01", categoryName: "Cement",  subCategoryName: "Cement",            unitType: "Bag",          status: "ACTIVE" },
  { id: "02", categoryName: "Sand",    subCategoryName: "Fine Aggregate",     unitType: "Ton",          status: "ACTIVE" },
  { id: "03", categoryName: "Gravel",  subCategoryName: "Coarse Aggregate",   unitType: "Ton",          status: "ACTIVE" },
  { id: "04", categoryName: "Steel",   subCategoryName: "Rebar",              unitType: "Kilogram",     status: "ACTIVE" },
  { id: "05", categoryName: "Bricks",  subCategoryName: "Clay Bricks",        unitType: "Piece",        status: "ACTIVE" },
  { id: "06", categoryName: "Wood",    subCategoryName: "Plywood",            unitType: "Sheet",        status: "ACTIVE" },
  { id: "07", categoryName: "Glass",   subCategoryName: "Tempered Glass",     unitType: "Square Meter", status: "ACTIVE" },
  { id: "08", categoryName: "Paint",   subCategoryName: "Exterior Paint",     unitType: "Liter",        status: "ACTIVE" },
  { id: "09", categoryName: "Tiles",   subCategoryName: "Ceramic Tiles",      unitType: "Square Meter", status: "ACTIVE" },
  { id: "10", categoryName: "Pipes",   subCategoryName: "PVC Pipes",          unitType: "Meter",        status: "ACTIVE" },
];


// ── Skills ────────────────────────────────────────────────────────────────────
export const skillsData = [
    { id: "01", skillName: "Mason",       category: "Construction", status: "ACTIVE" },
    { id: "02", skillName: "Helper",      category: "Construction", status: "ACTIVE" },
    { id: "03", skillName: "Painter",     category: "Construction", status: "ACTIVE" },
  { id: "04", skillName: "Electrician", category: "Construction", status: "ACTIVE" },
  { id: "05", skillName: "Plumber",     category: "Construction", status: "ACTIVE" },
  { id: "06", skillName: "Carpenter",   category: "Construction", status: "ACTIVE" },
  { id: "07", skillName: "Welder",      category: "Construction", status: "ACTIVE" },
  { id: "08", skillName: "Surveyor",    category: "Engineering",  status: "ACTIVE" },
  { id: "09", skillName: "Supervisor",  category: "Management",   status: "ACTIVE" },
  { id: "10", skillName: "Driver",      category: "Logistics",    status: "INACTIVE" },
];
 
// ── projects ────────────────────────────────────────────────────────────────────\
export const projectsData = [
    { id: "01", name: "Green Residency",    location: "Mumbai",  client: "Mr. Sharma",     status: "ONGOING",   progress: 65,  budget: "₹50,00,000"    },
    { id: "02", name: "Corporate Tower",    location: "Delhi",   client: "ABC Corp",        status: "PLANNING",  progress: 10,  budget: "₹2,00,00,000"  },
    { id: "03", name: "Highway Extension",  location: "Pune",    client: "Govt Authority",  status: "ONGOING",   progress: 45,  budget: "₹5,00,00,000"  },
    { id: "04", name: "Skyline Apartments", location: "Noida",   client: "DLF Builders",    status: "ON_HOLD",   progress: 30,  budget: "₹1,20,00,000"  },
    { id: "05", name: "Metro Rail Phase 2", location: "Chennai", client: "CMRL",            status: "ONGOING",   progress: 80,  budget: "₹18,00,00,000" },
    { id: "06", name: "River Bridge",       location: "Nagpur",  client: "PWD Maharashtra", status: "COMPLETED", progress: 100, budget: "₹3,50,00,000"  },
];

// ── projectsDetails ────────────────────────────────────────────────────────────────────\
export const projectDetailsData = {
    "01": {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
    type: "Residential",
    client: "Amit Sharma",
    plotSize: "2400 sq ft",
    floors: "2 Levels",
    timeline: "15 Jan 2025 - 15 Jun 2025",
    status: "ACTIVE",
    cost: {
      total: "₹32,00,000",
      material: "₹18,50,000",
      labour: "₹8,20,000",
      remaining: "₹5,30,000",
      allocated: 83.4,
    },
    workersApplied: 5,
    quotesReceived: 6,
    recentApplicants: [
      { initials: "RK", name: "Rajesh Kumar", role: "Electrician", exp: "8 yrs experience", isNew: true, avatarBg: "#DEE2F3", avatarText: "#5F6472" },
      { initials: "SS", name: "Suresh Singh",  role: "Plumber",     exp: "5 yrs experience", isNew: true, avatarBg: "rgba(23,190,158,0.3)", avatarText: "#006B58" },
    ],
    recentActivity: [
      { label: "Quote accepted for 500 Bags Cement",    time: "Today, 10:24 AM by Vignesh K.", active: true  },
      { label: "New applicant: Suresh Singh (Plumber)", time: "Yesterday, 04:15 PM",           active: false },
      { label: "Labour budget updated for Q1",          time: "12 Jan 2025, 01:00 PM",         active: false },
    ],
    quotes: [
      { icon: "🪣", name: "Cement - 500 Bags", supplier: "UltraTech Dealers Pvt Ltd", price: "₹1.8L", expiry: "Expires in 2d", urgent: true },
      { icon: "🔩", name: "Steel Rods TMT",     supplier: "Jaipur Steels Corp",        price: "₹4.2L", expiry: "Expires in 5h", urgent: true },
    ],
    mapLocation: "Malviya Nagar, Jaipur",
    mapEmbed: "https://maps.google.com/maps?q=Malviya+Nagar,+Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  "02": {
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
    type: "Commercial",
    client: "ABC Corp",
    plotSize: "12000 sq ft",
    floors: "15 Levels",
    timeline: "01 Mar 2025 - 01 Mar 2027",
    status: "PLANNING",
    cost: {
      total: "₹2,00,00,000",
      material: "₹80,00,000",
      labour: "₹40,00,000",
      remaining: "₹80,00,000",
      allocated: 10,
    },
    workersApplied: 2,
    quotesReceived: 3,
    recentApplicants: [
      { initials: "AK", name: "Arjun Kumar",  role: "Supervisor",  exp: "12 yrs experience", isNew: true,  avatarBg: "#DBEAFE", avatarText: "#1D4ED8" },
      { initials: "PM", name: "Priya Mehta",  role: "Surveyor",    exp: "6 yrs experience",  isNew: false, avatarBg: "#FCE7F3", avatarText: "#BE185D" },
    ],
    recentActivity: [
      { label: "Project planning phase initiated",    time: "Today, 09:00 AM by Admin",       active: true  },
      { label: "Site survey completed",               time: "Yesterday, 02:00 PM",            active: false },
      { label: "Initial budget draft approved",       time: "10 Feb 2025, 11:00 AM",          active: false },
    ],
    quotes: [
      { icon: "🏗️", name: "Foundation Steel",  supplier: "Delhi Steel Works",    price: "₹12L",  expiry: "Expires in 5d", urgent: false },
      { icon: "🪵", name: "Shuttering Boards", supplier: "BuildMart Pvt Ltd",    price: "₹3.5L", expiry: "Expires in 3d", urgent: false },
    ],
    mapLocation: "Connaught Place, Delhi",
    mapEmbed: "https://maps.google.com/maps?q=Connaught+Place,+Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  "03": {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    type: "Infrastructure",
    client: "Govt Authority",
    plotSize: "N/A",
    floors: "Ground Level",
    timeline: "01 Jun 2024 - 01 Jun 2026",
    status: "ACTIVE",
    cost: {
      total: "₹5,00,00,000",
      material: "₹2,20,00,000",
      labour: "₹1,05,00,000",
      remaining: "₹1,75,00,000",
      allocated: 45,
    },
    workersApplied: 18,
    quotesReceived: 11,
    recentApplicants: [
      { initials: "VR", name: "Vijay Rao",    role: "Mason",    exp: "10 yrs experience", isNew: true,  avatarBg: "#FEF9C3", avatarText: "#A16207" },
      { initials: "DN", name: "Dinesh Naik",  role: "Welder",   exp: "7 yrs experience",  isNew: false, avatarBg: "#FFEDD5", avatarText: "#C2410C" },
    ],
    recentActivity: [
      { label: "Phase 2 road laying started",          time: "Today, 07:30 AM",              active: true  },
      { label: "Material delivery confirmed",          time: "Yesterday, 12:00 PM",          active: false },
      { label: "Safety inspection passed",             time: "05 Mar 2025, 10:00 AM",        active: false },
    ],
    quotes: [
      { icon: "🛣️", name: "Bitumen - Grade 60/70", supplier: "Pune Infra Supplies",   price: "₹8.5L", expiry: "Expires in 1d", urgent: true  },
      { icon: "🔩", name: "Anchor Bolts (500 pcs)", supplier: "Maharashtra Fasteners", price: "₹1.2L", expiry: "Expires in 4d", urgent: false },
    ],
    mapLocation: "Pune–Mumbai Expressway",
    mapEmbed: "https://maps.google.com/maps?q=Pune+Mumbai+Expressway&t=&z=12&ie=UTF8&iwloc=&output=embed",
  },
  "04": {
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80",
    type: "Residential",
    client: "DLF Builders",
    plotSize: "8500 sq ft",
    floors: "7 Levels",
    timeline: "15 Sep 2024 - 15 Sep 2026",
    status: "ON_HOLD",
    cost: {
      total: "₹1,20,00,000",
      material: "₹35,00,000",
      labour: "₹10,00,000",
      remaining: "₹75,00,000",
      allocated: 30,
    },
    workersApplied: 0,
    quotesReceived: 2,
    recentApplicants: [],
    recentActivity: [
      { label: "Project put on hold pending clearance", time: "15 Feb 2025, 03:00 PM",       active: true  },
      { label: "Legal review initiated",                time: "10 Feb 2025, 10:00 AM",       active: false },
      { label: "Foundation work paused",                time: "01 Feb 2025, 08:00 AM",       active: false },
    ],
    quotes: [
      { icon: "🧱", name: "Hollow Blocks (1000 pcs)", supplier: "Noida Block Works", price: "₹2.8L", expiry: "Expires in 7d", urgent: false },
    ],
    mapLocation: "Sector 62, Noida",
    mapEmbed: "https://maps.google.com/maps?q=Sector+62,+Noida&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  "05": {
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=900&q=80",
    type: "Infrastructure",
    client: "CMRL",
    plotSize: "N/A",
    floors: "Underground + Elevated",
    timeline: "01 Jan 2023 - 01 Jan 2026",
    status: "ACTIVE",
    cost: {
      total: "₹18,00,00,000",
      material: "₹9,00,00,000",
      labour: "₹5,40,00,000",
      remaining: "₹3,60,00,000",
      allocated: 80,
    },
    workersApplied: 42,
    quotesReceived: 28,
    recentApplicants: [
      { initials: "SK", name: "Sunil Kumar",  role: "Carpenter",  exp: "9 yrs experience",  isNew: true,  avatarBg: "#E0E7FF", avatarText: "#4338CA" },
      { initials: "TR", name: "Tanya Rao",    role: "Supervisor", exp: "14 yrs experience", isNew: false, avatarBg: "#FFE4E6", avatarText: "#BE123C" },
    ],
    recentActivity: [
      { label: "Tunnel boring completed at station 7", time: "Today, 06:00 AM",              active: true  },
      { label: "Overhead wiring for Phase 2 started",  time: "Yesterday, 09:00 AM",          active: false },
      { label: "Safety audit report submitted",        time: "20 Mar 2025, 02:00 PM",        active: false },
    ],
    quotes: [
      { icon: "⚡", name: "Electrical Cables (2km)", supplier: "Chennai Power Cables",   price: "₹22L",  expiry: "Expires in 2d", urgent: true  },
      { icon: "🔧", name: "Track Bolts (5000 pcs)",  supplier: "Rail Fasteners India",   price: "₹6.5L", expiry: "Expires in 6d", urgent: false },
    ],
    mapLocation: "Chennai Metro Phase 2",
    mapEmbed: "https://maps.google.com/maps?q=Chennai+Metro+Phase+2&t=&z=13&ie=UTF8&iwloc=&output=embed",
  },
  "06": {
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80",
    type: "Infrastructure",
    client: "PWD Maharashtra",
    plotSize: "N/A",
    floors: "Ground Level",
    timeline: "01 Jan 2023 - 31 Dec 2024",
    status: "COMPLETED",
    cost: {
      total: "₹3,50,00,000",
      material: "₹1,80,00,000",
      labour: "₹90,00,000",
      remaining: "₹80,00,000",
      allocated: 100,
    },
    workersApplied: 0,
    quotesReceived: 0,
    recentApplicants: [],
    recentActivity: [
      { label: "Project successfully completed",       time: "31 Dec 2024, 05:00 PM",        active: true  },
      { label: "Final inspection cleared by PWD",      time: "28 Dec 2024, 11:00 AM",        active: false },
      { label: "Handover documents submitted",         time: "20 Dec 2024, 03:00 PM",        active: false },
    ],
    quotes: [],
    mapLocation: "Nagpur, Maharashtra",
    mapEmbed: "https://maps.google.com/maps?q=Nagpur,+Maharashtra&t=&z=13&ie=UTF8&iwloc=&output=embed",
  },
};

// ── labour requirements ────────────────────────────────────────────────────────────────────
export const labourRequirementsData = [
  {
    id: "1",
    project: "Green Residency",
    skill: "MASON",
    required: 5,
    filled: 2,
    startDate: "2024-04-20",
    status: "OPEN", // "OPEN" | "FILLED"
  },
  {
    id: "2",
    project: "Corporate Tower",
    skill: "ELECTRICIAN",
    required: 3,
    filled: 3,
    startDate: "2024-04-15",
    status: "FILLED",
  },
  {
    id: "3",
    project: "Highway Extension",
    skill: "OPERATOR",
    required: 4,
    filled: 1,
    startDate: "2024-04-25",
    status: "OPEN",
  },
  {
    id: "4",
    project: "Green Residency",
    skill: "PLUMBER",
    required: 3,
    filled: 0,
    startDate: "2024-05-01",
    status: "OPEN",
  },
  {
    id: "5",
    project: "Corporate Tower",
    skill: "PAINTER",
    required: 6,
    filled: 1,
    startDate: "2024-04-28",
    status: "OPEN",
  },
];

// ── material requirements ────────────────────────────────────────────────────────────────────\
// sampleData.js
// Replace this with actual API response shape when integrating backend

// ─────────────────────────────────────────────
// DUMMY DATA — replace with your API response
// ─────────────────────────────────────────────


///////////////////////////////// WORKING DATA FOR MATERIAL QUOTATIONS //////////////
// export const materialRequirementsData = [
//   {
//     id: 1,
//     project: "Green Residency",
//     contractorName: "Sharma Constructions",
//     material: "Cement",
//     quantity: 500,
//     // Quotations submitted by suppliers for this requirement
//     quotations: [
//       {
//         quoteId: "#Q-101",
//         supplier: "Green Residency",
//         material: "Cement",
//         quantity: "500 Bags",
//         contractorName: "Sharma Constructions",
//         quotedPrice: "₹1.8L",
//         status: "Pending", // "Pending" | "Approved" | "Rejected"
//       },
//       {
//         quoteId: "#Q-101",
//         supplier: "Green Residency",
//         material: "Steel",
//         quantity: "2000 Kgs",
//         contractorName: "Omega Builders",
//         quotedPrice: "₹4.5L",
//         status: "Approved",
//       },
//       {
//         quoteId: "#Q-101",
//         supplier: "Green Residency",
//         material: "Bricks",
//         quantity: "10,000 Pieces",
//         contractorName: "Pinnacle Constructions",
//         quotedPrice: "₹3.2L",
//         status: "Rejected",
//       },
//     ],
//   },
//   {
//     id: 2,
//     project: "Blue Heights",
//     contractorName: "Reddy Builders",
//     material: "Bricks",
//     quantity: 1200,
//     quotations: [],
//   },
//   {
//     id: 3,
//     project: "Sunset Villas",
//     contractorName: "Kumar Enterprises",
//     material: "Steel",
//     quantity: 750,
//     quotations: [],
//   },
// ];


// ─────────────────────────────────────────────────────────────────────────────
// DUMMY DATA — replace each section with your real API response
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. Material REQUIREMENTS (Demand Management > Material Requirements) ──────
//    These are the requirements raised by contractors per project.
//    Each requirement can have multiple supplier QUOTATIONS.
export const materialRequirementsData = [
  {
    id: 1,
    project: "Green Residency",
    contractorName: "Rajesh",
    location: "Jaipur",
    urgency: "URGENT",   // "URGENT" | "HIGH" | "MEDIUM" | "LOW"
    status: "Pending",   // "Pending" | "Approved" | "Rejected"
    // Quotations submitted by suppliers for this requirement
    quotations: [
      {
        quoteId: "#Q-101",
        project: "Green Residency",
        material: "Cement",
        quantity: "500 Bags",
        contractorName: "Sharma Constructions",
        status: "Pending",   // "Pending" | "Approved" | "Rejected"
      },
      {
        quoteId: "#Q-101",
        project: "Green Residency",
        material: "Steel",
        quantity: "2000 Kgs",
        contractorName: "Omega Builders",
        status: "Approved",
      },
      {
        quoteId: "#Q-101",
        project: "Green Residency",
        material: "Bricks",
        quantity: "10,000 Pieces",
        contractorName: "Pinnacle Constructions",
        status: "Rejected",
      },
    ],
  },
  {
    id: 2,
    project: "Blue Horizon",
    contractorName: "Sneha",
    location: "Mumbai",
    urgency: "HIGH",
    status: "Approved",
    quotations: [],
  },
  {
    id: 3,
    project: "Sunset Villas",
    contractorName: "Arjun",
    location: "Bangalore",
    urgency: "MEDIUM",
    status: "Pending",
    quotations: [],
  },
];

// ── 2. Material QUOTATIONS (Supply Management > Material Quotations) ───────────
//    These are the supplier-submitted quotations grouped per material request.
export const materialQuotationsData = [
  {
    id: 1,
    project: "Green Residency",
    contractorName: "Sharma Constructions",
    material: "Cement",
    quantity: 500,
    quotations: [
      {
        quoteId: "#Q-101",
        supplier: "Green Residency",
        material: "Cement",
        quantity: "500 Bags",
        contractorName: "Sharma Constructions",
        quotedPrice: "₹1.8L",
        status: "Pending",
      },
      {
        quoteId: "#Q-101",
        supplier: "Green Residency",
        material: "Steel",
        quantity: "2000 Kgs",
        contractorName: "Omega Builders",
        quotedPrice: "₹4.5L",
        status: "Approved",
      },
      {
        quoteId: "#Q-101",
        supplier: "Green Residency",
        material: "Bricks",
        quantity: "10,000 Pieces",
        contractorName: "Pinnacle Constructions",
        quotedPrice: "₹3.2L",
        status: "Rejected",
      },
    ],
  },
  {
    id: 2,
    project: "Blue Heights",
    contractorName: "Reddy Builders",
    material: "Bricks",
    quantity: 1200,
    quotations: [],
  },
  {
    id: 3,
    project: "Sunset Villas",
    contractorName: "Kumar Enterprises",
    material: "Steel",
    quantity: 750,
    quotations: [],
  },
];