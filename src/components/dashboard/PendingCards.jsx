import { Wrench, UserCog, Circle, Route } from "lucide-react";
import { useNavigate } from "react-router-dom";

const iconMap = {
  Wrench,
  UserCog,
};

function PendingCard({ title, count, metaDot, metaText, buttonLabel, iconName, iconBg, iconColor, highlighted, route, loading, }) {
  const Icon = iconMap[iconName] ?? Wrench;


  const navigate = useNavigate()

  return (
    <div
      className={`
        relative flex flex-col justify-between overflow-hidden
        bg-white rounded-[20px] p-8 flex-1 basis-[260px] min-h-[240px]
        ${highlighted
          ? "border-2 border-[rgba(250,131,22,0.2)]"
          : "border border-[#E3E8EC]"}
      `}
    >
      {/* Watermark icon — bottom right */}
      <div
        className="pointer-events-none absolute bottom-3 right-3 opacity-20"
        aria-hidden="true"
      >
        <Icon
          className={`w-24 h-24 ${iconColor}`}
          strokeWidth={1.2}
        />
      </div>

      {/* Top row: small icon + title + big count */}
      <div className="flex flex-row justify-between items-start w-full z-10">
        {/* Left: icon bubble + title */}
        <div className="flex flex-col gap-2">
          <div className={`flex items-center justify-center w-9 h-9 rounded-xl ${iconBg}`}>
            <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={1.8} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#574336] leading-[15px] max-w-[130px]">
            {title}
          </p>
        </div>

        {/* Big count */}
        <div className="h-[60px] flex items-center justify-center shrink-0 min-w-[80px]">
          {loading ? (
            <div className="w-8 h-8 border-[3px] border-[#FA7C14] border-t-transparent rounded-full animate-spin" />
          ) : (
            <span className="text-[60px] font-extrabold leading-[60px] tracking-[-3px] text-[#191C1E] shrink-0">
              {count ?? 0}
            </span>
          )}
        </div>
      </div>

      {/* Bottom row: meta + button */}
      <div className="flex flex-col justify-between items-start w-full z-10 mt-6">
        {/* Meta bullet */}
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: metaDot }}
          />
          <span className="text-[10px] font-medium text-[#574336] leading-[15px]">
            {metaText}
          </span>
        </div>

        {/* CTA button */}
        <button
          className="
            px-4 py-2.5 rounded-full bg-[#FA7C14]
            text-white text-[10px] font-bold uppercase tracking-[1px]
            shadow-[0_10px_15px_-3px_rgba(250,131,22,0.2),0_4px_6px_-4px_rgba(250,131,22,0.2)]
            hover:bg-[#e06c0c] transition-colors duration-200
            whitespace-nowrap cursor-pointer
          "
          onClick={() => navigate(route)}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

export default function PendingCards({
  data = [],
  loading = false,
}) {
  return (
    <div className="flex flex-row flex-wrap gap-4 w-full">
      {data.map((card) => (
        <PendingCard key={card.id} {...card} loading={loading} />
      ))}
    </div>
  );
}



































// import { Wrench, UserCog, Circle } from "lucide-react";

// const iconMap = {
//   Wrench,
//   UserCog,
// };

// function PendingCard({ title, count, metaDot, metaText, buttonLabel, iconName, iconBg, iconColor, highlighted }) {
//   const Icon = iconMap[iconName] ?? Wrench;

//   return (
//     <div
//       className={`
//         relative flex flex-col justify-between overflow-hidden
//         bg-white rounded-[20px] p-8 flex-1 basis-[260px] min-h-[240px]
//         ${highlighted
//           ? "border-2 border-[rgba(250,131,22,0.2)]"
//           : "border border-[#E3E8EC]"}
//       `}
//     >
//       {/* Watermark icon — bottom right */}
//       <div
//         className="pointer-events-none absolute bottom-3 right-3 opacity-20"
//         aria-hidden="true"
//       >
//         <Icon
//           className={`w-24 h-24 ${iconColor}`}
//           strokeWidth={1.2}
//         />
//       </div>

//       {/* Top row: small icon + title + big count */}
//       <div className="flex flex-row justify-between items-start w-full z-10">
//         {/* Left: icon bubble + title */}
//         <div className="flex flex-col gap-2">
//           <div className={`flex items-center justify-center w-9 h-9 rounded-xl ${iconBg}`}>
//             <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={1.8} />
//           </div>
//           <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#574336] leading-[15px] max-w-[130px]">
//             {title}
//           </p>
//         </div>

//         {/* Big count */}
//         <span className="text-[60px] font-extrabold leading-[60px] tracking-[-3px] text-[#191C1E] shrink-0">
//           {count}
//         </span>
//       </div>

//       {/* Bottom row: meta + button */}
//       <div className="flex flex-col justify-between items-start w-full z-10 mt-6">
//         {/* Meta bullet */}
//         <div className="flex items-center gap-1.5">
//           <span
//             className="w-1.5 h-1.5 rounded-full shrink-0"
//             style={{ background: metaDot }}
//           />
//           <span className="text-[10px] font-medium text-[#574336] leading-[15px]">
//             {metaText}
//           </span>
//         </div>

//         {/* CTA button */}
//         <button
//           className="
//             px-4 py-2.5 rounded-full bg-[#FA7C14]
//             text-white text-[10px] font-bold uppercase tracking-[1px]
//             shadow-[0_10px_15px_-3px_rgba(250,131,22,0.2),0_4px_6px_-4px_rgba(250,131,22,0.2)]
//             hover:bg-[#e06c0c] transition-colors duration-200
//             whitespace-nowrap
//           "
//         >
//           {buttonLabel}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function PendingCards({ data = [] }) {
//   return (
//     <div className="flex flex-row flex-wrap gap-4 w-full">
//       {data.map((card) => (
//         <PendingCard key={card.id} {...card} />
//       ))}
//     </div>
//   );
// }