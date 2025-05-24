export function getShipmentStatusClass(
  status: "processing" | "delivered",
): string {
  switch (status) {
    case "processing":
      return "text-blue-600 bg-blue-100 text-base";
    case "delivered":
      return "text-green-600 bg-green-100 text-base";
    default:
      return "text-gray-600 bg-gray-100 text-base";
  }
}
