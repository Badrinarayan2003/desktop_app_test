// components/materialRequirementsUI/UrgencyBadge.jsx
// Renders a small outlined pill for urgency level: URGENT / HIGH / MEDIUM / LOW

const urgencyClasses = {
  URGENT: "bg-[#FFF5EE] text-[#FA7C14] border border-[#FA7C14]",
  HIGH:   "bg-[#FFF0E8] text-[#E05C00] border border-[#E05C00]",
  MEDIUM: "bg-[#FFFBEB] text-[#B45309] border border-[#B45309]",
  LOW:    "bg-gray-50   text-gray-500  border border-gray-500",
};
 
export default function UrgencyBadge({ urgency }) {
  const classes = urgencyClasses[urgency] || urgencyClasses["MEDIUM"];
 
  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase whitespace-nowrap ${classes}`}
    >
      {urgency}
    </span>
  );
}
