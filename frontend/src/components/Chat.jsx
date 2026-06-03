import axios from "axios";
import { useState, useEffect, useRef } from "react";

function Chat() {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);

    const askQuestion = async (customQuestion = null) => {

        const finalQuestion =
            customQuestion || question;

        if (!finalQuestion) return;

        const userMessage = {
            role: "user",
            content: finalQuestion
        };

        setMessages((prev) => [
            ...prev,
            userMessage
        ]);

        setLoading(true);

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/search",
                {
                    question: finalQuestion
                }
            );

            const aiMessage = {
                role: "ai",
                content: response.data.answer
            };

            setMessages((prev) => [
                ...prev,
                aiMessage
            ]);

        } catch (error) {

            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    content:
                        "Unable to generate response."
                }
            ]);
        }

        setQuestion("");
        setLoading(false);
    };

    const suggestions = [
        "📄 Summarize this document",
        "📝 Generate key takeaways",
        "💡 Explain complex concepts simply",
        "❓ Create quiz questions"
    ];

    return (

        <div className="flex flex-col h-full bg-[#181818]">

            {/* Messages */}

            <div className="flex-1 overflow-y-auto px-10 py-10">

                <div className="max-w-5xl mx-auto">

                    {messages.length === 0 ? (

                        <div className="mt-24 text-center">

                            <h1 className="text-6xl font-bold mb-6">
                                DocuMind AI
                            </h1>

                            <p className="text-gray-400 text-xl mb-12">
                                Upload documents and extract insights using AI-powered semantic search
                            </p>

                            <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">

                                {suggestions.map((item) => (

                                    <div
                                        key={item}
                                        onClick={() =>
                                            setQuestion(item)
                                        }
                                        className="
                                        bg-[#1f1f1f]
                                        border border-gray-800
                                        rounded-3xl
                                        p-6
                                        text-left
                                        hover:bg-[#262626]
                                        transition-all
                                        cursor-pointer"
                                    >

                                        <p className="text-lg">
                                            {item}
                                        </p>

                                    </div>

                                ))}

                            </div>

                        </div>

                    ) : (

                        <div className="space-y-8">

                            {messages.map(
                                (msg, index) => (

                                    <div
                                        key={index}
                                        className={`flex ${msg.role === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                            }`}
                                    >

                                        <div
                                            className={`max-w-4xl px-6 py-5 rounded-[28px] text-lg ${msg.role === "user"
                                                ? "bg-[#2d2d2d]"
                                                : "bg-[#121212] border border-gray-800"
                                                }`}
                                        >

                                            <div className="whitespace-pre-wrap">
                                                {msg.content}
                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                            {loading && (

                                <div className="bg-[#121212] border border-gray-800 px-6 py-5 rounded-[28px] w-fit">

                                    Thinking...

                                </div>

                            )}

                            <div ref={messagesEndRef} />

                        </div>

                    )}

                </div>

            </div>

            {/* Input */}

            <div className="p-6 border-t border-gray-900">

                <div className="max-w-5xl mx-auto flex gap-4">

                    <input
                        type="text"
                        value={question}
                        onChange={(e) =>
                            setQuestion(e.target.value)
                        }
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                askQuestion();
                            }
                        }}
                        placeholder="Ask questions, summarize, explain, or extract insights..."
                        className="
                        flex-1
                        bg-[#2a2a2a]
                        px-8
                        py-5
                        rounded-[30px]
                        outline-none
                        text-lg"
                    />

                    <button
                        onClick={() =>
                            askQuestion()
                        }
                        className="
                        bg-white
                        text-black
                        px-8
                        rounded-[30px]
                        font-semibold
                        hover:bg-gray-300"
                    >
                        Send
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Chat;