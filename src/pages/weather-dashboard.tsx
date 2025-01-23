import { AlertCircle, MapPin, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useGeolocation } from '../hooks/use-geolocation';
import WeatherSkeleton from '../components/loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

const WeatherDashboard = () => {
    const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeolocation();
    console.log(coordinates);

    const handleRefresh = () => {
        getLocation();
        if (coordinates) {
            //reload weather data
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

    return (
        <div>
            {/* Favorite cities */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tighter">My location</h1>
                <Button variant="outline" size="icon" onClick={handleRefresh}>
                    <RefreshCw className="size-4" />
                </Button>
            </div>
        </div>
    );
};

export default WeatherDashboard;
