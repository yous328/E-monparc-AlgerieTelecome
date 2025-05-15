// ✅ React and core hooks
import { useState, useEffect } from "react";

// ✅ Third-party libraries
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Car } from "lucide-react";
import { MyDatePickerWithLabel } from "./ui/MyDatePickerWithLabel";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "./ui/select";
import StepIndicator from "./StepIndicator";
import { useNavigate } from "react-router-dom";

// ✅ Hooks and context
import { useVehicleForm } from "../../../context/vehicle/AddVehicle/useVehicleForm";
import { useVehicleFormOptions } from "../../../hooks/Vehicle/useVehicleFormOptions";

// ✅ API
import { submitVehicleForm } from "../../../api/vehicle/submitVehicleForm";

// ✅ Types
import {
    VehicleFormData,
    MaintenanceItem,
    Breakdown
} from "../../../context/vehicle/AddVehicle/VehicleFormData";

import * as Yup from 'yup';

const vehicleFormSchema = Yup.object().shape({
  vehicleTypeID: Yup.number().required(),
  brandID: Yup.number().required(),
  modelID: Yup.number().required(),
  registration_number: Yup.string().required(),
  colorID: Yup.number().required(),
  mileage: Yup.number().required(),
  engineTypeID: Yup.number().required(),
  fuelTypeID: Yup.number().required(),
  serviceID: Yup.number().required(),
  technical_control_date: Yup.date().required(),
  insurance_date: Yup.date().required(),
  status: Yup.string().oneOf(['Available']).required(),
  maintenances: Yup.array().of(
    Yup.object().shape({
      maintenanceTypeID: Yup.number().required(),
      kilometrage: Yup.number().nullable(),
      date: Yup.date().nullable(),
      interval_km: Yup.number().nullable(),
    })
  ).required(),
  mechanical_breakdowns: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required(),
      date: Yup.date().required(),
      description: Yup.string().nullable(),
    })
  ).nullable(),
  electrical_breakdowns: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required(),
      date: Yup.date().required(),
      description: Yup.string().nullable(),
    })
  ).nullable(),
});

// Define step fields mapping with proper index signature
const stepFields: { [key: number]: Array<keyof VehicleFormData> } = {
  1: ['vehicleTypeID', 'brandID', 'modelID', 'registration_number', 'colorID', 'mileage', 'engineTypeID', 'fuelTypeID', 'serviceID', 'technical_control_date', 'insurance_date'],
  2: ['vidange', 'batterie', 'bougies', 'penneau'],
  3: ['mechanical_breakdowns', 'electrical_breakdowns']
};

const VehicleForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const totalSteps = 3;

    const { vehicleFormData, resetVehicleFormData } = useVehicleForm();
    const navigate = useNavigate();

    const nextStep = async () => {
        if (currentStep === totalSteps) {
            setSubmitting(true);
            try {
                // Create maintenances array from maintenance items
                const maintenanceKeys = ['vidange', 'batterie', 'bougies', 'penneau'];
                const maintenanceTypes = [1, 2, 3, 4]; // Corresponding maintenance type IDs
                
                const maintenances = maintenanceKeys.map((key, index) => {
                    const item = vehicleFormData[key as keyof typeof vehicleFormData] || {};
                    // Make sure all values are valid
                    return {
                        maintenanceTypeID: maintenanceTypes[index],
                        kilometrage: Math.max(0, Number((item as any)?.kilometrage || 0)),
                        date: (item as any)?.date || new Date().toISOString().split('T')[0],
                        interval_km: Math.max(0, Number((item as any)?.interval_km || 0))
                    };
                });
                
                // Create a modified form data with the maintenances array
                const submissionData = {
                    ...vehicleFormData,
                    maintenances: maintenances
                };

                // Log what we're submitting
                console.log('Submitting data:', submissionData);
                
                // Validate the complete data
                await vehicleFormSchema.validate(submissionData, { abortEarly: false });

                // Submit the form
                await submitVehicleForm(submissionData);
                
                // Show success message
                toast.success("✅ Véhicule ajouté avec succès !");
                
                // Reset the form
                resetVehicleFormData();
                setIsSubmitted(true);
                setErrors({});
                
                // Navigate after a short delay to ensure toast is visible
                setTimeout(() => {
                    navigate('/vehicles');
                }, 1500);
            } catch (validationErrors) {
                console.log('Validation Errors:', validationErrors);
                const errors = validationErrors as Yup.ValidationError;
                const errorMessages: Record<string, string> = {};
                
                if (Array.isArray(errors.inner)) {
                    errors.inner.forEach(err => {
                        if (err.path) {
                            errorMessages[err.path] = err.message;
                            console.log(`Field "${err.path}" failed:`, err.message);
                        }
                    });
                } else if (errors.path) {
                    errorMessages[errors.path] = errors.message;
                    console.log(`Field "${errors.path}" failed:`, errors.message);
                }
                
                setErrors(errorMessages);
                toast.error("❌ Validation failed. Please check your input.");
            } finally {
                setSubmitting(false);
            }
        } else {
            // Validate only current step fields
            try {
                // Collect which fields should be validated in this step
                const fieldsToValidate = stepFields[currentStep];
                
                // Log the fields we're validating
                console.log(`Validating fields for step ${currentStep}:`, fieldsToValidate);
                console.log('Current form data:', vehicleFormData);

                // Update the check for required fields to properly handle dependencies
                const missingFields: string[] = [];
                for (const field of fieldsToValidate) {
                    const value = vehicleFormData[field as keyof typeof vehicleFormData];
                    
                    // Skip validation for dependent fields if their prerequisites aren't selected
                    if (field === 'modelID' && !vehicleFormData.brandID) {
                        continue;
                    }
                    if (field === 'fuelTypeID' && !vehicleFormData.modelID) {
                        continue;
                    }
                    if (field === 'engineTypeID' && !vehicleFormData.fuelTypeID) {
                        continue;
                    }
                    
                    // Check if value is undefined, null, or empty string, but allow zero
                    if (value === undefined || value === null || value === '') {
                        missingFields.push(field);
                    }
                }

                if (missingFields.length > 0) {
                    console.log('Missing required fields:', missingFields);
                    const errorMessages: Record<string, string> = {};
                    missingFields.forEach(field => {
                        errorMessages[field] = `${field} is required`;
                    });
                    setErrors(errorMessages);
                    toast.error("❌ Please fill out all required fields.");
                    return; // Don't proceed with validation
                }

                // Create a schema with only the current step fields
                const currentStepSchema = Yup.object().shape(
                    fieldsToValidate.reduce<Record<string, any>>((acc, field) => {
                        // Check if the field exists in vehicleFormSchema.fields
                        const schemaField = vehicleFormSchema.fields[field as keyof typeof vehicleFormSchema.fields];
                        if (schemaField) {
                            acc[field as string] = schemaField;
                        }
                        return acc;
                    }, {})
                );

                // Validate only the fields for the current step
                const currentStepData = fieldsToValidate.reduce<Record<string, any>>((acc, field) => {
                    // Check if the field exists in vehicleFormData
                    const value = vehicleFormData[field as keyof typeof vehicleFormData];
                    acc[field as string] = value; // Include even if undefined, so validation catches missing fields
                    return acc;
                }, {});

                await currentStepSchema.validate(currentStepData, { abortEarly: false });
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
                setErrors({}); // Clear errors on valid step
            } catch (validationErrors) {
                console.log('Validation Errors (Current Step):', validationErrors);
                const errors = validationErrors as Yup.ValidationError;
                console.log('Error details:', {
                    message: errors.message,
                    path: errors.path,
                    errors: errors.errors,
                    inner: errors.inner?.map(err => ({
                        path: err.path,
                        message: err.message,
                        value: err.value
                    }))
                });
                
                const errorMessages: Record<string, string> = {};
                
                if (Array.isArray(errors.inner)) {
                    errors.inner.forEach(err => {
                        if (err.path) {
                            errorMessages[err.path] = err.message;
                            console.log(`Field "${err.path}" failed:`, err.message);
                        }
                    });
                } else if (errors.path) {
                    // Handle single error case
                    errorMessages[errors.path] = errors.message;
                    console.log(`Field "${errors.path}" failed:`, errors.message);
                }
                
                setErrors(errorMessages);
                toast.error("❌ Validation failed. Please check your input.");
            }
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-8 flex items-center">
                <Car className="h-5 w-5 text-blue-600 mr-2" />
                <h1 className="text-lg font-semibold text-blue-600">
                    Gestion Des Véhicules
                </h1>
                <span className="mx-3 text-gray-400">{">"}</span>
                <h2 className="text-lg font-semibold text-blue-600">
                    Ajouter Nouveau Véhicule
                </h2>
            </div>

            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

            {currentStep === 1 && <GeneralInfoForm errors={errors} />}
            {currentStep === 2 && <MaintenanceForm errors={errors} />}
            {currentStep === 3 && <BreakdownHistoryForm errors={errors} />}

            <div className="mt-8 flex justify-end space-x-4">
                {currentStep > 1 && (
                    <Button
                        variant="outline"
                        onClick={prevStep}
                        className="px-8 py-2 bg-gray-100 hover:bg-gray-200 text-red-500 border-none"
                    >
                        {currentStep === 3 ? "Précédent" : "Annuler"}
                    </Button>
                )}
                <Button
                    onClick={nextStep}
                    className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white"
                    disabled={submitting || isSubmitted || Object.keys(errors).length > 0}
                >
                    {currentStep === totalSteps ? "Terminer" : "Suivant"}
                </Button>
            </div>
        </div>
    );
};

