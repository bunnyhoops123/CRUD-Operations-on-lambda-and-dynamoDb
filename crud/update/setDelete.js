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