import React, { useState, useEffect } from "react";
import { X, Save, ListFilter, Pencil, Plus } from "lucide-react";
import { addMaterialCategory } from "../../services/apis/addMaterialCategory";
import { editMaterialCategory } from "../../services/apis/editMaterialCategory";
import { getMaterialCategoryTypeAhead } from "../../services/apis/getMaterialCategoryTypeAhead";
import { addMaterialCategoryRef }
  from "../../services/apis/addMaterialCategoryRef";


const EMPTY = {
  catgId: "",
  categoryName: "",
  subCategoryName: "",
  unitType: "",
  status: "Active"
};

export default function CategoryModal({ isOpen, onClose, onSave, category = null }) {
  const isEdit = Boolean(category);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryApiError, setCategoryApiError] = useState("");


  const [showAddCategoryIcon, setShowAddCategoryIcon] =
    useState(false);

  const [addCategoryLoading, setAddCategoryLoading] =
    useState(false);

  const [addCategoryError, setAddCategoryError] =
    useState("");

  // Sync form whenever the modal opens or the target category changes
  useEffect(() => {
    if (isEdit) {
      setForm({
        categoryName: category.categoryName ?? "",
        subCategoryName: category.subCategoryName ?? "",
        unitType: category.unitType ?? "",
        status: category.status === "INACTIVE" ? "Inactive" : "Active",
      });
    } else {
      setForm(EMPTY);
    }
    setError("");
  }, [category, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleCategorySearch = async (value) => {
    setForm((prev) => ({
      ...prev,
      categoryName: value,
      catgId: "",
    }));

    setCategoryApiError("");
    setAddCategoryError("");
    setShowAddCategoryIcon(false);

    if (!value.trim()) {
      setCategorySuggestions([]);
      setShowAddCategoryIcon(false);
      return;
    }

    try {
      setCategoryLoading(true);

      const response =
        await getMaterialCategoryTypeAhead(value);

      if (response?.code === 0) {
        const refs =
          response?.data?.categoryRefs || [];

        if (refs.length > 0) {
          setCategorySuggestions(refs);
          setShowAddCategoryIcon(false);
        } else {
          setCategorySuggestions([]);
          setShowAddCategoryIcon(true);
        }
      } else {
        setCategorySuggestions([]);
        setShowAddCategoryIcon(false);
        setCategoryApiError(
          response?.message ||
          "Failed to fetch category list"
        );
      }
    } catch (err) {
      console.log(err);

      setCategorySuggestions([]);
      setShowAddCategoryIcon(false);
      setCategoryApiError(
        err?.response?.data?.message ||
        "Failed to fetch category list"
      );
    } finally {
      setCategoryLoading(false);
    }
  };


  const handleCategorySelect = (item) => {
    setForm((prev) => ({
      ...prev,
      categoryName: item.catgName,
      catgId: item.catgId,
    }));

    setCategorySuggestions([]);
    setCategoryApiError("");
    setShowAddCategoryIcon(false);
  };



  const handleAddCategoryRef = async () => {
    try {
      setAddCategoryLoading(true);

      setCategoryApiError("");
      setAddCategoryError("");

      const response =
        await addMaterialCategoryRef(
          form.categoryName
        );

      if (response?.code === 0) {
        const data = response?.data;

        setForm((prev) => ({
          ...prev,
          categoryName:
            data?.catgName || prev.categoryName,
          catgId: data?.catgId || "",
        }));

        setShowAddCategoryIcon(false);
        setCategorySuggestions([]);
      } else {
        setAddCategoryError(
          response?.message ||
          "Failed to add category"
        );
      }
    } catch (err) {
      console.log(err);

      setAddCategoryError(
        err?.response?.data?.message ||
        "Failed to add category"
      );
    } finally {
      setAddCategoryLoading(false);
    }
  };





  const handleSave = async () => {
    setError("");
    setLoading(true);

    try {
      if (isEdit) {
        await editMaterialCategory(
          category.id,       // catgId
          category.subCatgId, // subCatgId
          {
            catgId: category.id ?? "",
            catgName: form.categoryName,
            subCatgName: form.subCategoryName,
            unitType: form.unitType,
            isActive: form.status === "Active",
          }
        );

        onSave?.(); // signal parent to re-fetch the list
        onClose();
      } else {
        await addMaterialCategory({
          catgId: form.catgId,
          catgName: form.categoryName,
          subCatgName: form.subCategoryName,
          unitType: form.unitType,
          isActive: form.status === "Active",
        });

        onSave?.(); // signal parent to re-fetch the list
        onClose();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.log(err, "category save error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (loading) return; // prevent close mid-request
    setForm(EMPTY);
    setError("");
    onClose();
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
      onClick={handleCancel}
    >
      {/* Modal card */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-orange-200 shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <div className="flex items-center gap-2 text-[#92400E]">
            <ListFilter className="w-4 h-4" />
            <Pencil className="w-4 h-4" />
            <span className="font-bold text-base">Category Details</span>
          </div>
          <button
            onClick={handleCancel}
            disabled={loading}
            className="text-[#94A3B8] hover:text-[#FA8316] transition-colors disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <hr className="border-[#F1E8D8]" />

        {/* ── Form body ── */}
        <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">

          {/* Category Name */}
          {/* <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#1A2029]">Category Name</label>
            <input
              name="categoryName"
              value={form.categoryName}
              onChange={handleChange}
              placeholder="e.g. Raw Materials"
              disabled={loading || isEdit}
              // className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] placeholder-[#C4A882] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition disabled:opacity-60"
              className={`
    w-full px-4 py-3 rounded-xl border border-orange-200
    text-sm text-[#1A2029] placeholder-[#C4A882]
    outline-none transition
    ${isEdit
                  ? "bg-gray-100 cursor-not-allowed opacity-70"
                  : "bg-[#FFFAF5] focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100"
                }
    disabled:opacity-60
  `}
            />
          </div> */}





          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-bold text-[#1A2029]">
              Category Name
            </label>

            <div className="relative">
              <input
                name="categoryName"
                value={form.categoryName}
                onChange={(e) =>
                  !isEdit &&
                  handleCategorySearch(e.target.value)
                }
                placeholder="e.g. Raw Materials"
                disabled={loading || isEdit}
                className={`
        w-full px-4 py-3 pr-12 rounded-xl
        border border-orange-200
        text-sm text-[#1A2029]
        placeholder-[#C4A882]
        outline-none transition
        ${isEdit
                    ? "bg-gray-100 cursor-not-allowed opacity-70"
                    : "bg-[#FFFAF5] focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100"
                  }
      `}
              />

              {(categoryLoading || addCategoryLoading) &&
                !isEdit && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-5 h-5 animate-spin text-[#FA8316]"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-20"
                      />

                      <path
                        fill="currentColor"
                        className="opacity-80"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                      />
                    </svg>
                  </div>
                )}


              {!isEdit &&
                showAddCategoryIcon &&
                !categoryLoading &&
                !addCategoryLoading &&
                form.categoryName.trim() && (
                  <button
                    type="button"
                    onClick={handleAddCategoryRef}
                    className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-[#FA8316]
        hover:text-[#e06c0c]
        transition-colors
      "
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}

              {!isEdit &&
                categorySuggestions.length > 0 && (
                  <ul
                    className="
            absolute top-full left-0 right-0
            z-[999]
            mt-2
            bg-white
            border border-orange-200
            rounded-xl
            shadow-lg
            overflow-hidden
            max-h-56
            overflow-y-auto
          "
                  >
                    {categorySuggestions.map((item) => (
                      <li
                        key={item.catgId}
                        onClick={() =>
                          handleCategorySelect(item)
                        }
                        className="
                px-4 py-3
                text-sm text-[#1A2029]
                hover:bg-orange-50
                cursor-pointer
                border-b border-gray-100
                last:border-none
              "
                      >
                        {item.catgName}
                      </li>
                    ))}
                  </ul>
                )}
            </div>

            {categoryApiError && (
              <p className="text-sm text-red-500">
                {categoryApiError}
              </p>
            )}

            {addCategoryError && (
              <p className="text-sm text-red-500">
                {addCategoryError}
              </p>
            )}

          </div>







          {/* Sub Category Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#1A2029]">Sub Category Name</label>
            <input
              name="subCategoryName"
              value={form.subCategoryName}
              onChange={handleChange}
              placeholder="e.g. Fine Aggregate"
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] placeholder-[#C4A882] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition disabled:opacity-60"
            />
          </div>

          {/* Unit Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#1A2029]">Unit Type</label>
            <input
              name="unitType"
              value={form.unitType}
              onChange={handleChange}
              placeholder="e.g. Kilogram"
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] placeholder-[#C4A882] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition disabled:opacity-60"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#1A2029]">Status</label>
            <div className="flex items-center gap-6 pt-2">
              {["Active", "Inactive"].map((s) => (
                <label key={s} className={`flex items-center gap-2 ${loading ? "opacity-60" : "cursor-pointer"}`}>
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={form.status === s}
                    onChange={handleChange}
                    disabled={loading}
                    className="hidden"
                  />
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                      ${form.status === s ? "border-[#92400E] bg-white" : "border-[#CBD5E1] bg-white"}`}
                  >
                    {form.status === s && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#92400E]" />
                    )}
                  </span>
                  <span className="text-sm text-[#1A2029]">{s}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="sm:col-span-2 text-sm text-red-500 font-medium">{error}</p>
          )}
        </div>

        <hr className="border-[#F1E8D8]" />

        {/* ── Footer ── */}
        <div className="flex items-center justify-end gap-4 px-6 py-4">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="text-sm font-semibold text-[#1A2029] hover:text-[#FA8316] transition-colors px-2 disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FA8316] hover:bg-[#e06c0c] text-white text-sm font-bold shadow-[0_4px_14px_rgba(250,131,22,0.35)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEdit ? "Update Category" : "Save Category"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
































//=============zias code ===============

// import React, { useState, useEffect } from "react";
// import { X, Save, ListFilter, Pencil } from "lucide-react";
// import { addMaterialCategory } from "../../services/apis/addMaterialCategory";
// import { editMaterialCategory } from "../../services/apis/editMaterialCategory";

// const EMPTY = { categoryName: "", subCategoryName: "", unitType: "", status: "Active" };

// export default function CategoryModal({ isOpen, onClose, onSave, category = null }) {
//   const isEdit = Boolean(category);
//   const [form, setForm] = useState(EMPTY);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Sync form whenever the modal opens or the target category changes
//   useEffect(() => {
//     if (isEdit) {
//       setForm({
//         categoryName:    category.categoryName    ?? "",
//         subCategoryName: category.subCategoryName ?? "",
//         unitType:        category.unitType        ?? "",
//         status:          category.status === "INACTIVE" ? "Inactive" : "Active",
//       });
//     } else {
//       setForm(EMPTY);
//     }
//     setError("");
//   }, [category, isOpen]);

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     setError("");
//     setLoading(true);

//     try {
//       if (isEdit) {
//         await editMaterialCategory(
//           category.id,       // catgId
//           category.subCatgId, // subCatgId
//           {
//             catgName:    form.categoryName,
//             subCatgName: form.subCategoryName,
//             unitType:    form.unitType,
//             isActive:    form.status === "Active",
//           }
//         );

//         onSave?.(); // signal parent to re-fetch the list
//         onClose();
//       } else {
//         await addMaterialCategory({
//           catgName:    form.categoryName,
//           subCatgName: form.subCategoryName,
//           unitType:    form.unitType,
//           isActive:    form.status === "Active",
//         });

//         onSave?.(); // signal parent to re-fetch the list
//         onClose();
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//       console.log(err, "category save error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     if (loading) return; // prevent close mid-request
//     setForm(EMPTY);
//     setError("");
//     onClose();
//   };

//   return (
//     /* Backdrop */
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
//       onClick={handleCancel}
//     >
//       {/* Modal card */}
//       <div
//         className="relative w-full max-w-2xl bg-white rounded-2xl border border-orange-200 shadow-xl overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* ── Header ── */}
//         <div className="flex items-center justify-between px-6 pt-5 pb-4">
//           <div className="flex items-center gap-2 text-[#92400E]">
//             <ListFilter className="w-4 h-4" />
//             <Pencil className="w-4 h-4" />
//             <span className="font-bold text-base">Category Details</span>
//           </div>
//           <button
//             onClick={handleCancel}
//             disabled={loading}
//             className="text-[#94A3B8] hover:text-[#FA8316] transition-colors disabled:opacity-40"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <hr className="border-[#F1E8D8]" />

//         {/* ── Form body ── */}
//         <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">

//           {/* Category Name */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-[#1A2029]">Category Name</label>
//             <input
//               name="categoryName"
//               value={form.categoryName}
//               onChange={handleChange}
//               placeholder="e.g. Raw Materials"
//               disabled={loading}
//               className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] placeholder-[#C4A882] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition disabled:opacity-60"
//             />
//           </div>

//           {/* Sub Category Name */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-[#1A2029]">Sub Category Name</label>
//             <input
//               name="subCategoryName"
//               value={form.subCategoryName}
//               onChange={handleChange}
//               placeholder="e.g. Fine Aggregate"
//               disabled={loading}
//               className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] placeholder-[#C4A882] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition disabled:opacity-60"
//             />
//           </div>

//           {/* Unit Type */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-[#1A2029]">Unit Type</label>
//             <input
//               name="unitType"
//               value={form.unitType}
//               onChange={handleChange}
//               placeholder="e.g. Kilogram"
//               disabled={loading}
//               className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] placeholder-[#C4A882] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition disabled:opacity-60"
//             />
//           </div>

//           {/* Status */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-[#1A2029]">Status</label>
//             <div className="flex items-center gap-6 pt-2">
//               {["Active", "Inactive"].map((s) => (
//                 <label key={s} className={`flex items-center gap-2 ${loading ? "opacity-60" : "cursor-pointer"}`}>
//                   <input
//                     type="radio"
//                     name="status"
//                     value={s}
//                     checked={form.status === s}
//                     onChange={handleChange}
//                     disabled={loading}
//                     className="hidden"
//                   />
//                   <span
//                     className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
//                       ${form.status === s ? "border-[#92400E] bg-white" : "border-[#CBD5E1] bg-white"}`}
//                   >
//                     {form.status === s && (
//                       <span className="w-2.5 h-2.5 rounded-full bg-[#92400E]" />
//                     )}
//                   </span>
//                   <span className="text-sm text-[#1A2029]">{s}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Error message */}
//           {error && (
//             <p className="sm:col-span-2 text-sm text-red-500 font-medium">{error}</p>
//           )}
//         </div>

//         <hr className="border-[#F1E8D8]" />

//         {/* ── Footer ── */}
//         <div className="flex items-center justify-end gap-4 px-6 py-4">
//           <button
//             onClick={handleCancel}
//             disabled={loading}
//             className="text-sm font-semibold text-[#1A2029] hover:text-[#FA8316] transition-colors px-2 disabled:opacity-40"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={loading}
//             className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FA8316] hover:bg-[#e06c0c] text-white text-sm font-bold shadow-[0_4px_14px_rgba(250,131,22,0.35)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <>
//                 <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
//                 </svg>
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <Save className="w-4 h-4" />
//                 {isEdit ? "Update Category" : "Save Category"}
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

































// // CategoryModal.jsx — unified Add / Edit modal
// // src/components/categoryModal/CategoryModal.jsx
// //
// // Usage:
// //   Add mode  → <CategoryModal isOpen={open} onClose={...} onSave={handleSave} />
// //   Edit mode → <CategoryModal isOpen={open} onClose={...} onSave={handleSave} category={row} />

// import React, { useState, useEffect } from "react";
// import { X, Save, ListFilter, Pencil } from "lucide-react";
// import { addMaterialCategory } from "../../services/apis/addMaterialCategory";
// // TODO: import { editMaterialCategory } from "../../../../services/apis/editMaterialCategory";

// const EMPTY = { categoryName: "", subCategoryName: "", unitType: "", status: "Active" };

// export default function CategoryModal({ isOpen, onClose, onSave, category = null }) {
//   const isEdit = Boolean(category);
//   const [form, setForm] = useState(EMPTY);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Sync form whenever the modal opens or the target category changes
//   useEffect(() => {
//     if (isEdit) {
//       setForm({
//         categoryName:    category.categoryName    ?? "",
//         subCategoryName: category.subCategoryName ?? "",
//         unitType:        category.unitType        ?? "",
//         status:          category.status === "INACTIVE" ? "Inactive" : "Active",
//       });
//     } else {
//       setForm(EMPTY);
//     }
//     setError("");
//   }, [category, isOpen]);

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     setError("");
//     setLoading(true);

//     try {
//       if (isEdit) {
//         // TODO: replace with real edit API call
//         // await editMaterialCategory({ ...payload });
//         onSave?.({
//           ...category,
//           categoryName:    form.categoryName,
//           subCategoryName: form.subCategoryName,
//           unitType:        form.unitType,
//           status:          form.status === "Active" ? "ACTIVE" : "INACTIVE",
//         });
//         onClose();
//       } else {
//         await addMaterialCategory({
//           catgName:    form.categoryName,
//           subCatgName: form.subCategoryName,
//           unitType:    form.unitType,
//           isActive:    form.status === "Active",
//         });

//         onSave?.(); // signal parent to re-fetch the list
//         onClose();
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//       console.log(err, "category save error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     if (loading) return; // prevent close mid-request
//     setForm(EMPTY);
//     setError("");
//     onClose();
//   };

//   return (
//     /* Backdrop */
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
//       onClick={handleCancel}
//     >
//       {/* Modal card */}
//       <div
//         className="relative w-full max-w-2xl bg-white rounded-2xl border border-orange-200 shadow-xl overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* ── Header ── */}
//         <div className="flex items-center justify-between px-6 pt-5 pb-4">
//           <div className="flex items-center gap-2 text-[#92400E]">
//             <ListFilter className="w-4 h-4" />
//             <Pencil className="w-4 h-4" />
//             <span className="font-bold text-base">Category Details</span>
//           </div>
//           <button
//             onClick={handleCancel}
//             disabled={loading}
//             className="text-[#94A3B8] hover:text-[#FA8316] transition-colors disabled:opacity-40"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <hr className="border-[#F1E8D8]" />

//         {/* ── Form body ── */}
//         <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">

//           {/* Category Name */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-[#1A2029]">Category Name</label>
//             <input
//               name="categoryName"
//               value={form.categoryName}
//               onChange={handleChange}
//               placeholder="e.g. Raw Materials"
//               disabled={loading}
//               className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] placeholder-[#C4A882] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition disabled:opacity-60"
//             />
//           </div>

//           {/* Sub Category Name */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-[#1A2029]">Sub Category Name</label>
//             <input
//               name="subCategoryName"
//               value={form.subCategoryName}
//               onChange={handleChange}
//               placeholder="e.g. Fine Aggregate"
//               disabled={loading}
//               className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] placeholder-[#C4A882] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition disabled:opacity-60"
//             />
//           </div>

//           {/* Unit Type */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-[#1A2029]">Unit Type</label>
//             <input
//               name="unitType"
//               value={form.unitType}
//               onChange={handleChange}
//               placeholder="e.g. Kilogram"
//               disabled={loading}
//               className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] placeholder-[#C4A882] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition disabled:opacity-60"
//             />
//           </div>

//           {/* Status */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-[#1A2029]">Status</label>
//             <div className="flex items-center gap-6 pt-2">
//               {["Active", "Inactive"].map((s) => (
//                 <label key={s} className={`flex items-center gap-2 ${loading ? "opacity-60" : "cursor-pointer"}`}>
//                   <input
//                     type="radio"
//                     name="status"
//                     value={s}
//                     checked={form.status === s}
//                     onChange={handleChange}
//                     disabled={loading}
//                     className="hidden"
//                   />
//                   <span
//                     className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
//                       ${form.status === s ? "border-[#92400E] bg-white" : "border-[#CBD5E1] bg-white"}`}
//                   >
//                     {form.status === s && (
//                       <span className="w-2.5 h-2.5 rounded-full bg-[#92400E]" />
//                     )}
//                   </span>
//                   <span className="text-sm text-[#1A2029]">{s}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Error message */}
//           {error && (
//             <p className="sm:col-span-2 text-sm text-red-500 font-medium">{error}</p>
//           )}
//         </div>

//         <hr className="border-[#F1E8D8]" />

//         {/* ── Footer ── */}
//         <div className="flex items-center justify-end gap-4 px-6 py-4">
//           <button
//             onClick={handleCancel}
//             disabled={loading}
//             className="text-sm font-semibold text-[#1A2029] hover:text-[#FA8316] transition-colors px-2 disabled:opacity-40"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={loading}
//             className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FA8316] hover:bg-[#e06c0c] text-white text-sm font-bold shadow-[0_4px_14px_rgba(250,131,22,0.35)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <>
//                 <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
//                 </svg>
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <Save className="w-4 h-4" />
//                 {isEdit ? "Update Category" : "Save Category"}
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // CategoryModal.jsx — unified Add / Edit modal
// // src/components/categoryModal/CategoryModal.jsx
// //
// // Usage:
// //   Add mode  → <CategoryModal isOpen={open} onClose={...} onSave={handleSave} />
// //   Edit mode → <CategoryModal isOpen={open} onClose={...} onSave={handleSave} category={row} />

// import React, { useState, useEffect } from "react";
// import { X, Save, ListFilter, Pencil } from "lucide-react";
// import { addMaterialCategory } from "../../services/apis/addMaterialCategory";
// // TODO: import { editMaterialCategory } from "../../../../services/apis/editMaterialCategory";

// const UNIT_TYPES = ["Bag", "Ton", "Kilogram", "Piece", "Sheet", "Square Meter", "Liter", "Meter"];

// const EMPTY = { categoryName: "", subCategoryName: "", unitType: "", status: "Active" };

// export default function CategoryModal({ isOpen, onClose, onSave, category = null }) {
//   const isEdit = Boolean(category);
//   const [form, setForm] = useState(EMPTY);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Sync form whenever the modal opens or the target category changes
//   useEffect(() => {
//     if (isEdit) {
//       setForm({
//         categoryName:    category.categoryName    ?? "",
//         subCategoryName: category.subCategoryName ?? "",
//         unitType:        category.unitType        ?? "",
//         status:          category.status === "INACTIVE" ? "Inactive" : "Active",
//       });
//     } else {
//       setForm(EMPTY);
//     }
//     setError("");
//   }, [category, isOpen]);

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     setError("");
//     setLoading(true);

//     try {
//       if (isEdit) {
//         // TODO: replace with real edit API call
//         // await editMaterialCategory({ ...payload });
//         onSave?.({
//           ...category,
//           categoryName:    form.categoryName,
//           subCategoryName: form.subCategoryName,
//           unitType:        form.unitType,
//           status:          form.status === "Active" ? "ACTIVE" : "INACTIVE",
//         });
//         onClose();
//       } else {
//         await addMaterialCategory({
//           catgName:    form.categoryName,
//           subCatgName: form.subCategoryName,
//           unitType:    form.unitType,
//           isActive:    form.status === "Active",
//         });

//         onSave?.(); // signal parent to re-fetch the list
//         onClose();
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//       console.log(err, "category save error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     if (loading) return; // prevent close mid-request
//     setForm(EMPTY);
//     setError("");
//     onClose();
//   };

//   return (
//     /* Backdrop */
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
//       onClick={handleCancel}
//     >
//       {/* Modal card */}
//       <div
//         className="relative w-full max-w-2xl bg-white rounded-2xl border border-orange-200 shadow-xl overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* ── Header ── */}
//         <div className="flex items-center justify-between px-6 pt-5 pb-4">
//           <div className="flex items-center gap-2 text-[#92400E]">
//             <ListFilter className="w-4 h-4" />
//             <Pencil className="w-4 h-4" />
//             <span className="font-bold text-base">Category Details</span>
//           </div>
//           <button
//             onClick={handleCancel}
//             disabled={loading}
//             className="text-[#94A3B8] hover:text-[#FA8316] transition-colors disabled:opacity-40"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <hr className="border-[#F1E8D8]" />

//         {/* ── Form body ── */}
//         <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">

//           {/* Category Name */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-[#1A2029]">Category Name</label>
//             <input
//               name="categoryName"
//               value={form.categoryName}
//               onChange={handleChange}
//               placeholder="e.g. Raw Materials"
//               disabled={loading}
//               className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] placeholder-[#C4A882] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition disabled:opacity-60"
//             />
//           </div>

//           {/* Sub Category Name */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-[#1A2029]">Sub Category Name</label>
//             <input
//               name="subCategoryName"
//               value={form.subCategoryName}
//               onChange={handleChange}
//               placeholder="e.g. Fine Aggregate"
//               disabled={loading}
//               className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] placeholder-[#C4A882] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition disabled:opacity-60"
//             />
//           </div>

//           {/* Unit Type */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-[#1A2029]">Unit Type</label>
//             <div className="relative">
//               <select
//                 name="unitType"
//                 value={form.unitType}
//                 onChange={handleChange}
//                 disabled={loading}
//                 className="w-full appearance-none px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition cursor-pointer disabled:opacity-60"
//               >
//                 <option value="" disabled>Select Unit Type</option>
//                 {UNIT_TYPES.map((u) => (
//                   <option key={u} value={u}>{u}</option>
//                 ))}
//               </select>
//               <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </span>
//             </div>
//           </div>

//           {/* Status */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-[#1A2029]">Status</label>
//             <div className="flex items-center gap-6 pt-2">
//               {["Active", "Inactive"].map((s) => (
//                 <label key={s} className={`flex items-center gap-2 ${loading ? "opacity-60" : "cursor-pointer"}`}>
//                   <input
//                     type="radio"
//                     name="status"
//                     value={s}
//                     checked={form.status === s}
//                     onChange={handleChange}
//                     disabled={loading}
//                     className="hidden"
//                   />
//                   <span
//                     className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
//                       ${form.status === s ? "border-[#92400E] bg-white" : "border-[#CBD5E1] bg-white"}`}
//                   >
//                     {form.status === s && (
//                       <span className="w-2.5 h-2.5 rounded-full bg-[#92400E]" />
//                     )}
//                   </span>
//                   <span className="text-sm text-[#1A2029]">{s}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Error message */}
//           {error && (
//             <p className="sm:col-span-2 text-sm text-red-500 font-medium">{error}</p>
//           )}
//         </div>

//         <hr className="border-[#F1E8D8]" />

//         {/* ── Footer ── */}
//         <div className="flex items-center justify-end gap-4 px-6 py-4">
//           <button
//             onClick={handleCancel}
//             disabled={loading}
//             className="text-sm font-semibold text-[#1A2029] hover:text-[#FA8316] transition-colors px-2 disabled:opacity-40"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={loading}
//             className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FA8316] hover:bg-[#e06c0c] text-white text-sm font-bold shadow-[0_4px_14px_rgba(250,131,22,0.35)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <>
//                 <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
//                 </svg>
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <Save className="w-4 h-4" />
//                 {isEdit ? "Update Category" : "Save Category"}
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

