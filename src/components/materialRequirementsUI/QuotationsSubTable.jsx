// components/materialRequirementsUI/QuotationsSubTable.jsx
// Inner table shown when a MaterialRequirements row is expanded.
// Columns: ID | Project | Material | Quantity | Contractor Name | Status | Actions
// Actions: Pending → Approve + Reject buttons | Approved/Rejected → View button
// components/materialRequirementsUI/QuotationsSubTable.jsx
// Inner table shown when a MaterialRequirements row is expanded.
// Columns: ID | Project | Material | Quantity | Contractor Name | Status | Actions
// Actions: Pending → Approve + Reject buttons | Approved / Rejected → View button only
// components/materialRequirementsUI/QuotationsSubTable.jsx

import { useEffect, useState } from "react";
import { getMaterialRequirementDetails } from "../../services/apis/getMaterialRequirementDetails";

export default function QuotationsSubTable({ requirementId }) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (requirementId) {
      fetchMaterialDetails();
    }
  }, [requirementId]);

  async function fetchMaterialDetails() {
    try {
      setLoading(true);

      const response = await getMaterialRequirementDetails(requirementId);

      setMaterials(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const thClass =
    "px-4 py-3 text-left text-[10px] font-bold tracking-[1.5px] uppercase text-white bg-[#F97316] whitespace-nowrap";
  const tdClass =
    "px-4 py-3 text-[12.5px] text-[#4B5563] border-b border-[#EEF2F6] whitespace-normal break-words leading-5 align-top";

  return (
    <div className="bg-[#F4ECE6] px-4 py-4 border-t border-[#E5DDD6] overflow-x-auto">
      <div className="rounded-2xl overflow-hidden border border-[#E6D8CD] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <table className="w-full min-w-[700px] border-collapse table-fixed">
          <thead>
            <tr>
              <th className={`${thClass} w-[200px]`}>Material Detail ID</th>

              <th className={`${thClass} w-[180px]`}>Material Name</th>

              <th className={`${thClass} w-[120px]`}>Quantity</th>

              <th className={`${thClass} w-[100px]`}>Units</th>

              <th className={`${thClass} w-[140px]`}>Brand</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-[#515F74]">
                  Loading material details...
                </td>
              </tr>
            ) : materials?.length > 0 ? (
              materials.map((item) => (
                <tr
                  key={item.materialDetailId}
                  className="hover:bg-[#FAFBFC] transition-colors"
                >
                  <td className={tdClass}>#{item?.materialDetailId || "-"}</td>

                  <td className={`${tdClass} font-semibold text-[#191C1E]`}>
                    {item?.materialName || "-"}
                  </td>

                  <td className={tdClass}>{item?.quantity || "-"}</td>

                  <td className={tdClass}>{item?.units || "-"}</td>

                  <td className={tdClass}>{item?.brand || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-8 text-[#515F74]">
                  No material details found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}















//  ------------CURRENT WORKING CODE----------------


// // components/materialRequirementsUI/QuotationsSubTable.jsx
// // Inner table shown when a MaterialRequirements row is expanded.
// // Columns: ID | Project | Material | Quantity | Contractor Name | Status | Actions
// // Actions: Pending → Approve + Reject buttons | Approved/Rejected → View button
// // components/materialRequirementsUI/QuotationsSubTable.jsx
// // Inner table shown when a MaterialRequirements row is expanded.
// // Columns: ID | Project | Material | Quantity | Contractor Name | Status | Actions
// // Actions: Pending → Approve + Reject buttons | Approved / Rejected → View button only
// // components/materialRequirementsUI/QuotationsSubTable.jsx

// import { useEffect, useState } from "react";
// import { getMaterialRequirementDetails } from "../../services/apis/getMaterialRequirementDetails";

// export default function QuotationsSubTable({ requirementId }) {
//   const [materials, setMaterials] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (requirementId) {
//       fetchMaterialDetails();
//     }
//   }, [requirementId]);

//   async function fetchMaterialDetails() {
//     try {
//       setLoading(true);

//       const response = await getMaterialRequirementDetails(requirementId);

//       setMaterials(response);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const thClass =
//     "px-4 py-3 text-left text-[10px] font-bold tracking-[1.5px] uppercase text-white bg-[#F97316] whitespace-nowrap";
//   const tdClass =
//     "px-4 py-3 text-[12.5px] text-[#4B5563] border-b border-[#EEF2F6] whitespace-normal break-words leading-5 align-top";

//   return (
//     <div className="bg-[#F4ECE6] px-4 py-4 border-t border-[#E5DDD6] overflow-x-auto">
//       <div className="rounded-2xl overflow-hidden border border-[#E6D8CD] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
//         <table className="w-full min-w-[700px] border-collapse table-fixed">
//           <thead>
//             <tr>
//               <th className={`${thClass} w-[200px]`}>Material Detail ID</th>

//               <th className={`${thClass} w-[180px]`}>Material Name</th>

//               <th className={`${thClass} w-[120px]`}>Quantity</th>

//               <th className={`${thClass} w-[100px]`}>Units</th>

//               <th className={`${thClass} w-[140px]`}>Brand</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={5} className="text-center py-8 text-[#515F74]">
//                   Loading material details...
//                 </td>
//               </tr>
//             ) : materials?.length > 0 ? (
//               materials.map((item) => (
//                 <tr
//                   key={item.materialDetailId}
//                   className="hover:bg-[#FAFBFC] transition-colors"
//                 >
//                   <td className={tdClass}>#{item?.materialDetailId || "-"}</td>

//                   <td className={`${tdClass} font-semibold text-[#191C1E]`}>
//                     {item?.materialName || "-"}
//                   </td>

//                   <td className={tdClass}>{item?.quantity || "-"}</td>

//                   <td className={tdClass}>{item?.units || "-"}</td>

//                   <td className={tdClass}>{item?.brand || "-"}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center py-8 text-[#515F74]">
//                   No material details found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // components/materialRequirementsUI/QuotationsSubTable.jsx
// // Inner table shown when a MaterialRequirements row is expanded.
// // Columns: ID | Project | Material | Quantity | Contractor Name | Status | Actions
// // Actions: Pending → Approve + Reject buttons | Approved/Rejected → View button
// // components/materialRequirementsUI/QuotationsSubTable.jsx
// // Inner table shown when a MaterialRequirements row is expanded.
// // Columns: ID | Project | Material | Quantity | Contractor Name | Status | Actions
// // Actions: Pending → Approve + Reject buttons | Approved / Rejected → View button only

// import StatusBadge from "./StatusBadge";

// export default function QuotationsSubTable({ quotations, onApprove, onReject, onView }) {
//   // Empty state
//   if (!quotations || quotations.length === 0) {
//     return (
//       <div className="bg-[#F9EDE5] p-6 text-center text-sm text-[#515F74]">
//         No quotations available.
//       </div>
//     );
//   }

//   return (
//     // Peach outer wrapper
//     <div className="bg-[#F9EDE5] p-5">

//       {/* Inner card with rounded top corners and border */}
//       <div className="rounded-t-[10px] overflow-hidden border border-[#DDC1AE]">
//         <table className="w-full border-collapse">

//           {/* Orange header row */}
//           <thead>
//             <tr className="bg-[#F17209]">
//               <th className="px-4 py-[15px] text-left text-[10.5px] font-bold tracking-wide uppercase text-white whitespace-nowrap">ID</th>
//               <th className="px-4 py-[15px] text-left text-[10.5px] font-bold tracking-wide uppercase text-white whitespace-nowrap">Project</th>
//               <th className="px-4 py-[15px] text-left text-[10.5px] font-bold tracking-wide uppercase text-white whitespace-nowrap">Material</th>
//               <th className="px-4 py-[15px] text-left text-[10.5px] font-bold tracking-wide uppercase text-white whitespace-nowrap">Quantity</th>
//               <th className="px-4 py-[15px] text-left text-[10.5px] font-bold tracking-wide uppercase text-white whitespace-nowrap">Contractor Name</th>
//               <th className="px-4 py-[15px] text-left text-[10.5px] font-bold tracking-wide uppercase text-white whitespace-nowrap">Status</th>
//               <th className="px-4 py-[15px] text-right text-[10.5px] font-bold tracking-wide uppercase text-white whitespace-nowrap">Actions</th>
//             </tr>
//           </thead>

//           {/* Data rows */}
//           <tbody>
//             {quotations.map((q, index) => (
//               <tr key={index} className="bg-white border-t border-[#DDC1AE]">

//                 {/* Quote ID — brown-orange */}
//                 <td className="px-4 py-[18px] text-[11.5px] text-[#914C00]">
//                   {q.quoteId}
//                 </td>

//                 <td className="px-4 py-[18px] text-[11.5px] text-[#191C1D]">
//                   {q.project}
//                 </td>

//                 <td className="px-4 py-[18px] text-[11.5px] text-[#191C1D]">
//                   {q.material}
//                 </td>

//                 <td className="px-4 py-[18px] text-[11.5px] text-[#191C1D]">
//                   {q.quantity}
//                 </td>

//                 <td className="px-4 py-[18px] text-[11.5px] text-[#191C1D]">
//                   {q.contractorName}
//                 </td>

//                 <td className="px-4 py-[18px]">
//                   <StatusBadge status={q.status} />
//                 </td>

//                 {/* Actions — differ by status */}
//                 <td className="px-4 py-[18px] text-right">
//                   {q.status === "Pending" ? (
//                     // Pending → Approve (filled orange) + Reject (outlined)
//                     <div className="flex items-center justify-end gap-2">
//                       <button
//                         className="bg-[#FA7C14] text-white border-none rounded-lg px-4 py-[7px] text-[11.5px] font-semibold whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity"
//                         onClick={() => onApprove && onApprove(q)}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         className="bg-white text-[#564334] border border-[#8A7362] rounded-lg px-4 py-[7px] text-[11.5px] whitespace-nowrap cursor-pointer hover:bg-[#f5ede6] transition-colors"
//                         onClick={() => onReject && onReject(q)}
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   ) : (
//                     // Approved or Rejected → View only
//                     <button
//                       className="bg-white text-[#564334] border border-[#8A7362] rounded-lg px-4 py-[7px] text-[11.5px] whitespace-nowrap cursor-pointer hover:bg-[#f5ede6] transition-colors"
//                       onClick={() => onView && onView(q)}
//                     >
//                       View
//                     </button>
//                   )}
//                 </td>

//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// }
