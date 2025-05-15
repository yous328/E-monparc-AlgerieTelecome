import VehicleForm from "../../components/Vehicles/AddVehicle/VehicleForm";
import { VehicleFormProvider } from "../../context/vehicle/AddVehicle/VehicleFormProvider";
import { Layout } from "../../layouts/MainLayout";

const AddVehicle = () => {
    return (
        <Layout>
            <VehicleFormProvider>
            <div className="min-h-screen bg-gray-50">
                <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <VehicleForm />

                </main>
            </div>
        </VehicleFormProvider>
        </Layout>
        
    );
};

export default AddVehicle;
