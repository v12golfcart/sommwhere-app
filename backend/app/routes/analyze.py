from flask import Blueprint, jsonify, request
from app.agents.somm_v1 import analyze_image_bytes  # or analyze_image_url if you adapt it

analyze_bp = Blueprint('analyze', __name__, url_prefix='/analyze')

@analyze_bp.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200


@analyze_bp.route('', methods=['POST']) 
def analyze():
    # check if the request has an image
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image']

    # Get string fields
    taste_profile = request.form.get('tasteProfile', '')
    somm_prompt = request.form.get('sommPrompt', '')

    # check if the file is an image
    allowed_extensions = {'png', 'jpg', 'jpeg'}
    if not image.filename.lower().split('.')[-1] in allowed_extensions:
        return jsonify({'error': 'Invalid file type. Allowed: png, jpg, jpeg'}), 400

    try:
        # Read image bytes
        image_bytes = image.read()
        
        # Call the agent (you'll need to add analyze_image_bytes to somm_v1.py)
        response = analyze_image_bytes(
            image_bytes,
            taste_profile=taste_profile if taste_profile else None,
            somm_prompt=somm_prompt if somm_prompt else None
        )
        
        # Check for empty wines
        if not response.get("wines"):
            return jsonify({"error": "No wines detected. Try a clearer photo of the label."}), 400
        
        return jsonify(response), 200
        
    except Exception as e:
        print(f"Error analyzing image: {e}")
        return jsonify({"error": "Failed to analyze image. Please try again."}), 400