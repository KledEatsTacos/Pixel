import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Languages, ChevronDown, User, Search } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";

interface HeaderProps {
  onLoginClick: () => void;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export default function Header({ 
  onLoginClick, 
  showSearch = false, 
  searchValue = "", 
  onSearchChange,
  searchPlaceholder 
}: HeaderProps) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
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

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ 
        padding: isMobile ? "16px 20px" : "32px 64px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? 16 : 0,
        position: "relative",
        zIndex: 10,
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/")}
        style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
      >
        <h2 style={{ 
          fontSize: isMobile ? 22 : 28, 
          fontWeight: 800, 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          margin: 0,
          letterSpacing: "-1px"
        }}>
          craigslist
        </h2>
      </motion.div>

      {/* Search Bar (optional) */}
      {showSearch && (
        <div style={{
          flex: 1,
          maxWidth: isMobile ? "100%" : 600,
          margin: isMobile ? 0 : "0 40px",
          width: isMobile ? "100%" : "auto"
        }}>
          <div style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: isMobile ? 12 : 16,
            padding: isMobile ? "10px 16px" : "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12
          }}>
            <Search size={isMobile ? 18 : 20} color="rgba(255,255,255,0.7)" />
            <input
              type="text"
              placeholder={searchPlaceholder || (language === "en" ? "Search..." : "Ara...")}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              style={{ 
                background: "transparent",
                border: "none",
                outline: "none",
                flex: 1,
                color: "#fff",
                fontSize: isMobile ? 14 : 15,
                fontWeight: 500
              }}
            />
          </div>
        </div>
      )}

      <div style={{ 
        display: "flex", 
        gap: isMobile ? 8 : 16, 
        alignItems: "center",
        flexWrap: isMobile ? "wrap" : "nowrap",
        width: isMobile ? "100%" : "auto"
      }}>
        {/* Location Dropdown */}
        <div style={{ position: "relative", flex: isMobile ? "1 1 auto" : "0 0 auto" }}>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowLocationMenu(!showLocationMenu)}
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: isMobile ? 12 : 16,
              padding: isMobile ? "10px 14px" : "12px 20px",
              color: "#fff",
              fontSize: isMobile ? 13 : 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 6 : 10,
              textTransform: "capitalize",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              width: isMobile ? "100%" : "auto"
            }}
          >
            <MapPin size={isMobile ? 16 : 18} />
            {location}
            <ChevronDown size={isMobile ? 16 : 18} style={{ 
              transform: showLocationMenu ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s"
            }} />
          </motion.button>

          {showLocationMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                top: 70,
                right: 0,
                background: "rgba(30,30,60,0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 20,
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                zIndex: 100,
                minWidth: 220,
                maxHeight: 450,
                overflowY: "auto",
                padding: 12
              }}
            >
              {availableCities.map((city, index) => (
                <motion.div
                  key={city}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  whileHover={{ 
                    backgroundColor: "rgba(102,126,234,0.2)",
                    x: 6,
                    scale: 1.02
                  }}
                  onClick={() => {
                    setLocation(city);
                    setShowLocationMenu(false);
                  }}
                  style={{
                    padding: "14px 18px",
                    cursor: "pointer",
                    fontSize: 14,
                    color: location === city ? "#667eea" : "#fff",
                    fontWeight: location === city ? 700 : 500,
                    textTransform: "capitalize",
                    borderRadius: 12,
                    marginBottom: 6,
                    transition: "all 0.2s",
                    background: location === city ? "rgba(102,126,234,0.15)" : "transparent"
                  }}
                >
                  {city}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Language Toggle */}
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setLanguage(language === "en" ? "tr" : "en")}
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: isMobile ? 12 : 16,
            padding: isMobile ? "10px 14px" : "12px 20px",
            color: "#fff",
            fontSize: isMobile ? 13 : 14,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 6 : 10,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            flex: isMobile ? "1 1 auto" : "0 0 auto"
          }}
        >
          <Languages size={isMobile ? 16 : 18} />
          {language.toUpperCase()}
        </motion.button>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 40px rgba(102,126,234,0.4)" }}
          whileTap={{ scale: 0.98 }}
          onClick={onLoginClick}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            borderRadius: isMobile ? 12 : 16,
            padding: isMobile ? "10px 20px" : "12px 24px",
            color: "#fff",
            fontSize: isMobile ? 13 : 14,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? 6 : 10,
            boxShadow: "0 8px 32px rgba(102,126,234,0.3)",
            width: isMobile ? "100%" : 140,
            flex: isMobile ? "0 0 100%" : "0 0 auto"
          }}
        >
          <User size={isMobile ? 16 : 18} />
          {language === "en" ? "Login" : "Giriş Yap"}
        </motion.button>
      </div>
    </motion.header>
  );
}
