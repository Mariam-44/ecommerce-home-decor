#!/bin/bash

# Start SQL Server in the background
/opt/mssql/bin/sqlservr &

# Wait for SQL Server to be ready
for i in {1..60};
do
    if /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -Q "SELECT 1" &>/dev/null; then
        echo "SQL Server is ready"
        break
    fi
    echo "Waiting for SQL Server to start... ($i/60)"
    sleep 1
done

if [ $i -eq 60 ]; then
    echo "SQL Server failed to start within 60 seconds"
    exit 1
fi

# Configure SQL Server for remote access
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -Q "
EXEC sp_configure 'remote access', 1;
RECONFIGURE WITH OVERRIDE;
"

# Create database if it doesn't exist
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -Q "IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'E-Commerce') CREATE DATABASE [E-Commerce]"

# Keep container running
tail -f /dev/null 