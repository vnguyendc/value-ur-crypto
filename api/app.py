import time
from flask import Flask
from pycoingecko import CoinGeckoAPI
import datetime as dt

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/')
def main_page():

    # return current price of bitcoin
    cg = CoinGeckoAPI()

    current_btc_data = cg.get_coin_by_id(id='bitcoin')
    current_price = current_btc_data['market_data']['current_price']['usd']

    return 'The current price of Bitcoin is: {:0.2f}'.format(current_price)
