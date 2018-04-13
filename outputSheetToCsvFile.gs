function outputSheetToCsvFile(charSet, bom_flag) {
  // Static elements
  var drive = DriveApp.getFolderById('=== Folder ID ===');
  var base_fileName = "aaa";
  var fileName = base_fileName + "_" + charSet;
  var fileExtension = ".csv";
  var contentType = "text/csv";
  var lineDelimiter = ",";
  var newLineChar = "\r\n";

  // Get the data from Active Sheet.
  var range = SpreadsheetApp.getActiveSheet().getDataRange();
  var data = range.getValues();
  var csvString = '';
 
  // To String as lineDelimiter
  for(var i = 0; i < data.length; i++) {
    csvString += data[i].join(lineDelimiter) + newLineChar;
  }  

  // Add BOM in case of "bom_flag" == true
  // https://en.wikipedia.org/wiki/Byte_order_mark#UTF-8  (U+FEFF)
  if(charSet == "UTF8" || charSet == "UTF-8"){
    if (bom_flag == true){
      csvString = "\ufeff" + csvString;
    }else{
      fileName = fileName + "N";
    }
  }
  fileName = fileName + fileExtension;
  // Convert to Blob
  var blob = Utilities.newBlob("", contentType, fileName).setDataFromString(csvString, charSet);
  // Output Blob to file
  drive.createFile(blob); 
}

function toCSV_SJIS(){
  outputSheetToCsvFile("Shift_JIS", false);
}
function toCSV_UTF8(){
  outputSheetToCsvFile("UTF8", true);
}
function toCSV_UTF8N(){
  outputSheetToCsvFile("UTF8", false);
}

function onOpen() {
  // Add "Menu bar" on Google Spreadsheet.
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Save Active Sheet to CSV file as Shift_JIS",
    functionName : "toCSV_SJIS"
  }];
  entries[1] = {
    name : "Save Active Sheet to CSV file as UTF-8 with BOM",
    functionName : "toCSV_UTF8"
  };
  entries[2] = {
    name : "Save Active Sheet to CSV file as UTF-8 without BOM",
    functionName : "toCSV_UTF8N"
  };

  spreadsheet.addMenu("OUTPUT to CSV", entries);
};