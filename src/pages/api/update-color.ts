import { NextApiRequest, NextApiResponse } from "next";
import MQTT from "async-mqtt";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { red, green, blue } = request.body;

    const client = MQTT.connect(process.env.MQTT_BROKER);

    await client.publish(
      "color_control",
      JSON.stringify({
        red,
        green,
        blue,
      })
    );

    await client.end();

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error });
  }
}
