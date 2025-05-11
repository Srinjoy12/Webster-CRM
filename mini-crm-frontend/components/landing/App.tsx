import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import Navbar from './components/Navbar';
import ManagementSection from './components/ManagementSection';
import ExploreFeaturesSection from './components/ExploreFeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <FeaturesSection />
          <ManagementSection />
          <ExploreFeaturesSection />
          <HowItWorksSection />
          <FaqSection />
          <CtaSection />
        </main>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
