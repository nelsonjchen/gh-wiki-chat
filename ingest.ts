import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MarkdownTextSplitter } from "langchain/text_splitter";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import {
  JSONLoader,
  JSONLinesLoader,
} from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";

const loader = new DirectoryLoader(
  "openpilot.wiki",
  {
    ".json": (path) => new JSONLoader(path, "/texts"),
    ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
    ".txt": (path) => new TextLoader(path),
    ".csv": (path) => new CSVLoader(path, "text"),
    ".md": (path) => new TextLoader(path),
  }
);
const docs = await loader.load();

const splitter = new MarkdownTextSplitter();
const splitDocs = await splitter.splitDocuments(docs);

const vectorStore = await HNSWLib.fromDocuments(
  splitDocs,
  new OpenAIEmbeddings()
);

// Save the vector store to a directory
const directory = "store";
await vectorStore.save(directory);

// Load the vector store from the same directory
const loadedVectorStore = await HNSWLib.load(
  directory,
  new OpenAIEmbeddings()
);

// vectorStore and loadedVectorStore are identical

// Simple test to see if it works
const result = await loadedVectorStore.similaritySearch("video transcode mp4 hevc", 1);
console.log(result);
