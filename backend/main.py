from flask import Flask 
from flask_cors import CORS
from dotenv import load_dotenv
import os

# load environment variables
load_dotenv()

def create_app(test_config=None):
    # create flask app
    app = Flask(__name__)

    # enable cors
    CORS(app)

    # health check route
    @app.route('/health')
    def health_check():
        return {'status': 'healthy'}, 200

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
