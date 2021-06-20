/* OBTENIENDO VARIABLES */
var capital_input = document.getElementById('capital-input');
var interes_input = document.getElementById('interes-input');
var meta_input = document.getElementById('meta-input');
var btn_limpiar = document.getElementById('btn-limpiar');
var btn_calcular = document.getElementById('btn-calcular');
var cantidad_operaciones_totales = document.getElementById('cantidad-operaciones-totales');
var tabla_resultados = document.getElementById('tabla-resultados');
var seccion_resultados = document.getElementById('seccion-resultados');
var porcentaje_operaciones_resultados = document.getElementById('porcentaje-operaciones-resultados');
var contenedor_alertas = document.getElementById('contenedor-alertas');

contenedor_alertas.style.display = 'none';
seccion_resultados.style.display = 'none';

/* LIMPIADOR */
btn_limpiar.addEventListener('click', limpiador);

function limpiador(){
    capital_input.value = '';
    interes_input.value = '';
    meta_input.value = '';
    cantidad_operaciones_totales.innerHTML = 0;
    porcentaje_operaciones_resultados.innerHTML = '0%';
    tabla_resultados.innerHTML = '';
    seccion_resultados.style.display = 'none';
    alertador(3);
}

/* CALCULADOR */
btn_calcular.addEventListener('click', function(){
    if(meta_input.value != '' || capital_input.value != '' || interes_input.value != ''){
        if(meta_input.value != capital_input.value){
            determinarPeriodos(meta_input.value, capital_input.value, interes_input.value);
        } else {
            alertador(4);
        }
    } else {
        alertador(1);
    }
});

/* FUNCION PARA DETERMINAR CUANTAS OPERACIONES SE NECESITAN PARA LLEGAR A LA META */
function determinarPeriodos (valorFinal, valorActual, Interes){
    var periodos = Math.log(Math.abs(valorFinal) / Math.abs(valorActual)) / Math.log(1 + (Math.abs(Interes) / 100));
    cantidad_operaciones_totales.innerHTML = Math.ceil(periodos);
    detallesResultados(Math.ceil(periodos));
}

/* FORMATEAR NUMEROS PARA AGREGAR COMAS */
internationalNumberFormat = new Intl.NumberFormat('en-US');

/* FUNCION PARA IMPRIMIR LOS DETALLES */
function detallesResultados(periodos){
    tabla_resultados.innerHTML = '';
    seccion_resultados.style.display = 'block';
    var capital_inicial = Math.abs(capital_input.value);
    var interes_operacion = Math.abs(interes_input.value);  
    var ganancias_operacion;
    porcentaje_operaciones_resultados.innerHTML = interes_operacion + '%';  

    for(var i = 1; i <= periodos; i++){
        ganancias_operacion = capital_inicial * (interes_operacion / 100);
        tabla_resultados.innerHTML += `
        <tr>
            <th scope="row">${i}</th>
            <td class="h6">$${internationalNumberFormat.format(capital_inicial.toFixed(2))}</td>
            <td class="h6">$${internationalNumberFormat.format(ganancias_operacion.toFixed(2))}</td>
            <td class="h6">$${internationalNumberFormat.format((ganancias_operacion + capital_inicial).toFixed(2))}</td>
        </tr>
        `;
        capital_inicial += ganancias_operacion; 
    }

    alertador(2);
}

/* CREADOR DE ALERTAS PARA DAR FEEDBACK AL USUARIO */
function alertador(tipo_alerta){
    contenedor_alertas.style.display = 'block';
    var color_alerta;
    var mensaje_alerta;
    if(tipo_alerta == 1){
        color_alerta = 'alert-info';
        mensaje_alerta = 'Debes llenar los campos para poder hacer el cálculo!';
    } else if (tipo_alerta == 2){
        color_alerta = 'alert-success';
        mensaje_alerta = 'Cálculo realizado con éxito!';
    } else if (tipo_alerta == 3){
        color_alerta = 'alert-success';
        mensaje_alerta = 'Campos limpios y listos para hacer un nuevo cálculo!';
    } else if (tipo_alerta == 4){
        color_alerta = 'alert-info';
        mensaje_alerta = 'No hay nada que calcular, tu capital es igual a tu meta!'
    }
    contenedor_alertas.innerHTML += `
    <div class="alert ${color_alerta} alert-dismissible fade show my-2" role="alert">
        <strong>${mensaje_alerta}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    `;
    setTimeout(function(){
        contenedor_alertas.removeChild(contenedor_alertas.children[0])
    }, 7500);
}