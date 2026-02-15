import { useState, useEffect } from "react";
import { Users } from "lucide-react";

interface UrgencyBadgeProps {
  totalSpots?: number;
  className?: string;
}

const UrgencyBadge = ({ totalSpots = 12, className = "" }: UrgencyBadgeProps) => {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    // Simulate remaining spots based on a seed from the current month
    // This gives consistent numbers within the same month
    const now = new Date();
    const seed = now.getFullYear() * 100 + now.getMonth();
    const pseudo = ((seed * 9301 + 49297) % 233280) / 233280;
    const spots = Math.floor(pseudo * 5) + 2; // 2-6 remaining
    setRemaining(Math.min(spots, totalSpots));
  }, [totalSpots]);

  if (remaining === null) return null;

  const isLow = remaining <= 3;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
        isLow
          ? "bg-red-50 text-red-700 border border-red-200"
          : "bg-amber-50 text-amber-700 border border-amber-200"
      } ${className}`}
    >
      <Users className="h-4 w-4" />
      <span>
        Nog <strong>{remaining}</strong> {remaining === 1 ? "plek" : "plekken"} beschikbaar
      </span>
    </div>
  );
};

export default UrgencyBadge;
