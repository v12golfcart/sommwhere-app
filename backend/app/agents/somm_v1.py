import os
import json
from app.config import Config
from openai import OpenAI 

# Just use environment variable directly for now
client = OpenAI(api_key=Config.OPENAI_API_KEY)
MODEL = "gpt-5-mini"

SYSTEM_PROMPT = """
You are a knowledgeable wine sommelier and careful information extractor.
Your job: read a SINGLE BOTTLE LABEL photo and return STRICT JSON ONLY.

Rules:
- Return ONLY a JSON object with the exact keys specified. No prose, no markdown.
- If the image is NOT a wine bottle label or you cannot identify a wine, return: {"wines": []}
- For each wine found, extract these fields:
  - varietal: string | null       (canonical, e.g., "Cabernet Sauvignon")
  - wineName: string | null       (the label/cuvée name, e.g., "Insignia"; may be a varietal if that's the wine's name)
  - producer: string | null       (e.g., "Joseph Phelps")
  - vintage: string | null        (four-digit year if visible; else null)
  - region: string | null         (e.g., "Napa Valley, CA"; null if unknown)
  - tastingNotes: string          (1–2 sentences; ≤255 characters total; friendly and approachable)
  - personalization: object | null
      - When a tasteProfile or sommPrompt is provided, include:
        - relevance: number       (0.0–1.0 reflecting fit to the user’s preferences/request)
        - note: string            (short reason referencing the preference or prompt)
      - If no tasteProfile and no sommPrompt are provided, set personalization to null.
- Do NOT invent prices. Do NOT include extra keys. Use null for unknown fields.
- If multiple wines are clearly present on the same bottle (rare), you may return multiple entries.
- American English; concise, factual tone.

Output shape (no extra keys):
{
  "wines": [
    {
      "varietal": string|null,
      "wineName": string|null,
      "producer": string|null,
      "vintage": string|null,
      "region": string|null,
      "tastingNotes": string,
      "personalization": {
        "relevance": number,
        "note": string
      } | null
    }
  ]
}
""".strip()

def build_user_text(taste_profile: str | None, somm_prompt: str | None) -> str:
    return (
        "Extract wine details from this bottle label image and return STRICT JSON as specified.\n\n"
        f"User taste profile (optional): {taste_profile or 'none'}\n"
        f"User request / sommelier prompt (optional): {somm_prompt or 'none'}\n\n"
        "Remember:\n"
        "- Return {\"wines\": []} if this is not a wine bottle label or you cannot identify a wine.\n"
        "- Use null for unknown fields.\n"
        "- tastingNotes must be ≤255 characters total."
    )

def analyze_image_url(
    image_url: str,
    taste_profile: str | None = None,
    somm_prompt: str | None = None,
    timeout_sec: int = 30,
) -> dict:
    """
    Sends a single image URL through GPT-5 with our strict prompts, returns a dict matching the contract: {"wines": []}
    """
    user_text = build_user_text(taste_profile, somm_prompt)

    resp = client.responses.create(
        model=MODEL,
        text={
            "format": { "type": "json_object"}
        },
        input=[
            {
                "role": "system",
                "content": [{"type": "input_text", "text": SYSTEM_PROMPT}],
            },
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": user_text},
                    {"type": "input_image", "image_url": image_url},
                ],
            }
        ],
        timeout=timeout_sec,
    )

    data = resp.output_text
    return data


if __name__ == "__main__":
    # Example usage (your Discord CDN image)
    url = "https://media.discordapp.net/attachments/1397296075148099716/1404386350605533254/heitz.png?ex=689b0036&is=6899aeb6&hm=c26b6d429e0a21e1ffc7d9cd19a72ad78136cd71b7916dd4908099e0df0e4e23&=&format=webp&quality=lossless&width=1228&height=1842"
    result = analyze_image_url(
        url,
        taste_profile="bold Napa Cabs",
        somm_prompt="help me pick something under $50 to pair with steak",
    )
    print(json.dumps(result, indent=2))
