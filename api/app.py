import time
from flask import Flask, request
from pycoingecko import CoinGeckoAPI
import datetime as dt
from dateutil.relativedelta import relativedelta

app = Flask(__name__)

@app.route('/crypto', methods=['POST'])
def calculate_value():
    """ Calculates the current value of initial investment from
        certain amount of years for the given cryptocurrency coin.

    Returns:
        current_value (float)
        percent_gain (float)
        date (string)
        past_price (float)
        current_price (float)
    """
    print(request.json['data'])

    # GET DATA
    init_invest = request.json['data']['initInvest']
    coin = request.json['data']['coinSymbol']
    years = request.json['data']['yearsAgo']

    # CALL API
    cg = CoinGeckoAPI()

    # GET PAST DATA
    # TODO: handle error when years goes past age of coin
    try:
        date = (dt.datetime.now() - relativedelta(years=int(years))).strftime("%d-%m-%Y")
        past_coin_data = cg.get_coin_history_by_id(id=coin, date=date)
        past_price = past_coin_data['market_data']['current_price']['usd']
    except KeyError as e:
        raise

    # GET CURRENT DATA
    current_coin_data = cg.get_coin_by_id(id=coin)
    current_price = current_coin_data['market_data']['current_price']['usd']

    # CALCULATE VALUE
    current_value = ((current_price - past_price) / past_price) * int(init_invest)
    percent_gain = ((current_price - past_price) / past_price) * 100

    return {'value': current_value,
            'percentGain': percent_gain,
            'todaysDate': date,
            'pastPrice': past_price,
            'currentPrice':current_price}

@app.route('/coins', methods=['GET'])
def get_coin_ids():

    cg = CoinGeckoAPI()

    # GET TOP 25 COINS
    market = cg.get_coins_markets('usd')[:100]

    return {'coin_list': [(m['id'], m['name'], m['image']) for m in market]}