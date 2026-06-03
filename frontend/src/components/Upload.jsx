import axios from "axios";
import { useState } from "react";

function Upload() {

    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");
    const [fileName, setFileName] = useState("");

    const handleUpload = async () => {

        if (!file) return;

        const formData = new FormData();

        formData.append("file", file);

        try {

            setStatus("⬆️ Uploading PDF...");

            const response = await axios.post(
                "http://127.0.0.1:8000/upload",
                formData
            );

            setStatus("📖 Processing document...");

            setTimeout(() => {

                setStatus(
                    `✅ Ready (${response.data.total_chunks} chunks indexed)`
                );

            }, 1000);

        } catch (error) {

            console.error(error);

            setStatus("❌ Upload Failed");

        }
    };

    return (

        <div>

            <div
                className="
                border
                border-dashed
                border-gray-700
                rounded-3xl
                p-6
                bg-[#0f0f0f]
                text-center"
            >

                <p className="text-gray-300 text-lg mb-3">
                    Upload PDF Document
                </p>

                <p className="text-gray-500 mb-5">
                    Books • Reports • Research Papers • News
                </p>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {

                        setFile(e.target.files[0]);

                        setFileName(
                            e.target.files[0]?.name || ""
                        );

                    }}
                    className="mb-5 text-sm"
                />

                <button
                    onClick={handleUpload}
                    className="
                    bg-white
                    text-black
                    px-6
                    py-3
                    rounded-2xl
                    font-semibold
                    hover:bg-gray-300"
                >
                    Upload
                </button>

            </div>

            {fileName && (

                <div className="mt-5 bg-[#111] p-4 rounded-2xl border border-gray-800">

                    <p className="text-white font-medium">
                        📄 {fileName}
                    </p>

                    <p className="text-gray-400 mt-2">
                        {status}
                    </p>

                </div>

            )}

        </div>
    );
}

export default Upload;