import os
from app.config import Config
from openai import OpenAI 

# Just use environment variable directly for now
api_key = Config.OPENAI_API_KEY
client = OpenAI(api_key=api_key)

response = client.responses.create(
    model="gpt-5",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "What do you see in this image?",
                },
                {
                    "type": "input_image",
                    "image_url": "https://media.discordapp.net/attachments/1397296075148099716/1404386350605533254/heitz.png?ex=689b0036&is=6899aeb6&hm=c26b6d429e0a21e1ffc7d9cd19a72ad78136cd71b7916dd4908099e0df0e4e23&=&format=webp&quality=lossless&width=466&height=700"
                }
            ]
        }
    ]
)

print(response.output_text)
