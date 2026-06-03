from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def generate_answer(question, context):

    prompt = f"""
You are DocuMind AI, an intelligent document assistant.

Use ONLY the information provided in the context.

Rules:
- Answer clearly and accurately.
- Use bullet points when appropriate.
- Give detailed explanations when requested.
- Summarize when asked.
- Generate quiz questions when asked.
- Generate key takeaways when asked.
- Explain concepts in simple language when asked.

If the answer is not found in the document, respond exactly:

"I could not find relevant information in the uploaded document."

Context:
{context}

Question:
{question}

Answer:
"""

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "system",
                "content": "You are an expert document analysis assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
        max_tokens=1000
    )

    return completion.choices[0].message.content