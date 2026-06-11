// src/pages/app/demandManagement/projectDetails/components/FloatMeta.jsx

const FloatMeta = ({ label, value }) => (
  <div className="pr-4 sm:pr-6 lg:pr-8 min-w-0">
    <p
      className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.55px] truncate"
      style={{ color: "rgba(86,67,52,0.7)" }}
    >
      {label}
    </p>
    <p
      className="text-[13px] sm:text-[14px] font-semibold tracking-[0.28px] mt-1 truncate"
      style={{ color: "#191C1D" }}
    >
      {value}
    </p>
  </div>
);

export default FloatMeta;