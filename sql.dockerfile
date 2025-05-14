FROM mcr.microsoft.com/mssql/server:2019-latest

USER root

# Create directory for custom configuration
RUN mkdir -p /var/opt/mssql/conf.d

# Configure SQL Server to listen on all interfaces
COPY ./sql-tools/mssql.conf /var/opt/mssql/mssql.conf

# Install SQL Server tools
RUN apt-get update && apt-get install -y curl gnupg2 \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y mssql-tools unixodbc-dev \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /docker-entrypoint-initdb.d

# Copy initialization script
COPY ./sql-tools/init-db.sh /docker-entrypoint-initdb.d/init-db.sh
RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh

# Add SQL Server tools to PATH
ENV PATH="/opt/mssql-tools/bin:${PATH}"

USER mssql

# Set the entrypoint to run SQL Server and then the initialization script
ENTRYPOINT [ "/docker-entrypoint-initdb.d/init-db.sh" ] 