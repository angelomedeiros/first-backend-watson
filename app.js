const watson = require("watson-developer-cloud");
const prompt = require("prompt-sync")();
require("dotenv").config();

const assistant = new watson.AssistantV1({
  version: process.env.VERSION,
  url: process.env.ASSISTANT_URL,
  iam_apikey: process.env.ASSISTANT_IAM_APIKEY
});

const workspace_id = process.env.WORKSPACE_ID;

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

  const { output, context } = res;
  const { text } = output;
  const { length } = text;

  console.log(res);

  if (length) {
    console.log(text);
  }

  const msgUser = prompt(">> ");
  assistant.message(
    { workspace_id, input: { text: msgUser }, context },
    callbackResp
  );
}

const params = { workspace_id };

assistant.message(params, callbackResp);
