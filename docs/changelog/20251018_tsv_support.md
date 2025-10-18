# TSV and Multi-Format File Support

**Date:** 20251018
**Type:** Feature Addition
**Impact:** Frontend | User Experience

## Overview

Extended the CSV viewer to support multiple file formats including TSV (tab-separated values) and generic TXT files with automatic delimiter detection, making the tool more versatile for different data formats.

## What Was Added

### 1. Multiple File Format Support
- **Location:** `public/index.html` (lines 32, 80-97, 111)
- **Features:**
  - Accept `.csv`, `.tsv`, and `.txt` file extensions
  - Automatic delimiter detection using PapaParse
  - Support for comma-separated, tab-separated, and other delimiter types
  - Seamless handling of different formats without user intervention

### 2. File Validation Updates
- **Location:** `public/index.html` (lines 87-95)
- **Features:**
  - Updated file drop validation to accept multiple extensions
  - Case-insensitive extension matching
  - Clear error messages indicating accepted formats

### 3. UI Text Updates
- **Location:** `public/index.html` (lines 9, 29, 33)
- **Features:**
  - Updated page title to "CSV/TSV Viewer"
  - Updated drop zone text: "Drop CSV or TSV file here"
  - Updated hint text: "Supports .csv, .tsv, and .txt files"
  - Generic error messages (removed CSV-specific language)

## Benefits

### For Users
- **Flexibility:** Work with data exported from different sources (Excel TSV, database exports, etc.)
- **No Conversion Needed:** Upload TSV files directly without converting to CSV
- **Auto-Detection:** Don't need to specify file format - it's detected automatically
- **Consistent Experience:** All features work the same regardless of file format

### For Development
- **Minimal Code Changes:** Leveraged PapaParse's built-in delimiter detection
- **No New Dependencies:** Used existing library functionality
- **Backward Compatible:** All existing CSV functionality preserved

## Files Modified

### Modified Files
- `public/index.html` - Updated file input accept attribute, validation, PapaParse config, UI text
- `public/package.json` - Updated description to mention TSV support
- `README.md` - Updated title, description, features list, usage instructions
- `docs/changelog/20251018_tsv_support.md` - This changelog

## Usage

### Uploading TSV Files

1. **Prepare TSV file** - Any file with tab-separated values
2. **Upload** - Drag and drop or click "Choose File"
3. **Automatic detection** - PapaParse detects tab delimiter
4. **Normal operation** - All features work identically to CSV

### Supported Formats

| Format | Extension | Delimiter | Notes |
|--------|-----------|-----------|-------|
| CSV | `.csv` | Comma (`,`) | Standard comma-separated values |
| TSV | `.tsv` | Tab (`\t`) | Tab-separated values (Excel export format) |
| TXT | `.txt` | Auto-detect | Generic text files with any consistent delimiter |

## Technical Details

### PapaParse Configuration

```javascript
Papa.parse(file, {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
    delimiter: "", // Empty string = auto-detect
    complete: function (results) {
        // Process parsed data
    }
});
```

**How Auto-Detection Works:**
- PapaParse analyzes the first few rows of the file
- Detects the most common delimiter character (comma, tab, pipe, semicolon, etc.)
- Automatically uses that delimiter for the entire file
- Falls back to comma if no clear delimiter is found

### File Validation

```javascript
const validExtensions = ['.csv', '.tsv', '.txt'];
const isValid = validExtensions.some(ext =>
    file.name.toLowerCase().endsWith(ext)
);
```

## Performance Impact

### Improvements
- **No Performance Change:** Auto-detection happens during initial parse (no overhead)
- **Same Speed:** TSV parsing is as fast as CSV parsing

### Considerations
- Auto-detection requires analyzing initial rows (negligible for typical file sizes)
- Very large files (>100MB) with unusual delimiters may need manual detection

## Testing

### Validation Steps
1. **Test CSV upload** - Verify comma-separated files still work
2. **Test TSV upload** - Upload tab-separated file, verify correct parsing
3. **Test mixed content** - File with both commas and tabs in data (not delimiters)
4. **Test edge cases:**
   - Single-column TSV file
   - TSV with quoted fields containing tabs
   - File with `.txt` extension but tab-delimited
   - File with unusual delimiters (pipes, semicolons)

### Test Data Examples

**CSV:**
```
Name,Age,City
Alice,30,New York
Bob,25,Los Angeles
```

**TSV:**
```
Name	Age	City
Alice	30	New York
Bob	25	Los Angeles
```

**Pipe-delimited TXT:**
```
Name|Age|City
Alice|30|New York
Bob|25|Los Angeles
```

All should parse correctly with auto-detection.

## Future Enhancements

### Potential Improvements
- **Manual delimiter selection** - Override auto-detection if needed
- **Delimiter preview** - Show detected delimiter before parsing
- **Excel file support** - Direct `.xlsx` upload using SheetJS
- **JSON export** - Export to JSON format in addition to CSV
- **Custom delimiter export** - Choose delimiter for exported file

### Related Work
- Add support for fixed-width format files
- Support for files with multiple delimiters (multi-pass parsing)
- Character encoding detection for international files

## Compatibility & Requirements

### Browser Requirements
- No change from existing requirements
- Same browser compatibility as CSV support

### File Requirements
- Text-based files with consistent delimiters
- UTF-8 encoding recommended (but not required)
- Maximum file size limited by browser memory

### Dependencies
- No new dependencies
- Uses existing PapaParse 5.3.0 functionality

---

## Notes for Future Developers

### Delimiter Auto-Detection
PapaParse's auto-detection is very robust but not perfect. If users report parsing issues with unusual delimiter characters, you can add a manual delimiter selector UI. The PapaParse config accepts any single character as a delimiter:

```javascript
delimiter: "|"  // Force pipe delimiter
delimiter: ";"  // Force semicolon delimiter
delimiter: "\t" // Force tab delimiter
```

### Export Format
Note that while we now accept TSV input, the export function still generates CSV (comma-delimited) files. This is intentional as CSV is more universally compatible. If users request TSV export, you'll need to:
1. Track the original file's delimiter
2. Add a UI option for export format selection
3. Update the `exportCSV()` function to use the selected delimiter

### File Extension Handling
The current validation accepts any file ending in `.csv`, `.tsv`, or `.txt`. Some systems may export TSV with `.tab` extension. Consider adding more extensions if users request:
- `.tab` - Alternative TSV extension
- `.dat` - Generic data file extension
- `.data` - Another generic extension
