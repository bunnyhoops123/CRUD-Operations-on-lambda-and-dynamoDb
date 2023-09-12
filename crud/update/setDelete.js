import ddb from "@aws-sdk/lib-dynamodb";
import * as dynamodb from "@aws-sdk/client-dynamodb";
const docClient = new dynamodb.DynamoDBClient();
const ddbDocClient = ddb.DynamoDBDocumentClient.from(docClient, {
    marshallOptions: {
        removeUndefinedValues: true,
    },
})

let setDelete = async (event) => {
    let updateParams = {
        TableName: 'users',
        Key: {
            id: event.user_id,
        },
        UpdateExpression: `REMOVE numList[${event.index}]`,
        // ExpressionAttributeNames: {
        //     '#numList': ":numList"
        // },
        // ExpressionAttributeValues:{
        //     ":elementToRemove": event.numList[1]
        // }
    }
    await updateItem_dynamo(updateParams);
}

const updateItem_dynamo = async (params) => {
    let command = new ddb.UpdateCommand(params);
    const data = await ddbDocClient.send(command);
    return data;
};

module.exports = setDelete;