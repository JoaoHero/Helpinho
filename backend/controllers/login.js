import express from "express";
import { DynamoDBClient, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateUserID } from '../utils/generateUuid.js';

dotenv.config();

const routerLogin = express.Router();
const dynamoDbClient = new DynamoDBClient({ region: "us-east-1" });

routerLogin.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: "Favor preencher todos os campos"
            });
        }

        const params = {
            TableName: process.env.USERS_TABLE,
            FilterExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': { S: email }
            }
        };

        const command = new ScanCommand(params);
        const result = await dynamoDbClient.send(command);

        if (!result.Items || result.Items.length === 0) {
            return res.status(401).json({
                error: true,
                message: "Usuário ou senha inválidos"
            });
        }

        const userPassword = result.Items[0].password.S
        const passwordMatch = await bcrypt.compare(password, userPassword);

        if (!passwordMatch) {
            return res.status(401).json({
                error: true,
                message: "Usuário ou senha inválidos"
            });
        }

        const userId = result.Items[0].userId.S
        const userName = result.Items[0].name.S

        const token = jwt.sign(
            { email, userId, userName },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const updateParams = {
            TableName: process.env.USERS_TABLE,
            Key: {
                userId: { S: userId } // Substitua 'EXISTING_USER_ID' pelo ID do usuário que você deseja atualizar
            },
            UpdateExpression: 'SET sessionId = :sessionId',
            ExpressionAttributeValues: {
                ':sessionId': { S: generateUserID() }
            }
        };

        await dynamoDbClient.send(new UpdateItemCommand(updateParams));

        return res.status(200).json({
            error: false,
            message: "Login realizado com sucesso!",
            token
        });

    } catch (err) {
        return res.status(500).json({
            error: true,
            message: `Ocorreu um erro interno no servidor: ${err.message}`
        });
    }
});

export default routerLogin;