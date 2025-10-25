import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Languages, ChevronDown, TrendingUp, Heart, User } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";

export default function Explore() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { language, setLanguage, t } = useLanguage();
  const { location, setLocation, availableCities } = useLocation();
  const [showLocationMenu, setShowLocationMenu] = useState(false);

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

      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ 
          padding: "24px 48px",
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
          onClick={() => navigate("/")}
          style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
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

        <div style={{
          flex: 1,
          maxWidth: 600,
          margin: "0 40px"
        }}>
          <div style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 16,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12
          }}>
            <Search size={20} color="rgba(255,255,255,0.7)" />
            <input
              type="text"
              placeholder={language === "en" ? "Search for anything..." : "Bir şey ara..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                background: "transparent",
                border: "none",
                outline: "none",
                flex: 1,
                color: "#fff",
                fontSize: 15,
                fontWeight: 500
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
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
                textTransform: "capitalize"
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
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
                {availableCities.map((city) => (
                  <motion.div
                    key={city}
                    whileHover={{ 
                      backgroundColor: "rgba(102,126,234,0.2)",
                      x: 6
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
                      background: location === city ? "rgba(102,126,234,0.15)" : "transparent"
                    }}
                  >
                    {city}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

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
              gap: 10
            }}
          >
            <Languages size={18} />
            {language.toUpperCase()}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 12,
              padding: 10,
              color: "#fff",
              cursor: "pointer"
            }}
          >
            <Heart size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 12,
              padding: 10,
              color: "#fff",
              cursor: "pointer"
            }}
          >
            <User size={20} />
          </motion.button>
        </div>
      </motion.header>

      <div style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1400,
        margin: "0 auto",
        padding: "40px 48px"
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 60
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
                borderRadius: 20,
                padding: 24,
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
                <div style={{ fontSize: 36, marginBottom: 12 }}>{cat.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
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
            padding: "8px 20px",
            marginBottom: 32
          }}
        >
          <TrendingUp size={16} color="#667eea" />
          <span style={{ color: "#667eea", fontSize: 14, fontWeight: 600 }}>
            {language === "en" ? "Trending Listings" : "Popüler İlanlar"}
          </span>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 24
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
                borderRadius: 20,
                overflow: "hidden",
                cursor: "pointer"
              }}
            >
              <div style={{ width: "100%", height: 220, overflow: "hidden" }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }} 
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
              
              <div style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: "#fff" }}>
                  {item.title}
                </h3>
                
                <p style={{ color: "#667eea", fontWeight: 700, fontSize: 20, marginBottom: 12 }}>
                  {item.price}
                </p>
                
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                  <MapPin size={16} />
                  <span style={{ textTransform: "capitalize" }}>{item.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
