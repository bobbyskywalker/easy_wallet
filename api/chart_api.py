import requests
import matplotlib.pyplot as plt
from config import ONE_INCH_KEY

def get_chart_data(token_address1, token_address2):
    apiUrl = f"https://api.1inch.dev/charts/v1.0/chart/line/{token_address1}/{token_address2}/AllTime/1"
    headers = {
        "Authorization": f"Bearer {ONE_INCH_KEY}"
    }
    params = {}

    response = requests.get(apiUrl, headers=headers, params=params)
    return response.json()

def show_chart(data):
    # Adjust this part based on your actual API response structure
    # Example assumes: data['data'] is a list of dicts with 'time' and 'value'
    timestamps = [point['time'] for point in data['data']]
    values = [point['value'] for point in data['data']]

    # Convert timestamps to readable dates if needed
    import datetime
    dates = [datetime.datetime.fromtimestamp(ts) for ts in timestamps]

    plt.figure(figsize=(10, 5))
    plt.plot(dates, values)
    plt.xlabel('Date')
    plt.ylabel('Value')
    plt.title('Token Chart')
    plt.grid(True)
    plt.tight_layout()
    plt.savefig("chart.png")

if __name__ == "__main__":
    data = get_chart_data("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE")
    show_chart(data)