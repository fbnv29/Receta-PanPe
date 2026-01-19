// === FORMATEADORES ===

function formatearPeso(g) {
    if (g >= 1000) {
      return (g / 1000).toFixed(2) + " kg";
    } else {
      return g.toFixed(0) + " g";
    }
}
  
function formatearLiquido(ml) {
    if (ml >= 1000) {
      return (ml / 1000).toFixed(2) + " L";
    } else {
      return ml.toFixed(0) + " ml";
    }
}

function formatearLevadura(g) {
    const sobres = g / 10;
    // Muestra 1 decimal para gramos, 2 decimales para sobres
    return `${g.toFixed(1)} g (${sobres.toFixed(2)} sobres)`;
}

// === LÓGICA DE NEGOCIO ===

function calcularIngredientes(panes) {
    const base = 9;
    const factor = panes / base;

    return {
        harina: 700 * factor,
        levadura: 10 * factor,
        huevos: Math.round(1 * factor), // Huevos enteros
        leche: 280 * factor,
        agua: 70 * factor,
        manteca: 55 * factor,
        sal: 14 * factor,
        azucar: 14 * factor
    };
}

// === UI & INTERACCIÓN ===

const inputPanes = document.getElementById("panes");
const resultDiv = document.getElementById("resultado");

function actualizarUI() {
    const panes = parseFloat(inputPanes.value) || 0;
    
    if (panes < 1) {
        resultDiv.innerHTML = "<p style='text-align:center; color:#999'>Ingresa una cantidad válida de panes</p>";
        return;
    }

    const ing = calcularIngredientes(panes);

    const html = `
        <h3>
            Ingredientes 
            <button class="copy-btn" onclick="copiarIngredientes()" title="Copiar al portapapeles">📋</button>
        </h3>
        <div id="lista-ingredientes">
        <b>Harina:</b> ${formatearPeso(ing.harina)}<br>
        <b>Levadura:</b> ${formatearLevadura(ing.levadura)}<br>
        <b>Huevos:</b> ${ing.huevos}<br>
        <b>Leche:</b> ${formatearLiquido(ing.leche)}<br>
        <b>Agua:</b> ${formatearLiquido(ing.agua)}<br>
        <b>Manteca / Mantequilla:</b> ${formatearPeso(ing.manteca)}<br>
        <b>Sal:</b> ${formatearPeso(ing.sal)}<br>
        <b>Azúcar:</b> ${formatearPeso(ing.azucar)}
        </div>
    `;

    resultDiv.innerHTML = html;
}

function setPanes(valor) {
    inputPanes.value = valor;
    actualizarUI();
}

function copiarIngredientes() {
    const texto = document.getElementById('lista-ingredientes').innerText;
    navigator.clipboard.writeText(texto).then(() => {
        const btn = document.querySelector('.copy-btn');
        const original = btn.innerText;
        btn.innerText = "✅";
        setTimeout(() => btn.innerText = original, 1500);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Escuchar cambios
    inputPanes.addEventListener('input', actualizarUI);
    // Calcular inicial
    actualizarUI();
});
