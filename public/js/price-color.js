document.querySelectorAll('#row-item').forEach( item =>{
    let number = item.innerHTML
    number = parseFloat(number.slice(0,-1))
    console.log(number);
    if(number > 0 ) {
        item.style.backgroundColor = 'rgba(100, 215, 97)'
    } else {
        item.style.backgroundColor = 'rgba(255, 0, 0)'
    }
})