export function getPaymentStatusClass(
  status: "settlement" | "pending" | "expire",
): string {
  switch (status) {
    case "settlement":
      return "text-green-600 bg-green-100 text-base";
    case "pending":
      return "text-yellow-600 bg-yellow-100 text-base";
    case "expire":
      return "text-red-600 bg-red-100 text-base";
    default:
      return "text-gray-600 bg-gray-100 text-base";
  }
}
