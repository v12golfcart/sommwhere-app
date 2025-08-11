from flask import Blueprint, jsonify, request

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

    response =  {
      "wines": [
        {
          "varietal": "Cabernet Sauvignon",
          "wineName": "Austin Hope Cabernet Sauvignon",
          "winery": "Austin Hope",
          "year": "2019",
          "region": "Napa Valley, CA",
          "tastingNotes": "Rich and opulent with layers of dark fruit, cassis, and espresso. Velvety tannins frame a long, complex finish with hints of dark chocolate and cedar."
        },
        {
          "varietal": "Pinot Noir",
          "wineName": "Russian River Valley",
          "winery": "Williams Selyem",
          "year": "2021",
          "region": "Sonoma County, CA",
          "tastingNotes": "Elegant and refined with bright cherry and raspberry notes. Silky texture with subtle earth and spice undertones."
        }
      ]
    }
    return jsonify(response), 200