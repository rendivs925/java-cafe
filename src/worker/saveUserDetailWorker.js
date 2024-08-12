// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  self.onmessage = async function (event) {
    const { userDetail } = event.data;

    try {
      const response = await fetch(
        "http://localhost:3000/api/save-user-detail",
        {
          // Use the absolute URL here
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetail),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      self.postMessage({ success: true, result, status: response.status });
    } catch (error) {
      self.postMessage({
        success: false,
        error: error.message,
        status: response.status,
      });
    }
  };
};
