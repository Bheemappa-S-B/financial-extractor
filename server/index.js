import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
import { generateExcel } from "./excel.js";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { extractFinancials } from "./extractor.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "*"
}));

const upload = multer({ dest: "uploads/" });

/*
  Extract text from PDF using modern pdfjs
*/
async function extractPdfText(buffer) {
  const uint8Array = new Uint8Array(buffer);

  const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
  const pdf = await loadingTask.promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += strings.join(" ") + "\n";
  }

  return fullText;
}
app.use("/outputs", express.static("outputs"));
/*
  Upload route
*/
app.post("/upload", upload.single("file"), async (req, res) => {
  let filePath = null;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);

    // NEW PDF extraction
    const text = await extractPdfText(dataBuffer);

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "No readable text in PDF" });
    }

    const extracted = await extractFinancials(text);

    const excelPath = `outputs/result-${Date.now()}.xlsx`;

// create outputs folder if not exists
if (!fs.existsSync("outputs")) {
  fs.mkdirSync("outputs");
}
const baseUrl = `${req.protocol}://${req.get("host")}`;
await generateExcel(extracted.data ?? extracted, excelPath);
res.json({
  data: extracted,
  download: `${baseUrl}/${excelPath}`
});

  } catch (error) {
    console.error("Processing error:", error);
    res.status(500).json({ error: "Failed to process document" });
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});