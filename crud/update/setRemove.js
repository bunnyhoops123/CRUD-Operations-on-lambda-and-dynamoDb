let setRemove = async(event) => {
    let updateParams = {
        TableName: "users",
        Key: {
            id: event.user_id
        },
        UpdateExpression: "REMOVE #toDelete",
        ExpressionAttributeNames: {
            "#toDelete": event.toDelete
        }
    }
    const data = await updateItem_dynamo(updateParams);
    return `User attribute removed: ${data}`
}

const updateItem_dynamo = async (params) => {
    let command = new ddb.UpdateCommand(params);
    const data = await ddbDocClient.send(command);
    return data;
};

module.exports = setRemove;