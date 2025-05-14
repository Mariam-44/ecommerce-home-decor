#!/bin/bash

set -e

host="$1"
shift
cmd="$@"

until /app/migrate; do
  >&2 echo "SQL Server is unavailable - sleeping"
  sleep 1
done

>&2 echo "SQL Server is up - executing command"
exec $cmd 