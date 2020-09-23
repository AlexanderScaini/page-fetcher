const args = process.argv.slice(2);
const fs = require('fs');
const request = require('request');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

request(args[0], (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

  fs.access(args[1], (err) => {
    if (err) {
      fs.writeFile(args[1], body, (err) => {
        if (err) throw err;
        console.log(`The file has been saved to ${args[1]}`);
        rl.close();
      });
    } else {
      // console.log(stat)
      rl.question(`${args[1]} already exists. Would you like to copy over ${args[1]}? y/n:  `, function (answer) {
        if (answer === 'y') {

          fs.writeFile(args[1], body, (err) => {
            if (err) throw err;
          });

          console.log(`The file has been saved to ${args[1]}`);
          rl.close();

        } else if (answer === 'n') {
          rl.close();
        }
      });
    }
    
  });
});