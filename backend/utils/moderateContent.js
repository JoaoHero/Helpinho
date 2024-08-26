import leoProfanity from 'leo-profanity';

// Definir o idioma para PT-BR
leoProfanity.loadDictionary('pt-br');

// Adiciona palavras fortes à lista de censura
leoProfanity.add([
    'burro', 'idiota', 'estúpido', 'inútil', 'arma', 'revólver', 'pistola', 'fuzil', 'bomba'
]);
  
export function moderateContent(description) {
    if (leoProfanity.check(description)) {
        return {
            error: true,
            message: "O texto contém palavras inadequadas. Por favor, evite usar linguagem ofensiva. A persistência pode levar a penalidades ou restrições em sua conta."
        }
    }

    return {
        error: false
    }
}