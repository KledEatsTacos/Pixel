import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Heart, User, Languages, MapPin, ChevronDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";

export default function Topluluk() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { language, setLanguage } = useLanguage();
  const { location, setLocation, availableCities } = useLocation();
  const [showLocationMenu, setShowLocationMenu] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("activities");

  const communitySubcategories = [
    { id: "activities", name: "activities", nameTr: "etkinlikler" },
    { id: "artists", name: "artists", nameTr: "sanatçılar" },
    { id: "childcare", name: "childcare", nameTr: "çocuk bakımı" },
    { id: "classes", name: "classes", nameTr: "dersler" },
    { id: "events", name: "events", nameTr: "etkinlikler" },
    { id: "general", name: "general", nameTr: "genel" },
    { id: "groups", name: "groups", nameTr: "gruplar" },
    { id: "local", name: "local news", nameTr: "yerel haberler" },
    { id: "lost", name: "lost+found", nameTr: "kayıp+bulunan" },
    { id: "missed", name: "missed connections", nameTr: "kaçırılan bağlantılar" },
    { id: "musicians", name: "musicians", nameTr: "müzisyenler" },
    { id: "pets", name: "pets", nameTr: "evcil hayvanlar" },
  ];

  const mockPosts = [
    {
      id: "1",
      category: "activities",
      title: language === "tr" ? "Hafta Sonu Yürüyüş Grubu" : "Weekend Hiking Group",
      author: "OutdoorLover",
      time: language === "tr" ? "2 saat önce" : "2h ago",
      content: language === "tr" 
        ? "Her hafta sonu doğa yürüyüşü yapan bir grup oluşturuyoruz. Katılmak isteyen var mı?" 
        : "Starting a weekend hiking group. Anyone interested in joining?",
      replies: 12,
      views: 156
    },
    {
      id: "2",
      category: "musicians",
      title: language === "tr" ? "Rock Grubu Basçı Arıyor" : "Rock Band Looking for Bassist",
      author: "RockStar99",
      time: language === "tr" ? "4 saat önce" : "4h ago",
      content: language === "tr"
        ? "Deneyimli bir rock grubu basçı arıyoruz. Haftada 2 kez prova yapıyoruz."
        : "Experienced rock band looking for a bassist. We practice twice a week.",
      replies: 8,
      views: 203
    },
    {
      id: "3",
      category: "pets",
      title: language === "tr" ? "Kayıp Köpek - Golden Retriever" : "Lost Dog - Golden Retriever",
      author: "PetOwner",
      time: language === "tr" ? "1 gün önce" : "1d ago",
      content: language === "tr"
        ? "Golden Retriever cinsinde köpeğim kayboldu. Son görüldüğü yer park. Ödül var!"
        : "Lost my Golden Retriever near the park. Reward offered if found!",
      replies: 24,
      views: 487
    },
    {
      id: "4",
      category: "classes",
      title: language === "tr" ? "Ücretsiz Yoga Dersleri" : "Free Yoga Classes",
      author: "YogaTeacher",
      time: language === "tr" ? "6 saat önce" : "6h ago",
      content: language === "tr"
        ? "Parkta her pazar sabahı ücretsiz yoga dersleri veriyorum. Herkesi bekliyorum!"
        : "Offering free yoga classes every Sunday morning at the park. Everyone welcome!",
      replies: 31,
      views: 892
    },
    {
      id: "5",
      category: "events",
      title: language === "tr" ? "Topluluk Pikniği - Bu Cumartesi" : "Community Picnic - This Saturday",
      author: "EventOrganizer",
      time: language === "tr" ? "3 saat önce" : "3h ago",
      content: language === "tr"
        ? "Bu cumartesi park'ta topluluk pikniği düzenliyoruz. Yiyecek ve oyunlar var!"
        : "Organizing a community picnic this Saturday at the park. Food and games provided!",
      replies: 45,
      views: 1234
    },
    {
      id: "6",
      category: "general",
      title: language === "tr" ? "Mahallede Yeni Kafe Açıldı" : "New Cafe Opened in Neighborhood",
      author: "LocalResident",
      time: language === "tr" ? "12 saat önce" : "12h ago",
      content: language === "tr"
        ? "Ana caddede yeni bir kafe açıldı. Kahveleri harika, mutlaka deneyin!"
        : "A new cafe just opened on Main Street. The coffee is amazing, definitely check it out!",
      replies: 18,
      views: 456
    },
    {
      id: "7",
      category: "artists",
      title: language === "tr" ? "Yerel Sanatçılar Sergisi" : "Local Artists Exhibition",
      author: "ArtLover",
      time: language === "tr" ? "1 gün önce" : "1d ago",
      content: language === "tr"
        ? "Gelecek hafta yerel sanat galerisinde sergi var. Ücretsiz giriş!"
        : "Local art gallery hosting exhibition next week. Free admission!",
      replies: 22,
      views: 678
    },
    {
      id: "8",
      category: "childcare",
      title: language === "tr" ? "Bebek Bakıcısı Önerisi" : "Babysitter Recommendations",
      author: "Parent123",
      time: language === "tr" ? "5 saat önce" : "5h ago",
      content: language === "tr"
        ? "Güvenilir bebek bakıcısı arıyorum. Önerilerinizi bekliyorum."
        : "Looking for a reliable babysitter. Any recommendations?",
      replies: 15,
      views: 234
    }
  ];

  const filteredPosts = search 
    ? mockPosts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase())
      ).filter(post => post.category === selectedCategory)
    : mockPosts.filter(post => post.category === selectedCategory);

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated background */}
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

      {/* Header */}
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
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
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
        </div>

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
              placeholder={language === "en" ? "Search community..." : "Toplulukta ara..."}
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

      {/* Main Content */}
      <div style={{ 
        display: "flex", 
        padding: "32px 48px", 
        gap: 32,
        position: "relative",
        zIndex: 1
      }}>
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ 
            width: 280,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 24,
            padding: 24,
            height: "fit-content",
            position: "sticky",
            top: 120
          }}
        >
          <h3 style={{ 
            fontSize: 20, 
            fontWeight: 700, 
            color: "#fff",
            marginBottom: 20,
            marginTop: 0
          }}>
            {language === "tr" ? "Kategoriler" : "Categories"}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {communitySubcategories.map((sub) => (
              <motion.div
                key={sub.id}
                whileHover={{ 
                  x: 8,
                  backgroundColor: "rgba(102,126,234,0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(sub.id)}
                style={{
                  padding: "14px 16px",
                  background: selectedCategory === sub.id 
                    ? "rgba(102,126,234,0.2)" 
                    : "transparent",
                  borderRadius: 14,
                  cursor: "pointer",
                  transition: "all 0.3s",
                  border: selectedCategory === sub.id 
                    ? "1px solid rgba(102,126,234,0.4)"
                    : "1px solid transparent"
                }}
              >
                <div style={{ 
                  fontSize: 15, 
                  fontWeight: selectedCategory === sub.id ? 700 : 600,
                  color: selectedCategory === sub.id ? "#667eea" : "#fff",
                  marginBottom: 4
                }}>
                  {language === "en" ? sub.name : sub.nameTr}
                </div>
                <div style={{ 
                  fontSize: 12, 
                  color: selectedCategory === sub.id 
                    ? "rgba(102,126,234,0.8)" 
                    : "rgba(255,255,255,0.6)",
                  fontWeight: 500
                }}>
                  {mockPosts.filter(p => p.category === sub.id).length} {language === "tr" ? "gönderi" : "posts"}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.aside>

        {/* Posts Grid */}
        <div style={{ flex: 1 }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            marginBottom: 28
          }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                fontSize: 32, 
                fontWeight: 800,
                color: "#fff",
                margin: 0,
                letterSpacing: "-1px"
              }}
            >
              {language === "en" 
                ? communitySubcategories.find(c => c.id === selectedCategory)?.name 
                : communitySubcategories.find(c => c.id === selectedCategory)?.nameTr}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(102,126,234,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(102,126,234,0.3)",
                borderRadius: 12,
                padding: "10px 16px",
                color: "#667eea",
                fontSize: 14,
                fontWeight: 700
              }}
            >
              <TrendingUp size={18} />
              {filteredPosts.length} {language === "tr" ? "aktif gönderi" : "active posts"}
            </motion.div>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", 
            gap: 20
          }}>
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 50px rgba(102,126,234,0.3)"
                }}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 20,
                  padding: 20,
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <div style={{
                  position: "absolute",
                  top: -50,
                  right: -50,
                  width: 120,
                  height: 120,
                  background: "radial-gradient(circle, rgba(102,126,234,0.1) 0%, transparent 70%)",
                  borderRadius: "50%",
                  filter: "blur(30px)",
                  pointerEvents: "none"
                }} />
                
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "flex-start",
                  marginBottom: 16,
                  position: "relative",
                  zIndex: 1
                }}>
                  <div>
                    <h3 style={{ 
                      fontSize: 18, 
                      fontWeight: 700,
                      color: "#fff",
                      margin: 0,
                      marginBottom: 8,
                      lineHeight: 1.3
                    }}>
                      {post.title}
                    </h3>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 8,
                      fontSize: 13,
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: 500
                    }}>
                      <User size={14} />
                      <span>{post.author}</span>
                      <span style={{ margin: "0 4px" }}>•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: "rgba(102,126,234,0.2)",
                      border: "1px solid rgba(102,126,234,0.4)",
                      borderRadius: 10,
                      padding: 8,
                      cursor: "pointer"
                    }}
                  >
                    <Heart size={16} color="#667eea" />
                  </motion.div>
                </div>

                <p style={{ 
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: 0,
                  marginBottom: 16,
                  fontWeight: 500
                }}>
                  {post.content}
                </p>

                <div style={{ 
                  display: "flex", 
                  gap: 20,
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.1)"
                }}>
                  <div style={{ 
                    fontSize: 13, 
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}>
                    💬 {post.replies} {language === "tr" ? "yanıt" : "replies"}
                  </div>
                  <div style={{ 
                    fontSize: 13, 
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}>
                    👁️ {post.views} {language === "tr" ? "görüntülenme" : "views"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
