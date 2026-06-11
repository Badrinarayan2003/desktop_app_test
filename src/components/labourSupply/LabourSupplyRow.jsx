import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "react-hot-toast";

import LabourSupplyDetailTable from "./LabourSupplyDetailTable";
import { approveLabourSupply } from "../../services/apis/approveLabourSupply";


function ChevronIcon({ isOpen }) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FA7C14"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${isOpen
                ? "rotate-180"
                : "rotate-0"
                }`}
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

export default function LabourSupplyRow({
    row,
    isOpen,
    onToggle,
    fetchLabourSupply
}) {

    const [approveLoading, setApproveLoading] =
        useState(false);
    const handleApprove = async (e) => {

        e.stopPropagation();

        try {

            setApproveLoading(true);

            const res =
                await approveLabourSupply(
                    row.applicationId
                );

            if (res?.code === 0) {

                toast.success(
                    res?.message ||
                    "Labour supply approved successfully"
                );

                await fetchLabourSupply();

            } else {

                toast.error(
                    res?.message ||
                    "Failed to approve labour supply"
                );

            }

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong"
            );

        } finally {

            setApproveLoading(false);

        }
    };

    const tdClass =
        "px-4 py-[18px] text-[13px] border-b border-[#E8ECF0] whitespace-nowrap";

    return (
        <>
            <tr
                className="bg-white cursor-pointer hover:bg-orange-50"
                onClick={onToggle}
            >

                <td className={tdClass}>{row.applicationId}</td>
                <td className={tdClass}>{row.requirementId}</td>
                <td className={tdClass}>{row.labourId}</td>
                <td className={tdClass}>{row.labourName}</td>
                <td className={tdClass}>{row.projectName}</td>
                <td className={tdClass}>{row.urgency}</td>
                <td className={tdClass}>{row.projectLocation}</td>
                <td className={tdClass}>{row.applicationDate}</td>
                <td className={tdClass}>{row.status}</td>

                <td className={tdClass}>
                    {row.approvalStatus
                        ? "Approved"
                        : "Pending"}
                </td>

                <td className={`${tdClass} text-center`}>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle();
                        }}
                    >
                        <ChevronIcon
                            isOpen={isOpen}
                        />
                    </button>

                </td>

                <td className={`${tdClass} text-center`}>

                    {!row.approvalStatus ? (

                        <button
                            onClick={handleApprove}
                            disabled={approveLoading}
                            className="bg-orange-500 text-white px-3 py-1 rounded min-w-[90px] hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                        >

                            {approveLoading ? (
                                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                "Approve"
                            )}

                        </button>

                    ) : (

                        <Check
                            size={20}
                            className="text-green-600 mx-auto"
                        />

                    )}

                </td>
            </tr>

            {isOpen && (
                <tr>
                    <td
                        colSpan={12}
                        className="p-0"
                    >
                        <LabourSupplyDetailTable
                            applicationId={
                                row.applicationId
                            }
                        />
                    </td>
                </tr>
            )}
        </>
    );
}