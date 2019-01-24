class Http {
  static async exec(uri, payload) {
    try {
      const response = await fetch(uri, payload);
      const data = await response.json();
      return data;
    } catch (error) {
      /*eslint-disable no-console*/
      console.error(error);
      throw error;
    }
  }
}

export default Http
