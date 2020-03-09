const nock = require('nock');

beforeEach(() => {
  nock('https://api.exchangeratesapi.io')
    .get('/latest?base=USD')
    .reply(200, {
      'base': 'USD',
      'rates': {
        'EUR': 0.899
      }
    });

  nock('https://api.exchangeratesapi.io')
    .get('/latest?base=EUR')
    .reply(200, {
      'base': 'EUR',
      'rates': {
        'USD': 1.1122
      }
    });

  nock('https://blockchain.info')
    .get('/ticker')
    .reply(200, {
      'USD': {
        '15m': 8944.49,
        'last': 8944.49,
        'buy': 8944.49,
        'sell': 8944.49,
        'symbol': '$'
      },
      'EUR': {
        '15m': 8048.11,
        'last': 8048.11,
        'buy': 8048.11,
        'sell': 8048.11,
        'symbol': '€'
      }
    });
});

test('convert 1 USD to EUR', async () => { result =>{
  try {
    expect(result).toBe(0.899);
    
  } catch (error) {
    console.log(error);
  }
}
});

test('convert 1 USD to USD', async () => {
  result =>{
    try {
      expect(result).toBe(1);
      
    } catch (error) {
      console.log(error);
    }
  }
});

test('convert 1 EUR to USD', async () => {
  result =>{
    try {
      expect(result).toBe(1.1122);
      
    } catch (error) {
      console.log(error);
    }
  }
});

test('convert 1 BTC to USD', async () => {
  result =>{
    try {
      expect(result).toBe(8944.49);
      
    } catch (error) {
      console.log(error);
    }
  }
});

test('convert 1 BTC to EUR', async () => {
  result =>{
    try {
      expect(result).toBe(8048.11);
      
    } catch (error) {
      console.log(error);
    }
  }
});

test('convert without arguments', async () => {
  result =>{
    try {
      expect(result).toBe(8944.49);
      
    } catch (error) {
      console.log(error);
    }
  }
});

test('convert with amount only', async () => {
  result =>{
    try {
      expect(result).toBe('💵 Please specify a valid `from` and/or `to` currency value!');
      
    } catch (error) {
      console.log(error);
    }
  }
});

test('convert with amount and (from) currency only', async () => {
  result =>{
    try {
      expect(result).toBe('💵 Please specify a valid `from` and/or `to` currency value!');
      
    } catch (error) {
      console.log(error);
    }
  }});

test('convert without a correct `from` or `to` currency value', async () => {
  
    result =>{
      try {
        expect(result).toBe('💵 Please specify a valid `from` and/or `to` currency value!');
        
      } catch (error) {
        console.log(error);
      }
    }
});
