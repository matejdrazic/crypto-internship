const axios = require('axios');

const ethPrice = async () => {

    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum');
        return response.data[0].current_price
      } catch (error) {
        return 0
      }
}

export default ethPrice