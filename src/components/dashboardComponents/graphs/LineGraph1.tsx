import React from "react";
import { LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";

interface LineGraphProps {
    data: { month: string; value: number }[];
    color: string;
    legendLabel: string;
}

const CustomLegend = ({ color, label }: any) => {
    return (
        <div className="flex justify-end items-center gap-2 mr-2">
            <span className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: color }} />
            <span className="text-xs text-gray-500 font-medium">
                {label}
            </span>
        </div>
    )
}

const LineGraph1: React.FC<LineGraphProps> = ({ data, color, legendLabel, }) => {
    return (
        <div className="w-[815px] h-[205px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                    data={data}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0}}>

                    <CartesianGrid  stroke="#e6e9ec" vertical={true} horizontal={true}/>

                    <XAxis dataKey="month" 
                    angle={-45}
                    textAnchor="end"
                    height={40}
                    tick={{ fontSize: 10, fill: "#9CA3AF" }} 
                    axisLine={false}
                    tickLine={false}/>

                    <YAxis ticks={[0, 40, 80, 120]}
                        tick={{ fontSize: 10, fill: "#9CA3AF"}}
                        axisLine={false}
                        tickLine={false}
                     />

                    <Tooltip contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        fontSize: "12px",
                    }}/>
                    
                    <Legend verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: 12}}
                    content={<CustomLegend color={color} label={legendLabel} />}
                        />

                    <Line type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r:4 }}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineGraph1;