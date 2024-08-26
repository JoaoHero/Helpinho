export function validateEmail(email) {
    // Expressão regular mais abrangente para validação de email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (re.test(email)) {
        return {
            error: false,
            message: "Email validado"
        };
    } else {
        return {
            error: true,
            message: "Email inválido"
        };
    }
}
export function validatePassword(password) {
    if (password.length < 8) {
        return {
            error: true,
            message: "Necessário ter 8 caracteres"
        };
    }

    if (!/[A-Z]/.test(password)) {
        return {
            error: true,
            message: "Precisa ter pelo menos uma letra maiúscula"
        };
    }

    if (!/[a-z]/.test(password)) {
        return {
            error: true,
            message: "Precisa ter pelo menos uma letra minúscula"
        };
    }

    if (!/\d/.test(password)) {
        return {
            error: true,
            message: "Precisa ter pelo menos um número"
        };
    }

    if (/123|234|345|456|567|678|789|012/.test(password)) {
        return {
            error: true,
            message: "Não é permitido números em sequências"
        };
    }

    return {
        error: false,
        message: "Senha validada!"
    };
}

export function validateCPF(cpf) {
    // Substituindo pontos e traços para apenas números
    const formatedCpf = cpf.replace(/\D/g, "");

    // Verifica se o CPF tem 11 dígitos e não é uma sequência repetitiva
    if (formatedCpf.length !== 11 || /(\d)\1{10}/.test(formatedCpf)) {
        return {
            error: true,
            message: "CPF inválido"
        };
    }

    // Função para calcular o dígito verificador
    const calculateDigit = (digits) => {
        let sum = 0;
        let weight = digits.length + 1;
        for (let i = 0; i < digits.length; i++) {
            sum += digits[i] * weight--;
        }
        const remainder = (sum * 10) % 11;
        return remainder === 10 ? 0 : remainder;
    };

    // Calculando os dois dígitos verificadores
    const firstNine = formatedCpf.slice(0, 9);
    const firstDigit = calculateDigit(firstNine);
    const secondDigit = calculateDigit(firstNine + firstDigit);

    // Validando se os dígitos verificadores estão corretos
    if (formatedCpf === firstNine + firstDigit + secondDigit) {
        return {
            error: false,
            message: "CPF validado"
        };
    } else {
        return {
            error: true,
            message: "CPF inválido"
        };
    }
}

export function validateCNPJ(cnpj) {
    // Remove caracteres não numéricos
    const formatedCnpj = cnpj.replace(/\D/g, "");

    // Verifica se o CNPJ tem 14 dígitos e não é uma sequência repetitiva
    if (formatedCnpj.length !== 14 || /(\d)\1{13}/.test(formatedCnpj)) {
        return {
            error: true,
            message: "CNPJ inválido"
        };
    }

    // Função para calcular o dígito verificador
    const calculateDigit = (digits, weights) => {
        let sum = 0;
        for (let i = 0; i < digits.length; i++) {
            sum += digits[i] * weights[i];
        }
        const remainder = (sum % 11);
        return remainder < 2 ? 0 : 11 - remainder;
    };

    // Pesos para o primeiro e segundo dígito verificador
    const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    // Calculando os dois dígitos verificadores
    const firstTwelve = formatedCnpj.slice(0, 12);
    const firstDigit = calculateDigit(firstTwelve, firstWeights);
    const firstThirteen = formatedCnpj.slice(0, 12) + firstDigit;
    const secondDigit = calculateDigit(firstThirteen, secondWeights);

    // Validando se os dígitos verificadores estão corretos
    if (formatedCnpj === firstTwelve + firstDigit + secondDigit) {
        return {
            error: false,
            message: "CNPJ validado"
        };
    } else {
        return {
            error: true,
            message: "CNPJ inválido"
        };
    }
}

export function validateDocument(document) {
    // Remove caracteres não numéricos
    const formatedDocument = document.replace(/\D/g, "");

    // Identifica o tipo de documento com base no comprimento
    if (formatedDocument.length === 11) {
        // Valida CPF
        return validateCPF(formatedDocument);
    } else if (formatedDocument.length === 14) {
        // Valida CNPJ
        return validateCNPJ(formatedDocument);
    } else {
        return {
            error: true,
            message: "Documento inválido"
        };
    }
}

export function validateValue(value) {
    const defaultValue = ["100", "1.000", "5.000", "10.000", "20.000", "50.000"];
    return defaultValue.includes(value);
}