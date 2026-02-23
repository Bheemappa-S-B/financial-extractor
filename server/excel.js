import ExcelJS from "exceljs";

export async function generateExcel(data, filePath) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Income Statement");

  sheet.columns = [
    { header: "Year", key: "year", width: 15 },
    { header: "Revenue", key: "revenue", width: 20 },
    { header: "Operating Expenses", key: "operating_expenses", width: 25 },
    { header: "Net Income", key: "net_income", width: 20 },
    { header: "Currency", key: "currency", width: 15 }
  ];

  sheet.addRow(data);

  await workbook.xlsx.writeFile(filePath);
}