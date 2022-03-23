"use strict";
const crypto = require('crypto');
const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()


module.exports.getFunc = async (event) => {
  
  
  const { userid } = event.pathParameters
  
  const query =  {
   TableName: process.env.DYNAMODB_TABLE,
   Key: {
       "user_id": userid
   }
  }
  let result;
  try {
    

    const response = await dynamodb.get(query).promise();
    result = response.Item;

  } catch(error) {
    return {
      statusCode: 500,
      body: error
    }
  }
  
  return {
    statusCode: 200,
    body: result,
  };
};
