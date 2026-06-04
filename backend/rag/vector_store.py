import chromadb
from sentence_transformers import SentenceTransformer
import uuid

client = chromadb.PersistentClient(
    path="chroma_db"
)

collection = client.get_or_create_collection(
    name="documents"
)

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def store_chunks(chunks):

    existing = collection.get()

    if existing["ids"]:

        collection.delete(
            ids=existing["ids"]
        )

    embeddings = model.encode(
        chunks
    ).tolist()

    ids = [
        str(uuid.uuid4())
        for _ in chunks
    ]

    collection.add(
        documents=chunks,
        embeddings=embeddings,
        ids=ids
    )

    print(
        f"Stored {len(chunks)} chunks"
    )

def search_chunks(query):

    query_embedding = model.encode(
        [query]
    ).tolist()[0]

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=10
    )

    return results["documents"][0]