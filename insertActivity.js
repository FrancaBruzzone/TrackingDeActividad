const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

const docClient = new AWS.DynamoDB.DocumentClient();

class ActivityTracker {
  static insertActivity(userId, activityType, details) {
    const timestamp = Math.floor(Date.now() / 1000); // Current time in seconds

    const params = {
      TableName: "ActivityTracking",
      Item: {
        user_id: userId,
        timestamp: timestamp,
        activity_type: activityType,
        details: details,
      },
    };

    docClient.put(params, (err, data) => {
      if (err) {
        console.error(
          "Unable to add activity. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log("Added activity:", JSON.stringify(data, null, 2));
      }
    });
  }
}

// Ejemplo de uso
ActivityTracker.insertActivity("user123", "game_played", {
  game_id: "game456",
  duration: 120,
});
