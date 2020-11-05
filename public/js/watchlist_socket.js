var socket = io();
socket.on('testEvent2', function(stocks){
    let data = stocks.stocks
    data.forEach(stock => {
        let lastPrice = document.querySelector('.' + stock.symbol + ' .lastPrice')
        let openPrice = document.querySelector('.' + stock.symbol + ' .openPrice')
        let netChange = document.querySelector('.' + stock.symbol + ' .netChange')
        let percentChange = document.querySelector('.' + stock.symbol + ' .percentChange')
        openPrice.innerHTML = '$' + parseFloat(stock.openPrice).toFixed(2)
        lastPrice.innerHTML = '$' + parseFloat(stock.lastPrice).toFixed(2)
        netChange.innerHTML = '$' + parseFloat(stock.netChange).toFixed(2)
        if(stock.openPrice != 0) {
            let percentChangeCalc = ((stock.netChange / stock.openPrice) * 100)
            percentChange.innerHTML = parseFloat(percentChangeCalc).toFixed(2) + '%'
        } else {
            percentChange.innerHTML = 'N/A'
        }
        
    });
});