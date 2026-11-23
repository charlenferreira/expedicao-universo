import { CosmicAddressSection } from './components/CosmicAddressSection';
import { CosmicBackground } from './components/CosmicBackground';
import { CosmicQuizSection } from './components/CosmicQuizSection';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { SpaceExplorerSection } from './components/SpaceExplorerSection';

export default function App() {
  return (
    <div className="relative min-h-screen text-slate-100">
      {/* Continuous Full-Viewport Night-Blue Space Background Canvas */}
      <CosmicBackground />

      {/* Floating Liquid Glass Navigation */}
      <Navbar />

      {/* Main Content Flow */}
      <main>
        <HeroSection />
        <CosmicAddressSection />
        <SpaceExplorerSection />
        <CosmicQuizSection />
      </main>

      {/* Clean Quiet Footer */}
      <footer className="relative pb-24 md:pb-12 pt-8 px-4 sm:px-6 lg:px-8 border-t border-sky-200/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sky-200/65">
          <p className="font-display font-medium text-sky-100/80">
            Expedição ao Universo: Nosso Endereço Cósmico
          </p>
          <p>
            Terra · Sistema Solar · Braço de Órion · Via Láctea · Grupo Local · Laniakea · Universo Observável
          </p>
        </div>
      </footer>
    </div>
  );
}
