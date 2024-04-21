import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.statespace.sarimax import SARIMAX
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt
from sklearn.model_selection import TimeSeriesSplit
import numpy as np

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
                    model_fit = model.fit(disp=0)
                    rmse = calculate_rmse(series, model_fit.fittedvalues)
                    if rmse < best_score:
                        best_score, best_params = rmse, (p,d,q)
                except:
                    continue
    return best_params

# Read data from CSV file
try:
    data = pd.read_csv('ETH-USD.csv')
except FileNotFoundError:
    print("File not found. Please check the file path and try again.")
    exit()

# Convert 'Date' column to datetime type
data['Date'] = pd.to_datetime(data['Date'])

# Set 'Date' column as the index and set frequency to daily
data.set_index('Date', inplace=True)
data.index = pd.DatetimeIndex(data.index).to_period('D')

# Select 'Close' column for analysis and add a small constant
ts = data['Close'] + 1e-3

# Define the p, d, and q values to try in the grid search
p_values = range(0, 3)
d_values = range(0, 3)
q_values = range(0, 3)

# Perform a grid search for optimal ARIMA parameters
best_params = grid_search_arima_parameters(ts, p_values, d_values, q_values)
print("Best ARIMA parameters:", best_params)

# Fit a SARIMAX model to the closing prices with the optimal parameters
model = SARIMAX(ts, order=best_params)
fit_model = model.fit(disp=0, maxiter=200)

# Convert the Period index back to a DatetimeIndex before plotting
ts.index = ts.index.to_timestamp()

# Plot the actual data
plt.plot(ts, label='Actual')

# Forecast future values
forecast = fit_model.forecast(steps=3)

# Print forecast for the next three days after the last date in the dataset
last_date = ts.index[-1]
print("Forecasted token price for the next three days after", last_date.strftime('%Y-%m-%d'), ":")
for i in range(3):
    print(forecast.iloc[i], " - ", (last_date + pd.Timedelta(days=i+1)).strftime('%Y-%m-%d'))

# Plot actual vs forecasted values
plt.figure(figsize=(10,6))
plt.plot(ts, label='Actual')
plt.plot(forecast, label='Forecast')
plt.title('DOGE-USD Closing Price Forecast')
plt.xlabel('Date')
plt.ylabel('Closing Price')
plt.legend()
plt.show()

# Calculate and print RMSE
rmse = calculate_rmse(ts[-3:], forecast)
print("Root Mean Squared Error:", rmse)