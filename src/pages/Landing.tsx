import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Languages, ChevronDown, TrendingUp
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";
import { useTheme } from "../context/ThemeContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginModal from "../components/LoginModal";

export default function Landing() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { location, setLocation, availableCities } = useLocation();
  const { isDarkMode } = useTheme();
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(globalThis.window.innerWidth < 768);
    };
    
    checkMobile();
    globalThis.window.addEventListener('resize', checkMobile);
    
    return () => globalThis.window.removeEventListener('resize', checkMobile);
  }, []);

  // Event data based on location
  const eventsByLocation: Record<string, any[]> = {
    "new york": [
      {
        id: 1,
        title: "Broadway Night",
        venue: "Times Square Theater",
        date: "24 Oct - 02 Nov",
        price: "$100",
        image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400"
      },
      {
        id: 2,
        title: "Jazz Festival",
        venue: "Central Park",
        date: "01 Oct - 07 Nov",
        price: "$75",
        image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400"
      },
      {
        id: 3,
        title: "Food & Wine Expo",
        venue: "Brooklyn Hall",
        date: "15 Oct - 20 Nov",
        price: "$50",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400"
      }
    ],
    "london": [
      {
        id: 1,
        title: "West End Musical",
        venue: "Royal Theatre",
        date: "20 Oct - 30 Nov",
        price: "£80",
        image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=400"
      },
      {
        id: 2,
        title: "Art Gallery Opening",
        venue: "Tate Modern",
        date: "25 Oct - 15 Nov",
        price: "£45",
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400"
      },
      {
        id: 3,
        title: "Christmas Market",
        venue: "Hyde Park",
        date: "01 Nov - 24 Dec",
        price: "Free",
        image: "https://images.unsplash.com/photo-1576566686474-ff63a55aee5d?w=400"
      }
    ],
    "tokyo": [
      {
        id: 1,
        title: "Anime Convention",
        venue: "Tokyo Dome",
        date: "28 Oct - 05 Nov",
        price: "¥8000",
        image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400"
      },
      {
        id: 2,
        title: "Cherry Blossom Festival",
        venue: "Ueno Park",
        date: "10 Oct - 20 Nov",
        price: "¥3000",
        image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400"
      },
      {
        id: 3,
        title: "Tech Summit",
        venue: "Akihabara Center",
        date: "15 Oct - 25 Nov",
        price: "¥12000",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400"
      }
    ],
    "paris": [
      {
        id: 1,
        title: "Fashion Week",
        venue: "Le Grand Palais",
        date: "22 Oct - 30 Oct",
        price: "€150",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400"
      },
      {
        id: 2,
        title: "Wine Tasting",
        venue: "Louvre Gardens",
        date: "01 Nov - 15 Nov",
        price: "€60",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400"
      },
      {
        id: 3,
        title: "Classical Concert",
        venue: "Opera House",
        date: "05 Nov - 20 Nov",
        price: "€90",
        image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400"
      }
    ]
  };

  const currentEvents = eventsByLocation[location] || eventsByLocation["new york"];

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  
  const monthNames = language === "en" 
    ? ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    : ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  
  const dayNames = language === "en"
    ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    : ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: isDarkMode 
        ? "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)"
        : "linear-gradient(to bottom, #f8fafc, #e0e7ff, #dbeafe)",
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
            background: isDarkMode 
              ? "radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
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
            background: isDarkMode 
              ? "radial-gradient(circle, rgba(245,87,108,0.15) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)"
          }}
        />
      </div>

      {/* Header */}
      <Header 
        onLoginClick={() => setShowLoginModal(true)}
        showSearch={false}
      />

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
          padding: isMobile ? "40px 20px" : "80px 64px"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 80 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: isDarkMode 
                ? "rgba(102,126,234,0.15)" 
                : "rgba(102,126,234,0.25)",
              backdropFilter: "blur(10px)",
              border: isDarkMode 
                ? "1px solid rgba(102,126,234,0.3)" 
                : "1px solid rgba(102,126,234,0.4)",
              borderRadius: 50,
              padding: isMobile ? "6px 16px" : "8px 20px",
              marginBottom: isMobile ? 20 : 32,
              boxShadow: isDarkMode ? "none" : "0 4px 12px rgba(102,126,234,0.2)"
            }}
          >
            <TrendingUp size={isMobile ? 14 : 16} color={isDarkMode ? "#667eea" : "#5c6bc0"} />
            <span style={{ 
              color: isDarkMode ? "#667eea" : "#5c6bc0", 
              fontSize: isMobile ? 12 : 14, 
              fontWeight: 600 
            }}>
              {language === "en" ? "Trusted by millions worldwide" : "Dünya çapında milyonlarca kullanıcı"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontSize: isMobile ? 40 : 72,
              fontWeight: 900,
              color: isDarkMode ? "#fff" : "#1f2937",
              margin: "0 0 24px 0",
              lineHeight: 1.1,
              letterSpacing: isMobile ? "-1px" : "-2px"
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
              fontSize: isMobile ? 16 : 20,
              color: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(55,65,81,0.9)",
              maxWidth: 600,
              margin: isMobile ? "0 auto 32px" : "0 auto 48px",
              lineHeight: 1.6,
              padding: isMobile ? "0 10px" : 0
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
              borderRadius: isMobile ? 12 : 16,
              padding: isMobile ? "14px 32px" : "18px 48px",
              color: "#fff",
              fontSize: isMobile ? 16 : 18,
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

        {/* Event Calendar Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            marginTop: isMobile ? 50 : 100,
            display: isMobile ? "flex" : "grid",
            flexDirection: isMobile ? "column" : undefined,
            gridTemplateColumns: isMobile ? undefined : "350px 1fr",
            gap: isMobile ? 24 : 32,
            alignItems: "start"
          }}
        >
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            style={{
              background: isDarkMode ? "rgba(255,255,255,0.05)" : "#ffffff",
              backdropFilter: "blur(20px)",
              border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(139,92,246,0.2)",
              borderRadius: isMobile ? 16 : 24,
              padding: isMobile ? 20 : 28,
              position: isMobile ? "relative" : "sticky",
              top: isMobile ? 0 : 120,
              boxShadow: isDarkMode ? "none" : "0 10px 40px rgba(139,92,246,0.15), 0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: isMobile ? 16 : 24
            }}>
              <h3 style={{
                fontSize: isMobile ? 16 : 18,
                fontWeight: 700,
                color: isDarkMode ? "#fff" : "#1a237e",
                margin: 0
              }}>
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <div style={{ display: "flex", gap: 8 }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  style={{
                    background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(139,92,246,0.15)",
                    border: isDarkMode ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(139,92,246,0.3)",
                    borderRadius: 8,
                    padding: 6,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: isDarkMode ? "#fff" : "#5c6bc0"
                  }}
                >
                  ←
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  style={{
                    background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(139,92,246,0.15)",
                    border: isDarkMode ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(139,92,246,0.3)",
                    borderRadius: 8,
                    padding: 6,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: isDarkMode ? "#fff" : "#5c6bc0"
                  }}
                >
                  →
                </motion.button>
              </div>
            </div>

            {/* Day names */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 8,
              marginBottom: 12
            }}>
              {dayNames.map((day) => (
                <div key={day} style={{
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: 600,
                  color: isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(26,35,126,0.6)",
                  padding: "8px 0"
                }}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 8
            }}>
              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday = day === new Date().getDate() && 
                               currentMonth.getMonth() === new Date().getMonth() &&
                               currentMonth.getFullYear() === new Date().getFullYear();
                const isSelected = day === selectedDate.getDate() &&
                                  currentMonth.getMonth() === selectedDate.getMonth() &&
                                  currentMonth.getFullYear() === selectedDate.getFullYear();
                
                return (
                  <motion.button
                    key={day}
                    whileHover={{ scale: 1.1, backgroundColor: isDarkMode ? "rgba(102,126,234,0.3)" : "rgba(139,92,246,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                    style={{
                      background: isSelected 
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : isToday
                        ? isDarkMode ? "rgba(102,126,234,0.2)" : "rgba(139,92,246,0.15)"
                        : "transparent",
                      border: isToday ? isDarkMode ? "1px solid rgba(102,126,234,0.5)" : "1px solid rgba(139,92,246,0.4)" : "1px solid transparent",
                      borderRadius: 12,
                      padding: "12px 0",
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: isSelected || isToday ? 700 : 500,
                      color: isDarkMode ? "#fff" : isSelected ? "#fff" : "#1a237e",
                      transition: "all 0.2s",
                      boxShadow: isSelected ? "0 4px 12px rgba(102,126,234,0.4)" : "none"
                    }}
                  >
                    {day}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Events */}
          <div style={{
            width: "100%",
            overflow: "hidden"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 32
            }}>
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  style={{
                    fontSize: isMobile ? 24 : 32,
                    fontWeight: 800,
                    color: isDarkMode ? "#fff" : "#1f2937",
                    margin: "0 0 8px 0",
                    letterSpacing: "-1px"
                  }}
                >
                  {language === "en" ? "Event Calendar" : "Etkinlik Takvimi"}
                </motion.h2>
                <p style={{
                  fontSize: isMobile ? 12 : 14,
                  color: isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(107,114,128,0.8)",
                  margin: 0,
                  textTransform: "capitalize"
                }}>
                  {language === "en" ? `Events in ${location}` : `${location} etkinlikleri`}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/topluluk")}
                style={{
                  color: isDarkMode ? "#667eea" : "#8b5cf6",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 0
                }}
              >
                {language === "en" ? "View All" : "Tümünü Gör"}
              </motion.button>
            </div>

            {/* Event Cards - Horizontal Scroll */}
            <div 
              className="horizontal-scroll"
              style={{
                display: "flex",
                gap: isMobile ? 16 : 24,
                overflowX: "scroll",
                overflowY: "hidden",
                paddingBottom: 20,
                paddingRight: 20,
                marginRight: -20,
                scrollSnapType: isMobile ? "x mandatory" : "none",
                width: "100%",
                touchAction: "pan-x"
              } as React.CSSProperties}>
              {currentEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  style={{
                    minWidth: isMobile ? 260 : 320,
                    background: isDarkMode ? "rgba(255,255,255,0.05)" : "#ffffff",
                    backdropFilter: "blur(20px)",
                    border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(139,92,246,0.2)",
                    borderRadius: isMobile ? 16 : 20,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    scrollSnapAlign: isMobile ? "start" : "none",
                    flexShrink: 0,
                    boxShadow: isDarkMode ? "none" : "0 8px 24px rgba(139,92,246,0.12), 0 4px 8px rgba(0,0,0,0.08)"
                  }}
                >
                  <div style={{
                    height: isMobile ? 140 : 180,
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative"
                  }}>
                    <div style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(10px)",
                      borderRadius: isMobile ? 8 : 12,
                      padding: isMobile ? "6px 12px" : "8px 16px",
                      fontSize: isMobile ? 12 : 13,
                      fontWeight: 700,
                      color: "#1f2937"
                    }}>
                      {event.price}
                    </div>
                  </div>
                  <div style={{ padding: isMobile ? 16 : 20 }}>
                    <div style={{
                      fontSize: isMobile ? 11 : 12,
                      color: "#667eea",
                      fontWeight: 600,
                      marginBottom: 8
                    }}>
                      {event.date}
                    </div>
                    <h4 style={{
                      fontSize: isMobile ? 16 : 18,
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 8px 0"
                    }}>
                      {event.title}
                    </h4>
                    <p style={{
                      fontSize: isMobile ? 13 : 14,
                      color: "rgba(255,255,255,0.6)",
                      margin: 0
                    }}>
                      {event.venue}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

       

        {/* Quick Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          style={{
            marginTop: isMobile ? 50 : 80,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
            gap: isMobile ? 16 : 20
          }}
        >
          <motion.a
            whileHover={{ scale: 1.05, y: -5 }}
            href="#about"
            style={{
              background: "rgba(102,126,234,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(102,126,234,0.3)",
              borderRadius: isMobile ? 12 : 16,
              padding: isMobile ? "20px" : "24px",
              textDecoration: "none",
              textAlign: "center",
              cursor: "pointer"
            }}
          >
            <div style={{ fontSize: isMobile ? 28 : 32, marginBottom: 12 }}>ℹ️</div>
            <h3 style={{ 
              fontSize: isMobile ? 16 : 18, 
              fontWeight: 700, 
              color: "#667eea", 
              margin: "0 0 8px 0" 
            }}>
              {language === "en" ? "About Craigslist" : "Craigslist Hakkında"}
            </h3>
            <p style={{ 
              fontSize: isMobile ? 13 : 14, 
              color: "rgba(255,255,255,0.7)", 
              margin: 0 
            }}>
              {language === "en" ? "Learn more about us" : "Hakkımızda daha fazla bilgi"}
            </p>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05, y: -5 }}
            href="#best-of"
            style={{
              background: "rgba(245,87,108,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(245,87,108,0.3)",
              borderRadius: isMobile ? 12 : 16,
              padding: isMobile ? "20px" : "24px",
              textDecoration: "none",
              textAlign: "center",
              cursor: "pointer"
            }}
          >
            <div style={{ fontSize: isMobile ? 28 : 32, marginBottom: 12 }}>⭐</div>
            <h3 style={{ 
              fontSize: isMobile ? 16 : 18, 
              fontWeight: 700, 
              color: "#f5576c", 
              margin: "0 0 8px 0" 
            }}>
              {language === "en" ? "Best Of Craigslist" : "Craigslist'in En İyileri"}
            </h3>
            <p style={{ 
              fontSize: isMobile ? 13 : 14, 
              color: "rgba(255,255,255,0.7)", 
              margin: 0 
            }}>
              {language === "en" ? "Top listings & stories" : "En iyi ilanlar ve hikayeler"}
            </p>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05, y: -5 }}
            href="#new"
            style={{
              background: "rgba(67,233,123,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(67,233,123,0.3)",
              borderRadius: isMobile ? 12 : 16,
              padding: isMobile ? "20px" : "24px",
              textDecoration: "none",
              textAlign: "center",
              cursor: "pointer"
            }}
          >
            <div style={{ fontSize: isMobile ? 28 : 32, marginBottom: 12 }}>✨</div>
            <h3 style={{ 
              fontSize: isMobile ? 16 : 18, 
              fontWeight: 700, 
              color: "#43e97b", 
              margin: "0 0 8px 0" 
            }}>
              {language === "en" ? "What's New" : "Yenilikler"}
            </h3>
            <p style={{ 
              fontSize: isMobile ? 13 : 14, 
              color: "rgba(255,255,255,0.7)", 
              margin: 0 
            }}>
              {language === "en" ? "Latest features & updates" : "En yeni özellikler ve güncellemeler"}
            </p>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05, y: -5 }}
            href="#status"
            style={{
              background: "rgba(79,209,255,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(79,209,255,0.3)",
              borderRadius: isMobile ? 12 : 16,
              padding: isMobile ? "20px" : "24px",
              textDecoration: "none",
              textAlign: "center",
              cursor: "pointer"
            }}
          >
            <div style={{ fontSize: isMobile ? 28 : 32, marginBottom: 12 }}>📊</div>
            <h3 style={{ 
              fontSize: isMobile ? 16 : 18, 
              fontWeight: 700, 
              color: "#4fd1ff", 
              margin: "0 0 8px 0" 
            }}>
              {language === "en" ? "System Status" : "Sistem Durumu"}
            </h3>
            <p style={{ 
              fontSize: isMobile ? 13 : 14, 
              color: "rgba(255,255,255,0.7)", 
              margin: 0 
            }}>
              {language === "en" ? "Check platform status" : "Platform durumunu kontrol edin"}
            </p>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05, y: -5 }}
            href="#faq"
            style={{
              background: "rgba(250,112,154,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(250,112,154,0.3)",
              borderRadius: isMobile ? 12 : 16,
              padding: isMobile ? "20px" : "24px",
              textDecoration: "none",
              textAlign: "center",
              cursor: "pointer"
            }}
          >
            <div style={{ fontSize: isMobile ? 28 : 32, marginBottom: 12 }}>❓</div>
            <h3 style={{ 
              fontSize: isMobile ? 16 : 18, 
              fontWeight: 700, 
              color: "#fa709a", 
              margin: "0 0 8px 0" 
            }}>
              {language === "en" ? "FAQ" : "SSS"}
            </h3>
            <p style={{ 
              fontSize: isMobile ? 13 : 14, 
              color: "rgba(255,255,255,0.7)", 
              margin: 0 
            }}>
              {language === "en" ? "Frequently asked questions" : "Sıkça sorulan sorular"}
            </p>
          </motion.a>
        </motion.div>

      

        {/* Footer Links */}
        <Footer />
      </motion.div>
      
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
