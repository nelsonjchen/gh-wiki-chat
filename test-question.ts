import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { VectorDBQAChain } from "langchain/chains";
import { loadQAStuffChain, loadQAMapReduceChain } from "langchain/chains";
import { RetrievalQAChain } from "langchain/chains";

import { ChatOpenAI } from "langchain/chat_models/openai";


/* Load in the file we want to do question answering over */

const directory = "store";
// Load the vector store from the same directory
const loadedVectorStore = await HNSWLib.load(
  directory,
  new OpenAIEmbeddings()
);

/* Initialize the LLM to use to answer the question */
const model = new OpenAI({
  modelName: "gpt-3.5-turbo"
});

// Create a chain that uses the OpenAI LLM and HNSWLib vector store.
const chain = RetrievalQAChain.fromLLM(model, loadedVectorStore.asRetriever(), {
  returnSourceDocuments: true,
});
const res = await chain.call({
  query: "How do I install OP?",
});
console.log({ res });


