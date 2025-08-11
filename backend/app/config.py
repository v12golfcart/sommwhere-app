import os
from dotenv import load_dotenv

# Load variables from .env file
# In production (Railway, etc.), this will be skipped because env vars are set in the platform
load_dotenv()

class Config:
    # === Supabase ===
    SUPABASE_URL = os.environ.get("SUPABASE_URL")
    SUPABASE_ANON_KEY = os.environ.get("SUPABASE_ANON_KEY")
    SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")

    # === Flask & Auth ===
    SECRET_KEY = os.environ.get("SECRET_KEY")
    GOOGLE_OAUTH_CLIENT_ID_IOS = os.environ.get("GOOGLE_OAUTH_CLIENT_ID_IOS")

    # === OpenAI ===
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

    # === Misc flags ===
    DEBUG = os.environ.get("DEBUG", "false").lower() == "true"


# Optional environment-specific classes
class DevConfig(Config):
    DEBUG = True

class ProdConfig(Config):
    DEBUG = False