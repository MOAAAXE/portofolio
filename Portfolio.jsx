import React, { useState } from 'react';
import { Code, Smartphone, Globe, Send, ExternalLink, BookOpen, MessageSquare, User, Briefcase, Mail } from 'lucide-react';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('all');

  const profile = {
    name: "Daffa Cahyo",
    role: "Mahasiswa Sistem Informasi",
    university: "Universitas Pamulang",
    bio: "Mahasiswa Sistem Informasi Universitas Pamulang yang berfokus pada pengembangan aplikasi mobile dan web. Memiliki keahlian dalam membangun antarmuka pengguna interaktif dan integrasi sistem backend/API.",
    skills: ["Flutter", "Dart", "HTML5", "CSS3", "JavaScript", "REST API", "Git & GitHub"]
  };

  const projects = [
    {
      id: 1,
      category: "mobile",
      title: "Aplikasi Mobile Peminjaman Buku Online",
      tech: ["Flutter", "Dart", "UI/UX Design"],
      description: "Aplikasi peminjaman buku berbasis mobile dengan fitur autentikasi pengguna, pengajuan pinjaman dinamis, manajemen jadwal pengembalian, dan riwayat akun.",
      highlights: ["Layar Dashboard & Autentikasi", "Form Peminjaman & Fasilitas Tambahan", "Manajemen Profil Pengguna"]
    },
    {
      id: 2,
      category: "web",
      title: "Integrasi WhatsApp Broadcast & Notification API",
      tech: ["REST API", "Qontak API", "cURL / Backend Integration"],
      description: "Sistem pengiriman notifikasi otomatis dan konfirmasi janji temu via WhatsApp Direct untuk instansi kesehatan (RSAB Harapan Kita) menggunakan API Qontak.",
      highlights: ["Automated Appointment Confirmation", "Custom Dynamic Template Mapping", "Secure Endpoint Integration"]
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

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
            DAFFA.DEV
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
              Lihat Proyek
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
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-3xl font-bold shadow-lg mb-4">
              D
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
              <Briefcase className="text-cyan-400" /> Portofolio Proyek
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
              Web & API
            </button>
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:shadow-xl hover:shadow-cyan-500/5">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {project.category === 'mobile' ? <Smartphone size={20} /> : <Globe size={20} />}
                  </span>
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
          <div className="pt-4 flex justify-center gap-4">
            <a href="mailto:daffa@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-all">
              <Mail size={18} /> Kirim Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 text-center py-6 text-xs text-slate-400">
        © 2026 Daffa Cahyo. Dibuat dengan React.js & Tailwind CSS.
      </footer>
    </div>
  );
}