import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type = "info", duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle size={20} color="#43e97b" />,
    error: <AlertCircle size={20} color="#f5576c" />,
    info: <Info size={20} color="#667eea" />
  };

  const colors = {
    success: "rgba(67, 233, 123, 0.2)",
    error: "rgba(245, 87, 108, 0.2)",
    info: "rgba(102, 126, 234, 0.2)"
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            background: colors[type],
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 16,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            minWidth: 300,
            maxWidth: 400,
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
          }}
        >
          {icons[type]}
          <p style={{ 
            flex: 1, 
            margin: 0, 
            color: "#fff", 
            fontSize: 14, 
            fontWeight: 500 
          }}>
            {message}
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 4,
              display: "flex",
              alignItems: "center"
            }}
          >
            <X size={18} color="rgba(255,255,255,0.7)" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
