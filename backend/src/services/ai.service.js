const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const ai = new GoogleGenAI({
     apiKey: process.env.GEMINI_API_KEY,
});

async function generateCaption(base64ImageFile) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: `
            You are an expert in generating captions for images.
            You generate the multiple short, long, mid from caption for the image.
            You generate the caption in a way that it is suitable for social media posts.
            also generate caption that is engaging, funny, professional and descriptive, create multiple section when you give me the output.
            You use hashtags and emojis in the caption.
            `
        }
    });
        return response.text
}

module.exports = generateCaption