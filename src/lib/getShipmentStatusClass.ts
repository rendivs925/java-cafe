export function getShipmentStatusClass(
  status: "processing" | "shipped" | "delivered"
): string {
  switch (status) {
    case "processing":
      return "text-blue-600 bg-blue-100";
    case "shipped":
      return "text-orange-600 bg-orange-100";
    case "delivered":
      return "text-green-600 bg-green-100";
    default:
      return "text-gray-600 bg-gray-100"; // Default fallback for unexpected statuses
  }
}
