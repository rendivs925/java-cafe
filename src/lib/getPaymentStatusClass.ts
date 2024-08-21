export function getPaymentStatusClass(
  status: "settlement" | "pending" | "expired"
): string {
  switch (status) {
    case "settlement":
      return "text-green-600 bg-green-100";
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    case "expired":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100"; // Default fallback for unexpected statuses
  }
}
