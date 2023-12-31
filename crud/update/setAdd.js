import ddb from "@aws-sdk/lib-dynamodb";
import * as dynamodb from "@aws-sdk/client-dynamodb";
const docClient = new dynamodb.DynamoDBClient();
const ddbDocClient = ddb.DynamoDBDocumentClient.from(docClient, {
    marshallOptions: {
        removeUndefinedValues: true,
    },
})

let setAdd = async(event) =>{
    let updateParams = {
        TableName: 'users',
        Key: {
            id: event.user_id
        },
        UpdateExpression: 'ADD #score :incrementValue',
        ExpressionAttributeNames: {
            '#score': "score"
        },
        ExpressionAttributeValues: {
            ":incrementValue": event.toAdd
        }
    }
    const data = await updateItem_dynamo(updateParams);
    return "User attribute incremented"
}

const updateItem_dynamo = async (params) => {
    let command = new ddb.UpdateCommand(params);
    const data = await ddbDocClient.send(command);
    return data;
};

module.exports = setAdd;