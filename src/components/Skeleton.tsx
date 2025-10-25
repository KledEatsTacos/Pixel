import { motion } from "framer-motion";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  variant?: "text" | "circular" | "rectangular";
}

export default function Skeleton({ 
  width = "100%", 
  height = 20, 
  borderRadius = 8,
  variant = "rectangular" 
}: SkeletonProps) {
  const getStyles = () => {
    if (variant === "circular") {
      return {
        width: height,
        height: height,
        borderRadius: "50%"
      };
    }
    if (variant === "text") {
      return {
        width,
        height: 16,
        borderRadius: 4
      };
    }
    return {
      width,
      height,
      borderRadius
    };
  };

  return (
    <motion.div
      animate={{
        opacity: [0.5, 0.8, 0.5]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        ...getStyles(),
        background: "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 75%)",
        backgroundSize: "200% 100%"
      }}
    />
  );
}

// Card skeleton for listings
export function CardSkeleton() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 20,
      overflow: "hidden",
      padding: 0
    }}>
      <Skeleton height={200} borderRadius={0} />
      <div style={{ padding: 24 }}>
        <Skeleton width="70%" height={24} />
        <div style={{ marginTop: 12 }}>
          <Skeleton width="40%" height={20} />
        </div>
        <div style={{ marginTop: 12 }}>
          <Skeleton width="50%" height={16} />
        </div>
      </div>
    </div>
  );
}
