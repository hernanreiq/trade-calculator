/* VARIABLES DE LA CALCULADORA DE BINARIAS */
var meta_binarias = document.getElementById('meta-binarias');
var porcentaje_ganancia = document.getElementById('porcentaje-ganancia');
var porcentaje_inversion = document.getElementById('porcentaje-inversion');
var btn_limpiar_binarias = document.getElementById('btn-limpiar-binarias');
var btn_calcular_binarias = document.getElementById('btn-calcular-binarias');
var contenedor_estrategia_binarias = document.getElementById('contenedor-estrategia-binarias');
var inversion_binarias = document.getElementById('inversion-binarias');
var texto_porcentaje_ganacias_resultados = document.getElementById('porcentaje-ganancias-resultados');
var texto_porcentaje_inversion_resultados = document.getElementById('porcentaje-inversion-resultados');

//LIMPIANDO LOS CAMPOS DE LAS BINARIAS
btn_limpiar_binarias.addEventListener('click', limpiarCamposBinarias);

function limpiarCamposBinarias(){
    meta_binarias.value = '';
    contenedor_estrategia_binarias.style.display = 'none';
    alertador(1,1);
}

//CALCULANDO LAS BINARIAS NECESARIAS PARA LLEGAR A LA META
btn_calcular_binarias.addEventListener('click', calcularBinarias);

function calcularBinarias(){
    if(meta_binarias.value != 0){
        contenedor_estrategia_binarias.style.display = 'block';
        inversion_binarias.innerText = porcentaje_inversion.innerText + '%';
        texto_porcentaje_inversion_resultados.innerText = porcentaje_inversion.innerText + '%';
        texto_porcentaje_ganacias_resultados.innerText = porcentaje_ganancia.innerText + '%';
        actualizar_Estrategia_Inversion();
        alertador(1, 0);
    } else {
        alertador(0, 2);
    }
}

/* ESTRATEGIA DE INVERSION PARA LLEGAR A LA META */
var tabla_estrategia_inversion = document.getElementById('tabla-estrategia');
var tabla_estrategia_resumida = document.getElementById('tabla-estrategia-resumida');

function actualizar_Estrategia_Inversion(){
    tabla_estrategia_inversion.innerHTML = '';
    //VARIABLES QUE SE USARÁN EN LAS ITERACIONES
    var meta = Math.abs(meta_binarias.value);
    var cantidad_aciertos = 0;
    var capital_inicial_requerido = 100;
    var iteraciones = true;
    var inversion_por_capital;
    var ganancias;
    var i = 1;
    var total_aciertos = 0;
    var ganancias_totales = 0;
    //COMIENZAN LAS ITERACIONES
    while(iteraciones){
        inversion_por_capital = ((parseInt(porcentaje_inversion.innerText) / 100) * capital_inicial_requerido).toFixed(2);
        if(meta < 100){
            cantidad_aciertos = Math.ceil(meta / (inversion_por_capital * (parseInt(porcentaje_ganancia.innerText) / 100)));
        } else if(meta > 99){
            cantidad_aciertos = Math.ceil(100 / (inversion_por_capital * (parseInt(porcentaje_ganancia.innerText) / 100)));
        }
        meta = Math.abs(meta - 100);
        ganancias = cantidad_aciertos * (inversion_por_capital * (parseInt(porcentaje_ganancia.innerText) / 100));
        //IMPRESION DEL CONTENIDO EN LA TABLA
        tabla_estrategia_inversion.innerHTML += `
        <tr>
            <th scope="row">${i}</th>
            <td><span class="badge badged-pill badge-warning">$<span>${capital_inicial_requerido.toFixed(2)}</span> USD</span></td>
            <td><span class="badge badged-pill badge-primary">$<span>${inversion_por_capital}</span> USD</span></td>
            <td>${cantidad_aciertos}</td>
            <td><span class="badge badged-pill badge-success">$<span>${ganancias.toFixed(2)}</span> USD</span></td>
        </tr>
        `;
        total_aciertos += cantidad_aciertos; 
        ganancias_totales += ganancias;
        capital_inicial_requerido += ganancias; 
        //COMPROBAR SI HAY QUE FINALIZAR LAS ITERACIONES
        if(capital_inicial_requerido >= (Math.abs(meta_binarias.value) + 100)){
            iteraciones = false;
            resultadosResumidos(100, total_aciertos, ganancias_totales, capital_inicial_requerido);
        } else {
            i++;
        }
    }
}

//AGREGAR LOS RESULTADOS RESUMIDOS
function resultadosResumidos(capital_inicial, total_aciertos, ganancias, capital_actual){
    tabla_estrategia_resumida.innerHTML = `
    <tr>
        <td><span class="badge badge-warning">$${capital_inicial.toFixed(2)} USD</span></td>
        <td>${total_aciertos}</td>
        <td><span class="badge badge-info">$${ganancias.toFixed(2)} USD</span></td>
        <td><span class="badge badge-success">$${capital_actual.toFixed(2)} USD</span></td>
    </tr>
    `;
}

/* ACTUALIZAR EL PORCENTAJE DE GANANCIAS EN LA TABLA */
function aumentarGanancias(numero){
    if(numero > 0 && porcentaje_ganancia.innerText >= 1){
        porcentaje_ganancia.innerHTML = parseInt(porcentaje_ganancia.innerText) + 1;
    } else if(numero < 0 && porcentaje_ganancia.innerText > 1){
        porcentaje_ganancia.innerHTML = parseInt(porcentaje_ganancia.innerText) - 1;
    }
    texto_porcentaje_ganacias_resultados.innerText = porcentaje_ganancia.innerText + '%';
    if(meta_binarias.value != 0){
        actualizar_Estrategia_Inversion();
    }
}

/* ACTUALIZAR EL PORCENTAJE DE INVERSIÓN EN LA TABLA*/
function actualizarInversion(numero){
    if(numero > 0 && porcentaje_inversion.innerText >= 1){
        porcentaje_inversion.innerText = parseInt(porcentaje_inversion.innerText) + Math.abs(numero);
    } else if (numero < 0 && porcentaje_inversion.innerText > 1){
        porcentaje_inversion.innerText = parseInt(porcentaje_inversion.innerText) - Math.abs(numero);
    }
    texto_porcentaje_inversion_resultados.innerText = porcentaje_inversion.innerText + '%';
    inversion_binarias.innerText = porcentaje_inversion.innerText + '%';
    if(meta_binarias.value != 0){
        actualizar_Estrategia_Inversion();
    }
}

/* FUNCION PARA CREAR ALERTAS */

var mensajes = ['Cálculo realizado con éxito!', 'Todos los campos fueron limpiados.', 'Debe establecer una meta antes de calcular.'];
var tipo_mensaje = ['alert-info', 'alert-success'];

var alertador_contenedor = document.getElementById('alertador');

function alertador(id_tipo_mensaje, id_mensaje){
    if(alertador_contenedor.children[0]){
        alertador_contenedor.innerHTML = '';
    }
    alertador_contenedor.innerHTML = `
        <div class="alert ${tipo_mensaje[id_tipo_mensaje]}" role="alert">
            <strong>${mensajes[id_mensaje]}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;
    setTimeout(function(){
        if(alertador_contenedor.children[0]){
            alertador_contenedor.removeChild(alertador_contenedor.children[0])
        }
    }, 7500);
}