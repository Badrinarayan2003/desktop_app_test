import { TrendingUp, TrendingDown, HardHat, Truck, Users, Building2, Plus, Dot, Check, CheckCheck, CheckCheckIcon, CircleAlert } from "lucide-react";

const iconMap = {
  HardHat,
  Truck,
  Users,
  Building2,
};

function StatCard({ label, value, change, iconName, iconBg, iconColor, loading,
}) {
  const Icon = iconMap[iconName] ?? Building2;
  const isPositive = change >= 0;

  return (
    <div className="flex flex-col justify-between bg-white border border-[#E3E8EC] rounded-[22px] p-5 gap-5 min-w-0 flex-1 basis-[140px]">
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between w-full">
        {/* Icon bubble */}
        <div className={`flex items-center justify-center w-10 h-10 rounded-[18px] shrink-0 ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={1.67} />
        </div>

        {/* Change badge */}
        <div
          className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[12px] leading-4 font-normal ${isPositive
            ? "bg-[#D7F9DE] text-[#004016]"
            : "bg-[#FFEBE8] text-[#8A0314]"
            }`}
        >
          {/* {isPositive ? (
            <TrendingUp className="w-3 h-3" strokeWidth={1.5} />
          ) : (
            <TrendingDown className="w-3 h-3" strokeWidth={1.5} />
          )} */}
          {/* <span>{isPositive ? "+" : ""}{change}</span> */}
          <CircleAlert className="w-5 h-4" />
        </div>


      </div>

      {/* Bottom row: value + label */}
      <div className="flex flex-col gap-1 w-full">
        <div className="h-[40px] flex items-center">
          {loading ? (
            <div className="w-8 h-8 border-[3px] border-[#FA7C14] border-t-transparent rounded-full animate-spin" />
          ) : (
            <span className="text-[#0C121A] font-bold text-[clamp(22px,3vw,30px)] leading-[1.2] tracking-[-0.75px]">
              {value ?? 0}
            </span>
          )}
        </div>
        <span className="text-[#626975] text-sm leading-5 font-normal">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function StatCards({
  data = [],
  loading = false,
}) {
  return (
    <div className="flex flex-row flex-wrap gap-4 w-full">
      {data.map((card) => (
        <StatCard key={card.id} {...card} loading={loading} />
      ))}
    </div>
  );
}







































// import { TrendingUp, TrendingDown, HardHat, Truck, Users, Building2 } from "lucide-react";

// const iconMap = {
//   HardHat,
//   Truck,
//   Users,
//   Building2,
// };

// function StatCard({ label, value, change, iconName, iconBg, iconColor }) {
//   const Icon = iconMap[iconName] ?? Building2;
//   const isPositive = change >= 0;

//   return (
//     <div className="flex flex-col justify-between bg-white border border-[#E3E8EC] rounded-[22px] p-5 gap-5 min-w-0 flex-1 basis-[140px]">
//       {/* Top row: icon + badge */}
//       <div className="flex items-start justify-between w-full">
//         {/* Icon bubble */}
//         <div className={`flex items-center justify-center w-10 h-10 rounded-[18px] shrink-0 ${iconBg}`}>
//           <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={1.67} />
//         </div>

//         {/* Change badge */}
//         <div
//           className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[12px] leading-4 font-normal ${isPositive
//               ? "bg-[#D7F9DE] text-[#004016]"
//               : "bg-[#FFEBE8] text-[#8A0314]"
//             }`}
//         >
//           {isPositive ? (
//             <TrendingUp className="w-3 h-3" strokeWidth={1.5} />
//           ) : (
//             <TrendingDown className="w-3 h-3" strokeWidth={1.5} />
//           )}
//           <span>{isPositive ? "+" : ""}{change}%</span>
//         </div>
//       </div>

//       {/* Bottom row: value + label */}
//       <div className="flex flex-col gap-1 w-full">
//         <span className="text-[#0C121A] font-bold text-[clamp(22px,3vw,30px)] leading-[1.2] tracking-[-0.75px]">
//           {value}
//         </span>
//         <span className="text-[#626975] text-sm leading-5 font-normal">
//           {label}
//         </span>
//       </div>
//     </div>
//   );
// }

// export default function StatCards({ data = [] }) {
//   return (
//     <div className="flex flex-row flex-wrap gap-4 w-full">
//       {data.map((card) => (
//         <StatCard key={card.id} {...card} />
//       ))}
//     </div>
//   );
// }