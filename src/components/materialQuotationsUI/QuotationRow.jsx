import { useState } from "react";
import QuotationsDetailTable from "./QuotationsDetailTable";
import { Bubbles, Check } from "lucide-react";

import { toast } from "react-hot-toast";

import { approveQuotation } from "../../services/apis/approveQuotation";

// Chevron icon — rotates 180° when open
function ChevronIcon({ isOpen }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FA7C14"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
        }`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function QuotationRow({
  row,
  isOpen,
  onToggle,
  fetchQuotations
}) {



  const [approveLoading, setApproveLoading] =
    useState(false);

  const handleApprove = async (e) => {

    e.stopPropagation();

    try {

      setApproveLoading(true);

      const res =
        await approveQuotation(
          row.quotationId
        );

      if (res?.code === 0) {

        toast.success(
          res?.message ||
          "Quotation approved successfully"
        );

        await fetchQuotations();

      } else {

        toast.error(
          res?.message ||
          "Failed to approve quotation"
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
      {/* Main Row */}
      <tr
        className="bg-white cursor-pointer hover:bg-orange-50 transition-colors"
        onClick={onToggle}
      >

        <td className={`${tdClass} text-[#515F74]`}>
          {row.quotationId}
        </td>

        <td className={`${tdClass} text-[#515F74]`}>
          {row.sellerId}
        </td>

        <td className={`${tdClass} text-[#191C1D]`}>
          {row.sellerName}
        </td>

        <td className={`${tdClass} text-[#191C1D]`}>
          {row.projectName}
        </td>

        <td className={`${tdClass} text-[#191C1D]`}>
          {row.status}
        </td>

        <td className={`${tdClass} text-[#191C1D]`}>
          {row.deliveryType}
        </td>

        <td className={`${tdClass} text-[#191C1D]`}>
          {row.minDays}
        </td>

        <td className={`${tdClass} text-[#191C1D]`}>
          {row.maxDays}
        </td>

        <td className={`${tdClass} text-[#191C1D]`}>
          {row.isDeliveryCharge ? "Yes" : "No"}
        </td>

        <td className={`${tdClass} text-[#FA7C14] font-medium`}>
          {row.quotationStatus}
        </td>

        <td className={`${tdClass} text-[#191C1D]`}>
          {row.urgency}
        </td>

        {/* Expand Button */}
        <td className={`${tdClass} text-center`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="bg-transparent border-none cursor-pointer p-1 rounded hover:bg-orange-50 transition-colors"
            aria-label="Toggle quotations"
          >
            <ChevronIcon isOpen={isOpen} />
          </button>
        </td>

        <td className={`${tdClass} text-center`}>
          {row.quotationStatus === "PENDING" ? (

            <button
              onClick={handleApprove}
              disabled={approveLoading}
              className="bg-orange-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-w-[90px] flex items-center justify-center"
            >

              {approveLoading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Update"
              )}

            </button>
          ) : (

            <div className="flex justify-center">
              <Check
                size={20}
                className="text-green-600"
                strokeWidth={3}
              />
            </div>

          )}
        </td>


      </tr>

      {/* Expanded Detail Table */}
      {isOpen && (
        <tr>
          <td colSpan={13} className="p-0">
            <QuotationsDetailTable
              quotationId={row.quotationId}
            />
          </td>
        </tr>
      )}
    </>
  );
}