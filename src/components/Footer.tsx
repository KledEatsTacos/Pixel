import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();

  const charityEmojis = ["🌍", "🐄", "🐷", "🐔", "🐟"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{
        marginTop: 100,
        paddingTop: 40,
        borderTop: "1px solid rgba(255,255,255,0.1)",
        textAlign: "center"
      }}
    >
      <p style={{
        fontSize: 14,
        color: "rgba(255,255,255,0.5)",
        margin: "0 0 20px 0"
      }}>
        © 2025 craigslist. {language === "en" ? "All rights reserved." : "Tüm hakları saklıdır."}
      </p>
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 32,
        flexWrap: "wrap",
        marginBottom: 24
      }}>
        {[
          { text: language === "en" ? "Privacy Policy" : "Gizlilik Politikası", href: "#privacy" },
          { text: language === "en" ? "Terms of Service" : "Hizmet Şartları", href: "#terms" },
          { text: language === "en" ? "Contact Us" : "İletişim", href: "#contact" },
          { text: language === "en" ? "Help" : "Yardım", href: "#help" }
        ].map((link, index) => (
          <motion.a
            key={index}
            whileHover={{ scale: 1.05, color: "#667eea" }}
            href={link.href}
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.6)",
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
        gap: 12,
        marginTop: 20
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
              fontSize: 24,
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
        fontSize: 12,
        color: "rgba(255,255,255,0.4)",
        marginTop: 12,
        fontWeight: 500
      }}>
        {language === "en" ? "craigslist charitable" : "craigslist hayır kurumu"}
      </p>
    </motion.div>
  );
}
