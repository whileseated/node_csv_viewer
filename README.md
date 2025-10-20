# CSV/TSV Viewer

A minimal, functional web application for uploading and viewing CSV and TSV (tab-separated values) files with advanced features like sorting, URL detection, and drag-and-drop row reordering.

![Screenshot of CSV Viewer](img/bibliography.png)

## Features

### File Management
- **Multiple file format support** - CSV, TSV, and TXT files with automatic delimiter detection
- **Drag-and-drop file upload** - Modern upload interface with visual feedback
- **Saved files management** - Save CSV files to server, load previously saved files, rename and delete saved files
- **Tab-based interface** - Switch between uploading new files and browsing saved files
- **Collapsible saved files list** - Toggle saved files view without losing context

### Data Viewing & Manipulation
- **Smart header detection** - First row automatically becomes headers (no interruption)
- **Header management** - Change headers post-load with "+" button
- **Real-time filtering** - Filter rows across all columns as you type
- **Column sorting** - Click headers to sort ascending/descending with visual indicators
- **Resizable columns** - Drag column borders to adjust width for better readability
- **Automatic URL detection** - HTTP/HTTPS URLs become clickable links
- **Optional drag handle** - Reorder rows when enabled, freely select text when disabled

### Row Selection & Organization
- **Toggle columns** - Show/hide rank and checkbox columns
- **Filter rows** - Show checked rows only with "Show Checks" button
- **Bulk checkbox operations** - Check All, Check None, and Shift+Click range selection
- **Persistent checkboxes** - Checkbox states saved and restored in exported files
- **Persistent rank** - Rank column state saved and restored in exported files

### Export Options
- **Export CSV** - Download to computer or save to server with current sort/filter/order
- **State preservation** - Exports include Rank and Checked columns when enabled
- **Flexible formats** - Export current view with all applied filters and adjustments

### Design
- **Minimal design** - Follows Source Code Pro aesthetic with pale color palette
- **High information density** - Efficient use of space without clutter
- **Responsive layout** - Works on desktop and mobile devices

## Project Structure

