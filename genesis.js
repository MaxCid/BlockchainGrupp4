const createGenesisBlock = () => {
    // Make a request to an API to get the data for the Genesis block
    return fetch('https://api.example.com/genesis-data')
      .then(response => response.json())
      .then(data => {
        // Create the Genesis block using the data from the API
        const genesisBlock = {
          data: data,
          previousHash: '0',
          hash: calculateHash(data, '0')
        };
        return genesisBlock;
      });
  }
  
  // Call the createGenesisBlock function and log the result
  createGenesisBlock().then(genesisBlock => console.log(genesisBlock));
  
  export default createGenesisBlock