function palindrome(str) {
  // 1. Converte a string para letras minúsculas
  // 2. Remove todos os caracteres não alfanuméricos (incluindo espaços, pontuação e underline)
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 3. Inverte a string limpa
  const reversedStr = cleanStr.split('').reverse().join('');

  // 4. Compara a string limpa com ela mesma invertida
  return cleanStr === reversedStr;
}

// Exemplos de teste:
console.log(palindrome("olho")); // true
console.log(palindrome("_olho")); // true
console.log(palindrome("carro de corrida")); // true
console.log(palindrome("não é um palíndromo")); // false