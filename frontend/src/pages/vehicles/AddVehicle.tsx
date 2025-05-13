import VehicleForm from "../../components/Vehicles/AddVehicle/VehicleForm";
import { Car } from "lucide-react";

const AddVehicle = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center">
                    <Car className="h-6 w-6 text-blue-600 mr-2" />
                    <h1 className="text-xl font-bold text-blue-600">Gestion Des Véhicules</h1>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <VehicleForm />
            </main>
        </div>
    );
};

export default AddVehicle;