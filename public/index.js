const apiKey  = 'ab1f5a3c94434645a1634db96958a758';
const symbols = [ "GME", "AAPL", "DIS", "BNTX" ];
const outputsize = 10;

let output;

async function main() {

    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
        return 'rgba(100, 100, 100, 0.7)'
    }

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    const url = `https://api.twelvedata.com/time_series?apikey=${apiKey}&interval=1day&symbol=${symbols.join(",")}&outputsize=${outputsize}`;
    console.log(url);

    let req = await fetch(url);
    const data = await req.json();

    let stocks = [];

    for (const symbol in data) {
        stocks.push(data[symbol]);
    }

    stocks.forEach( stock => stock.values.reverse());

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        },
    });

    // output = stocks.map((stock, index) => ({
    //     label: "Highest",
    //     data: [{ x: stock.meta.symbol, y: stock.values.map((i) => { return parseInt(i.high)}).reduce((a, b) => { return Math.max(a, b)}) }],
    //     // backgroundColor: getColor(stock.meta.symbol),
    //     // borderColor: getColor(stock.meta.symbol),
    // }));

// can't get the color to work for this one
    let helper = (input) => {

        let obj = {};
        input.map((stock) =>  {
            
            obj[stock.meta.symbol] = stock.values.map(i => parseFloat(i.high)).reduce((a, b) => Math.max(a, b));
        
        })
        console.log(obj);
        return obj;

    }

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            datasets: [{
                data: helper(stocks),
            }]
        },
    });

}

main()