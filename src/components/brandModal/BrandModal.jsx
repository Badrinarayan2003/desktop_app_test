import React, { useState } from "react";
import {
    X,
    Save,
    ListFilter,
    Pencil,
    ChevronDown,
} from "lucide-react";
import { getMaterialCategoryTypeAhead } from "../../services/apis/getMaterialCategoryTypeAhead";
import { getSubCategoryByCategory } from "../../services/apis/getSubCategoryByCategory";
import { addBrand } from "../../services/apis/addBrand";


export default function BrandModal({
    isOpen,
    onClose,
    onSave,
}) {



    const [form, setForm] = useState({
        catgId: "",
        subCatgId: "",
        categoryName: "",
        brandName: "",
        brandDesc: "",
    });

    const [categorySuggestions, setCategorySuggestions] =
        useState([]);

    const [categoryLoading, setCategoryLoading] =
        useState(false);

    const [categoryError, setCategoryError] =
        useState("");


    const [subCategoryOptions, setSubCategoryOptions] =
        useState([]);

    const [subCategoryLoading, setSubCategoryLoading] =
        useState(false);

    const [subCategoryError, setSubCategoryError] =
        useState("");

    const [addBrandLoading, setAddBrandLoading] =
        useState(false);

    const [addBrandError, setAddBrandError] =
        useState("");


    const [brandInfo, setBrandInfo] = useState([]);

    const [brandValidationError, setBrandValidationError] =
        useState("");


    if (!isOpen) return null;


    const handleClose = () => {
        setForm({
            catgId: "",
            subCatgId: "",
            brandName: "",
            brandDesc: "",
            categoryName: "",
        });

        setCategorySuggestions([]);
        setCategoryError("");

        setSubCategoryOptions([]);
        setSubCategoryError("");

        setAddBrandError("");
        setAddBrandLoading(false);

        setBrandInfo([]);
        setBrandValidationError("");

        onClose();
    };



    const handleCategorySearch = async (value) => {


        setForm((prev) => ({
            ...prev,
            categoryName: value,
            catgId: "",
            subCatgId: "",
        }));

        setCategoryError("");
        setCategorySuggestions([]);

        setSubCategoryOptions([]);
        setSubCategoryError("");

        if (!value.trim()) {
            setForm((prev) => ({
                ...prev,
                categoryName: "",
                catgId: "",
                subCatgId: "",
            }));

            setCategorySuggestions([]);
            setCategoryError("");

            setSubCategoryOptions([]);
            setSubCategoryError("");

            return;
        }

        try {
            setCategoryLoading(true);

            const response =
                await getMaterialCategoryTypeAhead(
                    value
                );

            if (response?.code === 0) {
                const refs =
                    response?.data?.categoryRefs || [];

                if (refs.length > 0) {
                    setCategorySuggestions(refs);
                } else {
                    setCategorySuggestions([]);
                    setCategoryError(
                        "Category not found"
                    );
                }
            } else {
                setCategorySuggestions([]);

                setCategoryError(
                    response?.message ||
                    "Failed to fetch category"
                );
            }
        } catch (err) {
            console.log(
                err,
                "category typeahead error"
            );

            setCategorySuggestions([]);

            setCategoryError(
                err?.response?.data?.message ||
                "Failed to fetch category"
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
            subCatgId: "",
        }));

        setCategorySuggestions([]);
        setCategoryError("");
        setSubCategoryOptions([]);
        setSubCategoryError("");
    };


    const fetchSubCategories = async () => {
        if (!form.catgId) return;

        try {
            setSubCategoryLoading(true);

            setSubCategoryError("");
            setSubCategoryOptions([]);

            const response =
                await getSubCategoryByCategory(
                    form.catgId
                );

            if (response?.code === 0) {
                const subCategories =
                    response?.data
                        ?.masterCategoryDTOS || [];

                if (
                    subCategories.length > 0
                ) {
                    setSubCategoryOptions(
                        subCategories
                    );
                } else {
                    setSubCategoryOptions([]);

                    setSubCategoryError(
                        "Sub category not found for this category"
                    );
                }
            } else {
                setSubCategoryOptions([]);

                setSubCategoryError(
                    response?.message ||
                    "Failed to fetch sub categories"
                );
            }
        } catch (err) {
            console.log(
                err,
                "subcategory fetch error"
            );

            setSubCategoryOptions([]);

            setSubCategoryError(
                err?.response?.data
                    ?.message ||
                "Failed to fetch sub categories"
            );
        } finally {
            setSubCategoryLoading(false);
        }
    };



    const handleAddBrand = () => {

        if (
            !form.brandName.trim() ||
            !form.brandDesc.trim()
        ) {
            setBrandValidationError(
                "Brand name and description are required"
            );
            return;
        }

        setBrandValidationError("");

        setBrandInfo((prev) => [
            ...prev,
            {
                brandName: form.brandName.trim(),
                brandDesc: form.brandDesc.trim(),
            },
        ]);

        setForm((prev) => ({
            ...prev,
            brandName: "",
            brandDesc: "",
        }));
    };

    const handleRemoveBrand = (index) => {

        setBrandInfo((prev) =>
            prev.filter((_, i) => i !== index)
        );

        setBrandValidationError("");
    };



    const isFormValid =
        form.catgId &&
        form.subCatgId &&
        brandInfo.length > 0;



    const handleSubmit = async () => {
        try {
            setAddBrandLoading(true);
            setAddBrandError("");

            const payload = {
                catgId: form.catgId,
                subCatgId: form.subCatgId,
                brandInfo,
            };

            console.log(
                payload,
                "brand payload"
            );

            const response =
                await addBrand(payload);

            if (response?.code === 0) {
                handleClose();

                onSave();
            } else {
                setAddBrandError(
                    response?.message ||
                    "Failed to add brand"
                );
            }
        } catch (err) {
            console.log(
                err,
                "add brand error"
            );

            setAddBrandError(
                err?.response?.data
                    ?.message ||
                "Failed to add brand"
            );
        } finally {
            setAddBrandLoading(false);
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
            onClick={handleClose}
        >
            {/* Modal Card */}
            <div
                //         className="
                //   relative w-full max-w-2xl
                //   bg-white rounded-2xl
                //   border border-orange-200
                //   shadow-xl overflow-hidden
                // "
                className="
      relative
      w-full
      max-w-2xl
      max-h-[90vh]
      bg-white
      rounded-2xl
      border
      border-orange-200
      shadow-xl
      flex
      flex-col
      overflow-hidden
    "
                onClick={(e) => e.stopPropagation()}
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
                        onClick={handleClose}
                        className="
              text-[#94A3B8]
              hover:text-[#FA8316]
              transition-colors cursor-pointer
            "
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <hr className="border-[#F1E8D8]" />

                {/* Form Body */}
                {/* <div
                    className="
            px-6 py-6
            grid grid-cols-1 sm:grid-cols-2
            gap-x-6 gap-y-5
          "
                > */}



                <div
                    className="
        flex-1
        overflow-y-auto
        px-6
        py-6
    "
                >
                    <div
                        className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-x-6
            gap-y-5
        "
                    >
                        {/* Category Name */}
                        <div className="flex flex-col gap-2 relative">
                            <label className="text-sm font-bold text-[#1A2029]">
                                Category Name
                            </label>

                            <div className="relative">
                                <input
                                    type="text"
                                    value={form.categoryName}
                                    onChange={(e) =>
                                        handleCategorySearch(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter category name"
                                    className="
        w-full px-4 py-3 pr-12
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

                                {/* Spinner */}
                                {categoryLoading && (
                                    <div
                                        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
        "
                                    >
                                        <svg
                                            className="
            w-5 h-5
            animate-spin
            text-[#FA8316]
          "
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

                                {/* Suggestion list */}
                                {categorySuggestions?.length >
                                    0 && (
                                        <ul
                                            className="
          absolute
          top-full left-0 right-0
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
                                            {categorySuggestions.map(
                                                (item) => (
                                                    <li
                                                        key={item.catgId}
                                                        onClick={() =>
                                                            handleCategorySelect(
                                                                item
                                                            )
                                                        }
                                                        className="
                px-4 py-3
                text-sm
                text-[#1A2029]
                hover:bg-orange-50
                cursor-pointer
                border-b
                border-gray-100
                last:border-none
              "
                                                    >
                                                        {item.catgName}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    )}
                            </div>

                            {/* Error */}
                            {categoryError && (
                                <p className="text-sm text-red-500">
                                    {categoryError}
                                </p>
                            )}
                        </div>

                        {/* Sub Category Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#1A2029]">
                                Sub Category Name
                            </label>

                            <div className="relative">
                                <select
                                    value={form.subCatgId}
                                    disabled={!form.catgId}
                                    onFocus={() => {
                                        setSubCategoryError("");

                                        if (
                                            form.catgId &&
                                            subCategoryOptions.length === 0
                                        ) {
                                            fetchSubCategories();
                                        }
                                    }}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            subCatgId:
                                                e.target.value,
                                        }))
                                    }
                                    className={`
                w-full px-4 py-3 pr-12
                rounded-xl
                border border-orange-200
                text-sm text-[#1A2029]
                outline-none
                transition
                appearance-none
                ${!form.catgId
                                            ? "bg-gray-100 cursor-not-allowed opacity-70"
                                            : "bg-[#FFFAF5] focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100"
                                        }
            `}
                                >
                                    <option value="">
                                        Select sub category
                                    </option>

                                    {subCategoryOptions.map(
                                        (item) => (
                                            <option
                                                key={
                                                    item.subCatgId
                                                }
                                                value={
                                                    item.subCatgId
                                                }
                                            >
                                                {
                                                    item.subCatgName
                                                }
                                            </option>
                                        )
                                    )}
                                </select>

                                {subCategoryLoading && (
                                    <div
                                        className="
                    absolute
                    right-10
                    top-1/2
                    -translate-y-1/2
                "
                                    >
                                        <svg
                                            className="
                        w-5 h-5
                        animate-spin
                        text-[#FA8316]
                    "
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

                            {subCategoryError && (
                                <p className="text-sm text-red-500">
                                    {subCategoryError}
                                </p>
                            )}
                        </div>


                        <div className="sm:col-span-2">
                            <label className="text-sm font-bold text-[#1A2029]">
                                Added Brands
                            </label>

                            <div className="mt-2 flex flex-wrap gap-3">

                                {brandInfo.length === 0 && (
                                    <p className="text-sm text-gray-500">
                                        No brands added yet
                                    </p>
                                )}

                                {brandInfo.map((brand, index) => (
                                    <div
                                        key={index}
                                        className="
                    bg-orange-50
                    border
                    border-orange-200
                    rounded-xl
                    px-4
                    py-3
                    min-w-[220px]
                    relative
                "
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveBrand(index)
                                            }
                                            className="
                        absolute
                        top-2
                        right-2
                        text-red-500
                        hover:text-red-700
                        cursor-pointer
                    "
                                        >
                                            <X className="w-4 h-4" />
                                        </button>

                                        <p className="font-semibold text-sm">
                                            {brand.brandName}
                                        </p>

                                        <p className="text-xs text-gray-600 mt-1">
                                            {brand.brandDesc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Brand Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#1A2029]">
                                Brand Name
                            </label>

                            <input
                                type="text"
                                value={form.brandName}
                                onChange={(e) => {
                                    setBrandValidationError("");

                                    setForm((prev) => ({
                                        ...prev,
                                        brandName:
                                            e.target.value,
                                    }))
                                }}
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
                                value={form.brandDesc}
                                onChange={(e) => {
                                    setBrandValidationError("");

                                    setForm((prev) => ({
                                        ...prev,
                                        brandDesc:
                                            e.target.value,
                                    }))
                                }}
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

                        {brandValidationError && (
                            <p className="sm:col-span-2 text-end text-sm text-red-500">
                                {brandValidationError}
                            </p>
                        )}

                        <div className="sm:col-span-2 flex justify-end">
                            <button
                                type="button"
                                onClick={handleAddBrand}
                                className="
            px-5
            py-2
            rounded-lg
            bg-[#FA8316]
            text-white
            text-sm
            font-semibold
            hover:bg-[#e06c0c]
            cursor-pointer
        "
                            >
                                Add New Brand
                            </button>
                        </div>


                    </div>
                </div>

                <hr className="border-[#F1E8D8]" />

                {/* Footer */}
                <div className="flex items-center justify-end gap-4 px-6 py-4">
                    <button
                        onClick={handleClose}
                        className="
              text-sm font-semibold
              text-[#1A2029]
              hover:text-[#FA8316]
              transition-colors
              px-2 cursor-pointer
            "
                    >
                        Cancel
                    </button>

                    <button
                        disabled={
                            !isFormValid ||
                            addBrandLoading
                        }
                        onClick={handleSubmit}
                        className={`
        flex items-center gap-2
        px-6 py-3 rounded-xl
        text-white text-sm font-bold
        shadow-[0_4px_14px_rgba(250,131,22,0.35)]
        transition-all
        ${isFormValid &&
                                !addBrandLoading
                                ? "bg-[#FA8316] hover:bg-[#e06c0c] cursor-pointer"
                                : "bg-[#FDBA74] cursor-not-allowed opacity-70"
                            }
    `}
                    >
                        {addBrandLoading ? (
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

                                Adding...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Add Brand
                            </>
                        )}
                    </button>

                </div>
                {addBrandError && (
                    <p className="text-sm text-end text-red-500 me-10 mb-2 font-medium">
                        {addBrandError}
                    </p>
                )}
            </div>
        </div >
    );
}
























// import React, { useState } from "react";
// import {
//     X,
//     Save,
//     ListFilter,
//     Pencil,
//     ChevronDown,
// } from "lucide-react";
// import { getMaterialCategoryTypeAhead } from "../../services/apis/getMaterialCategoryTypeAhead";
// import { getSubCategoryByCategory } from "../../services/apis/getSubCategoryByCategory";
// import { addBrand } from "../../services/apis/addBrand";


// export default function BrandModal({
//     isOpen,
//     onClose,
//     onSave,
// }) {



//     const [form, setForm] = useState({
//         catgId: "",
//         subCatgId: "",
//         brandName: "",
//         brandDesc: "",
//         categoryName: "",
//     });

//     const [categorySuggestions, setCategorySuggestions] =
//         useState([]);

//     const [categoryLoading, setCategoryLoading] =
//         useState(false);

//     const [categoryError, setCategoryError] =
//         useState("");


//     const [subCategoryOptions, setSubCategoryOptions] =
//         useState([]);

//     const [subCategoryLoading, setSubCategoryLoading] =
//         useState(false);

//     const [subCategoryError, setSubCategoryError] =
//         useState("");

//     const [addBrandLoading, setAddBrandLoading] =
//         useState(false);

//     const [addBrandError, setAddBrandError] =
//         useState("");



//     if (!isOpen) return null;


//     const handleClose = () => {
//         setForm({
//             catgId: "",
//             subCatgId: "",
//             brandName: "",
//             brandDesc: "",
//             categoryName: "",
//         });

//         setCategorySuggestions([]);
//         setCategoryError("");

//         setSubCategoryOptions([]);
//         setSubCategoryError("");

//         setAddBrandError("");
//         setAddBrandLoading(false);

//         onClose();
//     };



//     const handleCategorySearch = async (value) => {


//         setForm((prev) => ({
//             ...prev,
//             categoryName: value,
//             catgId: "",
//             subCatgId: "",
//         }));

//         setCategoryError("");
//         setCategorySuggestions([]);

//         setSubCategoryOptions([]);
//         setSubCategoryError("");

//         if (!value.trim()) {
//             setForm((prev) => ({
//                 ...prev,
//                 categoryName: "",
//                 catgId: "",
//                 subCatgId: "",
//             }));

//             setCategorySuggestions([]);
//             setCategoryError("");

//             setSubCategoryOptions([]);
//             setSubCategoryError("");

//             return;
//         }

//         try {
//             setCategoryLoading(true);

//             const response =
//                 await getMaterialCategoryTypeAhead(
//                     value
//                 );

//             if (response?.code === 0) {
//                 const refs =
//                     response?.data?.categoryRefs || [];

//                 if (refs.length > 0) {
//                     setCategorySuggestions(refs);
//                 } else {
//                     setCategorySuggestions([]);
//                     setCategoryError(
//                         "Category not found"
//                     );
//                 }
//             } else {
//                 setCategorySuggestions([]);

//                 setCategoryError(
//                     response?.message ||
//                     "Failed to fetch category"
//                 );
//             }
//         } catch (err) {
//             console.log(
//                 err,
//                 "category typeahead error"
//             );

//             setCategorySuggestions([]);

//             setCategoryError(
//                 err?.response?.data?.message ||
//                 "Failed to fetch category"
//             );
//         } finally {
//             setCategoryLoading(false);
//         }
//     };




//     const handleCategorySelect = (item) => {
//         setForm((prev) => ({
//             ...prev,
//             categoryName: item.catgName,
//             catgId: item.catgId,
//             subCatgId: "",
//         }));

//         setCategorySuggestions([]);
//         setCategoryError("");
//         setSubCategoryOptions([]);
//         setSubCategoryError("");
//     };


//     const fetchSubCategories = async () => {
//         if (!form.catgId) return;

//         try {
//             setSubCategoryLoading(true);

//             setSubCategoryError("");
//             setSubCategoryOptions([]);

//             const response =
//                 await getSubCategoryByCategory(
//                     form.catgId
//                 );

//             if (response?.code === 0) {
//                 const subCategories =
//                     response?.data
//                         ?.masterCategoryDTOS || [];

//                 if (
//                     subCategories.length > 0
//                 ) {
//                     setSubCategoryOptions(
//                         subCategories
//                     );
//                 } else {
//                     setSubCategoryOptions([]);

//                     setSubCategoryError(
//                         "Sub category not found for this category"
//                     );
//                 }
//             } else {
//                 setSubCategoryOptions([]);

//                 setSubCategoryError(
//                     response?.message ||
//                     "Failed to fetch sub categories"
//                 );
//             }
//         } catch (err) {
//             console.log(
//                 err,
//                 "subcategory fetch error"
//             );

//             setSubCategoryOptions([]);

//             setSubCategoryError(
//                 err?.response?.data
//                     ?.message ||
//                 "Failed to fetch sub categories"
//             );
//         } finally {
//             setSubCategoryLoading(false);
//         }
//     };


//     const isFormValid =
//         form.catgId &&
//         form.subCatgId &&
//         form.brandName.trim() &&
//         form.brandDesc.trim();



//     const handleSubmit = async () => {
//         try {
//             setAddBrandLoading(true);
//             setAddBrandError("");

//             const payload = {
//                 catgId: form.catgId,
//                 subCatgId: form.subCatgId,
//                 brandName:
//                     form.brandName.trim(),
//                 brandDesc:
//                     form.brandDesc.trim(),
//             };

//             console.log(
//                 payload,
//                 "brand payload"
//             );

//             const response =
//                 await addBrand(payload);

//             if (response?.code === 0) {
//                 handleClose();

//                 onSave();
//             } else {
//                 setAddBrandError(
//                     response?.message ||
//                     "Failed to add brand"
//                 );
//             }
//         } catch (err) {
//             console.log(
//                 err,
//                 "add brand error"
//             );

//             setAddBrandError(
//                 err?.response?.data
//                     ?.message ||
//                 "Failed to add brand"
//             );
//         } finally {
//             setAddBrandLoading(false);
//         }
//     };


//     return (
//         <div
//             className="
//         fixed inset-0 z-50
//         flex items-center justify-center
//         bg-black/30 backdrop-blur-sm
//         px-4
//       "
//             onClick={handleClose}
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
//                         onClick={handleClose}
//                         className="
//               text-[#94A3B8]
//               hover:text-[#FA8316]
//               transition-colors cursor-pointer
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
//                     <div className="flex flex-col gap-2 relative">
//                         <label className="text-sm font-bold text-[#1A2029]">
//                             Category Name
//                         </label>

//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={form.categoryName}
//                                 onChange={(e) =>
//                                     handleCategorySearch(
//                                         e.target.value
//                                     )
//                                 }
//                                 placeholder="Enter category name"
//                                 className="
//         w-full px-4 py-3 pr-12
//         rounded-xl
//         border border-orange-200
//         bg-[#FFFAF5]
//         text-sm text-[#1A2029]
//         placeholder-[#C4A882]
//         outline-none
//         focus:border-[#FA8316]
//         focus:ring-2
//         focus:ring-orange-100
//         transition
//       "
//                             />

//                             {/* Spinner */}
//                             {categoryLoading && (
//                                 <div
//                                     className="
//           absolute
//           right-4
//           top-1/2
//           -translate-y-1/2
//         "
//                                 >
//                                     <svg
//                                         className="
//             w-5 h-5
//             animate-spin
//             text-[#FA8316]
//           "
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <circle
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                             className="opacity-20"
//                                         />

//                                         <path
//                                             fill="currentColor"
//                                             className="opacity-80"
//                                             d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
//                                         />
//                                     </svg>
//                                 </div>
//                             )}

//                             {/* Suggestion list */}
//                             {categorySuggestions?.length >
//                                 0 && (
//                                     <ul
//                                         className="
//           absolute
//           top-full left-0 right-0
//           z-[999]
//           mt-2
//           bg-white
//           border border-orange-200
//           rounded-xl
//           shadow-lg
//           overflow-hidden
//           max-h-56
//           overflow-y-auto
//         "
//                                     >
//                                         {categorySuggestions.map(
//                                             (item) => (
//                                                 <li
//                                                     key={item.catgId}
//                                                     onClick={() =>
//                                                         handleCategorySelect(
//                                                             item
//                                                         )
//                                                     }
//                                                     className="
//                 px-4 py-3
//                 text-sm
//                 text-[#1A2029]
//                 hover:bg-orange-50
//                 cursor-pointer
//                 border-b
//                 border-gray-100
//                 last:border-none
//               "
//                                                 >
//                                                     {item.catgName}
//                                                 </li>
//                                             )
//                                         )}
//                                     </ul>
//                                 )}
//                         </div>

//                         {/* Error */}
//                         {categoryError && (
//                             <p className="text-sm text-red-500">
//                                 {categoryError}
//                             </p>
//                         )}
//                     </div>

//                     {/* Sub Category Name */}
//                     <div className="flex flex-col gap-2">
//                         <label className="text-sm font-bold text-[#1A2029]">
//                             Sub Category Name
//                         </label>

//                         <div className="relative">
//                             <select
//                                 value={form.subCatgId}
//                                 disabled={!form.catgId}
//                                 onFocus={() => {
//                                     setSubCategoryError("");

//                                     if (
//                                         form.catgId &&
//                                         subCategoryOptions.length === 0
//                                     ) {
//                                         fetchSubCategories();
//                                     }
//                                 }}
//                                 onChange={(e) =>
//                                     setForm((prev) => ({
//                                         ...prev,
//                                         subCatgId:
//                                             e.target.value,
//                                     }))
//                                 }
//                                 className={`
//                 w-full px-4 py-3 pr-12
//                 rounded-xl
//                 border border-orange-200
//                 text-sm text-[#1A2029]
//                 outline-none
//                 transition
//                 appearance-none
//                 ${!form.catgId
//                                         ? "bg-gray-100 cursor-not-allowed opacity-70"
//                                         : "bg-[#FFFAF5] focus:border-[#FA8316] focus:ring-2 focus:ring-orange-100"
//                                     }
//             `}
//                             >
//                                 <option value="">
//                                     Select sub category
//                                 </option>

//                                 {subCategoryOptions.map(
//                                     (item) => (
//                                         <option
//                                             key={
//                                                 item.subCatgId
//                                             }
//                                             value={
//                                                 item.subCatgId
//                                             }
//                                         >
//                                             {
//                                                 item.subCatgName
//                                             }
//                                         </option>
//                                     )
//                                 )}
//                             </select>

//                             {subCategoryLoading && (
//                                 <div
//                                     className="
//                     absolute
//                     right-10
//                     top-1/2
//                     -translate-y-1/2
//                 "
//                                 >
//                                     <svg
//                                         className="
//                         w-5 h-5
//                         animate-spin
//                         text-[#FA8316]
//                     "
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <circle
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                             className="opacity-20"
//                                         />

//                                         <path
//                                             fill="currentColor"
//                                             className="opacity-80"
//                                             d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
//                                         />
//                                     </svg>
//                                 </div>
//                             )}

//                             <ChevronDown
//                                 className="
//                 absolute right-4 top-1/2
//                 -translate-y-1/2
//                 w-4 h-4
//                 text-[#94A3B8]
//                 pointer-events-none
//             "
//                             />
//                         </div>

//                         {subCategoryError && (
//                             <p className="text-sm text-red-500">
//                                 {subCategoryError}
//                             </p>
//                         )}
//                     </div>

//                     {/* Brand Name */}
//                     <div className="flex flex-col gap-2">
//                         <label className="text-sm font-bold text-[#1A2029]">
//                             Brand Name
//                         </label>

//                         <input
//                             type="text"
//                             value={form.brandName}
//                             onChange={(e) =>
//                                 setForm((prev) => ({
//                                     ...prev,
//                                     brandName:
//                                         e.target.value,
//                                 }))
//                             }
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
//                             value={form.brandDesc}
//                             onChange={(e) =>
//                                 setForm((prev) => ({
//                                     ...prev,
//                                     brandDesc:
//                                         e.target.value,
//                                 }))
//                             }
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
//                         onClick={handleClose}
//                         className="
//               text-sm font-semibold
//               text-[#1A2029]
//               hover:text-[#FA8316]
//               transition-colors
//               px-2 cursor-pointer
//             "
//                     >
//                         Cancel
//                     </button>

//                     <button
//                         disabled={
//                             !isFormValid ||
//                             addBrandLoading
//                         }
//                         onClick={handleSubmit}
//                         className={`
//         flex items-center gap-2
//         px-6 py-3 rounded-xl
//         text-white text-sm font-bold
//         shadow-[0_4px_14px_rgba(250,131,22,0.35)]
//         transition-all
//         ${isFormValid &&
//                                 !addBrandLoading
//                                 ? "bg-[#FA8316] hover:bg-[#e06c0c] cursor-pointer"
//                                 : "bg-[#FDBA74] cursor-not-allowed opacity-70"
//                             }
//     `}
//                     >
//                         {addBrandLoading ? (
//                             <>
//                                 <svg
//                                     className="w-4 h-4 animate-spin"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <circle
//                                         className="opacity-25"
//                                         cx="12"
//                                         cy="12"
//                                         r="10"
//                                         stroke="currentColor"
//                                         strokeWidth="4"
//                                     />

//                                     <path
//                                         className="opacity-75"
//                                         fill="currentColor"
//                                         d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
//                                     />
//                                 </svg>

//                                 Adding...
//                             </>
//                         ) : (
//                             <>
//                                 <Save className="w-4 h-4" />
//                                 Add Brand
//                             </>
//                         )}
//                     </button>

//                 </div>
//                 {addBrandError && (
//                     <p className="text-sm text-end text-red-500 me-10 mb-2 font-medium">
//                         {addBrandError}
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// }
