// src/pages/app/demandManagement/projectDetails/components/CostRow.jsx

const CostRow = ({ dot, label, value }) => (
  <div className="flex items-center justify-between gap-2">
    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: dot }}
      />
      <span
        className="text-[13px] sm:text-[14px] font-normal truncate"
        style={{ color: "#564334" }}
      >
        {label}
      </span>
    </div>
    <span
      className="text-[13px] sm:text-[14px] font-semibold tracking-[0.28px] flex-shrink-0"
      style={{ color: "#191C1D" }}
    >
      {value}
    </span>
  </div>
);

export default CostRow;