// src/pages/app/demandManagement/projectDetails/components/QuoteCard.jsx

const QuoteCard = ({ quote: q }) => (
  <div
    className="rounded-xl bg-white flex flex-col gap-1"
    style={{ border: "1px solid #DDC1AE", padding: 20 }}
  >
    {/* Top row: icon + price */}
    <div className="flex items-start justify-between mb-0">
      <div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded flex items-center justify-center text-base sm:text-lg flex-shrink-0"
        style={{ background: "#F3F4F5" }}
      >
        {q.icon}
      </div>
      <span
        className="text-[18px] sm:text-[20px] font-bold leading-7"
        style={{ color: "#191C1D" }}
      >
        {q.price}
      </span>
    </div>

    {/* Name */}
    <div className="pt-2 sm:pt-3">
      <p
        className="text-[13px] sm:text-[14px] font-semibold tracking-[0.28px]"
        style={{ color: "#191C1D" }}
      >
        {q.name}
      </p>
    </div>

    {/* Supplier */}
    <p className="text-[12px] sm:text-[13px] font-normal" style={{ color: "#564334" }}>
      {q.supplier}
    </p>

    {/* Footer: expiry + arrow */}
    <div className="flex items-center justify-between pt-2 sm:pt-3">
      <div className="flex items-center gap-1">
        {/* Clock icon */}
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path
            d="M6 1.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM6.5 7H5.5V3.5h1V6H8v1H6.5z"
            fill="#BA1A1A"
          />
        </svg>
        <span className="text-[11px] sm:text-[12px] font-medium" style={{ color: "#BA1A1A" }}>
          {q.expiry}
        </span>
      </div>
      {/* Arrow */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#564334"
        strokeWidth="2"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  </div>
);

export default QuoteCard;