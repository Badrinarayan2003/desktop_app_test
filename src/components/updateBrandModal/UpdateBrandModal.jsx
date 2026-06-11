import React, {
    useEffect,
    useState,
} from "react";

import {
    X,
    Save,
    ListFilter,
    Pencil,
    ChevronDown,
} from "lucide-react";

import { updateBrand }
    from "../../services/apis/updateBrand";

export default function UpdateBrandModal({
    isOpen,
    onClose,
    onUpdate,
    brand,
}) {

    const [form, setForm] =
        useState({
            brandId: "",
            catgId: "",
            subCatgId: "",
            categoryName: "",
            subCategoryName: "",
            brandName: "",
            brandDesc: "",
        });

    const [updateLoading,
        setUpdateLoading] =
        useState(false);

    const [updateError,
        setUpdateError] =
        useState("");

    useEffect(() => {
        if (
            isOpen &&
            brand
        ) {
            console.log(brand, "brand")
            setForm({
                brandId:
                    brand.brandId || "",

                catgId:
                    brand.catgId || "",

                subCatgId:
                    brand.subCatgId || "",

                categoryName:
                    brand.catgName || "",

                subCategoryName:
                    brand.subCatgName || "",

                brandName:
                    brand.brandName || "",

                brandDesc:
                    brand.brandDesc || "",
            });

            setUpdateError("");
        }
    }, [
        isOpen,
        brand,
    ]);

    if (!isOpen)
        return null;

    const handleClose =
        () => {

            setForm({
                brandId: "",
                catgId: "",
                subCatgId: "",
                categoryName: "",
                subCategoryName: "",
                brandName: "",
                brandDesc: "",
            });

            setUpdateError("");

            onClose();
        };

    const isFormValid =
        form.brandName.trim() &&
        form.brandDesc.trim();

    const handleSubmit =
        async () => {

            try {

                setUpdateLoading(
                    true
                );

                setUpdateError(
                    ""
                );

                const payload =
                {
                    brandId:
                        form.brandId,

                    catgId:
                        form.catgId,

                    subCatgId:
                        form.subCatgId,

                    brandName:
                        form.brandName.trim(),

                    brandDesc:
                        form.brandDesc.trim(),
                };

                console.log(
                    payload,
                    "update brand payload"
                );

                const response =
                    await updateBrand(
                        payload
                    );

                if (
                    response?.code ===
                    0
                ) {

                    handleClose();

                    onUpdate?.();

                } else {

                    setUpdateError(
                        response?.message ||
                        "Failed to update brand"
                    );
                }

            } catch (
            err
            ) {

                console.log(
                    err,
                    "update brand error"
                );

                setUpdateError(
                    err?.response
                        ?.data
                        ?.message ||
                    "Failed to update brand"
                );

            } finally {

                setUpdateLoading(
                    false
                );
            }
        };

    return (
        <div
            className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/30 backdrop-blur-sm
        px-4
      "
            onClick={
                handleClose
            }
        >
            {/* Modal Card */}
            <div
                className="
          relative w-full max-w-2xl
          bg-white rounded-2xl
          border border-orange-200
          shadow-xl overflow-hidden
        "
                onClick={(
                    e
                ) =>
                    e.stopPropagation()
                }
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4">
                    <div className="flex items-center gap-2 text-[#92400E]">
                        <ListFilter className="w-4 h-4" />

                        <Pencil className="w-4 h-4" />

                        <span className="font-bold text-base">
                            Brand Details
                        </span>
                    </div>

                    <button
                        onClick={
                            handleClose
                        }
                        className="
              text-[#94A3B8]
              hover:text-[#FA8316]
              transition-colors
              cursor-pointer
            "
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <hr className="border-[#F1E8D8]" />

                {/* Form Body */}
                <div
                    className="
            px-6 py-6
            grid grid-cols-1 sm:grid-cols-2
            gap-x-6 gap-y-5
          "
                >
                    {/* Category Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#1A2029]">
                            Category Name
                        </label>

                        <input
                            type="text"
                            disabled
                            value={
                                form.categoryName
                            }
                            className="
                w-full px-4 py-3
                rounded-xl
                border border-orange-200
                bg-gray-100
                cursor-not-allowed
                opacity-70
                text-sm text-[#1A2029]
                outline-none
              "
                        />
                    </div>

                    {/* Sub Category Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#1A2029]">
                            Sub Category Name
                        </label>

                        <div className="relative">
                            <select
                                disabled
                                value={
                                    form.subCatgId
                                }
                                className="
                  w-full px-4 py-3 pr-12
                  rounded-xl
                  border border-orange-200
                  bg-gray-100
                  cursor-not-allowed
                  opacity-70
                  text-sm text-[#1A2029]
                  outline-none
                  appearance-none
                "
                            >
                                <option
                                    value={
                                        form.subCatgId
                                    }
                                >
                                    {
                                        form.subCategoryName
                                    }
                                </option>
                            </select>

                            <ChevronDown
                                className="
                  absolute right-4 top-1/2
                  -translate-y-1/2
                  w-4 h-4
                  text-[#94A3B8]
                  pointer-events-none
                "
                            />
                        </div>
                    </div>

                    {/* Brand Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#1A2029]">
                            Brand Name
                        </label>

                        <input
                            type="text"
                            value={
                                form.brandName
                            }
                            onChange={(
                                e
                            ) =>
                                setForm(
                                    (
                                        prev
                                    ) => ({
                                        ...prev,
                                        brandName:
                                            e.target.value,
                                    })
                                )
                            }
                            placeholder="Enter brand name"
                            className="
                w-full px-4 py-3
                rounded-xl
                border border-orange-200
                bg-[#FFFAF5]
                text-sm text-[#1A2029]
                placeholder-[#C4A882]
                outline-none
                focus:border-[#FA8316]
                focus:ring-2
                focus:ring-orange-100
                transition
              "
                        />
                    </div>

                    {/* Brand Description */}
                    <div className="flex flex-col gap-2 sm:col-span-2">
                        <label className="text-sm font-bold text-[#1A2029]">
                            Brand Description
                        </label>

                        <textarea
                            rows={4}
                            value={
                                form.brandDesc
                            }
                            onChange={(
                                e
                            ) =>
                                setForm(
                                    (
                                        prev
                                    ) => ({
                                        ...prev,
                                        brandDesc:
                                            e.target.value,
                                    })
                                )
                            }
                            placeholder="Enter brand description"
                            className="
                w-full px-4 py-3
                rounded-xl
                border border-orange-200
                bg-[#FFFAF5]
                text-sm text-[#1A2029]
                placeholder-[#C4A882]
                outline-none
                resize-none
                focus:border-[#FA8316]
                focus:ring-2
                focus:ring-orange-100
                transition
              "
                        />
                    </div>
                </div>

                <hr className="border-[#F1E8D8]" />

                {/* Footer */}
                <div className="flex items-center justify-end gap-4 px-6 py-4">

                    <button
                        onClick={
                            handleClose
                        }
                        className="
              text-sm font-semibold
              text-[#1A2029]
              hover:text-[#FA8316]
              transition-colors
              px-2
              cursor-pointer
            "
                    >
                        Cancel
                    </button>

                    <button
                        disabled={
                            !isFormValid ||
                            updateLoading
                        }
                        onClick={
                            handleSubmit
                        }
                        className={`
              flex items-center gap-2
              px-6 py-3
              rounded-xl
              text-white
              text-sm font-bold
              shadow-[0_4px_14px_rgba(250,131,22,0.35)]
              transition-all
              ${isFormValid &&
                                !updateLoading
                                ? "bg-[#FA8316] hover:bg-[#e06c0c] cursor-pointer"
                                : "bg-[#FDBA74] cursor-not-allowed opacity-70"
                            }
            `}
                    >
                        {updateLoading ? (
                            <>
                                <svg
                                    className="w-4 h-4 animate-spin"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />

                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                                    />
                                </svg>

                                Updating...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Update Brand
                            </>
                        )}
                    </button>
                </div>

                {updateError && (
                    <p className="text-sm text-end text-red-500 me-10 mb-2 font-medium">
                        {
                            updateError
                        }
                    </p>
                )}
            </div>
        </div>
    );
}
























// import React from "react";
// import {
//     X,
//     Save,
//     ListFilter,
//     Pencil,
//     ChevronDown,
// } from "lucide-react";

// export default function UpdateBrandModal({
//     isOpen,
//     onClose,
// }) {
//     if (!isOpen) return null;

//     return (
//         <div
//             className="
//         fixed inset-0 z-50
//         flex items-center justify-center
//         bg-black/30 backdrop-blur-sm
//         px-4
//       "
//             onClick={onClose}
//         >
//             {/* Modal Card */}
//             <div
//                 className="
//           relative w-full max-w-2xl
//           bg-white rounded-2xl
//           border border-orange-200
//           shadow-xl overflow-hidden
//         "
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 {/* Header */}
//                 <div className="flex items-center justify-between px-6 pt-5 pb-4">
//                     <div className="flex items-center gap-2 text-[#92400E]">
//                         <ListFilter className="w-4 h-4" />
//                         <Pencil className="w-4 h-4" />
//                         <span className="font-bold text-base">
//                             Brand Details
//                         </span>
//                     </div>

//                     <button
//                         onClick={onClose}
//                         className="
//               text-[#94A3B8]
//               hover:text-[#FA8316]
//               transition-colors
//             "
//                     >
//                         <X className="w-5 h-5" />
//                     </button>
//                 </div>

//                 <hr className="border-[#F1E8D8]" />

//                 {/* Form Body */}
//                 <div
//                     className="
//             px-6 py-6
//             grid grid-cols-1 sm:grid-cols-2
//             gap-x-6 gap-y-5
//           "
//                 >
//                     {/* Category Name */}
//                     <div className="flex flex-col gap-2">
//                         <label className="text-sm font-bold text-[#1A2029]">
//                             Category Name
//                         </label>

//                         <input
//                             type="text"
//                             placeholder="Enter category name"
//                             className="
//                 w-full px-4 py-3
//                 rounded-xl
//                 border border-orange-200
//                 bg-[#FFFAF5]
//                 text-sm text-[#1A2029]
//                 placeholder-[#C4A882]
//                 outline-none
//                 focus:border-[#FA8316]
//                 focus:ring-2
//                 focus:ring-orange-100
//                 transition
//               "
//                         />
//                     </div>

//                     {/* Sub Category Name */}
//                     <div className="flex flex-col gap-2">
//                         <label className="text-sm font-bold text-[#1A2029]">
//                             Sub Category Name
//                         </label>

//                         <div className="relative">
//                             <select
//                                 className="
//                   w-full px-4 py-3 pr-12
//                   rounded-xl
//                   border border-orange-200
//                   bg-[#FFFAF5]
//                   text-sm text-[#1A2029]
//                   outline-none
//                   focus:border-[#FA8316]
//                   focus:ring-2
//                   focus:ring-orange-100
//                   transition
//                   appearance-none
//                 "
//                             >
//                                 <option value="">
//                                     Select sub category
//                                 </option>

//                                 <option value="1">
//                                     Sub Category 1
//                                 </option>

//                                 <option value="2">
//                                     Sub Category 2
//                                 </option>
//                             </select>

//                             <ChevronDown
//                                 className="
//                   absolute right-4 top-1/2
//                   -translate-y-1/2
//                   w-4 h-4
//                   text-[#94A3B8]
//                   pointer-events-none
//                 "
//                             />
//                         </div>
//                     </div>

//                     {/* Brand Name */}
//                     <div className="flex flex-col gap-2">
//                         <label className="text-sm font-bold text-[#1A2029]">
//                             Brand Name
//                         </label>

//                         <input
//                             type="text"
//                             placeholder="Enter brand name"
//                             className="
//                 w-full px-4 py-3
//                 rounded-xl
//                 border border-orange-200
//                 bg-[#FFFAF5]
//                 text-sm text-[#1A2029]
//                 placeholder-[#C4A882]
//                 outline-none
//                 focus:border-[#FA8316]
//                 focus:ring-2
//                 focus:ring-orange-100
//                 transition
//               "
//                         />
//                     </div>

//                     {/* Brand Description */}
//                     <div className="flex flex-col gap-2 sm:col-span-2">
//                         <label className="text-sm font-bold text-[#1A2029]">
//                             Brand Description
//                         </label>

//                         <textarea
//                             rows={4}
//                             placeholder="Enter brand description"
//                             className="
//                 w-full px-4 py-3
//                 rounded-xl
//                 border border-orange-200
//                 bg-[#FFFAF5]
//                 text-sm text-[#1A2029]
//                 placeholder-[#C4A882]
//                 outline-none
//                 resize-none
//                 focus:border-[#FA8316]
//                 focus:ring-2
//                 focus:ring-orange-100
//                 transition
//               "
//                         />
//                     </div>
//                 </div>

//                 <hr className="border-[#F1E8D8]" />

//                 {/* Footer */}
//                 <div className="flex items-center justify-end gap-4 px-6 py-4">
//                     <button
//                         onClick={onClose}
//                         className="
//               text-sm font-semibold
//               text-[#1A2029]
//               hover:text-[#FA8316]
//               transition-colors
//               px-2
//             "
//                     >
//                         Cancel
//                     </button>

//                     <button
//                         className="
//               flex items-center gap-2
//               px-6 py-3
//               rounded-xl
//               bg-[#FA8316]
//               hover:bg-[#e06c0c]
//               text-white
//               text-sm font-bold
//               shadow-[0_4px_14px_rgba(250,131,22,0.35)]
//               transition-all
//             "
//                     >
//                         <Save className="w-4 h-4" />
//                         Add Brand
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }