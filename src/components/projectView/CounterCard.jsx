// src/pages/app/demandManagement/projectDetails/components/CounterCard.jsx

const CounterCard = ({ iconBg, iconColor, iconType, count, label }) => (
  <div
    className="rounded-xl bg-white flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-6"
    style={{ border: "1px solid #DDC1AE" }}
  >
    {/* Icon box */}
    <div
      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: iconBg }}
    >
      {iconType === "workers" ? (
        <svg width="20" height="16" viewBox="0 0 24 20" fill="none" className="sm:w-[22px] sm:h-[18px]">
          <path
            d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
            fill={iconColor}
          />
        </svg>
      ) : (
        <svg width="14" height="18" viewBox="0 0 16 20" fill="none" className="sm:w-4 sm:h-5">
          <path
            d="M14 2H2C.9 2 0 2.9 0 4v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H2V4h12v12zM4 9h8v1.5H4V9zm0 3h8v1.5H4V12zm0-6h8v1.5H4V6z"
            fill={iconColor}
          />
        </svg>
      )}
    </div>

    <div className="min-w-0">
      <p
        className="text-[24px] sm:text-[28px] font-bold leading-tight sm:leading-9"
        style={{ color: "#191C1D" }}
      >
        {count}
      </p>
      <p
        className="text-[12px] sm:text-[13px] font-normal"
        style={{ color: "#564334" }}
      >
        {label}
      </p>
    </div>
  </div>
);

export default CounterCard;