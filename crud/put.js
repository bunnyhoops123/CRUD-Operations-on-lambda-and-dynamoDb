import ddb from "@aws-sdk/lib-dynamodb";
import * as dynamodb from "@aws-sdk/client-dynamodb";
const docClient = new dynamodb.DynamoDBClient();
const ddbDocClient = ddb.DynamoDBDocumentClient.from(docClient, {
    marshallOptions: {
        removeUndefinedValues: true,
    },
})

let put = async (event) =>{
    //Code to add a new user
    let putDataParams = {
        TableName: "users",
        Item: {
            id: event.user_id,
            email: event.email,
            firstname: event.firstname,
            lastname: event.lastname,
            score: event.score,
            toDelete: event.toDelete,
            numList: event.numList
        }
    }
    let putItemResult = await putItem_dynamo(putDataParams);
    console.log(putItemResult, putDataParams);
    return "User created";
}
const putItem_dynamo = async (params) => {
    let command = new ddb.PutCommand(params);
    const data = await ddbDocClient.send(command);
    return data;
};

module.exports = put;