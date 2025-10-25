import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

export default function Explore() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { location, setLocation, availableCities } = useLocation();
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(globalThis.window.innerWidth < 768);
    };
    
    checkMobile();
    globalThis.window.addEventListener('resize', checkMobile);
    
    return () => globalThis.window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = [
    { name: t("community"), icon: "🤝", color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", path: "/topluluk" },
    { name: t("housing"), icon: "🏠", color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", path: "/explore" },
    { name: t("jobs"), icon: "💼", color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", path: "/explore" },
    { name: t("forSale"), icon: "🛒", color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", path: "/explore" },
    { name: t("services"), icon: "🧰", color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", path: "/explore" },
  ];

  const listings = [
    {
      title: language === "en" ? "Modern 2BR Apartment" : "Modern 2+1 Daire",
      price: language === "en" ? "$2,500/mo" : "35.000 TL/ay",
      location: "new york",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      title: language === "en" ? "Senior Frontend Developer" : "Kıdemli Frontend Developer",
      price: language === "en" ? "Full-time" : "Tam zamanlı",
      location: "san francisco",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
    {
      title: language === "en" ? "Tesla Model 3 2022" : "Tesla Model 3 2022",
      price: language === "en" ? "$38,000" : "1.200.000 TL",
      location: "los angeles",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
    },
    {
      title: language === "en" ? "Vintage Leather Sofa" : "Vintage Deri Koltuk",
      price: language === "en" ? "$850" : "28.000 TL",
      location: "chicago",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    },
    {
      title: language === "en" ? "Plumbing Services" : "Tesisat Hizmetleri",
      price: language === "en" ? "From $80/hr" : "2.500 TL/saat",
      location: "miami",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7",
    },
    {
      title: language === "en" ? "MacBook Pro M3 16\"" : "MacBook Pro M3 16\"",
      price: language === "en" ? "$2,400" : "80.000 TL",
      location: "seattle",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    },
  ];

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        zIndex: 0
      }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(102,126,234,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)"
          }}
        />
      </div>

      <Header 
        onLoginClick={() => setShowLoginModal(true)}
        showSearch={true}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder={language === "en" ? "Search for anything..." : "Bir şey ara..."}
      />

      <div style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1400,
        margin: "0 auto",
        padding: isMobile ? "24px 20px" : "40px 48px"
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))",
            gap: isMobile ? 12 : 16,
            marginBottom: isMobile ? 40 : 60
          }}
        >
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => navigate(cat.path)}
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: isMobile ? 16 : 20,
                padding: isMobile ? 20 : 24,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                textAlign: "center"
              }}
            >
              <div style={{
                position: "absolute",
                top: -30,
                right: -30,
                width: 100,
                height: 100,
                background: cat.color,
                borderRadius: "50%",
                filter: "blur(40px)",
                opacity: 0.3
              }} />
              
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: isMobile ? 32 : 36, marginBottom: 12 }}>{cat.icon}</div>
                <div style={{ fontSize: isMobile ? 15 : 16, fontWeight: 700, color: "#fff" }}>
                  {cat.name}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(102,126,234,0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(102,126,234,0.3)",
            borderRadius: 50,
            padding: isMobile ? "6px 16px" : "8px 20px",
            marginBottom: isMobile ? 20 : 32
          }}
        >
          <TrendingUp size={isMobile ? 14 : 16} color="#667eea" />
          <span style={{ color: "#667eea", fontSize: isMobile ? 12 : 14, fontWeight: 600 }}>
            {language === "en" ? "Trending Listings" : "Popüler İlanlar"}
          </span>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))",
          gap: isMobile ? 16 : 24
        }}>
          {listings.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: isMobile ? 16 : 20,
                overflow: "hidden",
                cursor: "pointer"
              }}
            >
              <div style={{ width: "100%", height: isMobile ? 180 : 220, overflow: "hidden" }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }} 
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
              
              <div style={{ padding: isMobile ? 16 : 24 }}>
                <h3 style={{ fontWeight: 700, fontSize: isMobile ? 16 : 18, marginBottom: 8, color: "#fff" }}>
                  {item.title}
                </h3>
                
                <p style={{ color: "#667eea", fontWeight: 700, fontSize: isMobile ? 18 : 20, marginBottom: 12 }}>
                  {item.price}
                </p>
                
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.6)", fontSize: isMobile ? 13 : 14 }}>
                  <MapPin size={isMobile ? 14 : 16} />
                  <span style={{ textTransform: "capitalize" }}>{item.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
