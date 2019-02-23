require("dotenv").config();

const watson = require("watson-developer-cloud");

const assistant = new watson.AssistantV1({
  version: process.env.VERSION,
  url: process.env.ASSISTANT_URL,
  iam_apikey: process.env.ASSISTANT_IAM_APIKEY
});

// const assistant = new watson.AssistantV1({
//   username: process.env.ASSISTANT_USERNAME,
//   password: process.env.ASSISTANT_PASSWORD,
//   version: process.env.VERSION,
//   url: process.env.ASSISTANT_URL
// });

function callbackResp(err, res) {
  if (err) {
    console.error(err);
    return;
  }

  const { output } = res;
  const { text } = output;
  const { length } = text;

  if (length) {
    console.log(text);
  }
}

const params = { workspace_id: process.env.WORKSPACE_ID };

assistant.message(params, callbackResp);
