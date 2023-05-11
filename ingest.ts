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

import { MarkdownTextSplitter } from "langchain/text_splitter";
const splitter = new MarkdownTextSplitter();
const splitDocs = await splitter.splitDocuments(docs);
console.log({ splitDocs });
