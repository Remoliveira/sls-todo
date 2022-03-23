"use strict";
const crypto = require('crypto');
const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()


module.exports.postFunc = async (event) => {
  const { userid } = event.pathParameters
  
  const data = JSON.parse(event.body)
  
  const addToDb =  {
    id: crypto.randomUUID(),
    user_id: userid,
    title: data.title,
    done: false,
    deadline: data.deadline
  }
  
  try {
    await dynamodb.put({
      TableName: process.env.DYNAMODB_TABLE,
      Item: addToDb,
    }).promise()
  } catch(error) {
    return {
      statusCode: 500,
      body: error
    }
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v2.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
