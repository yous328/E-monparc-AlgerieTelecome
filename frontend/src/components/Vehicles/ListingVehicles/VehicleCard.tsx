import { IVehicle } from '../../../interfaces/Vehicle/IVehicle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface VehicleCardProps {
  vehicle: IVehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const navigate = useNavigate();
  const imageUrl = vehicle.brandLogo || `/fallback-vehicle.png`;
  
  useEffect(() => {
    console.log('Vehicle brand logo path:', vehicle.brandLogo);
    console.log('Full image URL:', imageUrl);
  }, [vehicle.brandLogo, imageUrl]);

  const getStatusStyle = () => {
    switch (vehicle.status) {
      case 'Disponible':
        return 'bg-green-100 text-green-700 border border-green-400';
      case 'Occupé':
        return 'bg-blue-100 text-blue-700 border border-blue-400';
      case 'En Panne':
        return 'bg-red-100 text-red-700 border border-red-400';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleDetailsClick = () => {
    navigate(`/vehicles/${vehicle.id}`);
  };

  return (
    <div className="bg-[#edf1f0] rounded-lg shadow border hover:shadow-md transition p-4 flex flex-col justify-between">

      {/* Header */}
      <div className="mb-3">
        <h3 className="text-sm font-medium text-gray-700">{vehicle.brand.toUpperCase()}</h3>
        <p className="text-lg font-bold">{vehicle.registration}</p>
      </div>

      {/* Logo */}
      <div className="mb-4 flex justify-center">
        <div className="h-32 w-64 flex items-center justify-center p-1">
          <img
            src={imageUrl}
            alt={`${vehicle.brand} logo`}
            className="h-full w-full object-contain"
            onError={(e) => {
              console.log(`Failed to load image: ${(e.target as HTMLImageElement).src}`);
              // Fallback if the image fails to load
              (e.target as HTMLImageElement).src = `/fallback-vehicle.png`;
            }}
          />
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-700 mb-4">
        <div className="flex items-center space-x-1">
          <DirectionsCarIcon style={{ fontSize: 11 }} className="text-gray-500" />
          <span>{vehicle.kilometers.toLocaleString()} KM</span>
        </div>
        <div className="flex items-center space-x-1">
          <LocalGasStationIcon style={{ fontSize: 11 }} className="text-gray-500" />
          <span>{vehicle.dailyCost.toLocaleString()} DA</span>
        </div>
        <div className="flex items-center space-x-1">
          <BuildIcon style={{ fontSize: 11 }} className="text-gray-500" />
          <span>{vehicle.vidangeNextDue.toLocaleString()} KM</span>
        </div>
        <div className="flex items-center space-x-1">
          <PersonIcon style={{ fontSize: 11 }} className="text-gray-500" />
          <span>{vehicle.driver || 'Unassigned'}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusStyle()}`}>
          {vehicle.status}
        </span>
        <button
          onClick={handleDetailsClick}
          className="text-xs font-semibold text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition"
        >
          Voir Détails
        </button>
      </div>
    </div>
  );
}
