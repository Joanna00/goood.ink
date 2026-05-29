import { ClickFireworks } from "./components/ClickFireworks";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { PageLoader } from "./components/PageLoader";
import { PortfolioGrid } from "./components/PortfolioGrid";
import { useLanguage } from "./hooks/useLanguage";
import { useSound } from "./hooks/useSound";
import { useTheme } from "./hooks/useTheme";

function App() {
  const theme = useTheme();
  const language = useLanguage();
  const sound = useSound();

  return (
    <>
      <Header
        theme={theme.theme}
        isDark={theme.isDark}
        toggleTheme={theme.toggleTheme}
        language={language.language}
        setLanguage={language.setLanguage}
        sound={sound}
      />
      <PortfolioGrid language={language.language} sound={sound} />
      <Footer language={language.language} sound={sound} />
      <ClickFireworks />
      <PageLoader />
    </>
  );
}

export default App;
