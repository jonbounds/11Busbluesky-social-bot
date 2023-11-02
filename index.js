import blue from "@atproto/api";
import fs from "node:fs";

const { BskyAgent } = blue;

const BLUESKY_BOT_USERNAME = "11Bus";
const BLUESKY_BOT_PASSWORD = "6qkp-t2iv-tvul-venf";

const fileName = "./11busposts.json";

const generateFunnyCatQuote = async () => {
  const file = fs.readFileSync(fileName);
  const fileContent = JSON.parse(file);
  console.log(fileContent);

  //now that we have the post, lets post it to bluesky
  const { RichText } = blue;
  const agent = new BskyAgent({ service: "https://bsky.social/" });
  await agent.login({
    identifier: BLUESKY_BOT_USERNAME,
    password: BLUESKY_BOT_PASSWORD,
  });
  const rt = new RichText({ text: fileContent.body });
  const postRecord = {
    $type: "app.bsky.feed.post",
    text: rt.text,
    facets: rt.facets,
    createdAt: new Date().toISOString(),
  };
  await agent.post(postRecord);
};

generateFunnyCatQuote();
