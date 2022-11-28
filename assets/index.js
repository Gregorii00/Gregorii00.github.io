function viewCanvas(number){
    let iA,iB, a, b, yExp, deltY;
    let x = [-2,-1.5, 0, 0.5, 1, 1.25, 2, 3]; // Вводим x из таблицы
    let y = [4.135335, 3.22313, 1, 0.648721, 0.718282, 0.990343, 3.389056, 14.08554]; // Вводим y из таблицы
    let y2 = [ ];
    // let functions = {
    //     1:Math.pow(x[i], 2)*2-3*x[i]+1, 
    //     2:Math.pow(x[i], 2)*2-3*x[i]+1, 
    //     3:(x[i]*2+1)*(x[i]-2)*(x[i]+3), 
    //     4:(x[i]*2+1)*(x[i]-2)*(x[i]+3), 
    //     5:Math.exp(x[i])-x[i], 
    //     6:Math.sin(0.5*x[i])-x[i], 
    //     7:Math.sin(0.5*x[i])-x[i], 
    //     8:Math.exp(x[i])-2*x[i], 
    //     9:(x[i]*2-1)*(2-x[i])*(x[i]+3), 
    //     10:(x[i]*2+1)*(x[i]-2)*(x[i]+3), 
    //     11:Math.pow(x[i], 2)*2-3*x[i]+1, 
    //     12:Math.pow(x[i], 2)*2-3*x[i]+1, 
    //     13:Math.pow(x[i], 2)*2-3*x[i]+1, 
    //     14:Math.pow(x[i], 2)*2-3*x[i]+1, 
    //     15:Math.pow(x[i], 2)-4*x[i]+5, 
    //     16:Math.pow(x[i], 2)+4*x[i]-5, 
    //     17:Math.pow(x[i], 2)-4*x[i]+5, 
    //     18:Math.pow(x[i], 2)-4*x[i]+5, 
    //     19:Math.pow(x[i], 2)+4*x[i]-5,
    //     20:(x[i]*2+1)*(x[i]+1)*(x[i]-3), 
    //     21:(x[i]*2+1)*(x[i]+1)*(x[i]-3), 
    //     22:(x[i]*2+3)*(x[i]-2)*(x[i]+1), 
    //     23:(x[i]*2+3)*(x[i]-2)*(x[i]+1), 
    //     24:(x[i]*2+5)*(x[i]-3)*(x[i]-1)
    // };
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
        y2[i]=Math.exp(x[i])-2*x[i]; // Здесь прописываем формулу которая у вас (y2[i]= не меняем)
    }
    if(yExp == y[iA] || yExp == y[iB]){
        deltY = 0;
    } else{
        deltY =  Math.abs(Math.exp(number)-2*number)/Math.abs(yExp); // Здесь прописываем формулу которая у вас number вместо x ставим ( Math.abs(Math.exp(number)-2*number) )
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