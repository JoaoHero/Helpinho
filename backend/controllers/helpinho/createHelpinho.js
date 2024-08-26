import express from "express";
import { putItemInTable } from "../../services/dynamoService.js"
import { validateValue } from '../../utils/validation.js';
import { generateUserID } from '../../utils/generateUuid.js';
import { moderateContent } from "../../utils/moderateContent.js";
import { authenticateToken } from "../../middleware/auth.js";
import dotenv from 'dotenv';

dotenv.config();

const routerCreateHelpinho = express.Router();

routerCreateHelpinho.post("/createHelpinho", authenticateToken, async (req, res) => {
    try {
        const { email, userId, userName } = req.user;
        const { category, title, image, description, value } = req.body;
    
        if(!category || !title || !image || !description || !value) {
            return res.status(400).json({
                error: true,
                message: "Favor preencher todos os campos"
            });
        }
    
        if (!validateValue(value)) {
            return res.status(401).json({
                error: true,
                message: "Favor informar um valor de helpinho valido"
            });
        }

        // Filtrando a descrição, proibindo certas palavras
        const validateDescription = moderateContent(description)
    
        if (validateDescription.error) {
            return res.status(401).json({
                error: true,
                message: validateDescription.message
            });
        }

        const item = {
            helpinhoId: { S: generateUserID() },
            userId: { S: userId },
            userEmail: { S: email },
            userName: {S: userName },
            category: { S: category },
            title: { S: title },
            image: { S: image },
            description: { S: description },
            value: { S: String(value)  },
            donatedValue: { N: "0" },
            donors: { L: [] },
            userHelpinhoCreated: { n : "1" },
            createdAt: { N: String(Date.now()) }
        }
    
        await putItemInTable(process.env.HELPINHO_TABLE, item);

        return res.status(201).json({
            success: true,
            helpinhoId: item.helpinhoId.S,
            message: "Helpinho criado com sucesso!"
        });

    }catch (err) {
        return res.status(500).json({
            error: true,
            message: `Ocorreu um erro interno no servidor: ${err.message}`
        });
    }
});

export default routerCreateHelpinho;