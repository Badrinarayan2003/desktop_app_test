import React, { useState, useEffect } from "react";
import { X, Save, ListFilter, Pencil } from "lucide-react";
import { addSkill } from "../../services/apis/addSkill";
import { editSkill } from "../../services/apis/editSkill";

const EMPTY = {
  skillName: "",
  status: "Active",
};

export default function SkillModal({ isOpen, onClose, onSave, skill = null }) {
  const isEdit = Boolean(skill);
  const [form, setForm] = useState(EMPTY);
  const [apiError, setApiError] = useState("");
  const [saving, setSaving] = useState(false);

  // Sync form whenever the modal opens or the target skill changes
  useEffect(() => {
    setApiError("");

    if (isEdit) {
      setForm({
        skillName: skill.skillName ?? "",
        status: skill.status === "INACTIVE" ? "Inactive" : "Active",
      });
    } else {
      setForm(EMPTY);
    }
  }, [skill, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setApiError("");

      // ---------------- ADD ----------------
      if (!isEdit) {
        if (!form.skillName.trim()) {
          setApiError("Skill name is required.");
          return;
        }
        const payload = {
          skillName: form.skillName.trim().toUpperCase(),
          isActive: form.status === "Active",
        };

        await addSkill(payload);
      }

      // ---------------- EDIT ----------------
      else {
        const payload = {
          isActive: form.status === "Active",
        };

        await editSkill(skill.id, payload);
      }

      await onSave?.();

      onClose();
    } catch (error) {
      setApiError(error.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(EMPTY);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
      onClick={handleCancel}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-orange-200 shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <div className="flex items-center gap-2 text-[#92400E]">
            <ListFilter className="w-4 h-4" />
            <Pencil className="w-4 h-4" />
            <span className="font-bold text-base">Skill Details</span>
          </div>
          <button
            onClick={handleCancel}
            className="text-[#94A3B8] hover:text-[#FA8316] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <hr className="border-[#F1E8D8]" />

        {/* ── Form body ── */}
        <div className="px-6 py-6 flex flex-col gap-5">
          {/* Row 1: Skill Name + Category Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#1A2029]">
                Skill Name
              </label>
              <input
                name="skillName"
                value={form.skillName}
                onChange={handleChange}
                disabled={isEdit}
                placeholder={isEdit ? "e.g. Mason" : "e.g. Raw Materials"}
                className={`w-full px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] placeholder-[#C4A882] outline-none transition
    ${
      isEdit
        ? "cursor-not-allowed opacity-70"
        : "focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100"
    }`}
              />
            </div>

            {/* <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#1A2029]">Category Name</label>
              <input
                name="categoryName"
                value={form.categoryName}
                onChange={handleChange}
                placeholder={isEdit ? "e.g. Construction" : "e.g. Fine Aggregate"}
                className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] placeholder-[#C4A882] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition"
              />
            </div> */}
          </div>

          {/* Row 2: Status */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#1A2029]">Status</label>
            <div className="flex items-center gap-6">
              {["Active", "Inactive"].map((s) => (
                <label
                  key={s}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={form.status === s}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      form.status === s
                        ? "border-[#92400E]"
                        : "border-[#CBD5E1]"
                    }`}
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
        </div>

        <hr className="border-[#F1E8D8]" />

        {/* API Error */}
        {apiError && (
          <p className="px-6 pb-2 text-sm font-medium text-red-500">
            {apiError}
          </p>
        )}

        {/* ── Footer ── */}
        <div className="flex items-center justify-end gap-4 px-6 py-4">
          <button
            onClick={handleCancel}
            className="text-sm font-semibold text-[#1A2029] hover:text-[#FA8316] transition-colors px-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FA8316] hover:bg-[#e06c0c] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold shadow-[0_4px_14px_rgba(250,131,22,0.35)] transition-all"
          >
            <Save className="w-4 h-4" />

            {saving ? "Saving..." : isEdit ? "Update Skill" : "Save Skill"}
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------add skill api -------------------------\

// import React, { useState, useEffect } from "react";
// import { X, Save, ListFilter, Pencil } from "lucide-react";
// import { addSkill } from "../../services/apis/addSkill";

// const EMPTY = {
//   skillName: "",
//   status: "Active",
// };

// export default function SkillModal({ isOpen, onClose, onSave, skill = null }) {
//   const isEdit = Boolean(skill);
//   const [form, setForm] = useState(EMPTY);
//   const [apiError, setApiError] = useState("");
//   const [saving, setSaving] = useState(false);

//   // Sync form whenever the modal opens or the target skill changes
//   useEffect(() => {
//     setApiError("");

//     if (isEdit) {
//       setForm({
//         skillName: skill.skillName ?? "",
//         status: skill.status === "INACTIVE" ? "Inactive" : "Active",
//       });
//     } else {
//       setForm(EMPTY);
//     }
//   }, [skill, isOpen]);

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       setSaving(true);
//       setApiError("");

//       const payload = {
//         skillName: form.skillName.trim().toUpperCase(),
//         isActive: form.status === "Active",
//       };

//       await addSkill(payload);

//       await onSave?.();

//       onClose();
//     } catch (error) {
//       setApiError(error.message || "Something went wrong.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     setForm(EMPTY);
//     onClose();
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
//       onClick={handleCancel}
//     >
//       <div
//         className="relative w-full max-w-2xl bg-white rounded-2xl border border-orange-200 shadow-xl overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* ── Header ── */}
//         <div className="flex items-center justify-between px-6 pt-5 pb-4">
//           <div className="flex items-center gap-2 text-[#92400E]">
//             <ListFilter className="w-4 h-4" />
//             <Pencil className="w-4 h-4" />
//             <span className="font-bold text-base">Skill Details</span>
//           </div>
//           <button
//             onClick={handleCancel}
//             className="text-[#94A3B8] hover:text-[#FA8316] transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <hr className="border-[#F1E8D8]" />

//         {/* ── Form body ── */}
//         <div className="px-6 py-6 flex flex-col gap-5">
//           {/* Row 1: Skill Name + Category Name */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
//             <div className="flex flex-col gap-2">
//               <label className="text-sm font-bold text-[#1A2029]">
//                 Skill Name
//               </label>
//               <input
//                 name="skillName"
//                 value={form.skillName}
//                 onChange={handleChange}
//                 placeholder={isEdit ? "e.g. Mason" : "e.g. Raw Materials"}
//                 className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] placeholder-[#C4A882] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition"
//               />
//             </div>

//             {/* <div className="flex flex-col gap-2">
//               <label className="text-sm font-bold text-[#1A2029]">Category Name</label>
//               <input
//                 name="categoryName"
//                 value={form.categoryName}
//                 onChange={handleChange}
//                 placeholder={isEdit ? "e.g. Construction" : "e.g. Fine Aggregate"}
//                 className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-[#FFFAF5] text-sm text-[#1A2029] placeholder-[#C4A882] outline-none focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100 transition"
//               />
//             </div> */}
//           </div>

//           {/* Row 2: Status */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-[#1A2029]">Status</label>
//             <div className="flex items-center gap-6">
//               {["Active", "Inactive"].map((s) => (
//                 <label
//                   key={s}
//                   className="flex items-center gap-2 cursor-pointer"
//                 >
//                   <input
//                     type="radio"
//                     name="status"
//                     value={s}
//                     checked={form.status === s}
//                     onChange={handleChange}
//                     className="hidden"
//                   />
//                   <span
//                     className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
//                       form.status === s
//                         ? "border-[#92400E]"
//                         : "border-[#CBD5E1]"
//                     }`}
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
//         </div>

//         <hr className="border-[#F1E8D8]" />

//         {/* API Error */}
//         {apiError && (
//           <p className="px-6 pb-2 text-sm font-medium text-red-500">
//             {apiError}
//           </p>
//         )}

//         {/* ── Footer ── */}
//         <div className="flex items-center justify-end gap-4 px-6 py-4">
//           <button
//             onClick={handleCancel}
//             className="text-sm font-semibold text-[#1A2029] hover:text-[#FA8316] transition-colors px-2"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FA8316] hover:bg-[#e06c0c] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold shadow-[0_4px_14px_rgba(250,131,22,0.35)] transition-all"
//           >
//             <Save className="w-4 h-4" />

//             {saving ? "Saving..." : isEdit ? "Update Skill" : "Save Skill"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
