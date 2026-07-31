function telephoneCheck(str) {
  // Regex para validar número de telefone no formato dos EUA:
  // ^(1\s?)?     -> Código de país "1" opcional (pode ter um espaço depois)
  // (\(\d{3}\)|\d{3}) -> Código de área: 3 dígitos entre parênteses OU apenas 3 dígitos
  // [\s\-]?      -> Espaço ou hífen opcional
  // \d{3}        -> 3 dígitos numéricos
  // [\s\-]?      -> Espaço ou hífen opcional
  // \d{4}$       -> 4 dígitos numéricos no final da string

  const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;

  return phoneRegex.test(str);
}

// Exemplos de teste:
console.log(telephoneCheck("555-555-5555"));        // true
console.log(telephoneCheck("1 (555) 555-5555"));    // true
console.log(telephoneCheck("1 555 555 5555"));      // true
console.log(telephoneCheck("5555555555"));          // true
console.log(telephoneCheck("1 555)555-5555"));      // false (parêntese não fechado)
console.log(telephoneCheck("2 (757) 622-7382"));    // false (código de país diferente de 1)
console.log(telephoneCheck("555-5555"));            // false (faltando código de área)