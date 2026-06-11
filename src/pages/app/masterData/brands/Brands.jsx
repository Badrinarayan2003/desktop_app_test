import React, { useEffect, useState } from "react";
import {
    Plus,
    ChevronRight,
    Edit2Icon,
    Edit,
    Search,
} from "lucide-react";

import { getAllBrands }
    from "../../../../services/apis/getAllBrands";



import BrandModal from "../../../../components/brandModal/BrandModal";
import UpdateBrandModal from "../../../../components/updateBrandModal/UpdateBrandModal";



export default function Brands() {
    const [data, setData] = useState([]);
    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    const [modalOpen, setModalOpen] =
        useState(false);

    // Update modal
    const [updateModalOpen,
        setUpdateModalOpen] =
        useState(false);

    const [selectedBrand,
        setSelectedBrand] =
        useState(null);

    const [searchTerm, setSearchTerm] = useState("");



    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            setLoading(true);
            setError("");

            const response =
                await getAllBrands();

            if (response?.code === 0) {
                const brandInfos =
                    response?.data?.brandInfos || [];

                if (brandInfos.length > 0) {
                    const formattedData =
                        brandInfos.map(
                            (item, index) => ({
                                uniqueId: `${item.brandId}-${index}`,
                                brandId:
                                    item.brandId ?? "-",
                                catgId:
                                    item.catgId ?? "-",
                                subCatgId:
                                    item.subCatgId ?? "-",
                                brandName:
                                    item.brandName ?? "-",
                                brandDesc:
                                    item.brandDesc ?? "-",
                                catgName:
                                    item.catgName ?? "-",
                                subCatgName:
                                    item.subCatgName ?? "-",
                            })
                        );

                    setData(formattedData);
                } else {
                    setData([]);
                    setError(
                        "Brand not found"
                    );
                }
            } else {
                setError(
                    response?.message ||
                    "Failed to fetch brands"
                );
            }
        } catch (err) {
            console.log(
                err,
                "brands fetch error"
            );

            setError(
                err?.response?.data
                    ?.message ||
                "Failed to fetch brands"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (row) => {
        setSelectedBrand(row);
        setUpdateModalOpen(true);
    };

    const filteredData = data.filter((row) => {
        const search = searchTerm.toLowerCase().trim();

        return (
            (row?.brandId || "")
                .toString()
                .toLowerCase()
                .includes(search) ||

            (row?.brandName || "")
                .toLowerCase()
                .includes(search)
        );
    });


    return (
        <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 mb-3 text-[11px] font-semibold uppercase tracking-widest">
                <span className="text-[#94A3B8] hover:text-[#FA8316] cursor-pointer transition-colors">
                    Master Data
                </span>

                <ChevronRight className="w-3 h-3 text-[#94A3B8]" />

                <span className="text-[#FA8316]">
                    Brands
                </span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                <h1 className="text-3xl sm:text-4xl font-bold text-[#0C121A] tracking-tight">
                    Brand Master
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
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            placeholder="Search Brand ID or Brand Name"
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
                        onClick={() => setModalOpen(true)}
                        className="flex cursor-pointer items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FA8316] hover:bg-[#e06c0c] active:bg-[#c85f0a] text-white text-sm font-bold tracking-wide shadow-[0_8px_20px_-4px_rgba(250,131,22,0.4)] transition-all duration-200"
                    >
                        <Plus
                            className="w-4 h-4"
                            strokeWidth={2.5}
                        />
                        Add Brand
                    </button>

                </div>

            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-[#E3E8EC] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1200px]">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-[#E3E8EC]">
                                {[
                                    "Brand ID",
                                    "Brand Name",
                                    "Brand Description",
                                    "Category ID",
                                    "Category Name",
                                    "Sub Category ID",
                                    "Sub Category Name",
                                    "Action"
                                ].map((col) => (
                                    <th
                                        key={col}
                                        className="
                      px-6 py-4
                      text-left
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-[#94A3B8]
                    "
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="py-14"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="w-8 h-8 border-[3px] border-[#FA8316]/30 border-t-[#FA8316] rounded-full animate-spin" />

                                            <p className="text-sm text-[#64748B]">
                                                Loading brands...
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="py-14"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <p className="text-sm text-red-500 font-medium">
                                                {error}
                                            </p>
                                            {error !== "Brand not found" && (
                                                <button
                                                    onClick={
                                                        fetchBrands
                                                    }
                                                    className="
                          px-5 py-2
                          rounded-xl
                          bg-[#FA8316]
                          hover:bg-[#e06c0c]
                          text-white
                          text-sm
                          font-semibold
                          transition-colors cursor-pointer
                        "
                                                >
                                                    Retry
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredData.length > 0 ? (
                                filteredData.map(
                                    (row, index) => (
                                        <tr
                                            key={
                                                row.uniqueId
                                            }
                                            className={`hover:bg-gray-50/60 transition-colors ${index !==
                                                filteredData.length - 1
                                                ? "border-b border-[#F1F5F9]"
                                                : ""
                                                }`}
                                        >
                                            <td className="px-6 py-5 text-sm text-[#64748B] font-medium">
                                                {row.brandId}
                                            </td>

                                            <td className="px-6 py-5 text-sm font-semibold text-[#0C121A]">
                                                {row.brandName}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-[#374151]">
                                                {row.brandDesc}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-[#374151]">
                                                {row.catgId}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-[#374151]">
                                                {row.catgName}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-[#374151]">
                                                {row.subCatgId}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-[#374151]">
                                                {row.subCatgName}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-[#374151]">
                                                <Edit
                                                    onClick={() =>
                                                        handleEdit(row)
                                                    }
                                                    className="w-5 h-5 cursor-pointer" color="#FA8316" />
                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="py-14 text-center text-[#64748B]"
                                    >
                                        {searchTerm
                                            ? "No matching brands found"
                                            : "Brand not found"}
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>




            <BrandModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={fetchBrands}
            />

            <UpdateBrandModal
                isOpen={updateModalOpen}
                onClose={() =>
                    setUpdateModalOpen(false)
                }
                onUpdate={fetchBrands}
                brand={selectedBrand}
            />


        </div>
    );
}