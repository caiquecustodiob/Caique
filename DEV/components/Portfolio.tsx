
import React from 'react';
import { 
  ExternalLink, MessageCircle, Code2, Users, Layers, 
  Smartphone, Bot, ChevronRight, Mail, Instagram, 
  Phone, Globe, Zap, CheckCircle2 
} from 'lucide-react';

interface PortfolioProps {
  isOpen: boolean;
  onClose: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] overflow-y-auto animate-in slide-in-from-bottom duration-700 ease-out">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center font-black text-black">C</div>
            <span className="font-oswald font-bold text-xl tracking-tighter">C&C CRAFT</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#about" className="hover:text-yellow-400 transition-colors">Sobre</a>
            <a href="#services" className="hover:text-yellow-400 transition-colors">Serviços</a>
            <a href="#projects" className="hover:text-yellow-400 transition-colors">Projetos</a>
            <button onClick={onClose} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all">Voltar ao Player</button>
          </div>
          <button onClick={onClose} className="md:hidden text-white">Fechar</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-8">
          <div className="inline-block px-4 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-xs font-bold tracking-widest uppercase mb-4 animate-bounce">
            Bem-vindo ao meu espaço
          </div>
          <h1 className="text-6xl md:text-8xl font-oswald font-black leading-none tracking-tighter uppercase italic">
            C&C CRAFT BY <br/>
            <span className="text-yellow-400">CAIQUE CUSTÓDIO</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed">
            Software Developer. Inovação, dedicação e código de alta performance. 
            Desenvolvo ferramentas que se adaptam perfeitamente à sua necessidade.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://c-c-craft.vercel.app/" target="_blank" className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-yellow-400 transition-all flex items-center gap-2">
              Ver Portfólio Real <ExternalLink size={18} />
            </a>
            <a href="https://wa.me/558588540125" target="_blank" className="px-8 py-4 bg-green-600 text-white font-black uppercase tracking-widest rounded-full hover:bg-green-700 transition-all flex items-center gap-2">
              Falar no WhatsApp <MessageCircle size={18} />
            </a>
          </div>
        </div>
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-[120px] -z-10" />
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-oswald font-black uppercase italic tracking-tight flex items-center gap-4">
              <span className="w-12 h-1 bg-yellow-400"></span> About Me
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed italic">
              "Acredito que a tecnologia existe para se adaptar ao que você precisa. Começando com força total, meu foco é entregar qualidade superior e dedicação em cada linha de código."
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                <div className="text-3xl font-black text-yellow-400 mb-1">100%</div>
                <div className="text-xs uppercase font-bold text-gray-500 tracking-widest">Dedicação Real</div>
              </div>
              <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                <div className="text-3xl font-black text-yellow-400 mb-1">3+</div>
                <div className="text-xs uppercase font-bold text-gray-500 tracking-widest">Projetos Ativos</div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-yellow-400/20 rounded-3xl blur-2xl group-hover:bg-yellow-400/30 transition-all" />
            <div className="relative aspect-video bg-zinc-900 border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden">
               <Code2 className="w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute bottom-6 left-6 text-left">
                  <div className="text-white font-black uppercase text-xl">Inovação Através da</div>
                  <div className="text-yellow-400 font-black uppercase text-3xl">Dedicação</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-5xl font-oswald font-black uppercase italic tracking-tighter">Especialidades & Serviços</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Soluções digitais sob medida para o seu negócio.</p>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: <Layers />, title: "Sites de Apresentação", desc: "Websites institucionais modernos que capturam a essência da sua marca." },
            { icon: <Users />, title: "Portfólios Profissionais", desc: "Destaque seus melhores trabalhos com uma vitrine digital de alto nível." },
            { icon: <Globe />, title: "Cardápios Digitais (QR)", desc: "Soluções ágeis para restaurantes com integração de pedidos e QR Code." },
            { icon: <Code2 />, title: "Sistemas Web sob Medida", desc: "Gestão, CRMs e plataformas exclusivas para a necessidade do seu negócio." },
            { icon: <Smartphone />, title: "Aplicações PWA", desc: "Apps instaláveis que funcionam offline e oferecem experiência nativa." },
            { icon: <Bot />, title: "Automação & Bots", desc: "Integrações inteligentes e automação de processos com Python e JS." },
          ].map((s, i) => (
            <div key={i} className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-yellow-400/5 hover:border-yellow-400/20 transition-all group">
              <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-yellow-400/5">
        <div className="max-w-6xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <h2 className="text-5xl font-oswald font-black uppercase italic tracking-tighter">Projetos em Destaque</h2>
            <p className="text-gray-400">Cases reais desenvolvidos com foco em performance.</p>
          </div>
          <a href="https://c-c-craft.vercel.app/" target="_blank" className="text-yellow-400 font-bold flex items-center gap-2 hover:underline">
            Ver galeria completa <ChevronRight size={20}/>
          </a>
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            { title: "Jarbas Coquetéis", cat: "Portfólio / Institucional", desc: "Site institucional elegante para coquetelaria de eventos." },
            { title: "Foco Total", cat: "Aplicação PWA", desc: "App de produtividade focado em organização e performance." },
            { title: "Rei da Mesa", cat: "Sistema Web de Gestão", desc: "Gerenciador completo para competições de Ping-Pong." },
            { title: "Custom Systems", cat: "Internos & Automação", desc: "Dashboards e automações sob demanda para empresas." }
          ].map((p, i) => (
            <div key={i} className="group relative overflow-hidden rounded-[32px] bg-black border border-white/5 aspect-[4/3] flex flex-col justify-end p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <ExternalLink size={20} />
              </div>
              <div className="relative z-10 space-y-2">
                <span className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.3em]">{p.cat}</span>
                <h3 className="text-3xl font-oswald font-black uppercase">{p.title}</h3>
                <p className="text-gray-400 text-sm max-w-xs">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
           <div className="relative">
              <h2 className="text-[120px] font-oswald font-black text-white/[0.02] absolute -top-10 -left-10 select-none">PILAR</h2>
              <div className="space-y-8">
                <h2 className="text-4xl font-oswald font-black uppercase tracking-tight italic">O que faz a C&C Craft única?</h2>
                <div className="grid gap-4">
                  {[
                    "Projetos reais e publicados",
                    "Soluções que se adaptam a você",
                    "Design funcional e inovador",
                    "Qualidade técnica comprovada",
                    "Contato direto e transparente"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="text-yellow-400" size={20} />
                      <span className="font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
           </div>
           <div className="p-10 bg-white text-black rounded-[40px] space-y-6 rotate-2 shadow-2xl">
              <Zap className="w-12 h-12 text-yellow-500 fill-yellow-500" />
              <p className="text-2xl font-oswald font-bold leading-tight">
                "Qualidade de código e usabilidade não são opcionais, são os pilares de qualquer sistema que pretenda durar."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-black italic">CC</div>
                <div>
                  <div className="font-black uppercase">Caique Custódio</div>
                  <div className="text-xs font-bold text-gray-500">Founder & Developer</div>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer Contact */}
      <footer className="py-24 px-6 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="space-y-6">
             <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center font-black text-black text-xl">C</div>
                <span className="font-oswald font-bold text-2xl tracking-tighter">C&C CRAFT</span>
             </div>
             <p className="text-gray-500 text-sm leading-relaxed">
               Tecnologia sob medida para impulsionar seu sucesso digital com excelência e dedicação.
             </p>
             <div className="flex gap-4">
               <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Instagram size={20}/></a>
               <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Mail size={20}/></a>
               <a href="https://wa.me/558588540125" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Phone size={20}/></a>
             </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-bold uppercase tracking-widest text-xs text-yellow-400">Contato Direto</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <Mail size={16} />
                </div>
                <span className="text-gray-300">caiquecustodiob@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <Phone size={16} />
                </div>
                <span className="text-gray-300">+55 85 8854-0125</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-center md:text-right">
             <h4 className="font-bold uppercase tracking-widest text-xs text-gray-500">Localização</h4>
             <p className="text-white font-oswald text-2xl italic">Fortaleza - Ceará<br/>Nordeste, Brasil</p>
             <div className="pt-4">
                <span className="px-6 py-2 border border-white/10 rounded-full text-xs font-bold uppercase tracking-tighter">Qualidade Comprovada © 2026</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
