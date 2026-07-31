function convertToRoman(num) {
  // Tabela de mapeamento dos numerais romanos e arábicos ordenados do maior para o menor
  const romanMap = [
    { value: 1000, symbol: 'M' },
    { value: 900,  symbol: 'CM' },
    { value: 500,  symbol: 'D' },
    { value: 400,  symbol: 'CD' },
    { value: 100,  symbol: 'C' },
    { value: 90,   symbol: 'XC' },
    { value: 50,   symbol: 'L' },
    { value: 40,   symbol: 'XL' },
    { value: 10,   symbol: 'X' },
    { value: 9,    symbol: 'IX' },
    { value: 5,    symbol: 'V' },
    { value: 4,    symbol: 'IV' },
    { value: 1,    symbol: 'I' }
  ];

  let result = '';

  // Percorre a tabela do maior valor até o menor
  for (let i = 0; i < romanMap.length; i++) {
    // Enquanto o número for maior ou igual ao valor atual da tabela
    while (num >= romanMap[i].value) {
      result += romanMap[i].symbol; // Adiciona o símbolo correspondente
      num -= romanMap[i].value;     // Subtrai o valor equivalente do número
    }
  }

  return result;
}

// Exemplos de teste:
console.log(convertToRoman(2));    // "II"
console.log(convertToRoman(36));   // "XXXVI"
console.log(convertToRoman(649));  // "DCXLIX"
console.log(convertToRoman(3999)); // "MMMCMXCIX"