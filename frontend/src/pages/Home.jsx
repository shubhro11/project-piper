import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import ArtistHubSection from "../components/landing/ArtistHubSection";
import PlaytimeAnalyticsSection from "../components/landing/PlaytimeAnalyticsSection";
import ListenerExperienceSection from "../components/landing/ListenerExperienceSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar />
      <HeroSection />
      <ListenerExperienceSection />
      <ArtistHubSection />
      <PlaytimeAnalyticsSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Home;