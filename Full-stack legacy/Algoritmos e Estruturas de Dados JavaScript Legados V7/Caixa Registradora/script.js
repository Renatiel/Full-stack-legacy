function checkCashRegister(price, cash, cid) {
  // Tabela de valores das moedas/notas em centavos
  const UNIT_AMOUNT = {
    "PENNY": 1,
    "NICKEL": 5,
    "DIME": 10,
    "QUARTER": 25,
    "ONE": 100,
    "FIVE": 500,
    "TEN": 1000,
    "TWENTY": 2000,
    "ONE HUNDRED": 10000
  };

  // Converter o troco devido para centavos
  let changeDue = Math.round((cash - price) * 100);

  // Calcular o total de dinheiro disponível na gaveta (em centavos)
  let totalCid = cid.reduce((acc, curr) => acc + Math.round(curr[1] * 100), 0);

  // CASO 1: Dinheiro na gaveta é menor que o troco devido
  if (totalCid < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  // CASO 2: Dinheiro na gaveta é exatamente igual ao troco devido
  if (totalCid === changeDue) {
    return { status: "CLOSED", change: cid };
  }

  // CASO 3: Dinheiro na gaveta é maior que o troco devido -> Tentar dar o troco
  let changeArray = [];
  
  // Inverter o array cid para começar pelas moedas/notas de maior valor
  const reversedCid = [...cid].reverse();

  for (let elem of reversedCid) {
    let unitName = elem[0];
    let unitTotal = Math.round(elem[1] * 100); // Total desta moeda na gaveta em centavos
    let unitValue = UNIT_AMOUNT[unitName];     // Valor unitário da moeda em centavos
    let amountGiven = 0;

    // Retirar o máximo possível desta nota/moeda enquanto houver troco devido e dinheiro no caixa
    while (changeDue >= unitValue && unitTotal > 0) {
      changeDue -= unitValue;
      unitTotal -= unitValue;
      amountGiven += unitValue;
    }

    // Se usou essa nota/moeda, adiciona ao array de troco (convertendo de volta para dólares)
    if (amountGiven > 0) {
      changeArray.push([unitName, amountGiven / 100]);
    }
  }

  // Se após percorrer todas as moedas ainda sobrou troco sem dar (não temos moedas exatas)
  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: changeArray };
}

// Exemplos de teste:
console.log(checkCashRegister(19.5, 20, [
  ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], 
  ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]
])); 
// Retorna: { status: "OPEN", change: [ [ "QUARTER", 0.5 ] ] }

console.log(checkCashRegister(19.5, 20, [
  ["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], 
  ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]
])); 
// Retorna: { status: "CLOSED", change: [ ... Array CID original ... ] }
