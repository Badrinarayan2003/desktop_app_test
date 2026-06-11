import { useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";

import { getAllQuotations } from "../../../../services/apis/getAllQuotations";
import QuotationRow from "../../../../components/materialQuotationsUI/QuotationRow";

export default function MaterialQuotations() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [expandedQuotationId, setExpandedQuotationId] = useState(null);

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getAllQuotations();

      if (res?.code === 0) {

        if (res?.data?.details?.length > 0) {
          setQuotations(res.data.details);
        } else {
          setQuotations([]);
        }

      } else {
        setError(res?.message || "Something went wrong");
      }

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch quotations"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const filteredRows = useMemo(() => {
    const value = search.toLowerCase();

    return quotations.filter(item =>
      item.quotationId?.toLowerCase().includes(value) ||
      item.sellerName?.toLowerCase().includes(value) ||
      item.sellerId?.toLowerCase().includes(value) ||
      item.projectName?.toLowerCase().includes(value)
    );
  }, [quotations, search]);

  const thClass =
    "px-6 py-[14px] text-left text-[10px] font-bold tracking-widest uppercase text-[#515F74] bg-[#F5F7F9] whitespace-nowrap";

  return (
    <div className="min-h-screen bg-white">
      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-bold tracking-widest uppercase text-[#515F74]">
          Supply Management
        </span>
        {/* Arrow separator */}
        <svg width="4" height="7" viewBox="0 0 4 7" fill="none">
          <path d="M1 1L3 3.5L1 6" stroke="#515F74" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] font-bold tracking-widest uppercase text-[#FA7C14]">
          Material Quotations
        </span>
      </nav>

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-[30px] font-black text-[#191C1E]">
          Material Quotations
        </h1>

        <div className="relative w-[350px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search quotationId, sellerName, sellerId, projectName"
            className="w-full pl-10 pr-4 py-2 border border-[#ddd] rounded-lg outline-none"
          />
        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>
            <tr>
              <th className={thClass}>Quotation Id</th>
              <th className={thClass}>Seller Id</th>
              <th className={thClass}>Seller Name</th>
              <th className={thClass}>Project Name</th>
              <th className={thClass}>Status</th>
              <th className={thClass}>Delivery Type</th>
              <th className={thClass}>Min Days</th>
              <th className={thClass}>Max Days</th>
              <th className={thClass}>Delivery Charge</th>
              <th className={thClass}>Quotation Status</th>
              <th className={thClass}>Urgency</th>
              <th className={`${thClass} text-right`}>
                Actions
              </th>
              <th className={`${thClass} text-right`}>
                Update
              </th>
            </tr>
          </thead>

          <tbody>

            {loading && (
              <tr>
                <td
                  colSpan={12}
                  className="py-12 text-center"
                >
                  <div className="flex justify-center">
                    <div className="h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                </td>
              </tr>
            )}

            {!loading && error && (
              <tr>
                <td
                  colSpan={12}
                  className="py-10 text-center"
                >
                  <p className="text-red-500 mb-3">
                    {error}
                  </p>

                  <button
                    onClick={fetchQuotations}
                    className="px-4 py-2 bg-orange-500 text-white rounded"
                  >
                    Retry
                  </button>
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              filteredRows.length === 0 && (
                <tr>
                  <td
                    colSpan={12}
                    className="py-10 text-center"
                  >
                    Quotation not found
                  </td>
                </tr>
              )}

            {!loading &&
              !error &&
              filteredRows.map((row) => (
                <QuotationRow
                  key={row.quotationId}
                  row={row}
                  isOpen={expandedQuotationId === row.quotationId}
                  onToggle={() =>
                    setExpandedQuotationId(
                      expandedQuotationId === row.quotationId
                        ? null
                        : row.quotationId
                    )
                  }
                  fetchQuotations={fetchQuotations}
                />
              ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}