- **public/index.html**: The main HTML file that contains the front-end UI for the CSV uploader and viewer
- **public/styles.css**: The CSS file that styles the front-end UI
- **server.js**: The back-end server implemented with Express.js to handle file operations and serve static files
- **package.json**: The project manifest file that lists the project dependencies
- **saved_csvs/**: Directory for storing saved CSV files and metadata (created automatically)
- **docs/**: Documentation including changelog and implementation plans
- **STYLE_GUIDE.md**: Design system specification for minimal aesthetic

## Technologies Used

- **Front-End**:
  - HTML5
  - CSS3 (minimal design system using Source Code Pro font)
  - JavaScript (ES6+)
  - [PapaParse 5.3.0](https://www.papaparse.com/) for CSV/TSV parsing with automatic delimiter detection

- **Back-End**:
  - Node.js
  - Express.js 4.18.2
  - [Multer](https://www.npmjs.com/package/multer) for file upload handling and storage

## Installation

1. Navigate to the project directory:

   ```bash
   cd node_csv_viewer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

### Running in Production Mode

For Docker or production environments:

```bash
npm start
```

The server will start on `http://localhost:3000`

### Running in Development Mode (with auto-restart)

This mode uses [nodemon](https://nodemon.io/) to automatically restart the server when you make changes to the code (also known as "hot reload" or "auto-restart"):

```bash
npm run dev
```

This will:
- Watch `server.js` and all files in `public/`
- Auto-restart when `.js`, `.html`, or `.css` files change
- Ignore `node_modules/` and `uploads/` directories

### Using the Application

1. Open your browser and go to `http://localhost:3000`
2. **Choose between two tabs:**
   - **Upload New** - Upload a new CSV file
   - **Saved Files** - Browse, load, rename, or delete previously saved files

#### Upload New Tab
3. **Drag and drop** a CSV, TSV, or TXT file into the upload zone, or click "Choose File" to browse
   - Supported formats: `.csv`, `.tsv`, `.txt`
   - Delimiter is automatically detected (comma, tab, etc.)
   - First row automatically becomes headers (no alert interruption)
4. **Optional:** Click the pale green "+" button if you need to change headers
   - Choose "Use next row as headers" to shift data up one row
   - Or enter custom headers manually
5. Use the toolbar options to customize your view:
   - **Filter rows...** - Type to filter rows in real-time across all columns
   - **Rank** - Show row numbers (persists when exported and reloaded)
   - **Checkmark** - Add checkboxes to rows (persists when exported and reloaded)
   - **Drag Handle** - Enable row reordering (disables text selection)
   - **Show Checks** - Filter to checked items only (appears when checkboxes enabled)
   - **Export CSV** - Download to computer or save to server (appears after adjustments)
6. **Column operations:**
   - **Click column headers** to sort (click again to reverse)
   - **Drag column borders** to resize for better readability
7. **Checkbox operations** (when enabled):
   - **Click checkbox** to check/uncheck individual rows
   - **Shift+Click** to select a range of rows
   - **Check All** to select all visible rows
   - **Check None** to clear all selections
8. **Click URLs** in cells to open in new tab
9. **Export options:**
   - **Click "Export CSV"** to open export dialog
   - **Choose "Download to computer"** to save locally
   - **Choose "Save to server"** to save for later access
   - **Note:** Rank and Checked columns are included in export when enabled

#### Saved Files Tab
10. **View saved files** - See list of all saved CSV files with metadata (filename, size, date)
11. **Load a file** - Click "Load" to open a saved file in the viewer
    - Rank and checkbox states are automatically restored if they were saved
    - Checkbox and rank buttons will be automatically enabled
12. **Rename a file** - Click "Rename" to edit the filename inline (press Enter or click outside to save)
13. **Delete a file** - Click "Delete" to permanently remove a saved file (requires confirmation)
14. **Toggle list** - Click "Saved Files" button again to collapse/hide the list

## API Endpoints

The application provides RESTful endpoints for managing saved CSV files:

### File Management API

- **GET /api/saved-files** - List all saved CSV files with metadata
- **POST /api/upload** - Upload and save a CSV file (10MB limit, multipart/form-data)
- **GET /api/file/:filename** - Download a specific saved CSV file
- **PUT /api/rename/:filename** - Rename a saved CSV file (requires JSON body with `newFilename`)
- **DELETE /api/delete/:filename** - Delete a saved CSV file

### Storage

Saved files are stored in the `saved_csvs/` directory with metadata tracked in `saved_csvs/metadata.json`.

#### Metadata Reliability

The application uses a dual-layer synchronization strategy to ensure metadata accuracy:

- **Startup Sync:** On server start, metadata is automatically synchronized with actual files on disk, removing any orphaned entries for missing files
- **Runtime Validation:** The `/api/saved-files` endpoint validates file existence before returning results, ensuring clients never receive references to missing files
- **Self-Healing:** If CSV files are manually deleted from the `saved_csvs/` directory, they are automatically removed from metadata on the next server restart

This design prevents errors when files are manually managed outside the API.

## Configuration

### Port Configuration

By default, the server runs on port `3000`. You can change this by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

### File Upload Limits

- Maximum file size: 10MB
- Allowed formats: .csv, .tsv, .txt
- Filenames are automatically sanitized for security

### Nodemon Configuration

The `nodemon.json` file controls auto-restart behavior:
- **Watched files**: `server.js` and `public/**/*`
- **File extensions**: `.js`, `.html`, `.css`
- **Ignored directories**: `node_modules/`, `uploads/`

## Docker Support

This application is designed to work both standalone and within Docker containers. The Docker configuration is managed at the parent directory level as part of the All-in-1-Docker-Containers setup.

For standalone use outside Docker, simply use `npm start` or `npm run dev` as described above.

### Persisting Saved Files in Docker

By default, saved CSV files are stored inside the Docker container and will be lost when the container is recreated. To persist saved files on your host machine, you need to add a volume mount.

**1. Update docker-compose.yml**

Add the following volume mount in the `volumes` section:

```yaml
volumes:
  # ... other volume mounts ...
  # Persist saved CSVs
  - ./saved_csvs:/apps/node_csv_viewer/saved_csvs
```

**2. Update Dockerfile**

Add the following line to ensure the directory exists in the container:

```dockerfile
# Create uploads directory for CSV viewer
RUN mkdir -p /apps/node_csv_viewer/uploads
RUN mkdir -p /apps/node_csv_viewer/saved_csvs
```

After making these changes, rebuild and restart the container:

```bash
docker-compose down
docker-compose up --build -d
```

Your saved CSV files will now persist in the `./saved_csvs` directory on your host machine.

## Error Handling

- Server handles uncaught exceptions and unhandled promise rejections gracefully
- Client-side CSV parsing errors are displayed to users via alerts
- Invalid file types trigger validation warnings
- Metadata automatically syncs with disk to prevent references to missing files

## Development

For active development with auto-restart on file changes:

1. Install dependencies including devDependencies: `npm install`
2. Run in dev mode: `npm run dev`
3. Make changes to `.js`, `.html`, or `.css` files
4. Server automatically restarts and reloads changes
