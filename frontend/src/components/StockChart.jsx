import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function StockChart({ data }) {

    return (
        <div className="bg-[#171717] p-4 rounded-2xl mt-4">

            <h2 className="text-lg font-bold mb-4">
                Stock Price Trend
            </h2>

            <ResponsiveContainer width="100%" height={300}>

                <LineChart data={data}>

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="price"
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}

export default StockChart;