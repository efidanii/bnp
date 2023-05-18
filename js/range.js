// Настройка ползунка
var slider = document.getElementById('pcSlider');
const min = 250, //мин деп
      max = 25000, //максимальное значение
      currency = ' EUR', //валюта
      increace = 21; //на сколько умножится итог

      document.querySelector('.pcMinValue').innerHTML = min + currency;
      document.querySelector('.pcMaxValue').innerHTML = max + currency;
      

noUiSlider.create(slider, {
    start: [0],
    
    tooltips: true,
    connect: [true, false],
    range: {
        'min': min,
        'max': max
    },
    pips: {
        mode:  'values',
        values: [min, max*0.25, max*0.5, max*0.75 ,max],
        density: 2
    },
    format: {
        to: function (value){
            return parseInt(value)
        },

        from: function (value){
            return parseInt(value)
        }
    }
});

slider.noUiSlider.on('update', function (values, handle, unencoded) {
    document.querySelector('.pcResult').innerHTML = values * increace + currency;
});



// Скрипт движения ползунка
function poloskaMove(){

    document.querySelector('.noUi-handle').addEventListener('mousemove', function(){
        clearInterval(go);
    })
    document.querySelector('#pcSlider').addEventListener('click', function(){
        clearInterval(go);
    })

    const poloska = document.querySelector('.noUi-connect'),
          krug = document.querySelector('.noUi-origin'),
          toolTipBlock = document.querySelector('.noUi-tooltip'),
          steps = 5000, //скорость ползунка
          poloskaOneStep = 1 / steps,
          toolTipOneStep = (max - min) / steps,
          krugOnestep = 100 / steps;
         
    
    let poloskaStart = 0,
        krugStart = -100,
        toolTip = min
    
    var go = setInterval(plus, 1)
    
    function   plus()
    {
        if (poloskaStart < 1){
            poloskaStart = poloskaStart + poloskaOneStep;
            toolTip = toolTip + toolTipOneStep;
            krugStart = krugStart + krugOnestep;
            poloska.style.transform = `translate(0%, 0px) scale(${poloskaStart}, 1)`;
            krug.style.transform = `translate(${krugStart}%, 0px)`;
            toolTipBlock.innerHTML = Math.round(toolTip);
            document.querySelector('.pcResult').innerHTML = toolTipBlock.innerHTML * increace + currency;

        } 
    } 
    window.removeEventListener('scroll', showModalByScroll)
}

//Функиция чтобы ползунок двигался, когда до него доходит скролл
function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= offset(slider).top) {
        poloskaMove()
    }
    ;
}
window.addEventListener('scroll', showModalByScroll);

//Определение верхней точки ползунка
function offset(el) {
    const rect = el. getBoundingClientRect(),
    scrollLeft = window.pagexOffset || document.documentElement.scrollLeft,
     scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
     return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }





