import { useEffect, useState } from "react";
import { getQuotationDetail } from "../../services/apis/getQuotationDetail";

export default function QuotationsDetailTable({
  quotationId,
}) {

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDetails = async () => {

    try {

      setLoading(true);
      setError("");

      const res =
        await getQuotationDetail(
          quotationId
        );

      if (res?.code === 0) {

        if (
          res?.data?.details?.length > 0
        ) {
          setDetails(
            res.data.details
          );
        } else {
          setDetails([]);
        }

      } else {
        setError(
          res?.message ||
          "Failed"
        );
      }

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch quotation details"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [quotationId]);

  if (loading) {
    return (
      <div className="bg-[#F9EDE5] p-8 flex justify-center">
        <div className="h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F9EDE5] p-8 text-center">

        <p className="text-red-500 mb-3">
          {error}
        </p>

        <button
          onClick={fetchDetails}
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          Retry
        </button>

      </div>
    );
  }

  if (details.length === 0) {
    return (
      <div className="bg-[#F9EDE5] p-8 text-center">
        Quotation details not found
      </div>
    );
  }

  const thClass =
    "px-4 py-3 text-left text-[10px] font-bold tracking-[1.5px] uppercase text-white bg-[#F97316] whitespace-nowrap";
  const tdClass =
    "px-4 py-3 text-[12.5px] text-[#4B5563] border-b border-[#EEF2F6] whitespace-normal break-words leading-5 align-top";


  return (
    <div className="bg-[#F9EDE5] p-5">

      <table className="w-full border-collapse rounded-t-[10px] rounded-b-[10px] overflow-hidden border border-[#DDC1AE]">

        <thead>

          <tr className="bg-[#F17209] text-white ">

            <th className={`${thClass}`}>Material Detail Id</th>
            <th className={`${thClass}`}>Material Name</th>
            <th className={`${thClass}`}>Quantity</th>
            <th className={`${thClass}`}>Units</th>
            <th className={`${thClass}`}>Brand</th>
            <th className={`${thClass}`}>Quotation Details Id</th>
            <th className={`${thClass}`}>Quoted Material</th>
            <th className={`${thClass}`}>Quoted Qty</th>
            <th className={`${thClass}`}>Quoted Units</th>
            <th className={`${thClass}`}>Quoted Brand</th>
            <th className={`${thClass}`}>Quoted Rate</th>
            <th className={`${thClass}`}>Availability</th>

          </tr>

        </thead>

        <tbody>

          {details.map(item => (

            <tr
              key={
                item.quotationDetailsId
              }
              className="bg-white border-b border-[#DDC1AE]"
            >

              <td className={`${tdClass}`}>{item.materialDetailId}</td>
              <td className={`${tdClass}`}>{item.materialName}</td>
              <td className={`${tdClass}`}>{item.quantity}</td>
              <td className={`${tdClass}`}>{item.units}</td>
              <td className={`${tdClass}`}>{item.brand}</td>
              <td className={`${tdClass}`}>{item.quotationDetailsId}</td>
              <td className={`${tdClass}`}>{item.quotedMaterialName}</td>
              <td className={`${tdClass}`}>{item.quotedQuantity}</td>
              <td className={`${tdClass}`}>{item.quotedUnits}</td>
              <td className={`${tdClass}`}>{item.quotedBrand}</td>
              <td className={`${tdClass}`}>{item.quotedRate}</td>
              <td className={`${tdClass}`}>{item.quotedAvailability}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}