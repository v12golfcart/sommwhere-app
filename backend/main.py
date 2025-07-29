from flask import Flask 
from flask_cors import CORS
from dotenv import load_dotenv
import os

# load environment variables
load_dotenv()

def create_app(test_config=None):
    # create flask app
    app = Flask(__name__)

    # configuration
    app.config['SUPABASE_URL'] = os.environ.get('SUPABASE_URL')
    app.config['SUPABASE_SERVICE_KEY'] = os.environ.get('SUPABASE_SERVICE_KEY')
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

    # enable cors
    CORS(app)

    # health check route
    @app.route('/health')
    def health_check():
        return {'status': 'healthy'}, 200

    # register blueprints
    from app.routes.profile import profile_bp
    app.register_blueprint(profile_bp)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
