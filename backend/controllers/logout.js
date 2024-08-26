import express from "express";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { DynamoDBClient, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

dotenv.config();

const routerLogout = express.Router();
const dynamoDbClient = new DynamoDBClient({ region: "us-east-1" });

routerLogout.get("/logout", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
  
        if (!token) {
          return res.status(401).json({ message: 'Token not provided' });
        }

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedUser.userId

        const params = {
            TableName: process.env.USERS_TABLE,
            FilterExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': { S: userId }
            }
        };

        const command = new ScanCommand(params);
        const result = await dynamoDbClient.send(command);

        const updateParams = {
            TableName: process.env.USERS_TABLE,
            Key: {
                userId: { S: userId }
            },
            UpdateExpression: 'SET sessionId = :sessionId',
            ExpressionAttributeValues: {
                ':sessionId': { S: '' }
            }
        };

        await dynamoDbClient.send(new UpdateItemCommand(updateParams));

        return res.status(200).json({
            error:false,
            message: "Seção encerrada com sucesso"
        })
        
    }catch (err) {
        return res.status(500).json({
            error: true,
            message: `Ocorreu um erro interno no servidor: ${err.message}`
        });
    }
});

export default routerLogout;