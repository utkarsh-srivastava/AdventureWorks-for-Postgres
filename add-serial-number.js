const fs = require("fs");
const path = require("path");

// Define the folder containing the CSV files
const folderPath = "./";

// List of specific CSV files to modify (leave empty to apply to all CSVs in the folder)
const selectedFiles = [
  "SalesTerritoryHistory.csv",
  "SalesPersonQuotaHistory.csv",
  "SalesOrderHeaderSalesReason.csv",
  "PersonCreditCard.csv",
  "CountryRegionCurrency.csv",
  "SpecialOfferProduct.csv",
]; // Replace with your file names

// Process each file in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading the folder:", err);
    return;
  }

  files.forEach((fileName) => {
    if (
      fileName.endsWith(".csv") &&
      (selectedFiles.length === 0 || selectedFiles.includes(fileName))
    ) {
      const filePath = path.join(folderPath, fileName);

      // Read the original data
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error(`Error reading file ${fileName}:`, err);
          return;
        }

        // Remove Windows-style line endings and trim trailing blank lines
        const cleanedData = data.replace(/\r\n/g, "\n").trim();

        // Split data into rows and process each row
        const rows = cleanedData.split("\n");
        const updatedRows = rows.map((row, index) => `${index + 1}\t${row}`);

        // Write the updated data back to the file
        fs.writeFile(filePath, updatedRows.join("\n"), "utf8", (err) => {
          if (err) {
            console.error(`Error writing file ${fileName}:`, err);
            return;
          }

          console.log(`Updated: ${fileName}`);
        });
      });
    }
  });
});

console.log("Processing completed.");
