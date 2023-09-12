let get = async (event) =>{
    let getDataParams = {
        TableName: "users",
        IndexName: "email-index", //If using secondary key use this line to specify the indexName
        KeyConditionExpression: "#email = :email",
        ExpressionAttributeNames: {
            '#email': "email"
        },
        ExpressionAttributeValues: {
            ':email': event.email
        }
    }
    console.log("test")
        let data = await query_dynamo(getDataParams);

        if (data.Items.length > 0) {
            return data.Items[0];
        }
        else {
            throw new Error("No User With email: " + event.email + " Not Found");
        }
}

const query_dynamo = async (params) => {
    let command = new ddb.QueryCommand(params);
    console.log(command);
    const data = await ddbDocClient.send(command);
    return data;
};

module.exports = get;
