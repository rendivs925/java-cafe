// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  self.onmessage = async function (event) {
    const { BASE_URL } = event.data;

    try {
      if (!BASE_URL) {
        throw new Error("Base URL is not defined");
      }

      const response = await fetch(`${BASE_URL}/api/get-detail-pengiriman`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      self.postMessage({ success: true, result, status: response.status });
    } catch (error) {
      // Since error might not have status, we handle it gracefully
      self.postMessage({
        success: false,
        error: error.message || "An unexpected error occurred",
        status: error.status || 500,
      });
    }
  };
};
