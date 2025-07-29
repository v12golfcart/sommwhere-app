import os
from supabase import create_client, Client
from flask import current_app

def get_supabase_client():
    """
    Get Supabase client
    """
    url: str = current_app.config.get("SUPABASE_URL") or os.environ.get("SUPABASE_URL")
    key: str = current_app.config.get("SUPABASE_SERVICE_KEY") or os.environ.get("SUPABASE_SERVICE_KEY")
    
    if not url or not key:
      raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_KEY must be set")

    supabase: Client = create_client(url, key)
    return supabase
    