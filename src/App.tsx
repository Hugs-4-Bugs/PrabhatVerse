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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => localStorage.getItem('theme') === 'light' ? 'light' : 'dark');
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [tryVoicePopupShown, setTryVoicePopupShown] = useState(false);
  const [messages, setMessages] = useState<any[]>([{
    sender: "bot",
    text: "Hello! I am Prabhat Kumar's AI Assistant. You can ask about Prabhat's skills, projects, or anything else."
  }]);

  const [bioData, setBioData] = useState<any>(null);
  const [projectsData, setProjectsData] = useState<any>(null);
  const [sectionsData, setSectionsData] = useState<any>(null);
  const [skillsData, setSkillsData] = useState<any>(null);
  const [socialLinksData, setSocialLinksData] = useState<any>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
 fetch("/data/master_profile.md")
      .then(res => res.text())
      .then(setProfileMd)
      .catch(err => console.error("Failed to load profile:", err));
  }, []);

  useEffect(() => {
 fetch("/data/bio.json")
      .then(res => res.json())
      .then(setBioData)
      .catch(err => console.error("Failed to load bio data:", err));
  }, []);

  useEffect(() => {
 fetch("/data/projects.json")
      .then(res => res.json())
      .then(setProjectsData)
      .catch(err => console.error("Failed to load projects data:", err));
  }, []);

  useEffect(() => {
 fetch("/data/sections.json")
      .then(res => res.json())
      .then(setSectionsData)
      .catch(err => console.error("Failed to load sections data:", err));
  }, []);

  useEffect(() => {
 fetch("/data/skills.json")
      .then(res => res.json())
      .then(setSkillsData)
      .catch(err => console.error("Failed to load skills data:", err));
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

  useEffect(() => {
    fetch("/data/social_links.json")
      .then(res => res.json())
      .then(setSocialLinksData)
      .catch(err => console.error("Failed to load social links data:", err));
  }, []);

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
        >
          <TopBar
            onProfileClick={() => setIsGridOpen(!isGridOpen)}
            isGridOpen={isGridOpen}
            onTerminalClick={() => setTerminalOpen(true)}
            onVoiceAssistantClick={() => setVoiceModalOpen(true)}
            onBrowserClick={() => setBrowserOpen(true)}
            theme={theme}
            setTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
          />
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
          <SocialGrid open={isGridOpen} />
          <ChatWindow activeSection={activeSection} sidebarCollapsed={sidebarCollapsed}>
            {activeSection === 'Home' ? (
              <ChatbotSection messages={messages} setMessages={setMessages} />
            ) : activeSection === 'Profile (Admin)' ? (
              <ProfileAdminSection onProfileUpdate={setProfileMd} />
            ) : (
              /*
               * Pass fetched data as props to the section components.
               * If a section doesn't have corresponding data, it will receive `null`.
               * The section components should handle the case where the data is null (e.g., display a loading message).
               */
              <Suspense fallback={<div className="text-muted-foreground">Loading...</div>}>
                {activeSection === 'About' && <AboutSection bioData={bioData} />}
                {activeSection === 'Services' && <ServicesSection servicesData={sectionsData?.services} />}
                {activeSection === 'Education' && <EducationSection educationData={sectionsData?.education} />}
                {activeSection === 'Skills' && <SkillsSection skillsData={skillsData} />}
                {activeSection === 'Projects' && <ProjectsSection projectsData={projectsData} />}
                {activeSection === 'Technology' && <TechnologySection technologyData={sectionsData?.technology} />}
                {activeSection === 'Blogs' && <BlogsSection blogsData={sectionsData?.blogs} />}
                {activeSection === 'Contact' && <ContactSection contactData={sectionsData?.contact} />}
                {activeSection === 'Resume' && <ResumeSection resumeData={sectionsData?.resume} />}
                {/*
                 * The following sections are handled separately above:
                 * - Home (ChatbotSection)
                 * - Profile (Admin) (ProfileAdminSection)
                 *
                 * If a section is not listed here or in the above conditions,
                 * the fallback will be displayed.
                 */}
                {(!sectionMap[activeSection] && activeSection !== 'Home' && activeSection !== 'Profile (Admin)') && <SectionComponent />}
              </Suspense>
            )}
          </ChatWindow>
          <TerminalModal open={terminalOpen} onClose={() => setTerminalOpen(false)} knowledge={profileMd} />
        </div>
      </div>
    </div>
  );
}







