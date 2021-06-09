import time
from flask import Flask, request
from pycoingecko import CoinGeckoAPI
import datetime as dt
from dateutil.relativedelta import relativedelta

app = Flask(__name__)

init_invest = 1000
coin = ''
years = 0

@app.route('/crypto', methods=['POST'])
def calculate_value():

    # GET DATA
    init_invest = request.json['data']['initInvest']
    coin = request.json['data']['coinSymbol']
    years = request.json['data']['yearsAgo']
    print(init_invest, coin, years)

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
    print(current_value)

    return {'value': current_value}

@app.route('/coins', methods=['GET'])
def get_coin_ids():

    cg = CoinGeckoAPI()

    # GET TOP 25 COINS
    market = cg.get_coins_markets('usd')[:25]
    coin_list = [m['id'] for m in market]

    return {'coin_list': coin_list}