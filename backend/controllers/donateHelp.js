import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { getItemFromTable, updateItemInTable } from "../services/dynamoService.js"

import { DynamoDBClient, ScanCommand, UpdateItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
const dynamoDbClient = new DynamoDBClient({ region: "us-east-1" });

import dotenv from 'dotenv';

dotenv.config();

const routerDonateHelp = express.Router();

routerDonateHelp.post("/donate/:id", authenticateToken, async (req, res) => {
    const { userId } = req.user;
    const helpinhoId = req.params.id;
    const { donationAmount } = req.body;

    try {
        if (!donationAmount || donationAmount <= 1) {
            return res.status(400).json({
                error: true,
                message: "Favor inserir um valor válido"
            })
        }

        const helpinhoResult = await getItemFromTable(process.env.HELPINHO_TABLE, "helpinhoId", helpinhoId);
        if (!helpinhoResult.Items || helpinhoResult.Items.length === 0) {
            return res.status(404).json({
                error: true,
                message: "Não foi encontrado nenhum helpinho criado em nosso sistema"
            });
        }

        const userResult = await getItemFromTable(process.env.USERS_TABLE, "userId", userId);
        if (!userResult.Items || userResult.Items.length === 0) {
            return res.status(401).json({
                error: true,
                message: "Usuário não encontrado, favor verificar seu login, caso o erro persista entrar em contato com o suporte"
            });
        }

        const user = userResult.Items[0]
        const createdHelpinhoUserId = helpinhoResult.Items[0].userId.S;

        const updateParams = {
            UpdateExpression: "SET donors = list_append(donors, :newDonor), donatedValue = donatedValue + :increment",
            ExpressionAttributeValues: {
                ":newDonor": {
                    L: [
                        { M: { donorId: { S: userId }, donorAvatar: {S: user.avatar.S }, donorName: { S: user.name.S }, amount: { N: String(donationAmount) } } }
                    ]
                },
                ":increment": { N: String(donationAmount) }
            }
        };

        await updateItemInTable(process.env.HELPINHO_TABLE, { helpinhoId: { S: helpinhoId }, userId: { S: createdHelpinhoUserId } }, updateParams);
        
        return res.status(201).json({
            success: true,
            message: "Doação registrada com sucesso!"
        });

    } catch (err) {
        return res.status(500).json({
            error: true,
            message: `Ocorreu um erro interno no servidor: ${err.message}`
        });
    }
});

export default routerDonateHelp;