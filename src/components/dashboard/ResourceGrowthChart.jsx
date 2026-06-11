// ResourceGrowthChart.jsx
// Usage in Dashboard.jsx:
//   import ResourceGrowthChart from '../../../components/resourceGrowthChart/ResourceGrowthChart';
//   import { resourceGrowthData } from '../../../data/sampleData';
//   ...
//   <ResourceGrowthChart data={resourceGrowthData} growthPercent={12.4} />

import { TrendingUp, ChevronRight } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Dot,
} from "recharts";

// Custom dot — only renders on the LAST data point for "this month"
function LastDot(props) {
  const { cx, cy, index, dataLength } = props;
  if (index !== dataLength - 1) return null;
  return (
    <g>
      {/* Outer glow ring */}
      <circle cx={cx} cy={cy} r={10} fill="rgba(250,131,22,0.25)" />
      {/* Inner solid dot */}
      <circle cx={cx} cy={cy} r={5} fill="#FA8316" stroke="#fff" strokeWidth={2} />
    </g>
  );
}

// Minimal tooltip
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#E3E8EC] rounded-xl px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-[#191C1E] mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="font-medium">
          {entry.name === "thisMonth" ? "This month" : "Last month"}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export default function ResourceGrowthChart({ data = [], growthPercent = 12.4 }) {
  const isPositive = growthPercent >= 0;

  return (
    <div className="bg-white border border-[#E3E8EC] rounded-[20px] p-6 w-full">
      {/* ── Top bar ── */}
      <div className="flex items-start justify-between mb-1">
        {/* Left: title + legend */}
        <div>
          <h2 className="text-xl font-bold text-[#191C1E] leading-tight mb-3">
            Monthly Resource Growth
          </h2>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.4px] text-[#574336]">
              <span className="w-3 h-3 rounded-full bg-[#FA8316] inline-block" />
              This Month
            </span>
            <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.4px] text-[#574336]">
              <span className="w-3 h-3 rounded-full bg-[#CBD5E1] inline-block" />
              Last Month
            </span>
          </div>
        </div>

        {/* Right: growth indicator + view all */}
        <div className="flex flex-col items-end gap-1">
          <button className="flex items-center gap-1 text-[#FA8316] text-sm font-semibold hover:opacity-80 transition-opacity mb-2">
            View all <ChevronRight className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
            <span className="text-2xl font-bold text-emerald-600 tracking-tight">
              {isPositive ? "+" : ""}{growthPercent}%
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#9CA3AF]">
            Growth Indicator
          </span>
        </div>
      </div>

      {/* ── Chart ── */}
      <div className="w-full h-52 sm:h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 16, right: 8, left: -32, bottom: 0 }}
          >
            <defs>
              <linearGradient id="thisMonthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FA8316" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#FA8316" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            {/* Subtle horizontal grid only */}
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke="#E3E8EC"
              strokeDasharray="0"
            />

            <XAxis
              dataKey="week"
              axisLine={{ stroke: "#E3E8EC" }}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 700, fill: "#9CA3AF", letterSpacing: "0.1em" }}
              dy={12}
            />
            <YAxis hide />

            <Tooltip content={<CustomTooltip />} cursor={false} />

            {/* Last month — dashed grey, no fill */}
            <Area
              type="monotone"
              dataKey="lastMonth"
              stroke="#CBD5E1"
              strokeWidth={1.5}
              strokeDasharray="6 4"
              fill="none"
              dot={false}
              activeDot={false}
            />

            {/* This month — solid orange with gradient fill + last-point dot */}
            <Area
              type="monotone"
              dataKey="thisMonth"
              stroke="#FA8316"
              strokeWidth={2.5}
              fill="url(#thisMonthGrad)"
              dot={(props) => (
                <LastDot key={props.index} {...props} dataLength={data.length} />
              )}
              activeDot={{ r: 5, fill: "#FA8316", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}