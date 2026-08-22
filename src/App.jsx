import React, { useState } from 'react';
import { Code, Smartphone, Globe, Send, ExternalLink, BookOpen, MessageSquare, User, Briefcase, Mail, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import foto profil
import profileImg from './assets/foto/foto-profile.jpeg';

// Import foto project - Peminjaman Buku
import pinjamBuku0 from './assets/foto/pinjambuku.jpeg';
import pinjamBuku1 from './assets/foto/pinjambuku1.jpeg';
import pinjamBuku2 from './assets/foto/pinjambuku2.jpeg';
import pinjamBuku3 from './assets/foto/pinjambuku3.jpeg';
import pinjamBuku4 from './assets/foto/pinjambuku4.jpeg';
import pinjamBuku5 from './assets/foto/pinjambuku5.jpeg';

// Import foto project - WhatsApp Broadcast API
import waBuktiTerkirim from './assets/foto/bukti-wa-terkirim.png';
import waProsesPengujian from './assets/foto/proses-pengujian.jpeg';
import waCredential from './assets/foto/credential-ekspose.jpeg';

// Import foto project - Kasir Seafood (Jhon)
import jhon0 from './assets/foto/jhon.jpeg';
import jhon1 from './assets/foto/jhon1.jpeg';
import jhon2 from './assets/foto/jhon2.jpeg';
import jhon3 from './assets/foto/jhon3.jpeg';
import jhon4 from './assets/foto/jhon4.jpeg';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const profile = {
    name: "Daffa Cahyo",
    role: "Mahasiswa Sistem Informasi",
    university: "Universitas Pamulang",
    bio: "Mahasiswa Sistem Informasi Universitas Pamulang yang berfokus pada pengembangan aplikasi mobile dan web. Memiliki keahlian dalam membangun antarmuka pengguna interaktif dan integrasi sistem backend/API.",
    skills: ["Flutter", "Dart", "HTML5", "CSS3", "JavaScript", "REST API", "Bug Hunting", "Git & GitHub"]
  };

  const projects = [
    {
      id: 1,
      category: "mobile",
      title: "Aplikasi Mobile Peminjaman Buku Online",
      tech: ["Flutter", "Dart", "UI/UX Design"],
      description: "Aplikasi peminjaman buku berbasis mobile dengan fitur autentikasi pengguna, pengajuan pinjaman dinamis, manajemen jadwal pengembalian, dan riwayat akun.",
      highlights: ["Layar Dashboard & Autentikasi", "Form Peminjaman & Fasilitas Tambahan", "Manajemen Profil Pengguna"],
      images: [pinjamBuku0, pinjamBuku1, pinjamBuku2, pinjamBuku3, pinjamBuku4, pinjamBuku5]
    },
    {
      id: 2,
      category: "web",
      title: "Integrasi WhatsApp Broadcast & Notification API",
      tech: ["REST API", "Qontak API", "cURL / Backend Integration"],
      description: "Sistem pengiriman notifikasi otomatis dan konfirmasi janji temu via WhatsApp Direct untuk instansi kesehatan (RSAB Harapan Kita) menggunakan API Qontak.",
      highlights: ["Automated Appointment Confirmation", "Custom Dynamic Template Mapping", "Secure Endpoint Integration"],
      images: [waBuktiTerkirim, waProsesPengujian, waCredential]
    },
    {
      id: 3,
      category: "mobile",
      title: "Aplikasi Kasir (POS) Jhon Seafood 68",
      tech: ["Flutter", "Dart", "UI/UX Design"],
      description: "Aplikasi point-of-sale berbasis mobile untuk restoran seafood, mendukung manajemen menu, pemrosesan pesanan dengan detail transaksi, serta laporan penjualan harian secara real-time.",
      highlights: [
        "Autentikasi Login Admin & Kasir",
        "Kelola Menu Makanan (Tambah/Edit/Hapus)",
        "Detail Transaksi (Nama Pelanggan, No. Meja, Metode Pembayaran)",
        "Laporan Penjualan Harian & Riwayat Transaksi"
      ],
      images: [jhon0, jhon1, jhon2, jhon3, jhon4]
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  const openGallery = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white font-sans selection:bg-cyan-500 selection:text-black relative overflow-hidden">
      
      {/* Background Stars & Space Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-[#070b19] to-[#03050c] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-slate-800/80 backdrop-blur-md bg-[#070b19]/70 sticky top-0 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wider">
            MUHAMAD DAFFA CAHYO SANTOSO
          </span>
          <div className="flex gap-6 text-sm text-slate-300">
            <a href="#about" className="hover:text-cyan-400 transition-colors">Tentang</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Keahlian</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Portofolio</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Kontak</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs tracking-wide">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            {profile.university}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Halo, Saya <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">{profile.name}</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
            {profile.bio}
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#projects" className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
              Lihat Project
            </a>
            <a href="#contact" className="px-6 py-3 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-200 transition-all">
              Hubungi Saya
            </a>
          </div>
        </div>

        {/* Profile Avatar Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-6 text-center shadow-2xl">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-lg mb-4">
              <img 
                src={profileImg} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-white">{profile.name}</h3>
            <p className="text-sm text-cyan-400 mt-1">{profile.role}</p>
            <p className="text-xs text-slate-400 mt-2">{profile.university}</p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <Code className="text-cyan-400" /> Keahlian Utama
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {profile.skills.map((skill, index) => (
            <div key={index} className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all text-center">
              <span className="text-slate-200 font-medium">{skill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Briefcase className="text-cyan-400" /> Portofolio Project
            </h2>
            <p className="text-slate-400 text-sm mt-1">Beberapa aplikasi dan integrasi sistem yang telah saya kembangkan.</p>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex bg-slate-900/80 border border-slate-800 p-1 rounded-lg text-xs">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md transition-all ${activeTab === 'all' ? 'bg-cyan-500 text-black font-semibold' : 'text-slate-400 hover:text-white'}`}>
              Semua
            </button>
            <button 
              onClick={() => setActiveTab('mobile')}
              className={`px-4 py-2 rounded-md transition-all ${activeTab === 'mobile' ? 'bg-cyan-500 text-black font-semibold' : 'text-slate-400 hover:text-white'}`}>
              Mobile App
            </button>
            <button 
              onClick={() => setActiveTab('web')}
              className={`px-4 py-2 rounded-md transition-all ${activeTab === 'web' ? 'bg-cyan-500 text-black font-semibold' : 'text-slate-400 hover:text-white'}`}>
              Web & API & Bug Hunting
            </button>
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => openGallery(project)}
              className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-1">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {project.category === 'mobile' ? <Smartphone size={20} /> : <Globe size={20} />}
                  </span>
                  {project.images && project.images.length > 0 && (
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      {project.images.length} Foto
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{project.description}</p>
                
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Fitur Utama:</h4>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-cyan-400"></span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 border border-slate-700/50">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    {/* Contact Section */}
<section id="contact" className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/60">
  <div className="max-w-xl mx-auto text-center space-y-4">
    <h2 className="text-3xl font-bold">Mari Bekerja Sama</h2>
    <p className="text-slate-300 text-sm">
      Saya terbuka untuk kesempatan magang, proyek lepas, atau kolaborasi pengembangan perangkat lunak.
    </p>
    <div className="pt-4 flex flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-3">
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=daffacahyo1@gmail.com&su=Halo%2C%20Saya%20Ingin%20Berkolaborasi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-500 text-cyan-400 font-semibold hover:bg-cyan-500/10 transition-all">
          Kirim Email
        </a>
      </div>
      <p className="text-slate-400 text-sm">daffacahyo1@gmail.com</p>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 text-center py-6 text-xs text-slate-400">
        © 2026 Daffa Cahyo. Dibuat dengan React.js & Tailwind CSS.
      </footer>

      {/* Gallery Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={closeGallery}
        >
          <div 
            className="relative w-full max-w-3xl max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeGallery}
              className="absolute -top-12 right-0 md:top-0 md:-right-12 text-white hover:text-cyan-400 transition-colors p-2"
            >
              <X size={28} />
            </button>

            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-white">{selectedProject.title}</h3>
              <p className="text-xs text-slate-400 mt-1">
                {currentImageIndex + 1} / {selectedProject.images.length}
              </p>
            </div>

            <div className="relative w-full flex items-center justify-center">
              {selectedProject.images.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-0 -translate-x-2 md:-translate-x-12 z-10 p-2 rounded-full bg-slate-900/80 border border-slate-700 hover:bg-cyan-500 hover:text-black text-white transition-all"
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              <img
                src={selectedProject.images[currentImageIndex]}
                alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                className="max-h-[70vh] w-auto rounded-xl border border-slate-800 shadow-2xl object-contain"
              />

              {selectedProject.images.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-0 translate-x-2 md:translate-x-12 z-10 p-2 rounded-full bg-slate-900/80 border border-slate-700 hover:bg-cyan-500 hover:text-black text-white transition-all"
                >
                  <ChevronRight size={22} />
                </button>
              )}
            </div>

            {selectedProject.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto max-w-full pb-2">
                {selectedProject.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      i === currentImageIndex ? 'border-cyan-400' : 'border-slate-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}