from flask import Flask 
from flask_cors import CORS
from dotenv import load_dotenv
from app.config import Config
import os

# load environment variables
load_dotenv()

def create_app(test_config=None):
    # create flask app
    app = Flask(__name__)

    # configuration
    app.config.from_object(Config)

    # enable cors
    CORS(app)

    # health check route
    @app.route('/health')
    def health_check():
        return {'status': 'healthy'}, 200

    # register blueprints
    from app.routes.profile import profile_bp
    app.register_blueprint(profile_bp)
    from app.routes.analyze import analyze_bp
    app.register_blueprint(analyze_bp)

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')
