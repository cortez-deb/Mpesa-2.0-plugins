import axios from 'axios';

class ClientCredentials {
   /**
       * @param {string} consumerKey
       * @param {string} consumerSecret
       * 
       */
  async getAccessToken(consumerKey, consumerSecret) {
    try {
      const authHeader = `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`;
      const response = await axios.get(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;

    } catch (error) {
      console.error('Error getting access token:', error);
      return error
    }
  }
}

export default new ClientCredentials();
