import time
from flask import Flask, request
from pycoingecko import CoinGeckoAPI
import datetime as dt
from dateutil.relativedelta import relativedelta

app = Flask(__name__)

init_invest = 1000
coin = ''
years = 0

@app.route('/crypto', methods=['POST', 'GET'])
def get_form_data():
    global init_invest, coin, years
    if request.method == 'POST':
        # data = request.data
        init_invest = request.json['initInvest']
        coin = request.json['coin']
        years = request.json['years']
        # print(data)
        print(init_invest, coin, years)
        # current_value = calculate_current_value(int(init_invest), coin, int(years))
        return {}
    else:
        cg = CoinGeckoAPI()

        date = (dt.datetime.now() - relativedelta(years=years)).strftime("%d-%m-%Y")
        past_coin_data = cg.get_coin_history_by_id(id=coin, date=date)
        past_price = past_coin_data['market_data']['current_price']['usd']

        current_coin_data = cg.get_coin_by_id(id=coin)
        current_price = current_coin_data['market_data']['current_price']['usd']
        current_value = (current_price - past_price) / past_price * init_invest
        print(current_value)
        return {'value': current_value}
