import { useEffect, useState } from "react";

import { getLabourSupplyApplicationDetail }
    from "../../services/apis/getLabourSupplyApplicationDetail";

export default function LabourSupplyDetailTable({
    applicationId,
}) {

    const [details, setDetails] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const fetchDetails = async () => {

        try {

            setLoading(true);
            setError("");

            const res =
                await getLabourSupplyApplicationDetail(
                    applicationId
                );

            if (res?.code === 0) {

                if (
                    res?.data?.details?.length > 0
                ) {

                    setDetails(
                        res.data.details
                    );

                } else {

                    setDetails([]);

                }

            } else {

                setError(
                    res?.message ||
                    "Failed"
                );

            }

        } catch (err) {

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Failed to fetch details"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchDetails();
    }, [applicationId]);

    if (loading) {
        return (
            <div className="bg-[#F9EDE5] p-8 flex justify-center">
                <div className="h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#F9EDE5] p-8 text-center">

                <p className="text-red-500 mb-3">
                    {error}
                </p>

                <button
                    onClick={fetchDetails}
                    className="px-4 py-2 bg-orange-500 text-white rounded"
                >
                    Retry
                </button>

            </div>
        );
    }

    if (details.length === 0) {
        return (
            <div className="bg-[#F9EDE5] p-8 text-center">
                Labour details not found
            </div>
        );
    }

    const thClass =
        "px-4 py-3 text-left text-[10px] font-bold tracking-[1.5px] uppercase text-white bg-[#F97316]";

    const tdClass =
        "px-4 py-3 text-[12.5px] border-b border-[#ddd]";

    return (
        <div className="bg-[#F9EDE5] p-5">

            <table className="w-full border-collapse overflow-hidden border border-[#ddd] rounded-[10px]">

                <thead>

                    <tr>

                        <th className={thClass}>
                            Labour Requirement Detail Id
                        </th>

                        <th className={thClass}>
                            Required Type
                        </th>

                        <th className={thClass}>
                            Required Daily Rate
                        </th>

                        <th className={thClass}>
                            Application Detail Id
                        </th>

                        <th className={thClass}>
                            Applied Skills
                        </th>

                        <th className={thClass}>
                            Applied Daily Rate
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {details.map(item => (

                        <tr
                            key={
                                item.applicationDetailId
                            }
                            className="bg-white"
                        >

                            <td className={tdClass}>
                                {item.labourRequirementDetailId}
                            </td>

                            <td className={tdClass}>
                                {item.requiredType}
                            </td>

                            <td className={tdClass}>
                                {item.requiredDailyRate}
                            </td>

                            <td className={tdClass}>
                                {item.applicationDetailId}
                            </td>

                            <td className={tdClass}>
                                {item.appliedSkills}
                            </td>

                            <td className={tdClass}>
                                {item.appliedDailyRate}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}