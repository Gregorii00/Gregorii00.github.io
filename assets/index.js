function viewCanvas(number){
    let iA,iB, a, b, yExp, deltY;
    let x = [-2,-1.5, 0, 0.5, 1, 1.25, 2, 3];
    let y = [4.135335, 3.22313, 1, 0.648721, 0.718282, 0.990343, 3.389056, 14.08554]; 
    let y2 = [ ];
    for(i=1;i<x.length;i++){
        if(number>= x[i-1] &&number<= x[i]){
            iA=i-1;
            iB=i;
        }
    }
    a=(y[iA]-y[iB])/(x[iA]-x[iB]);
    b=y[iB]-a*x[iB];
    yExp = number*a+b;
    
    for (i=0;i<x.length;i++){
        y2[i]=Math.exp(x[i])-2*x[i];
    }
    if(yExp == y[iA] || yExp == y[iB]){
        deltY = 0;
    } else{
        deltY =  Math.abs(Math.exp(number)-2*number)/Math.abs(yExp);
    }

    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
    
        data: {
            labels: x,
            datasets: [
            { // График
                label: `Табличный график`,
                backgroundColor: 'transparent',
                borderColor: 'red',
                tension: 0,
                data: y
        },
        { // График 2
                label: `График функции`,
                backgroundColor: 'transparent',
                borderColor: 'green',
                data: y2
        }],
        },
    }); 
    if(number){
        let container = document.querySelector('.form');
        let oldDiv = document.querySelector(".view_error_rate")
        let div = document.createElement('div');
        div.className = "view_error_rate";
        if(deltY){
            div.textContent = `Погрешность вычисления: ${deltY}`;   
        } else{
            div.textContent = `Введите данные заново, невозможно расчитать погрешность.`;
        }
        if ( oldDiv !== null){
            container.replaceChild(div, oldDiv);
        } else {container.append(div);}
    }
    
}

function numberInput(){
    let numberInpVal = document.querySelector("input[name='number']").value;  
    viewCanvas(numberInpVal);
}
