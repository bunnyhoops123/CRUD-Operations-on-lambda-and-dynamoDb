let deleteItem = async (event) =>{
    let deleteParams = {
        TableName: "users",
        Key: {
            id: event.user_id
        },
    };
    await deleteItem_dynamo(deleteParams);
    return 'User Deleted Success';
};

const deleteItem_dynamo = async (params) => {
    let command = new ddb.DeleteCommand(params);
    const data = await ddbDocClient.send(command);
    return data;

};

module.exports = deleteItem;