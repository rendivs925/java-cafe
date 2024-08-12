// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  self.onmessage = async function (event) {
    const { cart } = event.data;

    console.log(cart);

    try {
      // Perform the API call to set the cart
      const response = await fetch("http://localhost:3000/api/cart/set-cart", {
        // Use the absolute URL here
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
      console.log(error);
      self.postMessage({ success: false, error: error.message });
    }
  };
};
