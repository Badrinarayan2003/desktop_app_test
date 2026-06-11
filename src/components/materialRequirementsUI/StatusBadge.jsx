// components/shared/StatusBadge.jsx
// Renders a colored pill for status: Pending / Approved / Rejected

const statusClasses = {
  Pending:  "bg-[#F9EDE5] text-[#FA7C14] border border-[#FFC28B]",
  Approved: "bg-[#C9EDE4] text-[#006C49]",
  Rejected: "bg-red-500/50 text-white",
};
 
export default function StatusBadge({ status }) {
  const classes = statusClasses[status] || statusClasses["Pending"];
 
  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase whitespace-nowrap ${classes}`}
    >
      {status}
    </span>
  );
}




















// // components/materialRequirementsUI/StatusBadge.jsx
// // Shows a colored pill badge based on status: Pending / Approved / Rejected

// const statusStyles = {
//   Pending: {
//     bg: "bg-[#FFDCC4]/20",
//     text: "text-[#613100]",
//   },
//   Approved: {
//     bg: "bg-[#C9EDE4]",
//     text: "text-[#006C49]",
//   },
//   Rejected: {
//     bg: "bg-red-500/50",
//     text: "text-white",
//   },
// };

// export default function StatusBadge({ status }) {
//   const style = statusStyles[status] || statusStyles["Pending"];

//   return (
//     <span
//       className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-normal whitespace-nowrap ${style.bg} ${style.text}`}
//     >
//       {status}
//     </span>
//   );
// }