import { useEffect, useState } from "react";

import { Search } from "lucide-react";

import { getAllSellers }
    from "../../../../services/apis/getAllSellers";

import ToggleSellerStateModal
    from "../../../../components/userManagement/seller/ToggleSellerStateModal";

export default function Sellers() {
    const [rows, setRows] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [searchText,
        setSearchText] =
        useState("");

    const [selectedSeller,
        setSelectedSeller] =
        useState(null);

    const [isModalOpen,
        setIsModalOpen] =
        useState(false);


    async function fetchSellers() {
        try {
            setLoading(true);
            setError("");

            const response =
                await getAllSellers();

            if (
                response?.code ===
                0
            ) {
                const details =
                    response?.data
                        ?.details || [];

                if (
                    details.length > 0
                ) {
                    setRows(details);
                } else {
                    setRows([]);
                }
            } else {
                setRows([]);

                setError(
                    response?.message ||
                    "Failed to fetch sellers"
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

    useEffect(() => {
        fetchSellers();
    }, []);

    function openToggleModal(
        seller
    ) {
        setSelectedSeller(
            seller
        );

        setIsModalOpen(
            true
        );
    }

    function closeToggleModal() {
        setSelectedSeller(
            null
        );

        setIsModalOpen(
            false
        );
    }

    const filteredRows =
        rows.filter((row) => {
            const search =
                searchText
                    .toLowerCase()
                    .trim();

            const name =
                row?.name
                    ?.toLowerCase() ||
                "";

            const mobile =
                row?.mobileNumber ||
                "";

            const shopName =
                row?.shopName
                    ?.toLowerCase() ||
                "";

            return (
                name.includes(
                    search
                ) ||
                mobile.includes(
                    search
                ) ||
                shopName.includes(
                    search
                )
            );
        });

    const thClass =
        "px-4 py-3 text-left text-[10px] font-bold tracking-[1.5px] uppercase text-[#5B6472] bg-[#F4F6F8] whitespace-nowrap border-b border-[#E7EBF0]";

    const tdClass =
        "px-4 py-3 text-[13px] border-b border-[#EEF2F6] align-middle text-[#515F74]";

    return (
        <div className="min-h-screen bg-white">
            <>
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#515F74]">
                        Seller
                        Management
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
                        Sellers
                    </span>
                </nav>

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                    <h1 className="text-[30px] font-black text-[#191C1E] leading-[36px] tracking-[-0.75px]">
                        Sellers
                    </h1>

                    <div className="relative w-full lg:w-[360px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />

                        <input
                            type="text"
                            value={
                                searchText
                            }
                            onChange={(
                                e
                            ) =>
                                setSearchText(
                                    e.target
                                        .value
                                )
                            }
                            placeholder="Search by name, shop or mobile number"
                            className="w-full h-[48px] bg-white border border-[#E7EBF0] rounded-xl pl-11 pr-4 text-[14px] text-[#191C1E] outline-none focus:border-[#FA7C14] transition"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto w-full">
                    <table className="w-full min-w-[3400px] border-collapse table-fixed">
                        <thead>
                            <tr>
                                <th className={`${thClass} w-[150px]`}>
                                    Mobile Number
                                </th>

                                <th className={`${thClass} w-[180px]`}>
                                    Name
                                </th>

                                <th className={`${thClass} w-[220px]`}>
                                    Email
                                </th>

                                <th className={`${thClass} w-[140px]`}>
                                    Latitude
                                </th>

                                <th className={`${thClass} w-[140px]`}>
                                    Longitude
                                </th>

                                <th className={`${thClass} w-[120px]`}>
                                    Role
                                </th>

                                <th className={`${thClass} w-[140px]`}>
                                    City
                                </th>

                                <th className={`${thClass} w-[160px]`}>
                                    District
                                </th>

                                <th className={`${thClass} w-[180px]`}>
                                    State
                                </th>

                                <th className={`${thClass} w-[120px]`}>
                                    Pin Code
                                </th>

                                <th className={`${thClass} w-[250px]`}>
                                    Address
                                </th>

                                <th className={`${thClass} w-[180px]`}>
                                    PAN Number
                                </th>

                                <th className={`${thClass} w-[180px]`}>
                                    PAN URL
                                </th>

                                <th className={`${thClass} w-[180px]`}>
                                    Aadhaar Number
                                </th>

                                <th className={`${thClass} w-[180px]`}>
                                    Aadhaar URL
                                </th>

                                <th className={`${thClass} w-[180px]`}>
                                    Shop Name
                                </th>

                                <th className={`${thClass} w-[180px]`}>
                                    GST
                                </th>

                                <th className={`${thClass} w-[250px]`}>
                                    Material Category
                                </th>

                                <th className={`${thClass} w-[180px]`}>
                                    Delivery Available
                                </th>

                                <th className={`${thClass} w-[180px]`}>
                                    Seller Type
                                </th>

                                <th className={`${thClass} w-[220px]`}>
                                    GST Shop License URL
                                </th>

                                <th className={`${thClass} w-[150px]`}>
                                    Delivery Radius
                                </th>

                                <th className={`${thClass} w-[120px]`}>
                                    Status
                                </th>

                                <th className={`${thClass} text-center w-[150px]`}>
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="py-16"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <div className="w-10 h-10 border-4 border-[#FA7C14] border-t-transparent rounded-full animate-spin" />

                                            <p className="text-[#515F74] text-sm">
                                                Loading
                                                sellers...
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="py-16"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <p className="text-red-500 text-sm font-medium text-center">
                                                {error}
                                            </p>

                                            <button
                                                onClick={
                                                    fetchSellers
                                                }
                                                className="bg-[#FA7C14] hover:opacity-90 text-white px-5 py-2 rounded-lg text-sm font-semibold transition"
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredRows?.length >
                                0 ? (
                                filteredRows.map(
                                    (
                                        row,
                                        index
                                    ) => (
                                        <tr
                                            key={
                                                index
                                            }
                                            className="bg-white hover:bg-[#FAFBFC] transition-colors"
                                        >
                                            <td className={tdClass}>
                                                {row?.mobileNumber || "-"}
                                            </td>

                                            <td className={`${tdClass} font-semibold text-[#191C1E]`}>
                                                {row?.name || "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.email || "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.latitude ?? "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.longitude ?? "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.role || "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.city || "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.district || "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.state || "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.pinCode || "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.address || "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.panCardNumber || "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.panCardUrl ? (
                                                    <a
                                                        href={row.panCardUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-[#FA7C14] underline"
                                                    >
                                                        View
                                                    </a>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.aadhaarNumber || "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.aadhaarUrl ? (
                                                    <a
                                                        href={row.aadhaarUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-[#FA7C14] underline"
                                                    >
                                                        View
                                                    </a>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.shopName || "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.gst || "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.materialCategory || "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.isDeliveryAvailable
                                                    ? "Yes"
                                                    : "No"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.sellerType || "-"}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.gstShopLicenseUrl ? (
                                                    <a
                                                        href={row.gstShopLicenseUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-[#FA7C14] underline"
                                                    >
                                                        View
                                                    </a>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>

                                            <td className={tdClass}>
                                                {row?.deliveryRadius ?? "-"}
                                                km
                                            </td>

                                            <td className={tdClass}>
                                                <span
                                                    className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase whitespace-nowrap ${row?.isActive
                                                        ? "bg-[#C9EDE4] text-[#006C49]"
                                                        : "bg-[#F9EDE5] text-[#FA7C14] border border-[#FFC28B]"
                                                        }`}
                                                >
                                                    {row?.isActive
                                                        ? "ACTIVE"
                                                        : "BLACKLISTED"}
                                                </span>
                                            </td>

                                            <td className={`${tdClass} text-center`}>
                                                {row?.isActive ? (
                                                    <button
                                                        onClick={() =>
                                                            openToggleModal(
                                                                row
                                                            )
                                                        }
                                                        className="bg-black cursor-pointer text-white rounded-lg px-4 py-[7px] text-[11.5px] font-semibold whitespace-nowrap"
                                                    >
                                                        Blacklist
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            openToggleModal(
                                                                row
                                                            )
                                                        }
                                                        className="bg-[#F17209] cursor-pointer text-white rounded-lg px-4 py-[7px] text-[11.5px] font-semibold whitespace-nowrap"
                                                    >
                                                        Activate
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="text-center py-16 text-[#515F74]"
                                    >
                                        {searchText
                                            ? "No matching seller found"
                                            : "Sellers not found"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </>

            <ToggleSellerStateModal
                isOpen={
                    isModalOpen
                }
                onClose={
                    closeToggleModal
                }
                seller={
                    selectedSeller
                }
                refetchSellers={
                    fetchSellers
                }
            />
        </div>
    );
}

