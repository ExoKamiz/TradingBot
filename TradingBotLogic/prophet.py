import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error
from statsmodels.tsa.statespace.sarimax import SARIMAX
from statsmodels.tsa.holtwinters import ExponentialSmoothing
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import TimeSeriesSplit
from sklearn.ensemble import VotingRegressor

# Load data
data = pd.read_csv('TradingBotLogic\SOL-USD.csv', parse_dates=True, index_col='Date')
ts = data['Close']

# Interpolate missing values
ts = ts.interpolate()

# Set frequency of time series
ts = ts.asfreq('D')

# Define a function to calculate RMSE
def calculate_rmse(actual, predicted):
    return np.sqrt(mean_squared_error(actual, predicted))

# Define a function to perform a grid search for optimal ARIMA parameters
def grid_search_arima_parameters(series, p_values, d_values, q_values):
    best_score, best_params = float("inf"), None
    for p in p_values:
        for d in d_values:
            for q in q_values:
                try:
                    model = SARIMAX(series, order=(p,d,q))
                    model_fit = model.fit(disp=False)  # Ignore warnings
                    rmse = calculate_rmse(series, model_fit.fittedvalues)
                    if rmse < best_score:
                        best_score, best_params = rmse, (p,d,q)
                except:
                    continue
    return best_params

# Define a function to perform a grid search for optimal ETS parameters
def grid_search_ets_parameters(series, trend_values, seasonal_values):
    best_score, best_params = float("inf"), None
    for trend in trend_values:
        for seasonal in seasonal_values:
            try:
                model = ExponentialSmoothing(series, trend=trend, seasonal=seasonal)
                model_fit = model.fit()
                rmse = calculate_rmse(series, model_fit.fittedvalues)
                if rmse < best_score:
                    best_score, best_params = rmse, (trend, seasonal)
            except:
                continue
    return best_params

# Define the p, d, and q values to try in the grid search for SARIMAX
p_values = range(0, 3)
d_values = range(0, 3)
q_values = range(0, 3)

# Define the trend and seasonal values to try in the grid search for ETS
trend_values = ['add', 'mul']
seasonal_values = ['add', 'mul']

# Find the last date in the dataset
last_date = ts.index[-1]

# Perform forecasting for the next seven days after the last date
forecast_dates = pd.date_range(start=last_date + pd.Timedelta(days=1), periods=7)

# Initialize a dictionary to store the forecasts for each model
forecast_dict = {model: [] for model in ['SARIMAX', 'ETS', 'Ensemble']}

# Perform forecasting for each model
for model in forecast_dict.keys():
    if model == 'SARIMAX':
        # Perform a grid search for optimal parameters on the entire time series for SARIMAX
        sarimax_params = grid_search_arima_parameters(ts, p_values, d_values, q_values)

        # Fit a SARIMAX model to the entire time series with the optimal parameters
        sarimax_model = SARIMAX(ts, order=sarimax_params)
        sarimax_fit_model = sarimax_model.fit(disp=False, maxiter=200)  # Ignore warnings

        # Forecast the values for the next 7 days using SARIMAX
        sarimax_forecast = sarimax_fit_model.forecast(steps=7)

        # Store the forecast
        forecast_dict['SARIMAX'] = sarimax_forecast.tolist()

    elif model == 'ETS':
        # Perform a grid search for optimal parameters on the entire time series for ETS
        ets_params = grid_search_ets_parameters(ts, trend_values, seasonal_values)

        # Check if ets_params is not None
        if ets_params is not None:
            # Fit an ETS model to the entire time series with the optimal parameters
            ets_model = ExponentialSmoothing(ts, trend=ets_params[0], seasonal=ets_params[1])
            ets_fit_model = ets_model.fit()

            # Forecast the values for the next 7 days using ETS
            ets_forecast = ets_fit_model.forecast(steps=7)

            # Store the forecast
            forecast_dict['ETS'] = ets_forecast.tolist()
        else:
            # Provide a default forecast value
            forecast_dict['ETS'] = [np.nan] * 7  # You can replace np.nan with any default value

    elif model == 'Ensemble':
        # Check if both SARIMAX and ETS forecasts are available
        if 'SARIMAX' in forecast_dict and 'ETS' in forecast_dict:
            # Calculate the ensemble forecast as the average of the SARIMAX and ETS forecasts
            ensemble_forecast = [(sarimax + ets) / 2 for sarimax, ets in zip(forecast_dict['SARIMAX'], forecast_dict['ETS'])]

            # Store the forecast
            forecast_dict['Ensemble'] = ensemble_forecast

# Print the forecasts for each model along with the corresponding dates
for model, forecast in forecast_dict.items():
    for date, value in zip(forecast_dates, forecast):
        print(f"Forecast for {model} on {date.strftime('%Y-%m-%d')}: {value}")