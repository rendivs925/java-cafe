# Set the URL of the Next.js API endpoint
URL="http://localhost:3000/api/cart/increment"

# JSON payload with userId and productId
PAYLOAD='{
  "userId": "66af25bf3409cf70ad33c47a",
  "productId": "66b0f09b892e2e117c44b605"
}'

# Function to send a POST request
send_request() {
  RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "$PAYLOAD" "$URL")
  echo "Response $1: $RESPONSE"
}

# Loop to perform the test 10 times concurrently
for i in {1..10}
do
  send_request $i &
done

# Wait for all background processes to complete
wait

echo "All requests completed."
