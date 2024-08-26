import express from "express";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import dotenv from 'dotenv';

dotenv.config();

const routerListHelpinho = express.Router();
const dynamoDbClient = new DynamoDBClient({ region: "us-east-1" });

routerListHelpinho.get("/helpinhos", async (req, res) => {
    try {
        const params = {
            TableName: process.env.HELPINHO_TABLE,
        };

        let helpinhos = [];
        let lastEvaluatedKey = null;

        do {
            const command = new ScanCommand(params);
            const result = await dynamoDbClient.send(command);

            if (result.Items) {
                helpinhos = helpinhos.concat(result.Items.map(item => ({
                    helpinhoId: item.helpinhoId?.S || null,
                    userId: item.userId.S || null,
                    userEmail: item.userEmail.S || null,
                    userName: item.userName.S || null,
                    title: item.title?.S || null,
                    description: item.description?.S || null,
                    image: item.image?.S || null,
                    category: item.category?.S || null,
                    value: item.value?.S || null,
                })));
            }

            lastEvaluatedKey = result.LastEvaluatedKey;
            params.ExclusiveStartKey = lastEvaluatedKey;

        } while (lastEvaluatedKey);

        return res.status(200).json({
            error: false,
            result: helpinhos
        });

    } catch (err) {
        return res.status(500).json({
            error: true,
            message: `Ocorreu um erro interno no servidor: ${err.message}`
        });
    }
});

export default routerListHelpinho;