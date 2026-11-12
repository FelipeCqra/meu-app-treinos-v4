// 1. DADOS DAS FICHAS DE TREINO
const fichas = [
  {
    icone: "🔥",
    titulo: "Upper A",
    exercicios: [
      { nome: "Remada T-Bar Aberta", series: 1 },
      { nome: "Puxador Aberto", series: 2 },
      { nome: "Supino Inclinado Articulado", series: 3 },
      { nome: "Peck Deck", series: 2 },
      { nome: "Rosca Scott", series: 2 },
      { nome: "Tríceps Pulley", series: 2 },
      { nome: "Desenvolvimento", series: 2 },
      { nome: "Extensão Lombar", series: 2, extra: "LOMBAR" },
    ],
  },
  {
    icone: "🦿",
    titulo: "Lower A",
    exercicios: [
      { nome: "Flexora Unilateral", series: 2 },
      { nome: "Stiff", series: 1 },
      { nome: "Cadeira Adutora", series: 1 },
      { nome: "Elevação Pélvica", series: 1 },
      { nome: "Leg 45", series: 2 },
      { nome: "Panturrilha Leg Horizontal", series: 2 },
    ],
  },
  {
    icone: "⚡",
    titulo: "Upper B",
    exercicios: [
      { nome: "Remada Baixa Apoiada Cabo", series: 2 },
      { nome: "Remada Curvada Halter", series: 1 },
      { nome: "Puxador Fechado", series: 2 },
      { nome: "Supino Reto Máquina", series: 3 },
      { nome: "Fly Máquina", series: 1 },
      { nome: "Elevação Lateral Máquina", series: 2 },
      { nome: "Rosca Scott Unilateral", series: 2 },
      { nome: "Tríceps Pulley", series: 2 },
      { nome: "Extensão Lombar", series: 2, extra: "LOMBAR" },
    ],
  },
  {
    icone: "🦵",
    titulo: "Lower B",
    exercicios: [
      { nome: "Cadeira Abdutora", series: 1 },
      { nome: "Cadeira Adutora", series: 1 },
      { nome: "Cadeira Flexora", series: 2 },
      { nome: "Agachamento Belt", series: 3 },
      { nome: "Panturrilha Sentado", series: 2 },
      { nome: "Panturrilha em Pé", series: 1 },
    ],
  },
  {
    icone: "➕",
    titulo: "Adicional",
    exercicios: [
      { nome: "Elevação Lateral Máquina", series: 2 },
      { nome: "Rosca Scott", series: 1 },
      { nome: "Tríceps Pulley", series: 1 },
      { nome: "Flexão de Punho", series: 3 },
      { nome: "Rosca Inversa", series: 3 },
    ],
  },
];

// 2. FUNÇÃO GERADORA
export function renderizarFichas() {
  const container = document.getElementById("fichas-container");
  if (!container) return;

  container.innerHTML = "";

  fichas.forEach((ficha) => {
    let totalSeriesNormais = 0;
    let totaisExtras = {};
    let htmlExercicios = "";

    ficha.exercicios.forEach((ex, index) => {
      // Plural ou singular para a palavra "série"
      const textoSerie = ex.series === 1 ? "1 série" : `${ex.series} séries`;

      // Monta o item da lista (numerado automaticamente)
      htmlExercicios += `<li>${index + 1} - ${ex.nome} <span>${textoSerie}</span></li>`;

      // Separa a contagem das séries normais e extras (como Lombar)
      if (ex.extra) {
        if (!totaisExtras[ex.extra]) totaisExtras[ex.extra] = 0;
        totaisExtras[ex.extra] += ex.series;
      } else {
        totalSeriesNormais += ex.series;
      }
    });

    // Monta o texto do rodapé (Ex: "TOTAL: 14 SÉRIES + 2 LOMBAR")
    let textoRodape = `TOTAL: ${totalSeriesNormais} SÉRIES`;
    for (const [nomeExtra, qtd] in Object.entries(totaisExtras)) {
      // Fallback simples para rodar em qualquer versão de JS
    }
    // Percorrendo o objeto de extras da forma mais segura:
    Object.keys(totaisExtras).forEach((chave) => {
      textoRodape += ` + ${totaisExtras[chave]} ${chave}`;
    });

    // Monta o HTML final do acordeão
    const htmlFicha = `
      <details class="semana-accordion card-ficha">
        <summary class="semana-summary">
          <span class="ficha-icon">${ficha.icone}</span> ${ficha.titulo}
        </summary>
        <div class="accordion-content">
          <ul class="exercise-list">
            ${htmlExercicios}
          </ul>
          <p>${textoRodape}</p>
        </div>
      </details>
    `;

    container.insertAdjacentHTML("beforeend", htmlFicha);
  });
}
