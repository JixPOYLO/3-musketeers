# Currency 
# 3 Musketeers

*The 3 Musketeers is a program to convert money with the actual currency.*


- [🐣 Getting Started](#-getting_started)
- [🎯 Running the tests](#-running_the_tests)

### 🐣 Getting started

- Go to 3-musketeers/currency
- Write npm install in your terminal if you do not have it already
- Write node cli.js to launch the program

It will display in the terminal the conversion of 1 USD to bitcoin by default 
You have to change the parameters to get the currency you are looking for, to do so :
- Go to index.js and change the parameters that refer to the options of the conversion at line 11

### 🎯 Running the tests

- In your terminal go to 3-musketeers/currency directory
- Run : npm install --safe-dev jest   
That will install jest on your machine
- Write : npm test 

Doing so you will be able to check which tests failed or passed 
If all the tests passed, a huge PASS will appear
However, if at least one test fails you will see a FAIL signal.

# 1) Example of a test:
test('convert 1 USD to EUR', async () => { result =>{
  try {
    expect(result).toBe(0.899);
    
  } catch (error) {
    console.log(error);
  }
}
});

In index.test.js,  we learn from the API that 1 USD corresponds to 0.899 EUR. Then we have to test if the result given by our program valids the fact that when we ask for the conversion of 1 USD into EUR we obtain 0.899EUR in exchange. If not, the test failed.

# 2) Second example of a test :
test('convert with amount only', async () => {
  result =>{
    try {
      expect(result).toBe('💵 Please specify a valid `from` and/or `to` currency value!');
      
    } catch (error) {
      console.log(error);
    }
  }
});

Here we test if the error message is correctly sent (= test passed) if the program does not have all the correct inputs to be launched correctly. 
Indeed, if we just have an amount and no currencies, the program is not able to give a result.
