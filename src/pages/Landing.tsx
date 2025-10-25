import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Languages, ChevronDown, TrendingUp
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";

export default function Landing() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { location, setLocation, availableCities } = useLocation();
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
      },
      {
        id: 4,
        title: "Comedy Night Live",
        venue: "Madison Square Garden",
        date: "10 Nov - 18 Nov",
        price: "$85",
        image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400"
      },
      {
        id: 5,
        title: "Tech Conference 2025",
        venue: "Javits Center",
        date: "05 Nov - 12 Nov",
        price: "$200",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400"
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
      },
      {
        id: 4,
        title: "Shakespeare Festival",
        venue: "Globe Theatre",
        date: "08 Nov - 22 Nov",
        price: "£65",
        image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400"
      },
      {
        id: 5,
        title: "Food Truck Festival",
        venue: "Camden Market",
        date: "12 Nov - 19 Nov",
        price: "£20",
        image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=400"
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
      },
      {
        id: 4,
        title: "Ramen Festival",
        venue: "Shibuya Square",
        date: "18 Nov - 25 Nov",
        price: "¥5000",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400"
      },
      {
        id: 5,
        title: "Gaming Expo",
        venue: "Tokyo Big Sight",
        date: "02 Nov - 09 Nov",
        price: "¥9000",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400"
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
      },
      {
        id: 4,
        title: "Street Art Tour",
        venue: "Montmartre",
        date: "14 Nov - 28 Nov",
        price: "€35",
        image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=400"
      },
      {
        id: 5,
        title: "Culinary Workshop",
        venue: "Le Cordon Bleu",
        date: "20 Nov - 30 Nov",
        price: "€120",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400"
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

        {/* Event Calendar Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            marginTop: 100,
            display: "grid",
            gridTemplateColumns: "350px minmax(0, 1fr)",
            gap: 32,
            alignItems: "start"
          }}
        >
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 24,
              padding: 28,
              position: "sticky",
              top: 120
            }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#fff",
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
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 8,
                    padding: 6,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: "#fff"
                  }}
                >
                  ←
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 8,
                    padding: 6,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: "#fff"
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
                  color: "rgba(255,255,255,0.5)",
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
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(102,126,234,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                    style={{
                      background: isSelected 
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : isToday
                        ? "rgba(102,126,234,0.2)"
                        : "transparent",
                      border: isToday ? "1px solid rgba(102,126,234,0.5)" : "1px solid transparent",
                      borderRadius: 12,
                      padding: "12px 0",
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: isSelected || isToday ? 700 : 500,
                      color: "#fff",
                      transition: "all 0.2s"
                    }}
                  >
                    {day}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Events */}
          <div>
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
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#fff",
                    margin: "0 0 8px 0",
                    letterSpacing: "-1px"
                  }}
                >
                  {language === "en" ? "Event Calendar" : "Etkinlik Takvimi"}
                </motion.h2>
                <p style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                  textTransform: "capitalize"
                }}>
                  {language === "en" ? `Events in ${location}` : `${location} etkinlikleri`}
                </p>
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#all-events"
                style={{
                  color: "#667eea",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none"
                }}
              >
                {language === "en" ? "View All" : "Tümünü Gör"}
              </motion.a>
            </div>

            {/* Event Cards - Horizontal Scroll */}
            <div style={{
              overflowX: "auto",
              overflowY: "visible",
              paddingBottom: 10,
              paddingTop: 30,
              marginBottom: -10,
              marginTop: -30,
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(102,126,234,0.5) transparent",
              width: "100%"
            }}>
              <div style={{
                display: "flex",
                gap: 24,
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 30,
                paddingBottom: 20,
                width: "max-content"
              }}>
              {currentEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    opacity: { delay: 1.2 + index * 0.1 },
                    x: { delay: 1.2 + index * 0.1 },
                    y: { duration: 0.2, ease: "easeOut" },
                    boxShadow: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.5)"
                  }}
                  style={{
                    minWidth: 320,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 20,
                    overflow: "visible",
                    cursor: "pointer",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                    position: "relative"
                  }}
                >
                  <div style={{
                    height: 180,
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    borderRadius: "20px 20px 0 0",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 12,
                      padding: "8px 16px",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#1f2937"
                    }}>
                      {event.price}
                    </div>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{
                      fontSize: 12,
                      color: "#667eea",
                      fontWeight: 600,
                      marginBottom: 8
                    }}>
                      {event.date}
                    </div>
                    <h4 style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 8px 0"
                    }}>
                      {event.title}
                    </h4>
                    <p style={{
                      fontSize: 14,
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
          </div>
        </motion.div>

       

        {/* Quick Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 20
          }}
        >
          <motion.a
            whileHover={{ scale: 1.05, y: -5 }}
            href="#about"
            style={{
              background: "rgba(102,126,234,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(102,126,234,0.3)",
              borderRadius: 16,
              padding: "24px",
              textDecoration: "none",
              textAlign: "center",
              cursor: "pointer"
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>ℹ️</div>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 700, 
              color: "#667eea", 
              margin: "0 0 8px 0" 
            }}>
              {language === "en" ? "About Craigslist" : "Craigslist Hakkında"}
            </h3>
            <p style={{ 
              fontSize: 14, 
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
              borderRadius: 16,
              padding: "24px",
              textDecoration: "none",
              textAlign: "center",
              cursor: "pointer"
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>⭐</div>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 700, 
              color: "#f5576c", 
              margin: "0 0 8px 0" 
            }}>
              {language === "en" ? "Best Of Craigslist" : "Craigslist'in En İyileri"}
            </h3>
            <p style={{ 
              fontSize: 14, 
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
              borderRadius: 16,
              padding: "24px",
              textDecoration: "none",
              textAlign: "center",
              cursor: "pointer"
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>✨</div>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 700, 
              color: "#43e97b", 
              margin: "0 0 8px 0" 
            }}>
              {language === "en" ? "What's New" : "Yenilikler"}
            </h3>
            <p style={{ 
              fontSize: 14, 
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
              borderRadius: 16,
              padding: "24px",
              textDecoration: "none",
              textAlign: "center",
              cursor: "pointer"
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 700, 
              color: "#4fd1ff", 
              margin: "0 0 8px 0" 
            }}>
              {language === "en" ? "System Status" : "Sistem Durumu"}
            </h3>
            <p style={{ 
              fontSize: 14, 
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
              borderRadius: 16,
              padding: "24px",
              textDecoration: "none",
              textAlign: "center",
              cursor: "pointer"
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>❓</div>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 700, 
              color: "#fa709a", 
              margin: "0 0 8px 0" 
            }}>
              {language === "en" ? "FAQ" : "SSS"}
            </h3>
            <p style={{ 
              fontSize: 14, 
              color: "rgba(255,255,255,0.7)", 
              margin: 0 
            }}>
              {language === "en" ? "Frequently asked questions" : "Sıkça sorulan sorular"}
            </p>
          </motion.a>
        </motion.div>

      

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
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
            flexWrap: "wrap"
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
        </motion.div>
      </motion.div>
    </div>
  );
}
