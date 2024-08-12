// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  self.onmessage = async function (event) {
    const number = event.data;

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${number}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      self.postMessage(result);
    } catch (error) {
      self.postMessage({ error: error.message });
    }
  };
};
