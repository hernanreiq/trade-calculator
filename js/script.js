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
    alertador(1, 2);
}

/* CALCULADOR */
btn_calcular.addEventListener('click', function(){
    if(meta_input.value != '' || capital_input.value != '' || interes_input.value != ''){
        if(meta_input.value != capital_input.value){
            determinarPeriodos(meta_input.value, capital_input.value, interes_input.value);
        } else {
            alertador(0, 3);
        }
    } else {
        alertador(0, 0);
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

    alertador(1, 1);
}

/* CREADOR DE ALERTAS PARA DAR FEEDBACK AL USUARIO */
function alertador(id_color, id_mensaje){
    if(contenedor_alertas.children[0]){
        contenedor_alertas.innerHTML = '';
    }
    contenedor_alertas.style.display = 'block';
    var colores_alertas = ['alert-info', 'alert-success'];
    var mensajes_alertas = ['Debes llenar los campos para poder hacer el c??lculo!', 'C??lculo realizado con ??xito!', 'Campos limpios y listos para hacer un nuevo c??lculo!', 'No hay nada que calcular, tu capital es igual a tu meta!'];
    
    contenedor_alertas.innerHTML = `
    <div class="alert ${colores_alertas[id_color]} alert-dismissible fade show my-2" role="alert">
        <strong>${mensajes_alertas[id_mensaje]}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    `;
    setTimeout(function(){
        if(contenedor_alertas.children[0]){
            contenedor_alertas.removeChild(contenedor_alertas.children[0])
        }
    }, 7500);
}