import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Heart, User, Languages, MapPin, ChevronDown, TrendingUp, Menu, X, Users, ShoppingBag, Briefcase, Home, MessageCircle, Settings, Clock, Eye, MessageSquare, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginModal from "../components/LoginModal";

export default function Topluluk() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { location, setLocation, availableCities } = useLocation();
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showMainCategories, setShowMainCategories] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "discussed">("newest");
  const [isMobile, setIsMobile] = useState(false);

  const [selectedMainCategory, setSelectedMainCategory] = useState("community");
  const [selectedCategory, setSelectedCategory] = useState("activities");

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(globalThis.window.innerWidth < 768);
    };
    handleResize(); // Initial check
    globalThis.window.addEventListener('resize', handleResize);
    return () => globalThis.window.removeEventListener('resize', handleResize);
  }, []);

  const mainCategories = [
    { 
      id: "community", 
      name: "Community", 
      nameTr: "Topluluk",
      icon: Users,
      color: "#667eea"
    },
    { 
      id: "forsale", 
      name: "For Sale", 
      nameTr: "Satılık",
      icon: ShoppingBag,
      color: "#f093fb"
    },
    { 
      id: "jobs", 
      name: "Jobs", 
      nameTr: "İş İlanları",
      icon: Briefcase,
      color: "#4facfe"
    },
    { 
      id: "housing", 
      name: "Housing", 
      nameTr: "Konut",
      icon: Home,
      color: "#43e97b"
    },
    { 
      id: "discussions", 
      name: "Discussions", 
      nameTr: "Tartışmalar",
      icon: MessageCircle,
      color: "#fa709a"
    },
    { 
      id: "services", 
      name: "Services", 
      nameTr: "Hizmetler",
      icon: Settings,
      color: "#feca57"
    },
  ];

  const subcategories: Record<string, Array<{ id: string; name: string; nameTr: string }>> = {
    community: [
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
    ],
    forsale: [
      { id: "antiques", name: "antiques", nameTr: "antikalar" },
      { id: "appliances", name: "appliances", nameTr: "ev aletleri" },
      { id: "bikes", name: "bikes", nameTr: "bisikletler" },
      { id: "books", name: "books", nameTr: "kitaplar" },
      { id: "electronics", name: "electronics", nameTr: "elektronik" },
      { id: "furniture", name: "furniture", nameTr: "mobilya" },
    ],
    jobs: [
      { id: "accounting", name: "accounting+finance", nameTr: "muhasebe+finans" },
      { id: "admin", name: "admin / office", nameTr: "yönetici / ofis" },
      { id: "education", name: "education", nameTr: "eğitim" },
      { id: "engineering", name: "engineering", nameTr: "mühendislik" },
      { id: "software", name: "software / qa / dba", nameTr: "yazılım / qa / dba" },
    ],
    housing: [
      { id: "apts", name: "apts / housing", nameTr: "daireler / konut" },
      { id: "office", name: "office / commercial", nameTr: "ofis / ticari" },
      { id: "parking", name: "parking / storage", nameTr: "otopark / depo" },
      { id: "rooms", name: "rooms / shared", nameTr: "odalar / paylaşımlı" },
    ],
    discussions: [
      { id: "apple", name: "apple", nameTr: "apple" },
      { id: "arts", name: "arts+crafts", nameTr: "sanat+el işi" },
      { id: "beauty", name: "beauty", nameTr: "güzellik" },
      { id: "bikes", name: "bikes", nameTr: "bisikletler" },
      { id: "comp", name: "comp", nameTr: "bilgisayar" },
    ],
    services: [
      { id: "automotive", name: "automotive", nameTr: "otomotiv" },
      { id: "beauty", name: "beauty", nameTr: "güzellik" },
      { id: "computer", name: "computer", nameTr: "bilgisayar" },
      { id: "creative", name: "creative", nameTr: "yaratıcı" },
      { id: "financial", name: "financial", nameTr: "finansal" },
    ],
  };

  const communitySubcategories = subcategories[selectedMainCategory] || [];

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
    },
    {
      id: "9",
      category: "activities",
      title: language === "tr" ? "Bisiklet Turu - Cumartesi" : "Bike Tour - Saturday",
      author: "CyclingFan",
      time: language === "tr" ? "1 saat önce" : "1h ago",
      content: language === "tr"
        ? "Sahil boyunca bisiklet turu düzenliyoruz. 20km rotamız var. Tüm seviyeler katılabilir!"
        : "Organizing a bike tour along the coast. 20km route. All levels welcome!",
      replies: 67,
      views: 2134
    },
    {
      id: "10",
      category: "activities",
      title: language === "tr" ? "Fotoğrafçılık Workshop'u" : "Photography Workshop",
      author: "PhotoPro",
      time: language === "tr" ? "30 dakika önce" : "30m ago",
      content: language === "tr"
        ? "Başlangıç seviyesi fotoğrafçılık workshop'u düzenliyorum. DSLR kameranızı getirin!"
        : "Hosting a beginner photography workshop. Bring your DSLR camera!",
      replies: 89,
      views: 3421
    },
    {
      id: "11",
      category: "activities",
      title: language === "tr" ? "Plaj Voleybolu Maçı" : "Beach Volleyball Match",
      author: "BeachPlayer",
      time: language === "tr" ? "15 dakika önce" : "15m ago",
      content: language === "tr"
        ? "Pazar günü plaj voleybolu maçı. Takım arkadaşı arıyoruz. Deneyim gerekmez!"
        : "Beach volleyball match on Sunday. Looking for teammates. No experience needed!",
      replies: 53,
      views: 1876
    },
    {
      id: "12",
      category: "activities",
      title: language === "tr" ? "Kitap Kulübü Buluşması" : "Book Club Meeting",
      author: "BookWorm",
      time: language === "tr" ? "45 dakika önce" : "45m ago",
      content: language === "tr"
        ? "Bu ay 'Suç ve Ceza' kitabını okuyoruz. Tartışma için herkesi bekliyoruz!"
        : "Reading 'Crime and Punishment' this month. Everyone welcome for discussion!",
      replies: 41,
      views: 987
    },
    {
      id: "13",
      category: "activities",
      title: language === "tr" ? "Açık Hava Sinema Gecesi" : "Outdoor Movie Night",
      author: "CinemaLover",
      time: language === "tr" ? "10 dakika önce" : "10m ago",
      content: language === "tr"
        ? "Parkta açık hava sinema gecesi! Klasik filmler gösteriyoruz. Battaniyenizi getirin!"
        : "Outdoor movie night at the park! Showing classic films. Bring your blanket!",
      replies: 78,
      views: 2567
    },
    {
      id: "14",
      category: "activities",
      title: language === "tr" ? "Koşu Grubu - Sabah 6:00" : "Running Group - 6AM",
      author: "MorningRunner",
      time: language === "tr" ? "20 dakika önce" : "20m ago",
      content: language === "tr"
        ? "Her sabah 6'da koşuya çıkıyoruz. 5km kolay tempo. Yeni başlayanlar için ideal!"
        : "Running every morning at 6AM. Easy 5km pace. Perfect for beginners!",
      replies: 36,
      views: 1234
    },
    {
      id: "15",
      category: "activities",
      title: language === "tr" ? "Dans Dersi - Salsa Başlangıç" : "Dance Class - Beginner Salsa",
      author: "DanceInstructor",
      time: language === "tr" ? "5 dakika önce" : "5m ago",
      content: language === "tr"
        ? "Salsa dans dersleri başlıyor! Hiç deneyim gerekmez. Partner bulmana yardımcı oluruz!"
        : "Starting salsa dance classes! No experience needed. We'll help you find a partner!",
      replies: 92,
      views: 4123
    }
  ];

  const filteredPosts = search 
    ? mockPosts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase())
      ).filter(post => post.category === selectedCategory)
    : mockPosts.filter(post => post.category === selectedCategory);

  // Sort posts based on selected sorting option
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "newest") {
      // Most recent first (by time string)
      return a.id > b.id ? -1 : 1;
    } else if (sortBy === "popular") {
      // Most views first
      return b.views - a.views;
    } else if (sortBy === "discussed") {
      // Most replies first
      return b.replies - a.replies;
    }
    return 0;
  });

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
          padding: window.innerWidth < 768 ? "16px 20px" : "24px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          flexWrap: window.innerWidth < 768 ? "wrap" : "nowrap",
          gap: window.innerWidth < 768 ? 16 : 0
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMainCategories(!showMainCategories)}
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 12,
              padding: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            {showMainCategories ? <X size={20} /> : <Menu size={20} />}
          </motion.button>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/")}
            style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
          >
            <h2 style={{ 
              fontSize: window.innerWidth < 768 ? 20 : 28, 
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
          maxWidth: window.innerWidth < 768 ? "100%" : 600,
          margin: window.innerWidth < 768 ? "0" : "0 40px",
          order: window.innerWidth < 768 ? 3 : 0,
          width: window.innerWidth < 768 ? "100%" : "auto"
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

        <div style={{ display: "flex", gap: window.innerWidth < 768 ? 8 : 16, alignItems: "center", flexWrap: "wrap" }}>
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
                padding: window.innerWidth < 768 ? "8px 12px" : "12px 20px",
                color: "#fff",
                fontSize: window.innerWidth < 768 ? 12 : 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: window.innerWidth < 768 ? 6 : 10,
                textTransform: "capitalize"
              }}
            >
              <MapPin size={window.innerWidth < 768 ? 14 : 18} />
              {location}
              <ChevronDown size={window.innerWidth < 768 ? 14 : 18} style={{ 
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
              padding: window.innerWidth < 768 ? "8px 12px" : "12px 20px",
              color: "#fff",
              fontSize: window.innerWidth < 768 ? 12 : 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: window.innerWidth < 768 ? 6 : 10
            }}
          >
            <Languages size={window.innerWidth < 768 ? 14 : 18} />
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
              padding: window.innerWidth < 768 ? 8 : 10,
              color: "#fff",
              cursor: "pointer",
              display: window.innerWidth < 768 ? "none" : "flex"
            }}
          >
            <Heart size={window.innerWidth < 768 ? 16 : 20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 12,
              padding: window.innerWidth < 768 ? 8 : 10,
              color: "#fff",
              cursor: "pointer",
              display: window.innerWidth < 768 ? "none" : "flex"
            }}
          >
            <User size={window.innerWidth < 768 ? 16 : 20} />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div style={{ 
        display: "flex", 
        padding: window.innerWidth < 768 ? "16px 20px" : "32px 48px", 
        gap: window.innerWidth < 768 ? 0 : 32,
        position: "relative",
        zIndex: 1,
        transition: "all 0.3s ease",
        flexDirection: window.innerWidth < 768 ? "column" : "row"
      }}>
        {/* Main Categories Sidebar */}
        <AnimatePresence>
          {showMainCategories && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 24,
                padding: showMainCategories ? 24 : 0,
                height: "fit-content",
                position: "sticky",
                top: 120,
                overflow: "hidden",
                flexShrink: 0
              }}
            >
              <div style={{ 
                width: 272,
                opacity: showMainCategories ? 1 : 0,
                transition: "opacity 0.2s"
              }}>
                <h3 style={{ 
                  fontSize: 20, 
                  fontWeight: 700, 
                  color: "#fff",
                  margin: 0,
                  marginBottom: 24
                }}>
                  {language === "tr" ? "Ana Kategoriler" : "Main Categories"}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {mainCategories.map((mainCat) => {
                    const Icon = mainCat.icon;
                    return (
                      <motion.div
                        key={mainCat.id}
                        whileHover={{ 
                          x: 6,
                          backgroundColor: `${mainCat.color}15`
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedMainCategory(mainCat.id);
                          setSelectedCategory(subcategories[mainCat.id][0].id);
                        }}
                        style={{
                          padding: "14px 16px",
                          background: selectedMainCategory === mainCat.id 
                            ? `${mainCat.color}25` 
                            : "rgba(255,255,255,0.05)",
                          borderRadius: 14,
                          cursor: "pointer",
                          transition: "all 0.3s",
                          border: selectedMainCategory === mainCat.id 
                            ? `2px solid ${mainCat.color}60`
                            : "2px solid transparent",
                          display: "flex",
                          alignItems: "center",
                          gap: 12
                        }}
                      >
                        <div style={{
                          background: selectedMainCategory === mainCat.id 
                            ? `${mainCat.color}30`
                            : "rgba(255,255,255,0.1)",
                          borderRadius: 10,
                          padding: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <Icon 
                            size={18} 
                            color={selectedMainCategory === mainCat.id ? mainCat.color : "#fff"} 
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            fontSize: 14, 
                            fontWeight: selectedMainCategory === mainCat.id ? 700 : 600,
                            color: selectedMainCategory === mainCat.id ? mainCat.color : "#fff",
                          }}>
                            {language === "en" ? mainCat.name : mainCat.nameTr}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Subcategories Sidebar */}
        <motion.aside 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ 
            width: window.innerWidth < 768 ? "100%" : 280,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 24,
            padding: window.innerWidth < 768 ? 16 : 24,
            height: "fit-content",
            position: window.innerWidth < 768 ? "relative" : "sticky",
            top: window.innerWidth < 768 ? 0 : 120,
            marginBottom: window.innerWidth < 768 ? 20 : 0
          }}
        >
          <h3 style={{ 
            fontSize: window.innerWidth < 768 ? 16 : 20, 
            fontWeight: 700, 
            color: "#fff",
            marginBottom: window.innerWidth < 768 ? 12 : 20,
            marginTop: 0
          }}>
            {language === "tr" ? "Kategoriler" : "Categories"}
          </h3>
          <div style={{ display: "flex", flexDirection: window.innerWidth < 768 ? "row" : "column", gap: 8, flexWrap: window.innerWidth < 768 ? "wrap" : "nowrap" }}>
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
            alignItems: window.innerWidth < 768 ? "flex-start" : "center",
            marginBottom: window.innerWidth < 768 ? 16 : 28,
            flexDirection: window.innerWidth < 768 ? "column" : "row",
            gap: window.innerWidth < 768 ? 12 : 0
          }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                fontSize: window.innerWidth < 768 ? 24 : 32, 
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
            <div style={{ display: "flex", gap: window.innerWidth < 768 ? 8 : 12, alignItems: "center", flexWrap: "wrap", width: window.innerWidth < 768 ? "100%" : "auto" }}>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCreatePost(true)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: 14,
                  padding: window.innerWidth < 768 ? "10px 16px" : "12px 24px",
                  color: "#fff",
                  fontSize: window.innerWidth < 768 ? 12 : 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 4px 15px rgba(102,126,234,0.4)",
                  flex: window.innerWidth < 768 ? 1 : "none"
                }}
              >
                <span style={{ fontSize: 18 }}>+</span>
                {language === "tr" ? "Yeni Gönderi" : "Create Post"}
              </motion.button>
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
                  padding: window.innerWidth < 768 ? "8px 12px" : "10px 16px",
                  color: "#667eea",
                  fontSize: window.innerWidth < 768 ? 12 : 14,
                  fontWeight: 700,
                  flex: window.innerWidth < 768 ? 1 : "none"
                }}
              >
                <TrendingUp size={window.innerWidth < 768 ? 14 : 18} />
                {filteredPosts.length} {language === "tr" ? "aktif gönderi" : "active posts"}
              </motion.div>
            </div>
          </div>

          {/* Sorting Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 24,
              flexWrap: "wrap"
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSortBy("newest")}
              style={{
                background: sortBy === "newest" 
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
                  : "rgba(255,255,255,0.05)",
                border: sortBy === "newest" 
                  ? "1px solid rgba(102,126,234,0.5)"
                  : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "10px 18px",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.3s"
              }}
            >
              <Clock size={16} />
              {language === "tr" ? "En Yeni" : "Newest"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSortBy("popular")}
              style={{
                background: sortBy === "popular" 
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
                  : "rgba(255,255,255,0.05)",
                border: sortBy === "popular" 
                  ? "1px solid rgba(102,126,234,0.5)"
                  : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "10px 18px",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.3s"
              }}
            >
              <Eye size={16} />
              {language === "tr" ? "En Popüler" : "Most Popular"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSortBy("discussed")}
              style={{
                background: sortBy === "discussed" 
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
                  : "rgba(255,255,255,0.05)",
                border: sortBy === "discussed" 
                  ? "1px solid rgba(102,126,234,0.5)"
                  : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "10px 18px",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.3s"
              }}
            >
              <MessageSquare size={16} />
              {language === "tr" ? "En Çok Tartışılan" : "Most Discussed"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSortBy("newest")}
              disabled={sortBy === "newest"}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "10px 18px",
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.3s",
                marginLeft: "auto"
              }}
            >
              <Flame size={16} />
              {sortedPosts.length} {language === "tr" ? "gönderi" : "posts"}
            </motion.button>
          </motion.div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(auto-fill, minmax(340px, 1fr))", 
            gap: window.innerWidth < 768 ? 16 : 20
          }}>
            {sortedPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 50px rgba(102,126,234,0.3)"
                }}
                onClick={() => setSelectedPost(post)}
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

      <Footer />

      {/* Post Preview Modal */}
      <AnimatePresence>
        {selectedPost && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(10px)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "90%",
                  maxWidth: 800,
                  maxHeight: "85vh",
                  background: "linear-gradient(135deg, rgba(15,12,41,0.98) 0%, rgba(48,43,99,0.98) 100%)",
                  backdropFilter: "blur(40px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 32,
                  padding: 40,
                  overflowY: "auto",
                  boxShadow: "0 30px 90px rgba(0,0,0,0.5)",
                  position: "relative"
                }}
              >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedPost(null)}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 12,
                  padding: 10,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  zIndex: 1
                }}
              >
                <X size={20} />
              </motion.button>

              {/* Post Header */}
              <div style={{ marginBottom: 32 }}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    display: "inline-block",
                    background: "rgba(102,126,234,0.2)",
                    border: "1px solid rgba(102,126,234,0.4)",
                    borderRadius: 12,
                    padding: "8px 16px",
                    marginBottom: 20,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#667eea",
                    textTransform: "capitalize"
                  }}
                >
                  {language === "en" 
                    ? communitySubcategories.find(c => c.id === selectedPost.category)?.name
                    : communitySubcategories.find(c => c.id === selectedPost.category)?.nameTr}
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    color: "#fff",
                    margin: 0,
                    marginBottom: 20,
                    lineHeight: 1.2
                  }}
                >
                  {selectedPost.title}
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    flexWrap: "wrap"
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 15,
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: 600
                  }}>
                    <div style={{
                      background: "rgba(102,126,234,0.2)",
                      borderRadius: 10,
                      padding: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <User size={16} color="#667eea" />
                    </div>
                    {selectedPost.author}
                  </div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                    {selectedPost.time}
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 600
                  }}>
                    💬 {selectedPost.replies} {language === "tr" ? "yanıt" : "replies"}
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 600
                  }}>
                    👁️ {selectedPost.views} {language === "tr" ? "görüntülenme" : "views"}
                  </div>
                </motion.div>
              </div>

              {/* Post Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 20,
                  padding: 30,
                  marginBottom: 30
                }}
              >
                <p style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.9)",
                  margin: 0,
                  fontWeight: 500
                }}>
                  {selectedPost.content}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap"
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    borderRadius: 16,
                    padding: "16px 32px",
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10
                  }}
                >
                  <MessageCircle size={20} />
                  {language === "tr" ? "Yanıtla" : "Reply"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 16,
                    padding: "16px 32px",
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10
                  }}
                >
                  <Heart size={20} />
                  {language === "tr" ? "Kaydet" : "Save"}
                </motion.button>
              </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreatePost(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(10px)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "90%",
                  maxWidth: 700,
                  maxHeight: "85vh",
                  background: "linear-gradient(135deg, rgba(15,12,41,0.98) 0%, rgba(48,43,99,0.98) 100%)",
                  backdropFilter: "blur(40px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 32,
                  padding: 40,
                  overflowY: "auto",
                  boxShadow: "0 30px 90px rgba(0,0,0,0.5)",
                  position: "relative"
                }}
              >
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCreatePost(false)}
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 12,
                    padding: 10,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    zIndex: 1
                  }}
                >
                  <X size={20} />
                </motion.button>

                {/* Form */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#fff",
                    margin: 0,
                    marginBottom: 30,
                    lineHeight: 1.2
                  }}
                >
                  {language === "tr" ? "Yeni Gönderi Oluştur" : "Create New Post"}
                </motion.h2>

                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{ display: "flex", flexDirection: "column", gap: 24 }}
                  onSubmit={(e) => e.preventDefault()}
                >
                  {/* Title Input */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.8)",
                      marginBottom: 8
                    }}>
                      {language === "tr" ? "Başlık" : "Title"}
                    </label>
                    <input
                      type="text"
                      placeholder={language === "tr" ? "Gönderiniz için bir başlık girin..." : "Enter a title for your post..."}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 14,
                        padding: "14px 18px",
                        color: "#fff",
                        fontSize: 15,
                        fontWeight: 500,
                        outline: "none",
                        transition: "all 0.3s"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.background = "rgba(102,126,234,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.2)";
                        e.target.style.background = "rgba(255,255,255,0.05)";
                      }}
                    />
                  </div>

                  {/* Category Select */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.8)",
                      marginBottom: 8
                    }}>
                      {language === "tr" ? "Kategori" : "Category"}
                    </label>
                    <select
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 14,
                        padding: "14px 18px",
                        color: "#fff",
                        fontSize: 15,
                        fontWeight: 500,
                        outline: "none",
                        cursor: "pointer"
                      }}
                    >
                      {communitySubcategories.map((cat) => (
                        <option key={cat.id} value={cat.id} style={{ background: "#1e1e3c" }}>
                          {language === "en" ? cat.name : cat.nameTr}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Content Textarea */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.8)",
                      marginBottom: 8
                    }}>
                      {language === "tr" ? "İçerik" : "Content"}
                    </label>
                    <textarea
                      placeholder={language === "tr" ? "Gönderinizin içeriğini yazın..." : "Write your post content..."}
                      rows={6}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 14,
                        padding: "14px 18px",
                        color: "#fff",
                        fontSize: 15,
                        fontWeight: 500,
                        outline: "none",
                        resize: "vertical",
                        fontFamily: "inherit",
                        lineHeight: 1.6
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.background = "rgba(102,126,234,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.2)";
                        e.target.style.background = "rgba(255,255,255,0.05)";
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      borderRadius: 16,
                      padding: "16px 32px",
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 4px 20px rgba(102,126,234,0.4)",
                      marginTop: 10
                    }}
                  >
                    {language === "tr" ? "Gönderiyi Yayınla" : "Publish Post"}
                  </motion.button>
                </motion.form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
