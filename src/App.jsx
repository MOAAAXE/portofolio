import React, { useState } from 'react';
import { Code, Smartphone, Globe, BookOpen, Briefcase, Mail, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
    name: "Muhamad Daffa Cahyo Santoso",
    role: "Mahasiswa Sistem Informasi",
    university: "Universitas Pamulang",
    bio: "Saya senang membangun sesuatu yang orang lain bisa langsung pakai, dari aplikasi peminjaman buku sampai sistem kasir restoran. Saya banyak belajar lewat vibe coding, dan menurut saya itu bukan soal jalan pintas, tapi soal cepat paham cara sesuatu bekerja lewat eksperimen langsung.",
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
    <div className="min-h-screen bg-[#141110] text-white font-sans selection:bg-amber-500 selection:text-black relative overflow-hidden">

      {/* Subtle warm background, no glow blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#241b14] via-[#141110] to-[#0d0b0a] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 backdrop-blur-md bg-[#141110]/80 sticky top-0 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-lg font-semibold tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Muhamad Daffa Cahyo Santoso
          </span>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="#about" className="hover:text-amber-400 transition-colors">Tentang</a>
            <a href="#skills" className="hover:text-amber-400 transition-colors">Keahlian</a>
            <a href="#projects" className="hover:text-amber-400 transition-colors">Portofolio</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Kontak</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center justify-between gap-14">
        <div className="flex-1 space-y-6 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 text-amber-400 text-xs tracking-wide uppercase">
            {profile.university}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Halo, saya Muhamad Daffa Cahyo Santoso.
          </h1>
          <p className="text-base text-white/70 leading-relaxed max-w-lg">
            {profile.bio}
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#projects" className="px-6 py-3 rounded-md bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-all">
              Lihat Project
            </a>
            <a href="#contact" className="px-6 py-3 rounded-md border border-white/20 hover:border-amber-500/60 text-white/80 hover:text-white transition-all">
              Hubungi Saya
            </a>
          </div>
        </div>

        {/* Foto profil - sedikit miring, tidak simetris sempurna */}
        <div className="relative flex-shrink-0">
          <div className="w-56 h-72 md:w-64 md:h-80 rounded-lg overflow-hidden border border-white/10 shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src={profileImg} 
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-[#1c1714] border border-white/10 rounded-md px-4 py-2 text-xs text-white/70 shadow-lg">
            {profile.role}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 max-w-6xl mx-auto px-6 py-14 border-t border-white/10">
        <h2 className="font-serif text-xl font-bold mb-6 flex items-center gap-3 text-white/90">
          <Code size={18} className="text-amber-500" /> Yang saya kuasai
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {profile.skills.map((skill, index) => (
            <span key={index} className="px-4 py-2 rounded-md border border-white/10 bg-white/[0.03] hover:border-amber-500/40 hover:bg-white/[0.06] transition-all text-sm text-white/80">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 max-w-6xl mx-auto px-6 py-14 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="font-serif text-xl font-bold flex items-center gap-3 text-white/90">
              <Briefcase size={18} className="text-amber-500" /> Beberapa hal yang sudah saya buat
            </h2>
            <p className="text-white/50 text-sm mt-1">Klik salah satu untuk lihat tampilannya lebih dekat.</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex border border-white/10 p-1 rounded-md text-xs">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded transition-all ${activeTab === 'all' ? 'bg-amber-500 text-black font-semibold' : 'text-white/50 hover:text-white'}`}>
              Semua
            </button>
            <button 
              onClick={() => setActiveTab('mobile')}
              className={`px-4 py-2 rounded transition-all ${activeTab === 'mobile' ? 'bg-amber-500 text-black font-semibold' : 'text-white/50 hover:text-white'}`}>
              Mobile App
            </button>
            <button 
              onClick={() => setActiveTab('web')}
              className={`px-4 py-2 rounded transition-all ${activeTab === 'web' ? 'bg-amber-500 text-black font-semibold' : 'text-white/50 hover:text-white'}`}>
              Bug Hunter
            </button>
          </div>
        </div>

        {/* Project Cards - sedikit variasi ukuran */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id} 
              onClick={() => openGallery(project)}
              className={`cursor-pointer rounded-lg border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-between hover:border-amber-500/40 hover:bg-white/[0.04] transition-all ${idx === 0 ? 'md:col-span-2' : ''}`}>
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {project.category === 'mobile' ? <Smartphone size={18} /> : <Globe size={18} />}
                  </span>
                  {project.images && project.images.length > 0 && (
                    <span className="text-xs text-white/40">
                      {project.images.length} foto
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{project.description}</p>

                <div className="space-y-1.5 mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-white/40 font-semibold">Fitur utama</h4>
                  <ul className="text-xs text-white/60 space-y-1">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-amber-500"></span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded border border-white/10 text-white/60">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

     {/* Contact Section */}
<section id="contact" className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-white/10">
  <div className="max-w-xl mx-auto text-center space-y-4">
    <h2 className="font-serif text-2xl font-bold">Ada yang bisa dikerjakan bareng?</h2>
    <p className="text-white/60 text-sm">
      Saya terbuka untuk kesempatan magang, proyek lepas, atau kolaborasi pengembangan perangkat lunak.
    </p>
    <div className="pt-4 flex flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-3">
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=daffacahyo1@gmail.com&su=Halo%2C%20Saya%20Ingin%20Berkolaborasi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-all">
          <Mail size={18} /> Kirim Email
        </a>
      </div>
      <p className="text-white/40 text-sm">daffacahyo1@gmail.com</p>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 text-center py-6 text-xs text-white/40">
        © 2026 Daffa Cahyo.
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
              className="absolute -top-12 right-0 md:top-0 md:-right-12 text-white hover:text-amber-400 transition-colors p-2"
            >
              <X size={28} />
            </button>

            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-white">{selectedProject.title}</h3>
              <p className="text-xs text-white/40 mt-1">
                {currentImageIndex + 1} / {selectedProject.images.length}
              </p>
            </div>

            <div className="relative w-full flex items-center justify-center">
              {selectedProject.images.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-0 -translate-x-2 md:-translate-x-12 z-10 p-2 rounded-full bg-[#1c1714] border border-white/10 hover:bg-amber-500 hover:text-black text-white transition-all"
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              <img
                src={selectedProject.images[currentImageIndex]}
                alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                className="max-h-[70vh] w-auto rounded-lg border border-white/10 shadow-2xl object-contain"
              />

              {selectedProject.images.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-0 translate-x-2 md:translate-x-12 z-10 p-2 rounded-full bg-[#1c1714] border border-white/10 hover:bg-amber-500 hover:text-black text-white transition-all"
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
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      i === currentImageIndex ? 'border-amber-400' : 'border-white/10 opacity-60 hover:opacity-100'
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