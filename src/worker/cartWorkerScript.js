// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  self.onmessage = async function (event) {
    const { cart, BASE_URL } = event.data;

    try {
      if (!BASE_URL) {
        throw new Error("Base URL is not defined");
      }

      // Perform the API call to set the cart
      const response = await fetch(`${BASE_URL}/api/cart/set-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      self.postMessage({ success: true, result });
    } catch (error) {
      self.postMessage({
        success: false,
        error: error.message,
      });
    }
  };
};
