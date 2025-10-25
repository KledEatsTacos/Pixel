import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Languages, ChevronDown, TrendingUp, Shield
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";

export default function Landing() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { location, setLocation, availableCities } = useLocation();
  const [showLocationMenu, setShowLocationMenu] = useState(false);

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated background elements */}
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
            top: "-20%",
            right: "-10%",
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)"
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(245,87,108,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)"
          }}
        />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ 
          padding: "32px 64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <h2 style={{ 
            fontSize: 28, 
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

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {/* Location Dropdown */}
          <div style={{ position: "relative" }}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowLocationMenu(!showLocationMenu)}
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 16,
                padding: "12px 20px",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                textTransform: "capitalize",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
              }}
            >
              <MapPin size={18} />
              {location}
              <ChevronDown size={18} style={{ 
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
              borderRadius: 16,
              padding: "12px 20px",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
            }}
          >
            <Languages size={18} />
            {language.toUpperCase()}
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1400,
          margin: "0 auto",
          padding: "80px 64px"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(102,126,234,0.15)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(102,126,234,0.3)",
              borderRadius: 50,
              padding: "8px 20px",
              marginBottom: 32
            }}
          >
            <TrendingUp size={16} color="#667eea" />
            <span style={{ color: "#667eea", fontSize: 14, fontWeight: 600 }}>
              {language === "en" ? "Trusted by millions worldwide" : "Dünya çapında milyonlarca kullanıcı"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#fff",
              margin: "0 0 24px 0",
              lineHeight: 1.1,
              letterSpacing: "-2px"
            }}
          >
            {language === "en" ? (
              <>Find anything,<br />anywhere</>
            ) : (
              <>Her şeyi bulun,<br />her yerde</>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 600,
              margin: "0 auto 48px",
              lineHeight: 1.6
            }}
          >
            {language === "en" 
              ? "Connect with your local community. Buy, sell, and discover opportunities near you."
              : "Yerel topluluğunuzla bağlantı kurun. Yakınınızdaki fırsatları alın, satın ve keşfedin."}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(102,126,234,0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/explore")}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: 16,
              padding: "18px 48px",
              color: "#fff",
              fontSize: 18,
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 10px 40px rgba(102,126,234,0.3)"
            }}
          >
            {language === "en" ? "Explore Now" : "Keşfet"}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          style={{
            marginTop: 80,
            textAlign: "center",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 20,
            padding: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16
          }}
        >
          <Shield size={32} color="#10b981" />
          <div style={{ textAlign: "left" }}>
            <h4 style={{ 
              fontSize: 18, 
              fontWeight: 700, 
              color: "#fff", 
              margin: "0 0 4px 0" 
            }}>
              {language === "en" ? "Safe & Secure" : "Güvenli & Emniyetli"}
            </h4>
            <p style={{ 
              fontSize: 14, 
              color: "rgba(255,255,255,0.6)", 
              margin: 0 
            }}>
              {language === "en" 
                ? "Your privacy and security are our top priority"
                : "Gizliliğiniz ve güvenliğiniz önceliğimizdir"}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
