import {
    useEffect,
    useState,
} from "react";

import { getLabourRequirementDetail }
    from "../../services/apis/getLabourRequirementDetail";

export default function LabourRequirementDetailsTable({
    requirementId,
}) {
    const [rows, setRows] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        if (requirementId) {
            fetchRequirementDetails();
        }
    }, [requirementId]);

    async function fetchRequirementDetails() {
        try {
            setLoading(true);
            setError("");

            const response =
                await getLabourRequirementDetail(
                    requirementId
                );

            if (
                response?.code === 0
            ) {
                const labourDetails =
                    response?.data
                        ?.labourRequirementDetails ||
                    [];

                if (
                    labourDetails.length > 0
                ) {
                    setRows(
                        labourDetails
                    );
                } else {
                    setRows([]);
                }
            } else {
                setRows([]);

                setError(
                    response?.message ||
                    "Failed to fetch labour requirement details"
                );
            }
        } catch (error) {
            console.log(error);

            setRows([]);

            setError(
                error?.response?.data
                    ?.message ||
                error?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    const thClass =
        "px-4 py-3 text-left text-[10px] font-bold tracking-[1.5px] uppercase text-[#5B6472] bg-[#F8FAFC] whitespace-nowrap border-b border-[#E7EBF0]";

    const tdClass =
        "px-4 py-4 text-[13px] border-b border-[#EEF2F6] text-[#515F74]";

    return (
        <div className="bg-[#F4ECE6] border-y border-[#EEF2F6] px-4 py-4">
            <div className="overflow-x-auto w-full rounded-xl border border-[#EEF2F6] bg-white">
                <table className="w-full min-w-[1100px] border-collapse">
                    <thead>
                        <tr>
                            <th
                                className={`${thClass} w-[280px] bg-[#F97316] text-white`}
                            >
                                Requirement Detail ID
                            </th>

                            {/* <th
                                className={`${thClass} w-[220px] bg-[#F97316] text-white`}
                            >
                                Requirement ID
                            </th> */}

                            <th
                                className={`${thClass} w-[250px] bg-[#F97316] text-white`}
                            >
                                Work Type
                            </th>

                            <th
                                className={`${thClass} w-[180px] bg-[#F97316] text-white`}
                            >
                                No Of Worker
                            </th>

                            <th
                                className={`${thClass} w-[180px] bg-[#F97316] text-white`}
                            >
                                Duration
                            </th>

                            <th
                                className={`${thClass} w-[220px] bg-[#F97316] text-white`}
                            >
                                Estimate Daily Rate
                            </th>

                            <th
                                className={`${thClass} w-[180px] bg-[#F97316] text-white`}
                            >
                                Start Date
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Loading */}
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="py-16"
                                >
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <div className="w-10 h-10 border-4 border-[#FA7C14] border-t-transparent rounded-full animate-spin" />

                                        <p className="text-sm text-[#515F74]">
                                            Loading labour
                                            requirement
                                            details...
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : error ? (
                            /* Error */
                            <tr>
                                <td
                                    colSpan={7}
                                    className="py-16"
                                >
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <p className="text-red-500 text-sm font-medium text-center">
                                            {error}
                                        </p>

                                        <button
                                            onClick={
                                                fetchRequirementDetails
                                            }
                                            className="bg-[#FA7C14] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ) : rows?.length >
                            0 ? (
                            rows.map(
                                (
                                    row,
                                    index
                                ) => (
                                    <tr
                                        key={
                                            row?.requirementDetailId ||
                                            index
                                        }
                                        className="hover:bg-[#FAFBFC] transition-colors"
                                    >
                                        {/* Requirement Detail ID */}
                                        <td
                                            className={`${tdClass} break-all`}
                                        >

                                            {row?.requirementDetailId ||
                                                "-"}
                                        </td>

                                        {/* Requirement ID */}
                                        {/* <td
                                            className={`${tdClass} break-all`}
                                        >
                                            #
                                            {row?.requirementId ||
                                                "-"}
                                        </td> */}

                                        {/* Work Type */}
                                        <td
                                            className={`${tdClass}`}
                                        >
                                            {row?.workType ||
                                                "-"}
                                        </td>

                                        {/* Worker */}
                                        <td
                                            className={`${tdClass}`}
                                        >
                                            {row?.noOfWorker ??
                                                "-"}
                                        </td>

                                        {/* Duration */}
                                        <td
                                            className={`${tdClass}`}
                                        >
                                            {row?.duration ??
                                                "-"}
                                        </td>

                                        {/* Rate */}
                                        <td
                                            className={`${tdClass}`}
                                        >
                                            ₹
                                            {row?.estimateDailyRate ??
                                                "-"}
                                        </td>

                                        {/* Start Date */}
                                        <td
                                            className={`${tdClass}`}
                                        >
                                            {row?.startDate
                                                ? row.startDate
                                                : "-"}
                                        </td>
                                    </tr>
                                )
                            )
                        ) : (
                            /* Empty */
                            <tr>
                                <td
                                    colSpan={7}
                                    className="text-center py-16 text-[#515F74]"
                                >
                                    Labour
                                    Requirement
                                    details not
                                    found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}