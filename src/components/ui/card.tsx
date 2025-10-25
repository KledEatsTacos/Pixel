import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={"card-base " + className} style={{ borderRadius: 16, background: "#fff" }}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={"card-content " + className} style={{ padding: 12 }}>
      {children}
    </div>
  );
}
