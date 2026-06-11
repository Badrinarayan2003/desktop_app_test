import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import LabourRequirementRow from "../../../../components/labourRequirement/LabourRequirementRow";
import { getLabourRequirements } from "../../../../services/apis/getLabourRequirements";

export default function LabourRequirements() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");
  const [openRowId, setOpenRowId] =
    useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRequirements();
  }, []);

  async function fetchRequirements() {
    try {
      setLoading(true);
      setError("");

      const response =
        await getLabourRequirements();

      if (response?.code === 0) {
        const labourRequirements =
          response?.data
            ?.labourRequirements || [];

        if (
          labourRequirements.length > 0
        ) {
          setRows(
            labourRequirements
          );
        } else {
          setRows([]);
        }
      } else {
        setRows([]);

        setError(
          response?.message ||
          "Failed to fetch labour requirements"
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

  const filteredRows = rows.filter((row) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      row?.requirementId
        ?.toString()
        ?.toLowerCase()
        ?.includes(search) ||

      row?.projectName
        ?.toLowerCase()
        ?.includes(search) ||

      row?.projectId
        ?.toString()
        ?.toLowerCase()
        ?.includes(search)
    );
  });


  const thClass =
    "px-4 py-3 text-left text-[10px] font-bold tracking-[1.5px] uppercase text-[#5B6472] bg-[#F4F6F8] whitespace-nowrap border-b border-[#E7EBF0]";

  return (
    <div className="min-h-screen bg-white">
      <>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#515F74]">
            Demand Management
          </span>

          <svg
            width="4"
            height="7"
            viewBox="0 0 4 7"
            fill="none"
          >
            <path
              d="M1 1L3 3.5L1 6"
              stroke="#515F74"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="text-[10px] font-bold tracking-widest uppercase text-[#FA7C14]">
            Labour Requirements
          </span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <h1 className="text-[30px] font-black text-[#191C1E] leading-[36px] tracking-[-0.75px]">
            Labour Requirements
          </h1>

          <div className="w-full md:w-[350px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search Requirement ID, Project Name, Project ID"
              className="
        w-full
        h-11
        px-4
        rounded-xl
        border
        border-[#E3E8EC]
        outline-none
        text-sm
        focus:border-[#FA7C14]
      "
            />
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[1600px] border-collapse table-fixed">
            <thead>
              <tr>
                <th
                  className={`${thClass} w-[250px]`}
                >
                  Requirement ID
                </th>

                <th
                  className={`${thClass} w-[180px]`}
                >
                  Project ID
                </th>

                <th
                  className={`${thClass} w-[220px]`}
                >
                  Project Name
                </th>

                <th
                  className={`${thClass} w-[180px]`}
                >
                  Work Title
                </th>

                <th
                  className={`${thClass} w-[280px]`}
                >
                  Work Description
                </th>

                <th
                  className={`${thClass} w-[320px]`}
                >
                  Location
                </th>

                <th
                  className={`${thClass} w-[120px]`}
                >
                  Urgency
                </th>

                <th
                  className={`${thClass} w-[120px]`}
                >
                  Status
                </th>

                <th
                  className={`${thClass} text-center w-[140px]`}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Loading */}
              {loading ? (
                <tr>
                  <td
                    colSpan={9}
                    className="py-16"
                  >
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="w-10 h-10 border-4 border-[#FA7C14] border-t-transparent rounded-full animate-spin" />

                      <p className="text-[#515F74] text-sm">
                        Loading labour
                        requirements...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                /* Error State */
                <tr>
                  <td
                    colSpan={9}
                    className="py-16"
                  >
                    <div className="flex flex-col items-center justify-center gap-4">
                      <p className="text-red-500 text-sm font-medium text-center">
                        {error}
                      </p>

                      <button
                        onClick={
                          fetchRequirements
                        }
                        className="bg-[#FA7C14] hover:opacity-90 text-white px-5 py-2 rounded-lg text-sm font-semibold transition"
                      >
                        Retry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : filteredRows?.length > 0 ? (
                /* Data */
                filteredRows.map((row) => (
                  <LabourRequirementRow
                    key={
                      row.requirementId
                    }
                    row={row}
                    refetchRequirements={
                      fetchRequirements
                    }
                    isOpen={
                      openRowId ===
                      row.requirementId
                    }
                    onToggle={() =>
                      setOpenRowId(
                        (prev) =>
                          prev ===
                            row.requirementId
                            ? null
                            : row.requirementId
                      )
                    }
                  />
                ))
              ) : (
                /* Empty */
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-16 text-[#515F74]"
                  >
                    {searchTerm
                      ? "No matching records found"
                      : "Labour Requirements not found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
}