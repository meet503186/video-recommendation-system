import { envConfig } from "@/config/envConfig";
import { VoyageEmbeddings } from "@langchain/community/embeddings/voyage";

const embeddings = new VoyageEmbeddings({
  apiKey: process.env.VOYAGE_API_KEY, // In Node.js defaults to process.env.VOYAGEAI_API_KEY
  inputType: "query", // Optional: specify input type as 'query', 'document', or omit for None / Undefined / Null
  maxRetries: 1,
});

export const embedd = async (text: string) => {
  try {
    if (!text?.trim()) {
      throw new Error("Text is required");
    }

    const embedding = await embeddings.embedQuery(text);

    if (!embedding || embedding.length === 0) {
      throw new Error("Empty or invalid response from embedQuery");
    }

    return embedding;
  } catch (error) {
    console.error("Error fetching embedding:", error);
    throw new Error("Failed to get embedding");
  }
};
