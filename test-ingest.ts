import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";


const directory = "store";
// Load the vector store from the same directory
const loadedVectorStore = await HNSWLib.load(
  directory,
  new OpenAIEmbeddings()
);

// vectorStore and loadedVectorStore are identical

const result = await loadedVectorStore.similaritySearch("video transcode mp4 hevc", 10);
console.log(result);
