#!/bin/bash

# Wait for SQL Server to be ready
sleep 30

# Restore the database
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Admin123 -Q "RESTORE DATABASE [ECommerceDb] FROM DISK = N'/sql-tools/ec.bak' WITH MOVE 'ECommerceDb' TO '/var/opt/mssql/data/ECommerceDb.mdf', MOVE 'ECommerceDb_log' TO '/var/opt/mssql/data/ECommerceDb_log.ldf'" 