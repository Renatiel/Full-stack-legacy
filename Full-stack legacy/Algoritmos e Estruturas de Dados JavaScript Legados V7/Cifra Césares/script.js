function rot13(str) {
  return str.replace(/[A-Z]/g, (char) => {
    // Obter o código ASCII do caractere atual (A = 65, Z = 90)
    const code = char.charCodeAt(0);
    
    // Deslocar 13 posições retrocedendo no alfabeto e usando módulo 26 para manter entre A-Z
    const decodedCode = ((code - 65 + 13) % 26) + 65;
    
    return String.fromCharCode(decodedCode);
  });
}

// Exemplos de teste:
console.log(rot13("SERR PBQR PNZC")); 
// Saída: "FREE CODE CAMP"

console.log(rot13("SERR CVMMN!")); 
// Saída: "FREE PIZZA!"

console.log(rot13("SERR YBIR?")); 
// Saída: "FREE LOVE?"

console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.")); 
// Saída: "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."