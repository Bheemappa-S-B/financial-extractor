# 📊 Financial Statement Extractor

AI-Powered Research Tool for Structured Financial Data Extraction

------------------------------------------------------------------------

## 🚀 Overview

The Financial Statement Extractor is a minimal research portal built to
extract structured income statement data from uploaded annual reports or
financial statements.

This system transforms unstructured PDF documents into analyst-ready
structured outputs and downloadable Excel files.

The tool is designed as a research utility, not a chatbot, aligning with
the assignment requirement.

------------------------------------------------------------------------

## 🎯 Problem Statement

Financial analysts often work with unstructured annual reports in PDF
format. Extracting structured financial line items manually is
time-consuming and error-prone.

This tool automates:

-   Revenue extraction\
-   Operating expenses extraction\
-   Net income extraction\
-   Currency detection\
-   Financial year detection\
-   Structured Excel generation

------------------------------------------------------------------------

## 🏗️ Architecture

React Frontend (Upload UI)\
↓\
Node.js + Express Backend\
↓\
PDF Text Extraction (pdfjs-dist)\
↓\
Local LLM (Ollama - Llama3)\
↓\
Structured JSON Output\
↓\
Excel Generation (ExcelJS)

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   React (Vite)
-   Axios
-   Custom CSS UI

### Backend

-   Node.js
-   Express.js
-   Multer (File Upload)
-   pdfjs-dist (PDF text extraction)
-   Ollama (Local LLM -- Llama3)
-   ExcelJS (Excel generation)

------------------------------------------------------------------------

## 📂 Features

-   Upload financial PDF\
-   Extract income statement data\
-   Structured JSON output\
-   Clean table display in UI\
-   Downloadable Excel file\
-   Error handling\
-   Handles missing values\
-   Clean and minimal interface

------------------------------------------------------------------------

## 📈 Output Format

``` json
{
  "revenue": number | null,
  "operating_expenses": number | null,
  "net_income": number | null,
  "currency": string,
  "year": string
}
```

------------------------------------------------------------------------

## ⚠ Limitations

-   Currently supports text-based PDFs only\
-   Scanned/image-based PDFs require OCR integration (future
    enhancement)\
-   Extraction accuracy depends on document formatting\
-   Large PDFs may take longer processing time

------------------------------------------------------------------------

## 🧪 How to Run Locally

### Backend

cd server\
npm install\
node index.js

### Frontend

cd client\
npm install\
npm run dev

### Install Ollama

Download from: https://ollama.com\
ollama pull llama3\


------------------------------------------------------------------------

## 📌 Assignment Alignment

-   Document upload supported\
-   System processes documents\
-   Option A implemented (Financial Statement Extraction)\
-   Structured analyst-ready output\
-   Excel export supported\
-   End-to-end working system

------------------------------------------------------------------------

## 👨‍💻 Author

BHEEMAPPA S B
