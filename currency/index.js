const axios = require('axios');
const money = require('money');

const RATES_URL = 'https://api.exchangeratesapi.io/latest'; //call of API that gives back the information about the exchange rates 
const BLOCKCHAIN_URL = 'https://blockchain.info/ticker'; // call of API for blockchain bitcoins rates
const CURRENCY_BITCOIN = 'BTC'; 

const isAnyBTC = (from, to) => [from, to].includes(CURRENCY_BITCOIN); // if 'from' or 'to' is currency_bitcoin it means we are gonna deal with bitcoin exchange

module.exports = async opts => {
  const {amount = 1, from = 'USD', to = CURRENCY_BITCOIN} = opts; // we set by default that we wanna change 1 USD to another currenct which is bitcoin here
  const promises = [];
  let base = from;

  const anyBTC = isAnyBTC(from, to); 

  if (anyBTC) {
    base = from === CURRENCY_BITCOIN ? to : from; 
    promises.push(axios(BLOCKCHAIN_URL));
  }

  promises.unshift(axios(`${RATES_URL}?base=${base}`)); 

  try {
    const responses = await Promise.all(promises); // we use await to wait for the response of the request before moving on
    const [rates] = responses;

    money.base = rates.data.base;
    money.rates = rates.data.rates;

    const conversionOpts = {  
      from,
      to
    }; 

    if (anyBTC) {
      const blockchain = responses.find(response =>
        response.data.hasOwnProperty(base)
      );

      Object.assign(money.rates, {
        'BTC': blockchain.data[base].last
      });
    }

    if (anyBTC) {
      Object.assign(conversionOpts, {
        'from': to,
        'to': from
      });
    }

    return money.convert(amount, conversionOpts); // we return the result of the conversion
  } catch (error) {
    throw new Error (
      '💵 Please specify a valid `from` and/or `to` currency value!' //error : ask to enter again the infos if the options are not correct
    );
  }
};
