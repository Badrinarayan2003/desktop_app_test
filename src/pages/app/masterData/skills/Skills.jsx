import React, { useState, useEffect } from "react";
import { Plus, SquarePen, ChevronRight, Search, } from "lucide-react";
import { getAllSkills } from "../../../../services/apis/getAllSkills";
import SkillsModal from "../../../../components/skillsModal/SkillsModal";

// ── Status badge 
function StatusBadge({ status }) {
  const isActive = status === "ACTIVE";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide
        ${isActive
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-red-50 text-red-500 border border-red-200"
        }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-red-400"}`}
      />
      {status}
    </span>
  );
}

// ── Table row 
function SkillRow({ row, isLast, onEdit }) {
  return (
    <tr
      className={`transition-colors hover:bg-gray-50/60 ${!isLast ? "border-b border-[#F1F5F9]" : ""}`}
    >
      <td className="px-6 py-5 text-center text-sm text-[#64748B] font-medium w-[10%]">
        {row.id}
      </td>
      <td className="px-6 py-5 text-center text-sm font-bold text-[#0C121A] w-[30%]">
        {row.skillName}
      </td>
      <td className="px-6 py-5 text-center w-[30%]">
        <StatusBadge status={row.status} />
      </td>
      <td className="px-6 py-5 text-center w-[30%]">
        <button
          onClick={onEdit}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#94A3B8] hover:text-[#FA8316] hover:bg-orange-50 transition-colors"
          title="Edit"
        >
          <SquarePen className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

// ── Main page 
export default function Skills() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null); // null = add mode

  const [searchTerm, setSearchTerm] = useState("");

  // ── Fetch skills from API on first render 
  async function fetchSkills() {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllSkills();

      // Map API shape → table row shape
      // API gives: { id, skillName, isActive }
      // Table needs: { id, skillName, status }
      const mapped = response.data.details.map((item) => ({
        id: item.id,
        skillName: item.skillName,
        status: item.isActive ? "ACTIVE" : "INACTIVE",
      }));

      setData(mapped.reverse());
    } catch (err) {
      setError("Failed to load skills. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSkills();
  }, []);

  // Called by the modal in both add and edit mode
  const handleSave = async () => {
    await fetchSkills();
  };

  const openAddModal = () => {
    setSelectedSkill(null);
    setModalOpen(true);
  };

  const openEditModal = (skill) => {
    setSelectedSkill(skill);
    setModalOpen(true);
  };

  const filteredData = data.filter((row) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      (row?.id || "")
        .toString()
        .toLowerCase()
        .includes(search) ||

      (row?.skillName || "")
        .toLowerCase()
        .includes(search) ||

      (row?.status || "")
        .toLowerCase()
        .includes(search)
    );
  });


  return (
    <div>
      {/* Single unified modal — mode driven by selectedSkill */}

      <SkillsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        skill={selectedSkill}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 mb-3 text-[11px] font-semibold uppercase tracking-widest">
        <span className="text-[#94A3B8] hover:text-[#FA8316] cursor-pointer transition-colors">
          Master Data
        </span>
        <ChevronRight className="w-3 h-3 text-[#94A3B8]" />
        <span className="text-[#FA8316]">Skills</span>
      </nav>

      {/* Page header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0C121A] tracking-tight">
          Skills
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

          <div className="relative w-full sm:w-[320px]">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ID, Skill Name or Status"
              className="
        w-full
        h-11
        pl-10
        pr-4
        rounded-xl
        border
        border-[#E3E8EC]
        bg-white
        text-sm
        outline-none
        focus:border-[#FA8316]
      "
            />
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FA8316] hover:bg-[#e06c0c] active:bg-[#c85f0a] text-white text-sm font-bold tracking-wide shadow-[0_8px_20px_-4px_rgba(250,131,22,0.4)] transition-all duration-200"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Add Skills
          </button>

        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-[#E3E8EC] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-125 table-fixed">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E3E8EC]">
                {[
                  { label: "ID", align: "center", className: "w-[10%]" },
                  {
                    label: "Skill Name",
                    align: "center",
                    className: "w-[30%]",
                  },
                  { label: "Status", align: "center", className: "w-[30%]" },
                  { label: "Actions", align: "center", className: "w-[30%]" },
                ].map(({ label, align, className }) => (
                  <th
                    key={label}
                    className={`px-6 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#94A3B8] text-${align} ${className}`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Loading state */}
              {loading && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-sm text-[#94A3B8]"
                  >
                    Loading skills...
                  </td>
                </tr>
              )}

              {/* Error state */}
              {!loading && error && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-sm text-red-400"
                  >
                    {error}
                  </td>
                </tr>
              )}

              {/* Empty state */}
              {!loading && !error && filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-sm text-[#94A3B8]"
                  >
                    {searchTerm
                      ? "No matching skills found"
                      : "No skills found."}
                  </td>
                </tr>
              )}

              {/* Data rows */}
              {!loading &&
                !error &&
                filteredData.map((row, idx) => (
                  <SkillRow
                    key={row.id}
                    row={row}
                    isLast={idx === filteredData.length - 1}
                    onEdit={() => openEditModal(row)}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}