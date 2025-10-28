import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle login/signup logic
    console.log("Form submitted:", formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const labels = {
    login: language === "en" ? "Login" : "Giriş Yap",
    signup: language === "en" ? "Sign Up" : "Kayıt Ol",
    email: language === "en" ? "Email" : "E-posta",
    password: language === "en" ? "Password" : "Şifre",
    confirmPassword: language === "en" ? "Confirm Password" : "Şifreyi Onayla",
    name: language === "en" ? "Full Name" : "Ad Soyad",
    submit: language === "en" ? "Continue" : "Devam Et",
    switchToSignup: language === "en" ? "Don't have an account?" : "Hesabınız yok mu?",
    switchToLogin: language === "en" ? "Already have an account?" : "Zaten hesabınız var mı?",
    signupLink: language === "en" ? "Sign up" : "Kayıt ol",
    loginLink: language === "en" ? "Login" : "Giriş yap",
    forgotPassword: language === "en" ? "Forgot password?" : "Şifremi unuttum?"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              zIndex: 9998,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{
                background: isDarkMode 
                  ? "linear-gradient(135deg, rgba(30,30,60,0.98) 0%, rgba(20,20,40,0.98) 100%)"
                  : "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,249,250,0.98) 100%)",
                backdropFilter: "blur(20px)",
                border: isDarkMode 
                  ? "1px solid rgba(255,255,255,0.2)" 
                  : "1px solid rgba(139,92,246,0.2)",
                borderRadius: 24,
                padding: 48,
                maxWidth: 480,
                width: "90%",
                boxShadow: isDarkMode 
                  ? "0 20px 60px rgba(0,0,0,0.5)" 
                  : "0 20px 60px rgba(139,92,246,0.3)",
                position: "relative",
                cursor: "default"
              }}
              onClick={(e) => e.stopPropagation()}
            >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(139,92,246,0.1)",
                border: isDarkMode ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(139,92,246,0.2)",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: isDarkMode ? "#fff" : "#1f2937"
              }}
            >
              <X size={20} />
            </motion.button>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{
                fontSize: 32,
                fontWeight: 800,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: "0 0 12px 0"
              }}>
                {isLogin ? labels.login : labels.signup}
              </h2>
              <p style={{
                color: isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(107,114,128,0.8)",
                fontSize: 14,
                margin: 0
              }}>
                {isLogin ? labels.switchToSignup : labels.switchToLogin}{" "}
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  style={{
                    color: isDarkMode ? "#667eea" : "#8b5cf6",
                    fontWeight: 700,
                    cursor: "pointer",
                    textDecoration: "underline"
                  }}
                >
                  {isLogin ? labels.signupLink : labels.loginLink}
                </span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Name (signup only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ marginBottom: 20 }}
                >
                  <label style={{
                    display: "block",
                    color: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(31,41,55,0.9)",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8
                  }}>
                    {labels.name}
                  </label>
                  <div style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center"
                  }}>
                    <User size={18} style={{
                      position: "absolute",
                      left: 16,
                      color: isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(107,114,128,0.6)"
                    }} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required={!isLogin}
                      style={{
                        width: "100%",
                        padding: "14px 16px 14px 48px",
                        background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(139,92,246,0.05)",
                        border: isDarkMode ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(139,92,246,0.2)",
                        borderRadius: 12,
                        color: isDarkMode ? "#fff" : "#1f2937",
                        fontSize: 15,
                        outline: "none",
                        transition: "all 0.3s"
                      }}
                      onFocus={(e) => e.target.style.borderColor = isDarkMode ? "#667eea" : "#8b5cf6"}
                      onBlur={(e) => e.target.style.borderColor = isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(139,92,246,0.2)"}
                    />
                  </div>
                </motion.div>
              )}

              {/* Email */}
              <div style={{ marginBottom: 20 }}>
                <label style={{
                  display: "block",
                  color: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(31,41,55,0.9)",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 8
                }}>
                  {labels.email}
                </label>
                <div style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center"
                }}>
                  <Mail size={18} style={{
                    position: "absolute",
                    left: 16,
                    color: isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(107,114,128,0.6)"
                  }} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px 14px 48px",
                      background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(139,92,246,0.05)",
                      border: isDarkMode ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(139,92,246,0.2)",
                      borderRadius: 12,
                      color: isDarkMode ? "#fff" : "#1f2937",
                      fontSize: 15,
                      outline: "none",
                      transition: "all 0.3s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = isDarkMode ? "#667eea" : "#8b5cf6"}
                    onBlur={(e) => e.target.style.borderColor = isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(139,92,246,0.2)"}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: !isLogin ? 20 : 12 }}>
                <label style={{
                  display: "block",
                  color: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(31,41,55,0.9)",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 8
                }}>
                  {labels.password}
                </label>
                <div style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center"
                }}>
                  <Lock size={18} style={{
                    position: "absolute",
                    left: 16,
                    color: isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(107,114,128,0.6)"
                  }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 48px 14px 48px",
                      background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(139,92,246,0.05)",
                      border: isDarkMode ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(139,92,246,0.2)",
                      borderRadius: 12,
                      color: isDarkMode ? "#fff" : "#1f2937",
                      fontSize: 15,
                      outline: "none",
                      transition: "all 0.3s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = isDarkMode ? "#667eea" : "#8b5cf6"}
                    onBlur={(e) => e.target.style.borderColor = isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(139,92,246,0.2)"}
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: 16,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(107,114,128,0.6)",
                      padding: 0,
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </motion.button>
                </div>
              </div>

              {/* Forgot Password (login only) */}
              {isLogin && (
                <div style={{ marginBottom: 32, textAlign: "right" }}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      // TODO: Handle forgot password logic
                      console.log("Forgot password clicked");
                    }}
                    style={{
                      color: isDarkMode ? "#667eea" : "#8b5cf6",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      textDecoration: "underline",
                      display: "inline-block"
                    }}
                  >
                    {labels.forgotPassword}
                  </motion.span>
                </div>
              )}

              {/* Confirm Password (signup only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ marginBottom: 32 }}
                >
                  <label style={{
                    display: "block",
                    color: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(31,41,55,0.9)",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8
                  }}>
                    {labels.confirmPassword}
                  </label>
                  <div style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center"
                  }}>
                    <Lock size={18} style={{
                      position: "absolute",
                      left: 16,
                      color: isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(107,114,128,0.6)"
                    }} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required={!isLogin}
                      style={{
                        width: "100%",
                        padding: "14px 16px 14px 48px",
                        background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(139,92,246,0.05)",
                        border: isDarkMode ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(139,92,246,0.2)",
                        borderRadius: 12,
                        color: isDarkMode ? "#fff" : "#1f2937",
                        fontSize: 15,
                        outline: "none",
                        transition: "all 0.3s"
                      }}
                      onFocus={(e) => e.target.style.borderColor = isDarkMode ? "#667eea" : "#8b5cf6"}
                      onBlur={(e) => e.target.style.borderColor = isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(139,92,246,0.2)"}
                    />
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(102,126,234,0.4)" }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: 12,
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 8px 32px rgba(102,126,234,0.3)",
                  transition: "all 0.3s"
                }}
              >
                {labels.submit}
              </motion.button>
            </form>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
