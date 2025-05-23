import type React from "react";
import { useState, useEffect, Suspense } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import ChatWindow from "./components/ChatWindow";
import SocialGrid from "./components/SocialGrid";
import UserTypeModal from "./components/UserTypeModal";
import ChatbotSection, { gptLocalSmartAnswer } from "./components/ChatbotSection";
import TerminalModal from "./components/TerminalModal";
import VoiceAssistantModal from "./components/VoiceAssistantModal";
import BrowserModal from "./components/BrowserModal";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import TechnologySection from "./sections/TechnologySection";
import BlogsSection from "./sections/BlogsSection";
import ContactSection from "./sections/ContactSection";
import ResumeSection from "./sections/ResumeSection";
import ProfileAdminSection from "./sections/ProfileAdminSection";
import TryVoicePopup from "./components/TryVoicePopup";

const sectionMap: Record<string, React.ComponentType> = {
  About: AboutSection,
  Services: ServicesSection,
  Education: EducationSection,
  Skills: SkillsSection,
  Projects: ProjectsSection,
  Technology: TechnologySection,
  Blogs: BlogsSection,
  Contact: ContactSection,
  Resume: ResumeSection,
  Profile: ProfileAdminSection,
};

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);
  useEffect(() => {
    function onResize() { setMobile(window.innerWidth < 1024); }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return mobile;
}

export default function App() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [browserOpen, setBrowserOpen] = useState(false);
  const [profileMd, setProfileMd] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => localStorage.getItem('theme') === 'light' ? 'light' : 'dark');  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [tryVoicePopupShown, setTryVoicePopupShown] = useState(false);  const [messages, setMessages] = useState<any[]>([{ sender: "bot", text: "Hello! I am Prabhat Kumar's AI Assistant. You can ask about Prabhat's skills, projects, or anything else." }]);

  const isMobile = useIsMobile();

  useEffect(() => {
    fetch("/src/data/master_profile.md")
    // fetch("/data/master_profile.md")
      .then(res => res.text())
      .then(setProfileMd)
      .catch(err => console.error("Failed to load profile:", err));
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme || 'dark');
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (isMobile && !sidebarCollapsed) {
      setSidebarCollapsed(true);
    }
  }, [isMobile, sidebarCollapsed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '[') {
        setSidebarCollapsed(true);
      } else if (e.key === ']') {
        setSidebarCollapsed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // After who selection, show try voice popup *exactly once*
  useEffect(() => {
    if (userType && !tryVoicePopupShown) {
      setTimeout(() => setTryVoicePopupShown(true), 400);
    }
  }, [userType]);

  const SectionComponent = sectionMap[activeSection] || (() => <div className="text-white">Not implemented</div>);

  return (
    <div className={theme === 'dark' ? "dark" : "light"}>
      <div className="flex h-screen bg-background overflow-x-hidden">
        {!userType && <UserTypeModal onSelect={setUserType} />}
        <TryVoicePopup
          open={!!userType && tryVoicePopupShown && !voiceModalOpen}
          onTry={() => { setVoiceModalOpen(true); setTryVoicePopupShown(false); }}
          onLater={() => setTryVoicePopupShown(false)}
        />
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          theme={theme}
        />
        <div
          className={`flex-1 flex flex-col min-h-0 relative overflow-hidden transition-all duration-300 ${sidebarCollapsed ? "ml-0 lg:ml-12" : "ml-0 lg:ml-56"}`}
        > {/* Adjust margin for small screens based on sidebar collapsed state */}
          <TopBar
            onProfileClick={() => setIsGridOpen(!isGridOpen)}
            isGridOpen={isGridOpen}
            onTerminalClick={() => setTerminalOpen(true)}
            onVoiceAssistantClick={() => setVoiceModalOpen(true)}
            onBrowserClick={() => setBrowserOpen(true)}
            theme={theme}
            setTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
 />
          <ChatWindow activeSection={activeSection} sidebarCollapsed={sidebarCollapsed} messages={messages} setMessages={setMessages} >

            {/* content that should be inside chat window based on activeSection */}
          </ChatWindow>
          <VoiceAssistantModal
            open={voiceModalOpen}
            onClose={() => setVoiceModalOpen(false)}
            knowledge={profileMd}
            localAi={gptLocalSmartAnswer}
          />
          <BrowserModal
            open={browserOpen}
            onClose={() => setBrowserOpen(false)}
          />
          <SocialGrid open={isGridOpen}  />
          <ChatWindow activeSection={activeSection} sidebarCollapsed={sidebarCollapsed} messages={[]} setMessages={function (value: React.SetStateAction<any[]>): void {
            throw new Error("Function not implemented.");
          } }>
            {activeSection === 'Home' ? (
              <ChatbotSection messages={messages} setMessages={setMessages} />
            ) : activeSection === 'Profile (Admin)' ? (
              <ProfileAdminSection onProfileUpdate={setProfileMd} />
            ) : (
              <Suspense fallback={<div className="text-muted-foreground">Loading...</div>}>
                <SectionComponent />
              </Suspense>
            )}
          </ChatWindow>
          <TerminalModal open={terminalOpen} onClose={() => setTerminalOpen(false)} knowledge={profileMd} />
        </div>
      </div>
    </div>
  );
}
