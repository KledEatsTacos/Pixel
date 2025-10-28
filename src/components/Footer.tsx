import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";

export default function Footer() {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(globalThis.window.innerWidth < 768);
    };
    
    checkMobile();
    globalThis.window.addEventListener('resize', checkMobile);
    
    return () => globalThis.window.removeEventListener('resize', checkMobile);
  }, []);

  const charityEmojis = ["🌍", "🐄", "🐷", "🐔", "🐟"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{
        marginTop: isMobile ? 60 : 100,
        paddingTop: isMobile ? 30 : 40,
        borderTop: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(139,92,246,0.2)",
        textAlign: "center",
        position: "relative",
        zIndex: 10,
        padding: isMobile ? "30px 20px 20px" : "40px 0"
      }}
    >
      <p style={{
        fontSize: isMobile ? 13 : 14,
        color: isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(107,114,128,0.7)",
        margin: isMobile ? "0 0 16px 0" : "0 0 20px 0"
      }}>
        © 2025 craigslist. {language === "en" ? "All rights reserved." : "Tüm hakları saklıdır."}
      </p>
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: isMobile ? 16 : 32,
        flexWrap: "wrap",
        marginBottom: isMobile ? 20 : 24
      }}>
        {[
          { text: language === "en" ? "Privacy Policy" : "Gizlilik Politikası", href: "#privacy" },
          { text: language === "en" ? "Terms of Service" : "Hizmet Şartları", href: "#terms" },
          { text: language === "en" ? "Contact Us" : "İletişim", href: "#contact" },
          { text: language === "en" ? "Help" : "Yardım", href: "#help" }
        ].map((link, index) => (
          <motion.a
            key={index}
            whileHover={{ scale: 1.05, color: isDarkMode ? "#667eea" : "#8b5cf6" }}
            href={link.href}
            style={{
              fontSize: isMobile ? 13 : 14,
              color: isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(107,114,128,0.8)",
              textDecoration: "none",
              fontWeight: 500,
              transition: "color 0.3s"
            }}
          >
            {link.text}
          </motion.a>
        ))}
      </div>

      {/* Craigslist Charitable Emojis */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: isMobile ? 8 : 12,
        marginTop: isMobile ? 16 : 20
      }}>
        {charityEmojis.map((emoji, index) => (
          <motion.a
            key={index}
            href="https://www.craigslistfund.org/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
            style={{
              fontSize: isMobile ? 20 : 24,
              textDecoration: "none",
              cursor: "pointer",
              display: "inline-block",
              transition: "transform 0.2s"
            }}
            title="craigslist charitable"
          >
            {emoji}
          </motion.a>
        ))}
      </div>

      <p style={{
        fontSize: isMobile ? 11 : 12,
        color: isDarkMode ? "rgba(255,255,255,0.4)" : "rgba(107,114,128,0.6)",
        marginTop: 12,
        fontWeight: 500
      }}>
        {language === "en" ? "craigslist charitable" : "craigslist hayır kurumu"}
      </p>
    </motion.div>
  );
}
