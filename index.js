require("dotenv").config();
const express = require("express");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});

const docClient = new AWS.DynamoDB.DocumentClient();

class ActivityTracker {
  static insertActivity(userId, activityType, details, callback) {
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

    docClient.put(params, callback);
  }

  static getUserActivities(userId, callback) {
    const params = {
      TableName: "ActivityTracking",
      KeyConditionExpression: "user_id = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    docClient.query(params, callback);
  }
}

const app = express();
app.use(bodyParser.json());

app.post("/track", (req, res) => {
  const { user_id, activity_type, details } = req.body;

  ActivityTracker.insertActivity(
    user_id,
    activity_type,
    details,
    (err, data) => {
      if (err) {
        console.error(
          "Unable to add activity. Error JSON:",
          JSON.stringify(err, null, 2)
        );
        res.status(500).json({ error: "Could not track activity" });
      } else {
        res.status(201).json({ message: "Activity tracked successfully" });
      }
    }
  );
});

app.get("/activities/:user_id", (req, res) => {
  const userId = req.params.user_id;

  ActivityTracker.getUserActivities(userId, (err, data) => {
    if (err) {
      console.error(
        "Unable to query activities. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      res.status(500).json({ error: "Could not retrieve activities" });
    } else {
      res.status(200).json(data.Items);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
