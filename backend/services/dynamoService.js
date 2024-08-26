// services/dynamoService.js
import { DynamoDBClient, ScanCommand, UpdateItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoDbClient = new DynamoDBClient({ region: "us-east-1" });

export async function getItemFromTable(tableName, key, value) {
    const params = {
        TableName: tableName,
        FilterExpression: `${key} = :value`,
        ExpressionAttributeValues: {
            ':value': { S: value }
        }
    };
    const command = new ScanCommand(params);
    return await dynamoDbClient.send(command);
};

export async function updateItemInTable(tableName, key, updateParams) {
    const params = {
        TableName: tableName,
        Key: key,
        UpdateExpression: updateParams.UpdateExpression,
        ExpressionAttributeValues: updateParams.ExpressionAttributeValues
    };

    return await dynamoDbClient.send(new UpdateItemCommand(params));
};

export async function putItemInTable(tableName, item) {
    const params = {
        TableName: tableName,
        Item: item
    };

    await dynamoDbClient.send(new PutItemCommand(params));
}