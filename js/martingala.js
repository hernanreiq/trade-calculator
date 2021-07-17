

/* MARTINGALA CALCULADORA DE GANANCIAS */
var porcentaje_ganancia = document.getElementById('porcentaje-ganancia');

function aumentarGanancias(numero){
    if(numero > 0 && porcentaje_ganancia.innerText >= 1){
        porcentaje_ganancia.innerHTML = parseInt(porcentaje_ganancia.innerText) + 1;
    } else if(numero < 0 && porcentaje_ganancia.innerText > 1){
        porcentaje_ganancia.innerHTML = parseInt(porcentaje_ganancia.innerText) - 1;
    }
    actualizarGanancias();
    actualizar_Estrategia_Inversion();
}

/* VARIABLES DE LAS INVERSIONES */
var gn_1 = document.getElementById('gn-1');
var gn_2 = document.getElementById('gn-2');
var gn_3 = document.getElementById('gn-3');
var gn_4 = document.getElementById('gn-4');
var gn_5 = document.getElementById('gn-5');

var gm_1 = document.getElementById('gm-1');
var gm_2 = document.getElementById('gm-2');
var gm_3 = document.getElementById('gm-3');
var gm_4 = document.getElementById('gm-4');
var gm_5 = document.getElementById('gm-5');

var inversiones = [1, 3, 6, 15, 38];

function actualizarGanancias(){
    gn_1.innerHTML =  (inversiones[0] * (parseInt(porcentaje_ganancia.innerHTML) / 100)).toFixed(2);
    gn_2.innerHTML =  (inversiones[1] * (parseInt(porcentaje_ganancia.innerHTML) / 100)).toFixed(2);
    gn_3.innerHTML =  (inversiones[2] * (parseInt(porcentaje_ganancia.innerHTML) / 100)).toFixed(2);
    gn_4.innerHTML =  (inversiones[3] * (parseInt(porcentaje_ganancia.innerHTML) / 100)).toFixed(2);
    gn_5.innerHTML =  (inversiones[4] * (parseInt(porcentaje_ganancia.innerHTML) / 100)).toFixed(2);

    gm_1.innerHTML =  ((inversiones[0] * (parseInt(porcentaje_ganancia.innerHTML) / 100)) - parseFloat(gn_1.innerText)).toFixed(2);
    gm_2.innerHTML =  ((inversiones[1] * (parseInt(porcentaje_ganancia.innerHTML) / 100)) - inversiones[0]).toFixed(2);
    gm_3.innerHTML =  ((inversiones[2] * (parseInt(porcentaje_ganancia.innerHTML) / 100)) - (inversiones[1] + inversiones[0])).toFixed(2);
    gm_4.innerHTML =  ((inversiones[3] * (parseInt(porcentaje_ganancia.innerHTML) / 100)) - (inversiones[2] + inversiones[1] + inversiones[0])).toFixed(2);
    gm_5.innerHTML =  ((inversiones[4] * (parseInt(porcentaje_ganancia.innerHTML) / 100)) - (inversiones[3] + inversiones[2] + inversiones[1] + inversiones[0])).toFixed(2);
}

actualizarGanancias();

/* ESTRATEGIA DE INVERSION PARA LLEGAR A LA META */
var capital_inicial_requerido;
var meta_capital = 500;
var porcentaje_inversion = document.getElementById('porcentaje-inversion');
var tabla_estrategia_inversion = document.getElementById('tabla-estrategia');
var cantidad_aciertos;
var cantidad_iteraciones = meta_capital / 100;
var inversion_por_capital;

function actualizar_Estrategia_Inversion(){
    tabla_estrategia_inversion.innerHTML = '';
    capital_inicial_requerido = 100;
    for(var i = 1; i <= cantidad_iteraciones; i++){
        inversion_por_capital = ((parseInt(porcentaje_inversion.innerText) / 100) * capital_inicial_requerido).toFixed(0);
        cantidad_aciertos = Math.ceil(100 / (inversion_por_capital * (parseInt(porcentaje_ganancia.innerText) / 100)));
        tabla_estrategia_inversion.innerHTML += `
        <tr>
            <th scope="row">${i}</th>
            <td><span class="badge badged-pill badge-warning">$<span>${capital_inicial_requerido}</span> USD</span></td>
            <td><span class="badge badged-pill badge-primary">$<span>${inversion_por_capital}</span> USD</span></td>
            <td>${cantidad_aciertos}</td>
            <td><span class="badge badged-pill badge-success">$<span>100</span> USD</span></td>
        </tr>
        `;
        capital_inicial_requerido += 100; 
    }
}

actualizar_Estrategia_Inversion();

/* ACTUALIZAR EL PORCENTAJE DE INVERSIÓN EN LA TABLA*/

function actualizarInversion(numero){
    if(numero > 0 && porcentaje_inversion.innerText >= 1){
        porcentaje_inversion.innerText = parseInt(porcentaje_inversion.innerText) + Math.abs(numero);
    } else if (numero < 0 && porcentaje_inversion.innerText > 1){
        porcentaje_inversion.innerText = parseInt(porcentaje_inversion.innerText) - Math.abs(numero);
    }
    actualizar_Estrategia_Inversion();
}


/* NOTIFICADOR 

var mensajes = ['Debes formar una secuencia del mismo color', 'Todavía no es momento de cambiar el color', 'Es un buen momento para considerar cambiar el color', '¡Cambia de color! el margen de fallar es casi nulo'];
var tipo_mensaje = ['alert-info', 'alert-danger', 'alert-warning', 'alert-success'];

var alertador_contenedor = document.getElementById('alertador');

function alertador(){
    var cantidad_monedas = contenedor_columnas.getElementsByClassName('col-md-1').length;
    var id_mensaje = 0;
    var id_tipo_mensaje = 0;
    if(cantidad_monedas == 0){
        id_mensaje = 0;
        id_tipo_mensaje = 0;
    } else if (cantidad_monedas <= 3){
        id_mensaje = 1;
        id_tipo_mensaje = 1;
    } else if(cantidad_monedas == 4){
        id_mensaje = 2;
        id_tipo_mensaje = 2;
    } else if(cantidad_monedas > 4){
        id_mensaje = 3;
        id_tipo_mensaje = 3;
    }
    alertador_contenedor.innerHTML = `
        <div class="alert ${tipo_mensaje[id_tipo_mensaje]}" role="alert">
            ${mensajes[id_mensaje]}
        </div>
    `;
}

alertador();*/