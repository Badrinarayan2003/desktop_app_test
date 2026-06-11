import React, { useState, useEffect } from "react";
import { Plus, SquarePen, ChevronRight, Search } from "lucide-react";
import { getAllMaterialCategories } from "../../../../services/apis/getAllMaterialCategories";
import CategoryModal from "../../../../components/categoryModal/CategoryModal";

// ── Status badge 
function StatusBadge({ status }) {
  const isActive = status === "ACTIVE";
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide
        ${isActive
          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
          : "bg-red-50 text-red-500 border border-red-200"
        }
      `}
    >
      {status}
    </span>
  );
}

// ── Table row 
function CategoryRow({ row, isLast, onEdit }) {
  return (
    <tr className={`group transition-colors hover:bg-gray-50/60 ${!isLast ? "border-b border-[#F1F5F9]" : ""}`}>
      <td className="px-6 py-5 text-sm text-[#64748B] font-medium w-20">{row.id}</td>
      <td className="px-6 py-5 text-sm font-semibold text-[#0C121A]">{row.categoryName}</td>
      <td className="px-6 py-5 text-sm text-[#374151]">{row.subCategoryName}</td>
      <td className="px-6 py-5 text-sm text-[#374151]">{row.unitType}</td>
      <td className="px-6 py-5"><StatusBadge status={row.status} /></td>
      <td className="px-6 py-5 text-right">
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
export default function Categories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // null = add mode

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllMaterialCategories();

      const formattedData =
        response?.data?.masterCategoryDTOS?.map((item, index) => ({
          uniqueId: `${item.catgId}-${index}`,
          id: item.catgId,
          subCatgId: item.subCatgId,   // ← needed for the edit endpoint
          categoryName: item.catgName,
          subCategoryName: item.subCatgName,
          unitType: item.unitType,
          status: item.isActive ? "ACTIVE" : "INACTIVE",
        })) || [];

      setData(formattedData);

      if (formattedData.length === 0) setError("No categories found");
    } catch (err) {
      console.log(err, "categories fetch error");
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // Both add and edit call onSave() with no args → always re-fetch
  const handleSave = () => {
    fetchCategories();
  };

  const openAddModal = () => {
    setSelectedCategory(null);
    setModalOpen(true);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const filteredData = data.filter((row) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      (row?.id || "")
        .toString()
        .toLowerCase()
        .includes(search) ||

      (row?.categoryName || "")
        .toLowerCase()
        .includes(search)
    );
  });


  return (
    <div>
      <CategoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        category={selectedCategory}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 mb-3 text-[11px] font-semibold uppercase tracking-widest">
        <span className="text-[#94A3B8] hover:text-[#FA8316] cursor-pointer transition-colors">
          Master Data
        </span>
        <ChevronRight className="w-3 h-3 text-[#94A3B8]" />
        <span className="text-[#FA8316]">Categories</span>
      </nav>



      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0C121A] tracking-tight">
          Material Categories
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
              placeholder="Search Category ID or Category Name"
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
            Add Category
          </button>

        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-[#E3E8EC] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E3E8EC]">
                {["ID", "Category Name", "Sub Category Name", "Unit Type", "Status", "Actions"].map((col, i) => (
                  <th
                    key={col}
                    className={`px-6 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#94A3B8] ${i === 5 ? "text-right" : "text-left"}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-sm text-[#64748B]">
                    Loading categories...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-sm text-red-500 font-medium">
                    {error}
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((row, idx) => (
                  <CategoryRow
                    key={row.uniqueId}
                    row={row}
                    isLast={idx === filteredData.length - 1}
                    onEdit={() => openEditModal(row)}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-sm text-[#64748B]"
                  >
                    {searchTerm
                      ? "No matching categories found"
                      : "No categories found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}