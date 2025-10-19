# CSV/TSV Viewer

A web-based viewer for CSV and TSV files with the ability to save and manage files.

## Features

- Upload and view CSV, TSV, and TXT files
- Save files for later viewing
- Rename and delete saved files
- View file metadata (size, upload date, last modified)
- File management interface

## Running with Docker

This application is designed to run as part of a consolidated Docker container with other Node.js apps.

### Persisting Saved Files

By default, saved CSV files are stored inside the Docker container and will be lost when the container is recreated. To persist saved files on your host machine, you need to add a volume mount.

#### Required Changes

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

## Running Locally (Without Docker)

```bash
npm install
node server.js
```

The server will start on port 3000 by default (configurable via PORT environment variable).

## API Endpoints

- `GET /api/saved-files` - List all saved CSV files
- `POST /api/upload` - Upload and save a new CSV file
- `GET /api/file/:filename` - Download a specific saved CSV file
- `PUT /api/rename/:filename` - Rename a saved CSV file
- `DELETE /api/delete/:filename` - Delete a saved CSV file

## File Limits

- Maximum file size: 10MB
- Allowed file types: .csv, .tsv, .txt
