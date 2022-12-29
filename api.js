let endpoint = 'https://api.binance.com/api/v3/ticker/price'
fetch(endpoint)
    .then( response => response.json() )
    .then( datas => showData(datas))
    .catch( e => console.log(e))


const showData = (data)=>{
    console.log(data)
    let body = ''
    let counter = 0;
    for (let i=0; i < data.length; i++) {
        if (counter >= 5) {
            break;
        }
        body += <tr><td>${data[i].symbol}</td><td>${data[i].price}</td></tr>;
        counter++;
    }
    document.getElementById('data').innerHTML = body
}