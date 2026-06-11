import { useState } from "react";
import toast from "react-hot-toast";

import { approveLabourRequirement }
    from "../../services/apis/approveLabourRequirement";


import { Check } from "lucide-react";
import LabourRequirementDetailsTable from "./LabourRequirementDetailsTable";

export default function LabourRequirementRow({
    row,
    isOpen,
    onToggle,
    refetchRequirements,
}) {


    const [approving, setApproving] =
        useState(false);

    const tdClass =
        "px-4 py-3 text-[13px] border-b border-[#EEF2F6] align-middle";

    function getStatusClass(
        status
    ) {
        if (
            status === "ACTIVE" ||
            status === "OPEN" ||
            status === "NEW"
        ) {
            return "bg-[#C9EDE4] text-[#006C49]";
        }

        return "bg-[#F9EDE5] text-[#FA7C14] border border-[#FFC28B]";
    }

    function getUrgencyClass(
        urgency
    ) {
        switch (urgency) {
            case "HIGH":
                return "bg-[#FFE4E4] text-[#D92D20]";

            case "NORMAL":
                return "bg-[#EEF4FF] text-[#155EEF]";

            case "LOW":
                return "bg-[#ECFDF3] text-[#027A48]";

            default:
                return "bg-[#F2F4F7] text-[#667085]";
        }
    }


    async function handleApprove() {
        try {
            setApproving(true);

            const payload = {
                projectId:
                    row?.projectId,
                requirementId:
                    row?.requirementId,
                status:
                    "APPROVED",
            };

            const response =
                await approveLabourRequirement(
                    payload
                );

            if (
                response?.code ===
                0
            ) {
                toast.success(
                    response?.message ||
                    "Requirement approved successfully"
                );

                await refetchRequirements();
            } else {
                toast.error(
                    response?.message ||
                    "Failed to approve requirement"
                );
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error?.response
                    ?.data
                    ?.message ||
                error?.message ||
                "Something went wrong"
            );
        } finally {
            setApproving(false);
        }
    }



    return (
        <>
            {/* Main Row */}
            <tr
                className="bg-white cursor-pointer hover:bg-[#FAFBFC] transition-colors"
                onClick={onToggle}
            >
                {/* Requirement ID */}
                <td
                    className={`${tdClass} text-[#515F74] break-words`}
                >
                    
                    {row?.requirementId ||
                        "-"}
                </td>

                {/* Project ID */}
                <td
                    className={`${tdClass} text-[#515F74] break-words`}
                >
                    {row?.projectId || "-"}
                </td>

                {/* Project Name */}
                <td
                    className={`${tdClass} text-[#191C1E] font-semibold whitespace-normal break-words leading-5`}
                >
                    {row?.projectName ||
                        "-"}
                </td>

                {/* Work Title */}
                <td
                    className={`${tdClass} text-[#515F74] whitespace-normal break-words leading-5`}
                >
                    {row?.workTitle || "-"}
                </td>

                {/* Work Description */}
                <td
                    className={`${tdClass} text-[#515F74] whitespace-normal break-words leading-5`}
                >
                    {row?.workDescription ||
                        "-"}
                </td>

                {/* Location */}
                <td
                    className={`${tdClass} text-[#515F74] whitespace-normal break-words leading-5`}
                >
                    {row?.location || "-"}
                </td>

                {/* Urgency */}
                <td className={tdClass}>
                    <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase whitespace-nowrap ${getUrgencyClass(
                            row?.urgency
                        )}`}
                    >
                        {row?.urgency || "-"}
                    </span>
                </td>

                {/* Status */}
                <td className={tdClass}>
                    <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase whitespace-nowrap ${getStatusClass(
                            row?.status
                        )}`}
                    >
                        {row?.status || "-"}
                    </span>
                </td>

                {/* Action */}
                <td
                    className={`${tdClass} text-right`}
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                >
                    {row?.isApproved ? (
                        <span className="inline-flex items-center cursor-pointer justify-center px-4 py-[7px] rounded-lg text-[11.5px] font-semibold bg-[#C9EDE4] text-[#006C49]">
                            <Check className="w-5 h-5" />
                        </span>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleApprove();
                            }}
                            disabled={
                                approving
                            }
                            className="bg-[#F17209] disabled:opacity-70 text-white cursor-pointer border-none rounded-lg px-4 py-[7px] text-[11.5px] font-semibold whitespace-nowrap hover:opacity-90 transition-opacity min-w-[95px] flex items-center justify-center"
                        >
                            {approving ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                "Approve"
                            )}
                        </button>
                    )}
                </td>
            </tr>

            {/* Expanded Row */}
            {isOpen && (
                <tr>
                    <td
                        colSpan={9}
                        className="p-0"
                    >
                        <LabourRequirementDetailsTable
                            requirementId={
                                row?.requirementId
                            }
                        />
                    </td>
                </tr>
            )}
        </>
    );
}