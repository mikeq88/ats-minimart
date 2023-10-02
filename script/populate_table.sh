#!/bin/bash

# Database connection parameters
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="store"
DB_USER="admin"
DB_PASSWORD="pass123"

# SQL statement to insert data
INSERT_SQL="INSERT INTO product (name, description, price, img) VALUES"

# Data to be inserted (you can modify this as needed)
data=(
  "('Coke', 'Best-selling soft drink', 1.99, 'coke.jpg')"
  "('Sprite', 'Crisp, refreshing and clean-tasting', 1.50, 'sprite.jpg')"
  "('Pepsi', 'Second best-selling soft drink', 1.79, 'pepsi.jpg')"
  "('Fanta', 'Sparkling orange drink', 2.10, 'fanta.jpg')"
  "('Guinness', 'Malty sweetness and hoppy bitterness', 5.99, 'guinness.jpg')"
)

# Function to execute SQL query
execute_query() {
 PGPASSWORD=$DB_PASSWORD  psql -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -w -c "$1"
}

# Loop through data and insert records
for item in "${data[@]}"; do
  execute_query "$INSERT_SQL $item"
  if [ $? -eq 0 ]; then
    echo "Inserted: $item"
  else
    echo "Error inserting: $item"
  fi
done

echo "Script completed."

