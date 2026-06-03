import axios from "axios";
import { useState } from "react";
import StockChart from "./StockChart";
function StockSearch() {

    const [symbol, setSymbol] = useState("");
    const [stock, setStock] = useState(null);
    const [overview, setOverview] = useState(null);
    const [history, setHistory] = useState([]);

    const searchStock = async () => {

        try {

            const stockResponse = await axios.get(
                `http://127.0.0.1:8000/stock/${symbol}`
            );

            setStock(stockResponse.data);

            const overviewResponse = await axios.get(
                `http://127.0.0.1:8000/overview/${symbol}`
            );

            setOverview(overviewResponse.data);
            const historyResponse = await axios.get(
                `http://127.0.0.1:8000/history/${symbol}`
            );
            const dailyData =
                historyResponse.data["Time Series (Daily)"];

            const chartData = Object.entries(dailyData)
                .slice(0, 30)
                .map(([date, values]) => ({
                    date,
                    price: parseFloat(values["4. close"])
                }))
                .reverse();

            setHistory(chartData);
        } catch (error) {

            console.error(error);

        }
    };
    console.log(overview);
    return (
        <div className="bg-[#171717] p-6 rounded-3xl">

            <h2 className="text-xl font-bold mb-4">
                Stock Lookup
            </h2>

            <div className="flex gap-3">

                <input
                    type="text"
                    placeholder="AAPL"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="flex-1 bg-[#2a2a2a] px-4 py-3 rounded-xl"
                />

                <button
                    onClick={searchStock}
                    className="bg-white text-black px-5 rounded-xl"
                >
                    Search
                </button>

            </div>

            {stock && (

                <div className="mt-6 space-y-2">

                    <p>
                        Symbol: {stock.symbol}
                    </p>

                    <p>
                        Price: ${stock.price}
                    </p>

                    <p>
                        Change: {stock.change}
                    </p>

                    <p>
                        Change %: {stock.change_percent}
                    </p>

                </div>
            )}


            {overview && (

                <div className="mt-6 bg-[#111] p-4 rounded-2xl border border-gray-800">

                    <h3 className="text-lg font-bold mb-3">
                        {overview.Name}
                    </h3>

                    <p>
                        Sector: {overview.Sector}
                    </p>

                    <p>
                        Industry: {overview.Industry}
                    </p>

                    <p>
                        Market Cap:
                        ${(Number(overview.MarketCapitalization) / 1000000000000).toFixed(2)}T
                    </p>

                    <p>
                        P/E Ratio:
                        {overview.PERatio}
                    </p>

                    <p>
                        52 Week High:
                        ${overview["52WeekHigh"]}
                    </p>

                    <p>
                        52 Week Low:
                        ${overview["52WeekLow"]}
                    </p>

                </div>

            )}
            {history.length > 0 && (
                <StockChart data={history} />
            )}



        </div>
    );
}

export default StockSearch;