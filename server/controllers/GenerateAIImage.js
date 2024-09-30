import * as dotenv from "dotenv";
import { createError } from "../error.js";
import fetch from "node-fetch"; // Assuming you're using node-fetch for HTTP requests.

dotenv.config();

// Controller to generate Image using Claid API
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Make the POST request to the image generation API
    const response = await fetch(
      "https://api.claid.ai/v1-beta1/image/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLAID_API_KEY}`,
        },
        body: JSON.stringify({
          input: prompt,
          options: {
            number_of_images: 1,
            guidance_scale: 5.0,
          },
        }),
      }
    );

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Extract the temporary URL of the generated image
    const generatedImageUrl = data.data.output[0].tmp_url;

    // Send the image URL as the response
    return res.status(200).json({ photo: generatedImageUrl });
  } catch (error) {
    next(
      createError(
        error.status || 500,
        error?.response?.data?.error?.message ||
          error?.message ||
          "An error occurred"
      )
    );
  }
};
