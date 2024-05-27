const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

const docClient = new AWS.DynamoDB.DocumentClient();

class ActivityTracker {
  static getUserActivities(userId) {
    const params = {
      TableName: "ActivityTracking",
      KeyConditionExpression: "user_id = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    docClient.query(params, (err, data) => {
      if (err) {
        console.error(
          "Unable to query activities. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log("Query succeeded:", JSON.stringify(data, null, 2));
      }
    });
  }
}

// Ejemplo de uso
ActivityTracker.getUserActivities("user123");
