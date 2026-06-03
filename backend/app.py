from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from rag.pdf_reader import extract_text_from_pdf
from rag.chunker import split_text
from rag.vector_store import store_chunks, search_chunks
from rag.groq_client import generate_answer

import shutil
import os

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Upload Directory
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# Home Route
@app.get("/")
def home():

    return {
        "message": "DocuMind AI Backend Running"
    }


# Upload PDF
@app.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    # Extract Text
    extracted_text = extract_text_from_pdf(
        file_path
    )

    print("\n========== PDF TEXT ==========\n")
    print(extracted_text[:2000])
    print("\n=============================\n")

    # Chunk Text
    chunks = split_text(
        extracted_text
    )

    # Store Chunks
    store_chunks(
        chunks
    )

    return {
        "message": "PDF processed successfully",
        "file_name": file.filename,
        "total_chunks": len(chunks)
    }


# Request Model
class QueryRequest(BaseModel):
    question: str


# Chat Endpoint
@app.post("/search")
def search(
    request: QueryRequest
):

    # Retrieve Relevant Chunks
    retrieved_chunks = search_chunks(
        request.question
    )

    print("\n========================")
    print("QUESTION:")
    print(request.question)

    print("\nCHUNKS FOUND:")
    print(len(retrieved_chunks))

    for i, chunk in enumerate(
        retrieved_chunks
    ):

        print(
            f"\n------ Chunk {i+1} ------"
        )

        print(chunk[:300])

    print("========================\n")

    # Create Context
    context = "\n".join(
        retrieved_chunks
    )

    # Generate Answer
    answer = generate_answer(
        request.question,
        context
    )

    return {
        "question": request.question,
        "answer": answer
    }