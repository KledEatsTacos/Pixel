import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "tr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Landing page
    location: "istanbul",
    heroTitle: "Welcome to the Modern Marketplace",
    heroDescription: "Buy, sell, and connect with your local community. A reimagined classifieds experience with modern design and powerful features.",
    letsDiveIn: "Let's Dive In",
    browseByCategory: "Browse by Category",
    aboutTitle: "About craigslist",
    aboutDescription: "craigslist is a modern reimagination of the classic classifieds platform. We combine the simplicity and local focus you love with contemporary design and enhanced user experience. Post listings, browse categories, connect with your community - all in a beautiful, fast, and secure environment.",
    aboutPixelsel: "about craigslist",
    helpSafety: "help & safety tips",
    avoidScams: "avoid scams & fraud",
    personalSafety: "personal safety",
    termsOfUse: "terms of use",
    privacyPolicy: "privacy policy",
    footerText: "A modern take on local classifieds",
    
    // Categories
    community: "community",
    housing: "housing",
    jobs: "jobs",
    forSale: "for sale",
    services: "services",
    discussionForums: "discussion forums",
    
    // Marketplace
    search: "Search...",
    
    // Turkish categories for marketplace
    topluluk: "Community",
    kalacakYer: "Housing",
    hizmetler: "Services",
    satilik: "For Sale",
    tartismaForumu: "Discussion Forum",
    isIlanlari: "Job Listings",
  },
  tr: {
    // Landing page
    location: "istanbul",
    heroTitle: "Modern Pazaryerine Hoş Geldiniz",
    heroDescription: "Yerel topluluğunuzla alışveriş yapın, satın ve bağlantı kurun. Modern tasarım ve güçlü özelliklerle yeniden tasarlanmış ilan deneyimi.",
    letsDiveIn: "Hadi Başlayalım",
    browseByCategory: "Kategorilere Göz Atın",
    aboutTitle: "craigslist Hakkında",
    aboutDescription: "craigslist, klasik ilan platformunun modern bir yeniden yorumudur. Sevdiğiniz sadelik ve yerel odağı çağdaş tasarım ve gelişmiş kullanıcı deneyimiyle birleştiriyoruz. İlan gönderin, kategorilere göz atın, topluluğunuzla bağlantı kurun - hepsi güzel, hızlı ve güvenli bir ortamda.",
    aboutPixelsel: "craigslist hakkında",
    helpSafety: "yardım ve güvenlik ipuçları",
    avoidScams: "dolandırıcılıktan kaçının",
    personalSafety: "kişisel güvenlik",
    termsOfUse: "kullanım koşulları",
    privacyPolicy: "gizlilik politikası",
    footerText: "Yerel ilanlara modern bir bakış",
    
    // Categories
    community: "topluluk",
    housing: "konut",
    jobs: "iş ilanları",
    forSale: "satılık",
    services: "hizmetler",
    discussionForums: "tartışma forumları",
    
    // Marketplace
    search: "Arama yap...",
    
    // Turkish categories for marketplace
    topluluk: "Topluluk",
    kalacakYer: "Kalacak Yer",
    hizmetler: "Hizmetler",
    satilik: "Satılık",
    tartismaForumu: "Tartışma Forumu",
    isIlanlari: "İş İlanları",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
