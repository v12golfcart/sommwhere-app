from flask import Blueprint, jsonify, request
from app.utils.supabase import get_supabase_client

profile_bp = Blueprint('profile', __name__, url_prefix='/profile')

@profile_bp.route('/<user_id>', methods=['GET'])
def get_profile(user_id):
    """Get a profile by user_id"""
    try:
        supabase = get_supabase_client() 

        # Query the profiles table
        response = (
          supabase.table('profiles')
          .select('*')
          .eq('id', user_id) 
          .execute()
        )

        if not response.data:
            return jsonify({'error': 'Profile not found'}), 404
        
        return jsonify(response.data[0]), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@profile_bp.route('/<user_id>', methods=['PUT'])
def update_profile(user_id):
    """Update a profile by user_id"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        supabase = get_supabase_client()

        # only allow updating username and taste_profile
        update_data = {}
        if 'username' in data:
            update_data['username'] = data['username']
        if 'taste_profile' in data:
            if len(data['taste_profile']) > 255:
                return jsonify({'error': 'Taste profile must be less than 255 characters'}), 400
            update_data['taste_profile'] = data['taste_profile']

        if not update_data:
            return jsonify({'error': 'No valid fields to update'}), 400
        
        # update the profile 
        response = (
          supabase.table('profiles')
          .update(update_data)
          .eq('id', user_id)
          .execute()
        )

        if not response.data:
            return jsonify({'error': 'Profile not found or update failed'}), 404
        
        return jsonify({'message': 'Profile updated successfully'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
