import ddb from "@aws-sdk/lib-dynamodb";
import * as dynamodb from "@aws-sdk/client-dynamodb";

const get = require('./crud/get');
const put = require('./crud/put');
const deleteItem = require('./crud/delete');
const listAppend = require('./crud/update/list-append');
const setAdd = require('./crud/update/setAdd');
const setDelete = require('./crud/update/setDelete');
const setRemove = require('./crud/update/setRemove');
const setUpdate = require('./crud/update/setUpdate');


const docClient = new dynamodb.DynamoDBClient();
const ddbDocClient = ddb.DynamoDBDocumentClient.from(docClient, {
    marshallOptions: {
        removeUndefinedValues: true,
    },
})

// const query_dynamo = async (params) => {
//     let command = new ddb.QueryCommand(params);
//     console.log(command);
//     const data = await ddbDocClient.send(command);
//     return data;
// };

// const putItem_dynamo = async (params) => {
//     let command = new ddb.PutCommand(params);
//     const data = await ddbDocClient.send(command);
//     return data;
// };

// const updateItem_dynamo = async (params) => {
//     let command = new ddb.UpdateCommand(params);
//     const data = await ddbDocClient.send(command);
//     return data;
// };

// const deleteItem_dynamo = async (params) => {
//     let command = new ddb.DeleteCommand(params);
//     const data = await ddbDocClient.send(command);
//     return data;

// };

export const handler = async (event) => {

    switch(event.operation){
        case "get":
            get(event);
            break;
        case "put":
            put(event);
            break;
        case "set-update":
            setUpdate(event);
            break;
        case "set-remove":
            setRemove(event);
            break;
        case "list-append":
            listAppend(event);
            break;
        case "set-add":
            setAdd(event);
            break;
        case "set-delete":
            setDelete(event);
            break;
        case "delete":
            deleteItem(event);
            break;
        default:
            throw new Error("Invalid operation");
        }
        

        


    //GET action for getting a user
    // if (event.operation == "get") {
    //     let getDataParams = {
    //         TableName: "users",
    //         IndexName: "email-index", //If using secondary key use this line to specify the indexName
    //         KeyConditionExpression: "#email = :email",
    //         ExpressionAttributeNames: {
    //             '#email': "email"
    //         },
    //         ExpressionAttributeValues: {
    //             ':email': event.email
    //         }
    //     }

    //     console.log("test")
    //     let data = await query_dynamo(getDataParams);

    //     if (data.Items.length > 0) {
    //         return data.Items[0];
    //     }
    //     else {
    //         throw new Error("No User With email: " + event.email + " Not Found");
    //     }
    // }

    //PUT action to create a user
    // else if (event.operation == "put") {
    //     //Code to add a new user
    //     let putDataParams = {
    //         TableName: "users",
    //         Item: {
    //             id: event.user_id,
    //             email: event.email,
    //             firstname: event.firstname,
    //             lastname: event.lastname,
    //             score: event.score,
    //             toDelete: event.toDelete,
    //             numList: event.numList
    //         }
    //     }
    //     let putItemResult = await putItem_dynamo(putDataParams);
    //     console.log(putItemResult, putDataParams);
    //     return "User created";
    // }

    //SET action to update a certain attribute
    // else if (event.operation == "set-update") {
    //     let updateParams = {
    //         TableName: "users",
    //         //Cannot use secondary key
    //         Key: {
    //             id: event.user_id
    //         },
    //         UpdateExpression: "SET #firstname = :firstname, #lastname = :lastname",
    //         ExpressionAttributeNames: {
    //             "#firstname": "firstname",
    //             "#lastname": "lastname",
    //         },
    //         ExpressionAttributeValues: {
    //             ":firstname": event.firstname,
    //             ":lastname": event.lastname,
    //         }

    //     }
    //     const data = await updateItem_dynamo(updateParams);
    //     console.log(data);
    //     return 'User updated';
    // }

    //REMOVE action to remove an attribute
    // else if (event.operation == "set-remove") {
    //     let updateParams = {
    //         TableName: "users",
    //         Key: {
    //             id: event.user_id
    //         },
    //         UpdateExpression: "REMOVE #toDelete",
    //         ExpressionAttributeNames: {
    //             "#toDelete": event.toDelete
    //         }
    //     }
    //     const data = await updateItem_dynamo(updateParams);
    //     return "User attribute removed"
    // }

    //ADD action to increment a numeric attribute
    // else if (event.operation == 'set-add') {
    //     let updateParams = {
    //         TableName: 'users',
    //         Key: {
    //             id: event.user_id
    //         },
    //         UpdateExpression: 'ADD #score :incrementValue',
    //         ExpressionAttributeNames: {
    //             '#score': "score"
    //         },
    //         ExpressionAttributeValues: {
    //             ":incrementValue": event.toAdd
    //         }
    //     }
    //     const data = await updateItem_dynamo(updateParams);
    //     return "User attribute incremented"
    // }

    //DELETE action to remove elements from a set, list or map attribute
    // else if (event.operation == 'set-delete') {
    //     let updateParams = {
    //         TableName: 'users',
    //         Key: {
    //             id: event.user_id,
    //         },
    //         UpdateExpression: `REMOVE numList[${event.index}]`,
    //         // ExpressionAttributeNames: {
    //         //     '#numList': ":numList"
    //         // },
    //         // ExpressionAttributeValues:{
    //         //     ":elementToRemove": event.numList[1]
    //         // }
    //     }
    //     await updateItem_dynamo(updateParams);
    // }
    // else if (event.operation == 'list-append') {
    //     let updateParams = {
    //         TableName: "users",
    //         Key: {
    //             id: event.user_id
    //         },
    //         //list_append(listName, element)
    //         UpdateExpression: `SET numList = list_append(if_not_exists(#numList, :emptyList), :newElement)`,
    //         ExpressionAttributeNames: {
    //             '#numList': 'numList',
    //         },
    //         ExpressionAttributeValues: {
    //             ':emptyList': [],
    //             ':newElement': [event.toAppend], // The element to append to the list
    //         }

    //     }
    //     const data = await updateItem_dynamo(updateParams)
    //     return data;
    // }

    //DELETE for deleting item all together
    // else if (event.operation == 'delete') {
    //     let deleteParams = {
    //         TableName: "users",
    //         Key: {
    //             id: event.user_id
    //         },
    //     };
    //     await deleteItem_dynamo(deleteParams);
    //     return 'User Deleted Success';
    // }

    // else {
    //     throw new Error("Invalid operation");
    // }

};
