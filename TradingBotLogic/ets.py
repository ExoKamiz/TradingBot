import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.holtwinters import ExponentialSmoothing
from sklearn.model_selection import TimeSeriesSplit
from sklearn.metrics import mean_squared_error
from numpy import sqrt

# Load data
data = pd.read_csv('ETH-USD.csv', parse_dates=True, index_col='Date')  # assuming 'Date' is the column with dates
ts = data['Close']

# Interpolate missing values
ts = ts.interpolate()

# Set frequency of time series
ts = ts.asfreq('D')

# Time series cross-validation
tscv = TimeSeriesSplit(n_splits=5)

# Grid search for optimal parameters
best_rmse = float('inf')
best_params = None
for trend in ['add', 'mul', None]:
    for seasonal in ['add', 'mul', None]:
        for seasonal_periods in range(1, 25):  # extended to 24
            try:
                rmse = 0
                for train_index, test_index in tscv.split(ts):
                    train, test = ts.iloc[train_index], ts.iloc[test_index]  # Use .iloc for positional indexing
                    model = ExponentialSmoothing(train, trend=trend, seasonal=seasonal, seasonal_periods=seasonal_periods)
                    fit_model = model.fit()
                    forecast = fit_model.forecast(steps=len(test))
                    rmse += sqrt(mean_squared_error(test, forecast))
                rmse /= 5  # Average RMSE
                if rmse < best_rmse:
                    best_rmse = rmse
                    best_params = (trend, seasonal, seasonal_periods)
            except:
                continue

# Fit model with best parameters
model = ExponentialSmoothing(ts, trend=best_params[0], seasonal=best_params[1], seasonal_periods=best_params[2])
fit_model = model.fit()
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
plt.title('ETH-USD Closing Price Forecast')
plt.xlabel('Date')
plt.ylabel('Closing Price')
plt.legend()
plt.show()

# Print best RMSE
print("Best Root Mean Squared Error:", best_rmse)