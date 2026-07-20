import { GeometricStar } from "@/components/illustrations/Icons";

export function GeometricAccent({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="geometric-wash" />
      <GeometricStar className="absolute top-8 right-8 h-10 w-10 opacity-30" />
      <GeometricStar className="absolute bottom-12 left-6 h-8 w-8 opacity-20" />
    </div>
  );
}
