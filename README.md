# outputSheetToCsvFile
【GAS】Google スプレットシート で BOM付きUTF-8 な CSV出力するための Google Apps Script

詳細：https://kitaney-google.blogspot.com/2018/04/gasgoogle-bomutf-8-csv.html

The tool is Google Apps Script for adding the custom menu for saving CSV file as some encoding (UTF-8 with BOM, UTF-8 without BOM, Shift_JIS).

Please change the following elements.

## var drive = DriveApp.getFolderById('=== Folder ID ===');

 Check the folder's URL in Google Drive which save Google Spreadsheet with this Google Apps Script.
 https://drive.google.com/drive/u/0/folders/=== Folder ID====

## var base_fileName = "aaa";

 Prefix of Filename.
 
## name in var entries

 You can change the name for converting menu.

## spreadsheet.addMenu("OUTPUT to CSV", entries);

 You can change the name of the custom menu. 