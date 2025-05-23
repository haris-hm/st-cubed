import express from 'express';
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config({ path: "../.env" });

const app = express();

// Allow express to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

/**
 * This endpoint is used to exchange the authorization code for an access token.
 */
app.post("/api/token", async (req, res) => {
  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.VITE_DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: req.body.code,
    }),
  });
  // console.log("Response from Discord:", response);

  // Retrieve the access_token from the response
  const { access_token } = await response.json();

  // Return the access_token to our client as { access_token: "..."}
  res.send({ access_token });
});

app.get("/api/user", async (req, res) => {
  const accessToken = req.headers.accessToken;
  console.log("Access Token:", accessToken);
  if (!accessToken) {
    return res.status(401).json({ error: "No access token provided" });
  }

  const response = await fetch(`https://discord.com/api/v10/users/@me/`, {
		headers: {
			// NOTE: we're using the access_token provided by the "authenticate" command
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
	})

  const data = await response.json();
  res.status(response.status).json(data);
});

export { app };
