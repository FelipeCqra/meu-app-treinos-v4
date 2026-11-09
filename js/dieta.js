// 1. DADOS DA DIETA (Você só precisará alterar aqui no futuro)
const dieta = {
  alvos: { kcal: 2589, carb: 330, prot: 173, fat: 64 },
  refeicoes: [
    {
      titulo: "Refeição 1",
      hora: "10h",
      desc: "120g tapioca + 5 ovos + 30g aveia em flocos finos + 1 banana",
      kcal: 829,
      carb: 109,
      prot: 35,
      fat: 28,
    },
    {
      titulo: "Refeição 2",
      hora: "14h",
      desc: "170g filé de peito cru + 100g espaguete massa com ovos peso cru",
      kcal: 531,
      carb: 69,
      prot: 52,
      fat: 6,
    },
    {
      titulo: "Refeição 3",
      hora: "18h",
      desc: "170g filé de peito cru + 1 banana + 50g espaguete massa com ovos peso cru + 200g batata inglesa crua",
      kcal: 574,
      carb: 83,
      prot: 50,
      fat: 5,
    },
    {
      titulo: "Refeição 4",
      hora: "22h",
      desc: "80g flocão de cuzcuz peso cru + 5 ovos",
      kcal: 656,
      carb: 69,
      prot: 36,
      fat: 26,
    },
  ],
};

// 2. FUNÇÃO GERADORA
export function renderizarDieta() {
  const container = document.getElementById("meals-container");
  if (!container) return;

  container.innerHTML = "";

  // Acumuladores para as barras de progresso do dia
  let acumCarb = 0,
    acumProt = 0,
    acumFat = 0;

  dieta.refeicoes.forEach((meal, index) => {
    const numRefeicao = index + 1;

    // --- CÁLCULOS DO GRÁFICO DE PIZZA (Baseado em Calorias) ---
    const kcalCarb = meal.carb * 4;
    const kcalProt = meal.prot * 4;
    const kcalFat = meal.fat * 9;

    const pctPieCarb = Math.round((kcalCarb / meal.kcal) * 100);
    const pctPieProt = Math.round((kcalProt / meal.kcal) * 100);
    const pctPieFat = 100 - pctPieCarb - pctPieProt; // Garante fechar 100%

    // Posições do conic-gradient
    const deg1 = pctPieCarb;
    const deg2 = pctPieCarb + pctPieProt;

    // --- CÁLCULOS DAS BARRAS ACUMULATIVAS (Baseado em Gramas Totais do Dia) ---
    // Quanto já tinha sido consumido antes desta refeição
    const prevPctCarb = (acumCarb / dieta.alvos.carb) * 100;
    const prevPctProt = (acumProt / dieta.alvos.prot) * 100;
    const prevPctFat = (acumFat / dieta.alvos.fat) * 100;

    // Soma a refeição atual no acumulador diário
    acumCarb += meal.carb;
    acumProt += meal.prot;
    acumFat += meal.fat;

    // Quanto esta refeição representa do dia total
    const curPctCarb = (meal.carb / dieta.alvos.carb) * 100;
    const curPctProt = (meal.prot / dieta.alvos.prot) * 100;
    const curPctFat = (meal.fat / dieta.alvos.fat) * 100;

    // Porcentagem acumulada pós refeição (Texto final: "30%", "72%", etc.)
    const totalPctCarb = Math.round((acumCarb / dieta.alvos.carb) * 100);
    const totalPctProt = Math.round((acumProt / dieta.alvos.prot) * 100);
    const totalPctFat = Math.round((acumFat / dieta.alvos.fat) * 100);

    // --- MONTAGEM DO HTML ---
    const html = `
      <details class="meal-accordion">
        <summary class="meal-summary">
          <div class="meal-header-info">
            <div class="meal-title"><span class="meal-number">${numRefeicao}</span><h4>${meal.titulo}</h4></div>
            <span class="meal-time">${meal.hora}</span>
          </div>
        </summary>
        <div class="meal-content">
          <p class="meal-description">${meal.desc}</p>
          
          <div class="meal-stats-grid">
            <!-- GRÁFICO DE PIZZA -->
            <div class="stat-box">
              <h5>Nesta Refeição</h5>
              <div class="meal-pie-container">
                <div class="meal-pie-chart" style="background: conic-gradient(var(--info) 0% ${deg1}%, var(--success) ${deg1}% ${deg2}%, var(--warning) ${deg2}% 100%);">
                  <div class="meal-pie-center">
                    <span class="val">${meal.kcal}</span>
                    <span class="lbl">kcal</span>
                  </div>
                </div>
                <div class="meal-legend">
                  <div class="meal-legend-item">
                    <div class="meal-legend-label"><span class="dot dot-carb"></span>Carbo</div>
                    <div class="meal-legend-value"><strong>${meal.carb}g</strong> (${pctPieCarb}%)</div>
                  </div>
                  <div class="meal-legend-item">
                    <div class="meal-legend-label"><span class="dot dot-prot"></span>Proteína</div>
                    <div class="meal-legend-value"><strong>${meal.prot}g</strong> (${pctPieProt}%)</div>
                  </div>
                  <div class="meal-legend-item">
                    <div class="meal-legend-label"><span class="dot dot-fat"></span>Gordura</div>
                    <div class="meal-legend-value"><strong>${meal.fat}g</strong> (${pctPieFat}%)</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- BARRAS DE PROGRESSO DO DIA -->
            <div class="stat-box">
              <h5>Acumulado do Dia</h5>
              
              <!-- Carbo -->
              <div class="macro-bar-group">
                <div class="macro-bar-label">
                  <span>Carb <span class="lbl-muted">(${acumCarb}/${dieta.alvos.carb}g)</span></span>
                  <span class="lbl-carb">${totalPctCarb}%</span>
                </div>
                <div class="macro-bar">
                  ${numRefeicao > 1 ? `<div class="macro-fill bg-carb" style="width: ${prevPctCarb}%; opacity: 0.3;"></div>` : ""}
                  <div class="macro-fill bg-carb" style="width: ${curPctCarb}%; box-shadow: 0 0 8px var(--info-glow);"></div>
                </div>
              </div>

              <!-- Proteína -->
              <div class="macro-bar-group">
                <div class="macro-bar-label">
                  <span>Prot <span class="lbl-muted">(${acumProt}/${dieta.alvos.prot}g)</span></span>
                  <span class="lbl-prot">${totalPctProt}%</span>
                </div>
                <div class="macro-bar">
                  ${numRefeicao > 1 ? `<div class="macro-fill bg-prot" style="width: ${prevPctProt}%; opacity: 0.3;"></div>` : ""}
                  <div class="macro-fill bg-prot" style="width: ${curPctProt}%; box-shadow: 0 0 8px var(--success-glow);"></div>
                </div>
              </div>

              <!-- Gordura -->
              <div class="macro-bar-group">
                <div class="macro-bar-label">
                  <span>Gord <span class="lbl-muted">(${acumFat}/${dieta.alvos.fat}g)</span></span>
                  <span class="lbl-fat">${totalPctFat}%</span>
                </div>
                <div class="macro-bar">
                  ${numRefeicao > 1 ? `<div class="macro-fill bg-fat" style="width: ${prevPctFat}%; opacity: 0.3;"></div>` : ""}
                  <div class="macro-fill bg-fat" style="width: ${curPctFat}%; box-shadow: 0 0 8px var(--warning-glow);"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </details>
    `;

    container.insertAdjacentHTML("beforeend", html);
  });
}
