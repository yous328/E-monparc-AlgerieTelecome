import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Layout } from '../layouts/MainLayout';
import { VehicleSelector } from '../components/Missions/Form/VehicleSelector';
import { DriverSelector } from '../components/Missions/Form/DriverSelector';
import { MissionTypeSelector } from '../components/Missions/Form/MissionTypeSelector';
import { EmployeeSelector } from '../components/Missions/Form/EmployeeSelector';
import { DestinationInput } from '../components/Missions/Form/DestinationInput';
import { DatePicker, TimePicker } from '../components/Missions/Form/DateTimeSelectors';
import { ObjectiveSelector } from '../components/Missions/Form/ObjectiveSelector';
import { DescriptionInput } from '../components/Missions/Form/DescriptionInput';
import { MissionFormActions } from '../components/Missions/Form/MissionFormActions';
import { useMission } from '../context/mission/useMission';
import { useGetMissionFormData } from '../hooks/mission/useGetMissionFormData';
import toast from 'react-hot-toast';

interface FormErrors {
    vehicleId?: string;
    driverId?: string;
    type?: string;
    destination?: string;
    date?: string;
    time?: string;
    objective?: string;
    description?: string;
}

const AddMissionPage: React.FC = () => {
    const navigate = useNavigate();
    const { createMission } = useMission();
    const { 
        vehicles, 
        drivers, 
        employees, 
        missionTypes, 
        missionObjectives,
        loading: formDataLoading,
        error: formDataError
    } = useGetMissionFormData();
    
    // Form state
    const [vehicleId, setVehicleId] = useState<number | null>(null);
    const [driverId, setDriverId] = useState<number | null>(null);
    const [accompanyingEmployeeIds, setAccompanyingEmployeeIds] = useState<number[]>([]);
    const [type, setType] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [objective, setObjective] = useState('');
    const [description, setDescription] = useState('');
    
    // Form submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    
    // Validate form
    const validateForm = () => {
        const newErrors: FormErrors = {};
        
        if (!vehicleId) newErrors.vehicleId = 'Veuillez sélectionner un véhicule';
        if (!driverId) newErrors.driverId = 'Veuillez sélectionner un chauffeur';
        if (!type) newErrors.type = 'Veuillez sélectionner un type de mission';
        if (!destination) newErrors.destination = 'Veuillez entrer une destination';
        if (!date) newErrors.date = 'Veuillez sélectionner une date';
        if (!time) newErrors.time = 'Veuillez sélectionner une heure';
        if (!objective) newErrors.objective = 'Veuillez sélectionner un objectif';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    // Form submission
    const handleSubmit = async () => {
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            await createMission({
                vehicleId,
                driverId,
                accompanyingEmployeeIds,
                type,
                destination,
                date,
                time,
                objective,
                description
            });
            
            // Show success message
            toast.success("✅ Mission créée avec succès!");
            
            // Redirect to missions list after a short delay to ensure toast is visible
            setTimeout(() => {
                navigate('/missions');
            }, 1500);
        } catch (error) {
            // Show error toast
            toast.error("❌ Erreur lors de la création de la mission");
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Show loading state when fetching form data
    if (formDataLoading) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="mt-4 text-gray-600">Chargement des données du formulaire...</p>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
    
    // Show error state if form data fetch fails
    if (formDataError) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-6">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm leading-5 text-red-700">
                                    {formDataError}
                                </p>
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="mt-2 text-sm text-red-700 underline hover:text-red-900"
                                >
                                    Essayer à nouveau
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500 mb-6">
                    <button 
                        onClick={() => navigate('/missions')}
                        className="hover:text-blue-600 flex items-center"
                    >
                        <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 7V12L14.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Mission
                    </button>
                    <ChevronRight size={16} className="mx-2" />
                    <span className="font-medium text-gray-900">Ajouter Mission</span>
                </div>
                
                {/* Form Container */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h1 className="text-xl font-bold text-gray-900 mb-6">Ajouter Mission</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div>
                            <VehicleSelector 
                                selectedVehicleId={vehicleId}
                                onChange={setVehicleId}
                                error={errors.vehicleId}
                                vehicles={vehicles}
                            />
                            
                            <div className="mt-6">
                                <MissionTypeSelector 
                                    selectedType={type}
                                    onChange={setType}
                                    error={errors.type}
                                    missionTypes={missionTypes}
                                />
                            </div>
                            
                            <div className="mt-6">
                                <DestinationInput 
                                    value={destination}
                                    onChange={setDestination}
                                    error={errors.destination}
                                />
                            </div>
                            
                            <div className="mt-6">
                                <DatePicker 
                                    selectedDate={date}
                                    onChange={setDate}
                                    error={errors.date}
                                />
                            </div>
                            
                            <div className="mt-6">
                                <TimePicker 
                                    selectedTime={time}
                                    onChange={setTime}
                                    error={errors.time}
                                />
                            </div>
                        </div>
                        
                        {/* Right Column */}
                        <div>
                            <DriverSelector 
                                selectedDriverId={driverId}
                                onChange={setDriverId}
                                error={errors.driverId}
                                drivers={drivers}
                            />
                            
                            <div className="mt-6">
                                <EmployeeSelector 
                                    selectedEmployeeIds={accompanyingEmployeeIds}
                                    onChange={setAccompanyingEmployeeIds}
                                    employees={employees}
                                />
                            </div>
                            
                            <div className="mt-6">
                                <ObjectiveSelector 
                                    selectedObjective={objective}
                                    onChange={setObjective}
                                    error={errors.objective}
                                    objectives={missionObjectives}
                                />
                            </div>
                            
                            <div className="mt-6">
                                <DescriptionInput 
                                    value={description}
                                    onChange={setDescription}
                                    error={errors.description}
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Form Actions */}
                    <MissionFormActions 
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default AddMissionPage; 