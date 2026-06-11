import { useState } from "react";
import { X } from "lucide-react";

import { toggleLabourState }
    from "../../../services/apis/toggleLabourState";

export default function ToggleLabourStateModal({
    isOpen,
    onClose,
    labour,
    refetchLabours,
}) {
    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    if (
        !isOpen ||
        !labour
    ) {
        return null;
    }

    const willActivate =
        !labour?.isActive;

    async function handleUpdate() {
        try {
            setLoading(true);
            setError("");

            const payload = {
                mobileNumber:
                    labour?.mobileNumber,
                isActive:
                    willActivate,
            };

            const response =
                await toggleLabourState(
                    payload
                );

            if (
                response?.code ===
                0
            ) {
                onClose();

                await refetchLabours();
            } else {
                setError(
                    response?.message ||
                    `Failed to ${willActivate
                        ? "activate"
                        : "blacklist"
                    } labour`
                );
            }
        } catch (error) {
            console.log(error);

            setError(
                error?.response
                    ?.data
                    ?.message ||
                error?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    function handleClose() {
        setError("");
        onClose();
    }

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-[24px] w-full max-w-[520px] p-6 relative shadow-xl animate-in fade-in zoom-in duration-200">
                {/* Close */}
                <button
                    onClick={
                        handleClose
                    }
                    className="absolute top-5 right-5 text-[#667085] hover:text-black transition cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Heading */}
                <h2 className="text-[28px] font-black text-[#191C1E] leading-[34px] tracking-[-0.7px] mb-3">
                    {willActivate
                        ? "Activate Labour"
                        : "Blacklist Labour"}
                </h2>

                {/* Warning text */}
                <p className="text-[15px] text-[#515F74] leading-7">
                    Are you sure you
                    want to{" "}
                    <span className="font-bold text-[#191C1E]">
                        {willActivate
                            ? "activate"
                            : "blacklist"}
                    </span>{" "}
                    this labour?
                </p>

                <div className="mt-3 bg-[#F8F9FB] border border-[#E7EBF0] rounded-xl p-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-[13px] text-[#667085]">
                            Name
                        </span>

                        <span className="text-[15px] font-semibold text-[#191C1E]">
                            {labour?.name ||
                                "-"}
                        </span>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                        <span className="text-[13px] text-[#667085]">
                            Mobile Number
                        </span>

                        <span className="text-[15px] font-semibold text-[#191C1E]">
                            {labour?.mobileNumber ||
                                "-"}
                        </span>
                    </div>
                </div>

                {/* Action button */}
                <div className="mt-6 flex flex-col items-center">
                    <button
                        onClick={
                            handleUpdate
                        }
                        disabled={
                            loading
                        }
                        className={`min-w-[180px] h-[48px] rounded-xl font-semibold text-white text-[14px] transition flex items-center justify-center cursor-pointer disabled:opacity-70 ${willActivate
                            ? "bg-[#F17209]"
                            : "bg-black"
                            }`}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-[2.5px] border-white border-t-transparent rounded-full animate-spin" />
                        ) : willActivate ? (
                            "Activate"
                        ) : (
                            "Blacklist"
                        )}
                    </button>

                    {/* Error */}
                    {error && (
                        <p className="mt-4 text-red-500 text-sm text-center font-medium">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}