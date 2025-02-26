from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

WEBHOOK_URL = 'https://discord.com/api/webhooks/1279729678763954270/KNBPlT_qzOPyYcc_cnb8EHbPZstYUCqautRZtIYR4aA7hC5ynPGqW472h-A0ZL1ytxDs'  # Replace with your Discord webhook URL

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    name = data.get('name')
    message = data.get('message')
    times = data.get('times')

    for _ in range(times):
        payload = {
            "content": f"{name}: {message}"
        }

        response = requests.post(WEBHOOK_URL, json=payload)

        if response.status_code != 204:
            return jsonify({"status": "error", "message": "Failed to send message"}), response.status_code

    return jsonify({"status": "success", "message": "Messages sent successfully!"})

if __name__ == '__main__':
    app.run(debug=True)