const GeneralInfoForm = ({ errors }: { errors: Record<string, string> }) => {
    const { options, loading } = useVehicleFormOptions();
    const { updateVehicleFormData, vehicleFormData } = useVehicleForm();

    const [technicalDate, setTechnicalDate] = useState<Date | undefined>();
    const [insuranceDate, setInsuranceDate] = useState<Date | undefined>();
    const [filteredModels, setFilteredModels] = useState<Array<{ modelID: number, model_name: string }>>([]);
    const [filteredFuelTypes, setFilteredFuelTypes] = useState<Array<{ fuelTypeID: number, name: string }>>([]);
    const [filteredEngineTypes, setFilteredEngineTypes] = useState<Array<{ engineTypeID: number, name: string, capacity: string }>>([]);

    // Initialize filtered models if a brand is already selected
    useEffect(() => {
        if (loading || !vehicleFormData.brandID) return;
        
        const selectedBrand = options.brands.find(brand => 
            brand.brandID.toString() === vehicleFormData.brandID.toString()
        );
        
        if (selectedBrand && selectedBrand.models) {
            setFilteredModels(selectedBrand.models);
        }
    }, [loading, options.brands, vehicleFormData.brandID]);

    // Initialize filtered fuel types if a model is already selected
    useEffect(() => {
        if (loading || !vehicleFormData.modelID) return;
        
        // In a real implementation, you would fetch fuel types based on the model
        // For now, we'll just show all fuel types
        setFilteredFuelTypes(options.fuels);
    }, [loading, options.fuels, vehicleFormData.modelID]);

    // Initialize filtered engine types if a fuel type is already selected
    useEffect(() => {
        if (loading || !vehicleFormData.fuelTypeID || !vehicleFormData.brandID) return;
        
        // Filter engine types based on brandID and fuelTypeID
        const filtered = options.engines.filter(engine => 
            engine.brandID.toString() === vehicleFormData.brandID.toString() && 
            engine.fuelTypeID.toString() === vehicleFormData.fuelTypeID.toString()
        );
        
        setFilteredEngineTypes(filtered);
    }, [loading, options.engines, vehicleFormData.fuelTypeID, vehicleFormData.brandID]);

    // sync with global state
    const handleDateChange = (
        date: Date | undefined,
        field: "technical_control_date" | "insurance_date"
    ) => {
        if (date) {
            updateVehicleFormData({
                [field]: format(date, "yyyy-MM-dd"),
            });
        }
    };

    // Update models when brand changes
    const handleBrandChange = (brandID: string) => {
        // Find the selected brand
        const selectedBrand = options.brands.find(brand => brand.brandID.toString() === brandID);
        
        // Update form data with selected brand
        updateVehicleFormData({ brandID });
        
        // Clear any previously selected model, fuel type, and engine type
        updateVehicleFormData({ modelID: "", fuelTypeID: "", engineTypeID: "" });
        
        // Update filtered models
        if (selectedBrand && selectedBrand.models) {
            setFilteredModels(selectedBrand.models);
        } else {
            setFilteredModels([]);
        }
        
        // Reset dependent dropdowns
        setFilteredFuelTypes([]);
        setFilteredEngineTypes([]);
    };

    // Update fuel types when model changes
    const handleModelChange = (modelID: string) => {
        updateVehicleFormData({ modelID });
        
        // Clear any previously selected fuel type and engine type
        updateVehicleFormData({ fuelTypeID: "", engineTypeID: "" });
        
        // In a real implementation, you would fetch fuel types based on the model
        // For now, we'll just show all fuel types
        setFilteredFuelTypes(options.fuels);
        
        // Reset engine types
        setFilteredEngineTypes([]);
    };

    // Update engine types when fuel type changes
    const handleFuelTypeChange = (fuelTypeID: string) => {
        updateVehicleFormData({ fuelTypeID });
        
        // Clear any previously selected engine type
        updateVehicleFormData({ engineTypeID: "" });
        
        // Filter engine types based on brandID and fuelTypeID
        const filtered = options.engines.filter(engine => 
            engine.brandID.toString() === vehicleFormData.brandID.toString() && 
            engine.fuelTypeID.toString() === fuelTypeID
        );
        
        setFilteredEngineTypes(filtered);
    };

    if (loading) return <div>Chargement des données...</div>;

    return (
        <div className="my-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-600">Partie 01</h3>
                <p className="text-sm text-gray-500">Information général</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* TYPE */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">TYPE</label>
                    {errors.vehicleTypeID && <p className="text-red-500 text-sm mb-1">{errors.vehicleTypeID}</p>}
                    <Select onValueChange={(val) => updateVehicleFormData({ vehicleTypeID: String(val) })}>
                        <SelectTrigger className="w-full bg-gray-100">
                            <SelectValue placeholder="Choisir Type de Véhicule" />
                        </SelectTrigger>
                        <SelectContent className="z-50 max-h-60 overflow-y-auto bg-white shadow-md">
                            {options.types.map((type) => (
                                <SelectItem key={type.vehicleTypeID} value={String(type.vehicleTypeID)}>
                                    {type.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* MARQUE */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">MARQUE</label>
                    {errors.brandID && <p className="text-red-500 text-sm mb-1">{errors.brandID}</p>}
                    <Select 
                        onValueChange={handleBrandChange}
                        defaultValue={vehicleFormData.brandID ? String(vehicleFormData.brandID) : undefined}
                    >
                        <SelectTrigger className="w-full bg-gray-100">
                            <SelectValue placeholder="Choisir Marque" />
                        </SelectTrigger>
                        <SelectContent className="z-50 max-h-60 overflow-y-auto bg-white shadow-md">
                            {options.brands.map((brand) => (
                                <SelectItem key={brand.brandID} value={String(brand.brandID)}>
                                    {brand.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* MODEL */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">MODÈLE</label>
                    {errors.modelID && <p className="text-red-500 text-sm mb-1">{errors.modelID}</p>}
                    <Select 
                        onValueChange={handleModelChange}
                        disabled={filteredModels.length === 0}
                        defaultValue={vehicleFormData.modelID ? String(vehicleFormData.modelID) : undefined}
                    >
                        <SelectTrigger className="w-full bg-gray-100">
                            <SelectValue placeholder="Choisir Modèle" />
                        </SelectTrigger>
                        <SelectContent className="z-50 max-h-60 overflow-y-auto bg-white shadow-md">
                            {filteredModels.map((model) => (
                                <SelectItem key={model.modelID} value={String(model.modelID)}>
                                    {model.model_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* MATRICULE */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">MATRICULE</label>
                    {errors.registration_number && <p className="text-red-500 text-sm mb-1">{errors.registration_number}</p>}
                    <Input
                        type="text"
                        placeholder="Écrire Matricule"
                        className="w-full bg-gray-100"
                        onChange={(e) => updateVehicleFormData({ registration_number: e.target.value })}
                    />
                </div>

                {/* COULEUR */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">COULEUR</label>
                    {errors.colorID && <p className="text-red-500 text-sm mb-1">{errors.colorID}</p>}
                    <Select onValueChange={(val) => updateVehicleFormData({ colorID: String(val) })}>
                        <SelectTrigger className="w-full bg-gray-100">
                            <SelectValue placeholder="Choisir Couleur" />
                        </SelectTrigger>
                        <SelectContent className="z-50 max-h-60 overflow-y-auto bg-white shadow-md">
                            {options.colors.map((color) => (
                                <SelectItem key={color.colorID} value={String(color.colorID)}>
                                    {color.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* KILOMETRAGE */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">KILOMÉTRAGE</label>
                    {errors.mileage && <p className="text-red-500 text-sm mb-1">{errors.mileage}</p>}
                    <Input
                        type="number"
                        placeholder="Écrire Kilométrage"
                        className="w-full bg-gray-100"
                        onChange={(e) => updateVehicleFormData({ mileage: String(e.target.value) })}
                    />
                </div>

                {/* TYPE CARBURANT - Moved here */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">TYPE CARBURANT</label>
                    {errors.fuelTypeID && <p className="text-red-500 text-sm mb-1">{errors.fuelTypeID}</p>}
                    <Select 
                        onValueChange={handleFuelTypeChange}
                        disabled={filteredFuelTypes.length === 0}
                        defaultValue={vehicleFormData.fuelTypeID ? String(vehicleFormData.fuelTypeID) : undefined}
                    >
                        <SelectTrigger className="w-full bg-gray-100">
                            <SelectValue placeholder="Choisir Type de Carburant" />
                        </SelectTrigger>
                        <SelectContent className="z-50 max-h-60 overflow-y-auto bg-white shadow-md">
                            {filteredFuelTypes.map((fuel) => (
                                <SelectItem key={fuel.fuelTypeID} value={String(fuel.fuelTypeID)}>
                                    {fuel.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* MOTEUR - Moved here */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">PUISSANCE MOTEUR</label>
                    {errors.engineTypeID && <p className="text-red-500 text-sm mb-1">{errors.engineTypeID}</p>}
                    <Select 
                        onValueChange={(val) => updateVehicleFormData({ engineTypeID: String(val) })}
                        disabled={filteredEngineTypes.length === 0}
                        defaultValue={vehicleFormData.engineTypeID ? String(vehicleFormData.engineTypeID) : undefined}
                    >
                        <SelectTrigger className="w-full bg-gray-100">
                            <SelectValue placeholder="Choisir Type Moteur" />
                        </SelectTrigger>
                        <SelectContent className="z-50 max-h-60 overflow-y-auto bg-white shadow-md">
                            {filteredEngineTypes.map((engine) => (
                                <SelectItem key={engine.engineTypeID} value={String(engine.engineTypeID)}>
                                    {engine.name} ({engine.capacity})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* SERVICE */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">SERVICE</label>
                    {errors.serviceID && <p className="text-red-500 text-sm mb-1">{errors.serviceID}</p>}
                    <Select onValueChange={(val) => updateVehicleFormData({ serviceID: String(val) })}>
                        <SelectTrigger className="w-full bg-gray-100">
                            <SelectValue placeholder="Choisir Service" />
                        </SelectTrigger>
                        <SelectContent className="z-50 max-h-60 overflow-y-auto bg-white shadow-md">
                            {options.services.map((service) => (
                                <SelectItem key={service.serviceID} value={String(service.serviceID)}>
                                    {service.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* CONTROLE TECHNIQUE */}
                <div className="relative">
                    <MyDatePickerWithLabel
                        label="CONTROLE TECHNIQUE"
                        selected={technicalDate}
                        onSelect={(date) => {
                            setTechnicalDate(date);
                            handleDateChange(date, "technical_control_date");
                        }}
                    />
                    {errors.technical_control_date && <p className="text-red-500 text-sm mb-1">{errors.technical_control_date}</p>}
                </div>

                {/* DATE D'ASSURANCE */}
                <div className="relative">
                    <MyDatePickerWithLabel
                        label="DATE D'ASSURANCE"
                        selected={insuranceDate}
                        onSelect={(date) => {
                            setInsuranceDate(date)
                            handleDateChange(date, "insurance_date")
                        }}
                    />
                    {errors.insurance_date && <p className="text-red-500 text-sm mb-1">{errors.insurance_date}</p>}
                </div>
            </div>
        </div>
    );
};

const MaintenanceForm = ({ errors }: { errors: Record<string, string> }) => {
    const { vehicleFormData, updateVehicleFormData } = useVehicleForm();

    const maintenanceItems = [
        { key: "vidange", label: "Vidange", intervals: ["5000", "10000", "15000"], date: "" },
        { key: "batterie", label: "Batterie", intervals: ["20000", "30000"], date: "" },
        { key: "bougies", label: "Bougies", intervals: ["40000", "50000"], date: "" },
        { key: "penneau", label: "Penneau", intervals: ["30000", "40000"], date: "" },
    ] as const;

    const handleChange = (
        field: keyof Pick<VehicleFormData, "vidange" | "batterie" | "bougies" | "penneau">,
        type: keyof MaintenanceItem,
        value: string | number
    ) => {
        updateVehicleFormData({
            [field]: {
                ...(vehicleFormData[field] || {}),
                [type]: value,
            },
        });
    };

    return (
        <div className="my-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-600">Partie 02</h3>
                <p className="text-sm text-gray-500">Entretien Véhicule</p>
            </div>

            <div className="space-y-8">
                {maintenanceItems.map((item) => (
                    <div key={item.key}>
                        <h4 className="font-medium text-gray-800 mb-3">{item.label}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                            {/* KILOMETRAGE */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">KILOMÉTRAGE</label>
                                {errors[item.key as keyof VehicleFormData] && <p className="text-red-500 text-sm mb-1">{errors[item.key as keyof VehicleFormData]}</p>}
                                <Input
                                    type="number"
                                    onChange={(e) => handleChange(item.key, "kilometrage", parseInt(e.target.value))}
                                    placeholder="Entrer Kilométrage"
                                    className="w-full bg-gray-100"
                                />
                            </div>

                            {/* DATE */}
                            <div className="relative">
                                <MyDatePickerWithLabel
                                    label="DATE"
                                    selected={
                                        (vehicleFormData[item.key] as MaintenanceItem)?.date
                                            ? new Date((vehicleFormData[item.key] as MaintenanceItem).date)
                                            : undefined
                                    }
                                    onSelect={(date) => {
                                        if (date) {
                                            handleChange(item.key, "date", format(date, "yyyy-MM-dd"));
                                        }
                                    }}
                                />
                            </div>


                            {/* INTERVAL */}
                            <div className="relative z-50">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Entretien Programmé Chaque</label>
                                <Select onValueChange={(value) => handleChange(item.key, "interval_km", parseInt(value))}>
                                    <SelectTrigger className="w-full bg-gray-100">
                                        <SelectValue placeholder="Choisir Kilométrage" />
                                    </SelectTrigger>
                                    <SelectContent className="z-50 max-h-60 overflow-y-auto bg-white shadow-md">
                                        {item.intervals.map((km) => (
                                            <SelectItem key={km} value={km}>
                                                {km} km
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BreakdownHistoryForm = ({ errors }: { errors: Record<string, string> }) => {
    const { updateVehicleFormData, vehicleFormData } = useVehicleForm();
    const [breakType, setBreakType] = useState('');
    const [breakCategory, setBreakCategory] = useState('');
    const [breakDate, setBreakDate] = useState('');
    const [breakDescription, setBreakDescription] = useState('');
    const [breakdowns, setBreakdowns] = useState<Breakdown[]>([]);

    // Initialize from existing data
    useEffect(() => {
        const mechanicalBreakdowns = (vehicleFormData.mechanical_breakdowns || []).map(b => ({
            ...b,
            category: 'mechanical'
        })) as Breakdown[];
        
        const electricalBreakdowns = (vehicleFormData.electrical_breakdowns || []).map(b => ({
            ...b,
            category: 'electrical'
        })) as Breakdown[];
        
        setBreakdowns([...mechanicalBreakdowns, ...electricalBreakdowns]);
    }, [vehicleFormData]);

    const addBreakdown = (type: string, date: string, description: string) => {
        if (!type || !date || !breakCategory) {
            toast.error("Type, category and date are required");
            return;
        }

        const newBreakdown: Breakdown = { 
            type: breakCategory,  // This will be used as breakdown_type in backend
            category: type,       // Store mechanical/electrical for UI
            date, 
            description 
        };

        const updatedBreakdowns = [...breakdowns, newBreakdown];
        setBreakdowns(updatedBreakdowns);
        
        // Update the relevant breakdown array in form data
        if (type === 'mechanical') {
            const mechanicalBreakdowns = updatedBreakdowns
                .filter(b => b.category === 'mechanical')
                .map(b => ({
                    type: b.type,  // This becomes breakdown_type in backend
                    date: b.date,
                    description: b.description || ""
                }));
            updateVehicleFormData({ 
                mechanical_breakdowns: mechanicalBreakdowns 
            });
        } else if (type === 'electrical') {
            const electricalBreakdowns = updatedBreakdowns
                .filter(b => b.category === 'electrical')
                .map(b => ({
                    type: b.type,  // This becomes breakdown_type in backend
                    date: b.date,
                    description: b.description || ""
                }));
            updateVehicleFormData({ 
                electrical_breakdowns: electricalBreakdowns 
            });
        }
    };

    return (
        <div className="my-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-600">Partie 03</h3>
                <p className="text-sm text-gray-500">Historique Véhicule</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Breakdown Type */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type de Panne</label>
                    {errors.mechanical && <p className="text-red-500 text-sm mb-1">{errors.mechanical}</p>}
                    <Select onValueChange={setBreakType}>
                        <SelectTrigger className="w-full bg-gray-100">
                            <SelectValue placeholder="Choisir Type de Panne" />
                        </SelectTrigger>
                        <SelectContent className="z-50 max-h-60 overflow-y-auto bg-white shadow-md">
                            <SelectItem value="mechanical">Mécanique</SelectItem>
                            <SelectItem value="electrical">Électrique</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Breakdown Category */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                    {errors.type && <p className="text-red-500 text-sm mb-1">{errors.type}</p>}
                    <Input
                        type="text"
                        placeholder="Ex: Moteur, Batterie, etc."
                        className="w-full bg-gray-100"
                        onChange={(e) => setBreakCategory(e.target.value)}
                    />
                </div>

                {/* Breakdown Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de rétablissement</label>
                    {errors.date && <p className="text-red-500 text-sm mb-1">{errors.date}</p>}
                    <Input
                        type="date"
                        className="w-full bg-gray-100"
                        onChange={(e) => setBreakDate(e.target.value)}
                    />
                </div>

                {/* Breakdown Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    {errors.description && <p className="text-red-500 text-sm mb-1">{errors.description}</p>}
                    <Input
                        type="text"
                        placeholder="Description"
                        className="w-full bg-gray-100"
                        onChange={(e) => setBreakDescription(e.target.value)}
                    />
                </div>

                {/* Add Breakdown Button */}
                <div className="col-span-2 flex justify-end">
                    <Button
                        onClick={() => addBreakdown(breakType, breakDate, breakDescription)}
                        className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        Ajouter une panne
                    </Button>
                </div>

                {/* Breakdown Display */}
                <div className="col-span-2 mt-4">
                    <textarea
                        readOnly
                        className="w-full bg-gray-100 p-2 rounded-md"
                        rows={4}
                        value={breakdowns.map(b => `${b.category === 'electrical' ? 'Électrique' : 'Mécanique'} - ${b.type} - ${b.date} - (${b.description})`).join('\n')}
                    />
                </div>
            </div>
        </div>
    );
};

export default VehicleForm;