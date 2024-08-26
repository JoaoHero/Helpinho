import express from "express";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { DynamoDBClient, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

dotenv.config();

const routerVerifyToken = express.Router();
const dynamoDbClient = new DynamoDBClient({ region: "us-east-1" });

routerVerifyToken.post('/verifyToken', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
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
  const sessionId = result.Items[0].sessionId.S

  res.json({ message: 'Access granted', user: decodedUser, sessionId: sessionId });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export {
    routerVerifyToken
};