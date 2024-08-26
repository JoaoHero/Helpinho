import express from "express";
import { DynamoDBClient, ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import { validateEmail, validatePassword, validateDocument } from '../utils/validation.js';
import { generateUserID } from '../utils/generateUuid.js';

const saltRounds = 10;

dotenv.config();

const routerRegister = express.Router();
const dynamoDbClient = new DynamoDBClient({ region: "us-east-1" });

routerRegister.post("/register", async (req,res) => {
    try {
        const { name, email, documentNumber, date, password } = req.body;

        if (!name || !email || !documentNumber || !date || !password) {
            return res.status(400).json({
                error: true,
                message: "Favor preencher todos os campos"
            });
        }
    
        if (validateEmail(email).error || validatePassword(password).error || validateDocument(documentNumber).error) {
            return res.status(400).json({
                error: true,
                message: "Todos os campos devem seguir os requisitos propostos"
            });
        }
    
        const params = {
            TableName: process.env.USERS_TABLE,
            FilterExpression: 'email = :email OR documentNumber = :documentNumber',
            ExpressionAttributeValues: {
                ':email': { S: email },
                ':documentNumber': { S: documentNumber }
            }
        };
    
        const command = new ScanCommand(params);
        const result = await dynamoDbClient.send(command);
    
        if (!result.Items || result.Items.length != 0) {
            return res.status(401).json({
                error: true,
                message: "Email ou Cpf/Cnpj já cadastrado!"
            });
        }
    
        const userHashPassword = await bcrypt.hash(password, saltRounds);
    
        const putParams = {
            TableName: process.env.USERS_TABLE,
            Item: {
                userId: { S: generateUserID() },
                avatar: { S: "https://i.postimg.cc/25mJWWxC/default-Avatar-Image.png" },
                name: { S: name },
                email: { S: email },
                documentNumber: { S: documentNumber },
                date: { S: date },
                password: { S: userHashPassword },
                sessionId: { S: '' }
            }
        };
    
        await dynamoDbClient.send(new PutItemCommand(putParams));
    
        return res.status(201).json({
            success: true,
            message: "Usuário registrado com sucesso!"
        });

    }catch (err) {
        return res.status(500).json({
            error: true,
            message: `Ocorreu um erro interno no servidor: ${err.message}`
        });
    }
});

export default routerRegister;