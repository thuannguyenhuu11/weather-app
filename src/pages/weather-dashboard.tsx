import { AlertCircle, MapPin, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useGeolocation } from '../hooks/use-geolocation';
import WeatherSkeleton from '../components/loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '../hooks/use-weather';
import { CurrentWeather } from '../components/current-weather';
import { HourlyTemperature } from '../components/hourly-temprature';

const WeatherDashboard = () => {
    const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeolocation();

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates);

    const handleRefresh = () => {
        getLocation();
        if (coordinates) {
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        }
    };

    if (locationLoading) {
        return <WeatherSkeleton />;
    }

    if (locationError) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="w-4 h-4" />
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription>
                    <p>{locationError}</p>
                    <Button onClick={getLocation} variant={'outline'} className="w-fit">
                        <MapPin className="w-4 h-4 mr-2" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (!coordinates) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription>
                    <p>Please enable location access to see your local weather</p>
                    <Button onClick={getLocation} variant={'outline'} className="w-fit">
                        <MapPin className="w-4 h-4 mr-2" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    const locationName = locationQuery.data?.[0];

    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="w-4 h-4" />
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription>
                    <p>Failed to fetch weather data. Please try again.</p>
                    <Button onClick={getLocation} variant={'outline'} className="w-fit">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retry
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (!weatherQuery.data || !forecastQuery.data) {
        return <WeatherSkeleton />;
    }

    return (
        <div>
            {/* Favorite cities */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tighter">My location</h1>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRefresh}
                    disabled={weatherQuery.isRefetching || forecastQuery.isFetching}
                >
                    <RefreshCw className={`size-4 ${weatherQuery.isFetching ? 'animate-spin' : ''}`} />
                </Button>
            </div>

            {/* Current and Hourly weather */}
            <div className="grid gap-6">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <CurrentWeather data={weatherQuery.data} locationName={locationName} />
                    <HourlyTemperature data={forecastQuery.data} />
                </div>

                <div>
                    {/* details */}
                    {/* forecast */}
                </div>
            </div>
        </div>
    );
};

export default WeatherDashboard;
