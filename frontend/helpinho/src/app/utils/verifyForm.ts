interface Form {
    name: string;
    email: string;
    documentNumber: string;
    date: string;
    password: string;
}

export default function verifyForm({ name, email, documentNumber, date, password }: Form): string | null {
    if (!name) {
        return "É necessário informar o seu nome.";
    }

    if (!email) {
        return "É necessário informar o seu e-mail.";
    }

    // Validação básica de e-mail
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return "O e-mail informado não é válido.";
    }

    if (!documentNumber) {
        return "É necessário informar seu CPF ou CNPJ.";
    }

    // Verificação básica da data
    const isValidDate = (dateString: string) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/; // Espera a data no formato YYYY-MM-DD
        if (!regex.test(dateString)) return false;

        const date = new Date(dateString);
        return date.toISOString().slice(0, 10) === dateString;
    };

    return null;
}