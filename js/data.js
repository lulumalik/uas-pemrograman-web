/* ==========================================================================
   Static Data Store - Edukasi Platform
   ========================================================================== */

// Data Katalog Materi Edukasi (Section 2 - Cards & Modal Detail)
const MATERI_CARDS_DATA = [
  {
    id: "web-dev-1",
    title: "Pemrograman Web Modern (HTML, CSS & JS)",
    category: "Web Development",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    descShort: "Pelajari fondasi utama pembuatan website modern, tata letak responsif, hingga manipulasi DOM secara interaktif.",
    descFull: "Kelas ini memberikan pemahaman komprehensif mengenai pengembangan web front-end dari tingkat pemula hingga siap membangun aplikasi web responsif. Dilengkapi latihan praktis dan review kode.",
    subtopics: [
      "Semantik HTML5 & Aksesibilitas Web",
      "Modern CSS Grid & Flexbox Layout",
      "JavaScript ES6+ & Fetch API",
      "Studi Kasus Mini Project Real-World"
    ],
    syllabus: [
      "Struktur Document & HTML5 Semantic",
      "Styling Modern dengan CSS Variables & Flexbox",
      "Interaktivitas DOM & Event Handling",
      "Asynchronous JavaScript & RESTful API",
      "Integrasi Deployment ke GitHub Pages"
    ],
    prereq: "Tidak ada prasarat khusus. Sangat cocok untuk pemula.",
    linkExternal: "https://www.w3schools.com/html/"
  },
  {
    id: "data-science-1",
    title: "Python Fundamental & Data Analysis",
    category: "Data Science",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    descShort: "Kuasai bahasa Python untuk olah data besar, visualisasi grafik interaktif, dan pembersihan dataset complex.",
    descFull: "Modul edukasi sains data ini memandu Anda dalam memahami analitik data berbasis Python. Sangat direkomendasikan untuk mahasiswa, peneliti, maupun calon Data Analyst.",
    subtopics: [
      "Sintaksis Dasar & Data Structures Python",
      "Manipulasi Data dengan Pandas & NumPy",
      "Visualisasi Data Matplotlib & Seaborn",
      "Pengenalan Exploratory Data Analysis"
    ],
    syllabus: [
      "Pengenalan Python & Jupyter Notebook",
      "Operasi Matriks & Vector dengan NumPy",
      "Data Wrangling & Cleaning dengan Pandas",
      "Teknik Visualisasi Data Informasi",
      "Studi Kasus Analisis Tren Pasar"
    ],
    prereq: "Logika dasar matematika dan pemikiran analitis.",
    linkExternal: "https://www.w3schools.com/python/"
  },
  {
    id: "cyber-sec-1",
    title: "Cyber Security & Network Defense",
    category: "Cyber Security",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    descShort: "Pahami konsep pertahanan jaringan, identifikasi celah keamanan web (OWASP Top 10), dan dasar kriptografi modern.",
    descFull: "Materi edukasi keamanan siber ini membekali peserta dengan pengetahuan penting dalam melindungi sistem web dan infrastruktur jaringan dari ancaman siber.",
    subtopics: [
      "Pengenalan OWASP Top 10 Vulnerabilities",
      "Network Analysis & Packet Inspection",
      "Encryption & Authentication Standards",
      "Defensive Security Best Practices"
    ],
    syllabus: [
      "Prinsip CIA Triad & Fundamentals Security",
      "Analisis Web Vulnerability (SQLi, XSS, CSRF)",
      "Penggunaan Tools Wireshark & Nmap",
      "Ethical Hacking & Penetration Testing Intro",
      "Security Hardening untuk Server"
    ],
    prereq: "Dasar jaringan komputer dan perintah terminal.",
    linkExternal: "https://www.w3schools.com/cybersecurity/"
  }
];

// Data Tabel Informasi Harga & Tingkat Kesulitan (Section 4)
const TABLE_MATERI_DATA = [
  {
    no: "01",
    title: "Dasar Pemrograman Web HTML5 & CSS3",
    iconClass: "fa-brands fa-html5",
    category: "Web Development",
    difficulty: "pemula",
    difficultyLabel: "Pemula",
    difficultyIcon: "fa-solid fa-seedling",
    duration: "10 Modul (15 Jam)",
    price: "Gratis",
    isFree: true,
    actionLink: "#section-edukasi"
  },
  {
    no: "02",
    title: "JavaScript DOM & Asynchronous Fetch API",
    iconClass: "fa-brands fa-js",
    category: "Web Development",
    difficulty: "menengah",
    difficultyLabel: "Menengah",
    difficultyIcon: "fa-solid fa-layer-group",
    duration: "14 Modul (20 Jam)",
    price: "Rp 150.000",
    isFree: false,
    actionLink: "#section-edukasi"
  },
  {
    no: "03",
    title: "Fullstack Web Framework React & Node.js",
    iconClass: "fa-brands fa-react",
    category: "Web Development",
    difficulty: "mahir",
    difficultyLabel: "Mahir",
    difficultyIcon: "fa-solid fa-fire",
    duration: "24 Modul (40 Jam)",
    price: "Rp 350.000",
    isFree: false,
    actionLink: "#section-edukasi"
  },
  {
    no: "04",
    title: "Python Fundamental untuk Data Analyst",
    iconClass: "fa-brands fa-python",
    category: "Data Science",
    difficulty: "pemula",
    difficultyLabel: "Pemula",
    difficultyIcon: "fa-solid fa-seedling",
    duration: "12 Modul (18 Jam)",
    price: "Gratis",
    isFree: true,
    actionLink: "#section-edukasi"
  },
  {
    no: "05",
    title: "Machine Learning & Predictive Modeling",
    iconClass: "fa-solid fa-brain",
    category: "Data Science",
    difficulty: "menengah",
    difficultyLabel: "Menengah",
    difficultyIcon: "fa-solid fa-layer-group",
    duration: "18 Modul (30 Jam)",
    price: "Rp 275.000",
    isFree: false,
    actionLink: "#section-edukasi"
  },
  {
    no: "06",
    title: "UI/UX Design Systems & Figma Essentials",
    iconClass: "fa-solid fa-pen-nib",
    category: "UI/UX Design",
    difficulty: "pemula",
    difficultyLabel: "Pemula",
    difficultyIcon: "fa-solid fa-seedling",
    duration: "10 Modul (12 Jam)",
    price: "Rp 99.000",
    isFree: false,
    actionLink: "#section-edukasi"
  },
  {
    no: "07",
    title: "Ethical Hacking & Network Defense",
    iconClass: "fa-solid fa-shield-halved",
    category: "Cyber Security",
    difficulty: "menengah",
    difficultyLabel: "Menengah",
    difficultyIcon: "fa-solid fa-layer-group",
    duration: "16 Modul (25 Jam)",
    price: "Rp 250.000",
    isFree: false,
    actionLink: "#section-edukasi"
  }
];
