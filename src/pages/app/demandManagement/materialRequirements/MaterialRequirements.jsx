import { useEffect, useState } from "react";
import { Search } from "lucide-react";


import RequirementRow from "../../../../components/materialRequirementsUI/RequirementRow";
import { getAllMaterialRequirements } from "../../../../services/apis/getAllMaterialRequirements";
import { approveMaterialRequirement } from "../../../../services/apis/approveMaterialRequirement";

export default function MaterialRequirements() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openRowId, setOpenRowId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRequirements();
  }, []);

  async function fetchRequirements() {
    try {
      setLoading(true);

      const data = await getAllMaterialRequirements();

      setRows(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(row) {
    try {
      const payload = {
        materialReqId: row?.requirementId,
        projectId: row?.projectId,
        status: "APPROVED",
      };

      await approveMaterialRequirement(payload);

      setRows((prev) =>
        prev.map((item) =>
          item.requirementId === row.requirementId
            ? {
              ...item,
              isApproved: true,
            }
            : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  }

  const filteredRows = rows.filter((row) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      (row?.requirementId || "")
        .toString()
        .toLowerCase()
        .includes(search) ||

      (row?.projectName || "")
        .toLowerCase()
        .includes(search) ||

      (row?.contractorName || "")
        .toLowerCase()
        .includes(search)
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

          <svg width="4" height="7" viewBox="0 0 4 7" fill="none">
            <path
              d="M1 1L3 3.5L1 6"
              stroke="#515F74"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="text-[10px] font-bold tracking-widest uppercase text-[#FA7C14]">
            Material Requirements
          </span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <h1 className="text-[30px] font-black text-[#191C1E] leading-[36px] tracking-[-0.75px]">
            Material Requirements
          </h1>

          <div className="relative w-full md:w-[350px]">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#626975]"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Requirement ID, Project Name, Contractor"
              className="
        w-full
        h-11
        pl-10
        pr-4
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
          <table className="w-full min-w-[1250px] border-collapse table-fixed">
            <thead>
              <tr>
                <th className={`${thClass} w-[130px]`}>Requirement ID</th>
                <th className={`${thClass} w-[180px]`}>Project Name</th>
                <th className={`${thClass} w-[170px]`}>Contractor Name</th>
                <th className={`${thClass} w-[240px]`}>Project Description</th>
                <th className={`${thClass} w-[260px]`}>Location</th>
                <th className={`${thClass} w-[110px]`}>Urgency</th>
                <th className={`${thClass} w-[110px]`}>Status</th>
                <th className={`${thClass} w-[90px]`}>Images</th>
                <th className={`${thClass} text-center w-[120px]`}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-[#515F74]">
                    Loading...
                  </td>
                </tr>
              ) : filteredRows?.length > 0 ? (
                filteredRows.map((row) => (
                  <RequirementRow
                    key={row.requirementId}
                    row={row}
                    isOpen={openRowId === row.requirementId}
                    onToggle={() =>
                      setOpenRowId((prev) =>
                        prev === row.requirementId ? null : row.requirementId,
                      )
                    }
                    onApprove={handleApprove}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-[#515F74]">
                    {searchTerm
                      ? "No matching records found"
                      : "No material requirements found"}
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