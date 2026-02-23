import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("Processing document...");
      // setResult(null);
      // setDownloadLink(null);

      const res = await axios.post(
        "http://localhost:5000/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // ✅ Correct place to set result
      setResult(res.data.data);
      setDownloadLink(res.data.download);
      setMessage("Extraction completed successfully ✅");

    } catch (err) {
      console.error(err);
      setMessage("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Financial Statement Extractor</h1>

      <div style={styles.card}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {file && (
          <p style={styles.fileName}>
            Selected file: <b>{file.name}</b>
          </p>
        )}

        <button style={styles.button} onClick={uploadFile}>
          {loading ? "Processing..." : "Upload & Extract"}
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </div>

      {result && (
        <div style={styles.card}>
          <h2>Extracted Financial Data</h2>

          <table style={styles.table}>
            <thead>
              <tr>
                <th>Year</th>
                <th>Revenue</th>
                <th>Operating Expenses</th>
                <th>Net Income</th>
                <th>Currency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{result.year}</td>
                <td>{result.revenue}</td>
                <td>{result.operating_expenses}</td>
                <td>{result.net_income}</td>
                <td>{result.currency}</td>
              </tr>
            </tbody>
          </table>

          {downloadLink && (
            <a href={downloadLink} target="_blank" rel="noreferrer">
              <button style={styles.downloadBtn}>
                Download Excel File
              </button>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

const styles = {
  container: {
 fontFamily: "Arial",
  padding: "40px 80px",
  background: "#f4f6f8",
  minHeight: "100vh",
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  boxSizing: "border-box",
  color: "black",
},
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  card: {
   background: "white",
  padding: 30,
  borderRadius: 10,
  marginBottom: 30,
  width: "100%",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  button: {
    marginTop: 15,
    padding: "10px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  downloadBtn: {
    marginTop: 20,
    padding: "10px 20px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  message: {
    marginTop: 10,
  },
  fileName: {
    marginTop: 10,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 10,
  },
};