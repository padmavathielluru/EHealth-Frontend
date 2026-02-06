import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Title from "./Title";
import TimeFilter from "./Monthlydropdown";
import {
  monthlyData,
  quarterlyData,
  halfYearlyData,
  yearlyData,
  customData,
} from "../utils/LinegraphConstants";
import useIsMobile from "../hooks/UseIsMobile";

const LineGraph: React.FC = () => {
  const [filter, setFilter] = useState("Monthly");
  const isMobile = useIsMobile();

  const getData = () => {
    switch (filter) {
      case "Quarterly":
        return quarterlyData;
      case "Half-Yearly":
        return halfYearlyData;
      case "Yearly":
        return yearlyData;
      case "custom":
        return customData;
      default:
        return monthlyData;
    }
  };

  const chartMargin = isMobile
    ? { top: 12, right: 8, left: -8, bottom: 24 }
    : { top: 20, right: 20, left: 0, bottom: 30 };

  const axisTickFontSize = isMobile ? 10 : 12;
  const yTicks = isMobile ? [0, 25, 50, 75, 100] : [0, 20, 40, 60, 80, 100];

  const renderLegend = () => (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-6 pb-2 sm:pb-8 bg-transparent">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-md bg-blue-400" />
        <span className="text-xs sm:text-sm text-gray-700">Consultations</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-md bg-yellow-400" />
        <span className="text-xs sm:text-sm text-gray-700">Patients</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-md bg-purple-400" />
        <span className="text-xs sm:text-sm text-gray-700">New Patients</span>
      </div>
    </div>
  );

  const renderTooltip = (props: any) => {
    const { active, payload, label } = props;
    if (!active || !payload?.length) return null;
    return (
      <div
        className="px-3 py-2 bg-white rounded-lg shadow-md border border-gray-200"
        style={{ fontSize: isMobile ? 12 : 14 }}
      >
        <p className="font-semibold text-gray-900 mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.dataKey} style={{ color: entry.color }}>
            {entry.name === "NewPatients" ? "New Patients" : entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full min-w-0 sm:px-6">
      {/* Header: Title + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-0 mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <Title
            text="Patient Statistics"
            subtitle="View your patient data over different time periods"
          />
        </div>
        <div className="w-full sm:w-[179px] mt-2 sm:mt-0">
          <TimeFilter value={filter} onChange={setFilter} />
        </div>
      </div>

      {/* Chart - responsive height, touch-friendly */}
      <div className="w-full min-w-0 h-[280px] sm:h-[350px] md:h-[450px] bg-white rounded-lg p-2 sm:p-4 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={getData()}
            margin={chartMargin}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: axisTickFontSize, fill: "#6b7280" }}
              interval={isMobile ? "preserveStartEnd" : 0}
              minTickGap={isMobile ? 24 : 0}
            />
            <YAxis
              ticks={yTicks}
              domain={[0, 100]}
              tick={{ fontSize: axisTickFontSize, fill: "#6b7280" }}
              width={isMobile ? 28 : 40}
              tickFormatter={(value) => String(value)}
            />
            <Tooltip content={renderTooltip} />
            <Legend
              content={renderLegend}
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                bottom: 0,
                left: 0,
                right: 0,
                position: "absolute",
              }}
            />
            <Line
              type="monotone"
              dataKey="Consultations"
              stroke="#60A5FA"
              strokeWidth={isMobile ? 1.5 : 2}
              dot={{ r: isMobile ? 0 : 1 }}
              activeDot={{ r: isMobile ? 4 : 3 }}
            />
            <Line
              type="monotone"
              dataKey="Patients"
              stroke="#FBBF24"
              strokeWidth={isMobile ? 1.5 : 2}
              dot={{ r: isMobile ? 0 : 1 }}
              activeDot={{ r: isMobile ? 4 : 3 }}
            />
            <Line
              type="monotone"
              dataKey="NewPatients"
              stroke="#C084FC"
              strokeWidth={isMobile ? 1.5 : 2}
              dot={{ r: isMobile ? 0 : 1 }}
              activeDot={{ r: isMobile ? 4 : 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineGraph;
