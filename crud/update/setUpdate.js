let setUpdate = async(event) =>{
    let updateParams = {
        TableName: "users",
        //Cannot use secondary key
        Key: {
            id: event.user_id
        },
        UpdateExpression: "SET #firstname = :firstname, #lastname = :lastname",
        ExpressionAttributeNames: {
            "#firstname": "firstname",
            "#lastname": "lastname",
        },
        ExpressionAttributeValues: {
            ":firstname": event.firstname,
            ":lastname": event.lastname,
        }

    }
    const data = await updateItem_dynamo(updateParams);
    console.log(data);
    return 'User updated';
}

const updateItem_dynamo = async (params) => {
    let command = new ddb.UpdateCommand(params);
    const data = await ddbDocClient.send(command);
    return data;
};

module.exports = setUpdate;