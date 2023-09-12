let listAppend = async (event) =>{
    let updateParams = {
        TableName: "users",
        Key: {
            id: event.user_id
        },
        //list_append(listName, element)
        UpdateExpression: `SET numList = list_append(if_not_exists(#numList, :emptyList), :newElement)`,
        ExpressionAttributeNames: {
            '#numList': 'numList',
        },
        ExpressionAttributeValues: {
            ':emptyList': [],
            ':newElement': [event.toAppend], // The element to append to the list
        }

    }
    const data = await updateItem_dynamo(updateParams)
    return data;
}

const updateItem_dynamo = async (params) => {
    let command = new ddb.UpdateCommand(params);
    const data = await ddbDocClient.send(command);
    return data;
};

module.exports = listAppend;