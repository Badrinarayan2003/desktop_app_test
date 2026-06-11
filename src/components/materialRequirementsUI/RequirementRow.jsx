import UrgencyBadge from "./UrgencyBadge";
import QuotationsSubTable from "./QuotationsSubTable";
import { Check } from "lucide-react";

export default function RequirementRow({ row, isOpen, onToggle, onApprove }) {
  function handleView(quote) {
    console.log("View quote:", quote);
  }

  const tdClass =
    "px-4 py-3 text-[13px] border-b border-[#EEF2F6] align-center";

  const hasImage =
    row?.imageUrl && row?.imageUrl !== "" && row?.imageUrl !== null;

  return (
    <>
      {/* Main Row */}
      <tr
        className="bg-white cursor-pointer hover:bg-[#FAFBFC] transition-colors"
        onClick={onToggle}
      >
        {/* Requirement ID */}
        <td className={`${tdClass} text-[#515F74] break-words`}>
          {row?.requirementId || "-"}
        </td>

        {/* Project Name */}
        <td
          className={`${tdClass} text-[#191C1E] font-semibold whitespace-normal break-words leading-5`}
        >
          {row?.projectName || "-"}
        </td>

        {/* Contractor */}
        <td
          className={`${tdClass} text-[#515F74] whitespace-normal break-words leading-5`}
        >
          {row?.contractorName || "-"}
        </td>

        {/* Project Desc */}
        <td
          className={`${tdClass} text-[#515F74] whitespace-normal break-words leading-5`}
        >
          {row?.projectDesc || "-"}
        </td>

        {/* Location */}
        <td
          className={`${tdClass} text-[#515F74] whitespace-normal break-words leading-5`}
        >
          {row?.location || "-"}
        </td>

        {/* Urgency */}
        <td className={tdClass}>
          <UrgencyBadge urgency={row?.urgency} />
        </td>

        {/* Status */}
        <td className={tdClass}>
          <span
            className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase whitespace-nowrap ${row?.status === "ACTIVE" ||
              row?.status === "OPEN" ||
              row?.status === "NEW"
              ? "bg-[#C9EDE4] text-[#006C49]"
              : "bg-[#F9EDE5] text-[#FA7C14] border border-[#FFC28B]"
              }`}
          >
            {row?.status || "-"}
          </span>
        </td>

        {/* Image */}
        <td className={tdClass}>
          {hasImage ? (
            <img
              src={row?.imageUrl}
              alt="requirement"
              className="w-10 h-10 rounded-lg object-cover border border-[#E8ECF0]"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-[#F5F7F9] border border-[#E8ECF0] flex items-center justify-center text-[10px] text-[#515F74]">
              N/A
            </div>
          )}
        </td>

        {/* Action */}
        <td
          className={`${tdClass} text-right`}
          onClick={(e) => e.stopPropagation()}
        >
          {row?.isApproved ? (
            <span className="inline-flex items-center justify-center px-4 py-[7px] rounded-lg text-[11.5px] font-semibold bg-[#C9EDE4] text-[#006C49]">
              <Check className="w-5 h-5" />
            </span>
          ) : (
            <button
              className="bg-[#F17209] text-white border-none rounded-lg px-4 py-[7px] text-[11.5px] font-semibold whitespace-nowrap hover:opacity-90 transition-opacity"
              onClick={() => onApprove(row)}
            >
              Approve
            </button>
          )}
        </td>
      </tr>

      {/* Expanded Sub-table */}
      {isOpen && (
        <tr>
          <td colSpan={9} className="p-0">
            <QuotationsSubTable requirementId={row?.requirementId} />
          </td>
        </tr>
      )}
    </>
  );
}