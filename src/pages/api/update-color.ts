import { NextApiRequest, NextApiResponse } from "next";
import MQTT from "async-mqtt";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { red, green, blue } = request.body;

  const data = {
    red,
    green,
    blue,
  };

  const client = MQTT.connect(process.env.MQTT_BROKER);

  await client.publish("color_control", JSON.stringify(data));

  await client.end();

  return response.status(200).json({ ok: true });
}
