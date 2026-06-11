import { useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";

import { getAllLabourSupply } from "../../../../services/apis/getAllLabourSupply";
import LabourSupplyRow from "../../../../components/labourSupply/LabourSupplyRow";

export default function LabourSupply() {

  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [expandedApplicationId, setExpandedApplicationId] =
    useState(null);

  const fetchLabourSupply = async () => {

    try {

      setLoading(true);
      setError("");

      const res =
        await getAllLabourSupply();

      if (res?.code === 0) {

        if (
          res?.data?.details?.length > 0
        ) {

          setSupplies(
            res.data.details
          );

        } else {

          setSupplies([]);

        }

      } else {

        setError(
          res?.message ||
          "Something went wrong"
        );

      }

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch labour supply"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchLabourSupply();
  }, []);

  const filteredRows = useMemo(() => {

    const value =
      search.toLowerCase();

    return supplies.filter(item =>
      item.applicationId?.toLowerCase().includes(value) ||
      item.labourId?.toLowerCase().includes(value) ||
      item.labourName?.toLowerCase().includes(value) ||
      item.projectName?.toLowerCase().includes(value)
    );

  }, [supplies, search]);

  const thClass =
    "px-6 py-[14px] text-left text-[10px] font-bold tracking-widest uppercase text-[#515F74] bg-[#F5F7F9] whitespace-nowrap";

  return (
    <div className="min-h-screen bg-white">
      <nav className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-bold tracking-widest uppercase text-[#515F74]">
          Supply Management
        </span>
        {/* Arrow separator */}
        <svg width="4" height="7" viewBox="0 0 4 7" fill="none">
          <path d="M1 1L3 3.5L1 6" stroke="#515F74" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] font-bold tracking-widest uppercase text-[#FA7C14]">
          Worker Supply
        </span>
      </nav>
      <div className="flex items-center justify-between mb-8">

        <h1 className="text-[30px] font-black text-[#191C1E]">
          Worker Supply
        </h1>

        <div className="relative w-[350px]">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search Application Id, Labour Id, Labour Name, Project Name"
            className="w-full pl-10 pr-4 py-2 border border-[#ddd] rounded-lg outline-none"
          />

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr>

              <th className={thClass}>Application Id</th>
              <th className={thClass}>Requirement Id</th>
              <th className={thClass}>Labour Id</th>
              <th className={thClass}>Labour Name</th>
              <th className={thClass}>Project Name</th>
              <th className={thClass}>Urgency</th>
              <th className={thClass}>Project Location</th>
              <th className={thClass}>Application Date</th>
              <th className={thClass}>Status</th>
              <th className={thClass}>Approval Status</th>
              <th className={thClass}>Actions</th>
              <th className={thClass}>Update</th>

            </tr>

          </thead>

          <tbody>

            {loading && (
              <tr>
                <td colSpan={12}>
                  <div className="py-12 flex justify-center">
                    <div className="h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                </td>
              </tr>
            )}

            {!loading &&
              error && (
                <tr>
                  <td
                    colSpan={12}
                    className="text-center py-10"
                  >
                    <p className="text-red-500 mb-3">
                      {error}
                    </p>

                    <button
                      onClick={
                        fetchLabourSupply
                      }
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
                    className="text-center py-10"
                  >
                    Labour supply not found
                  </td>
                </tr>
              )}

            {!loading &&
              !error &&
              filteredRows.map(row => (
                <LabourSupplyRow
                  key={row.applicationId}
                  row={row}
                  isOpen={
                    expandedApplicationId ===
                    row.applicationId
                  }
                  onToggle={() =>
                    setExpandedApplicationId(
                      expandedApplicationId === row.applicationId
                        ? null
                        : row.applicationId
                    )
                  }
                  fetchLabourSupply={fetchLabourSupply}
                />
              ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}