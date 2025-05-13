
import { useState } from "react";
import { Calendar, Car } from "lucide-react";
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


const VehicleForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-8 flex items-center">
                <Car className="h-5 w-5 text-blue-600 mr-2" />
                <h1 className="text-lg font-semibold text-blue-600">Gestion Des Véhicules</h1>
                <span className="mx-3 text-gray-400">{">"}</span>
                <h2 className="text-lg font-semibold text-blue-600">Ajouter Nouveau Véhicule</h2>
            </div>

            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

            {currentStep === 1 && <GeneralInfoForm />}
            {currentStep === 2 && <MaintenanceForm />}
            {currentStep === 3 && <BreakdownHistoryForm />}

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
                >
                    {currentStep === totalSteps ? "Terminer" : "Suivant"}
                </Button>
            </div>
        </div>
    );
};

const GeneralInfoForm = () => {
    return (
        <div className="my-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-600">Partie 01</h3>
                <p className="text-sm text-gray-500">Information général</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">TYPE</label>
                    <Select>
                        <SelectTrigger className="w-full bg-gray-100">
                            <SelectValue placeholder="Choisir Type de Véhicule" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">MARQUE</label>
                    <Select>
                        <SelectTrigger className="w-full bg-gray-100">
                            <SelectValue placeholder="Choisir Type de Véhicule" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="toyota">Toyota</SelectItem>
                            <SelectItem value="bmw">BMW</SelectItem>
                            <SelectItem value="ford">Ford</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">MATRICULE</label>
                    <Input
                        type="text"
                        placeholder="Écrire Matricule"
                        className="w-full bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">COULEUR</label>
                    <Select>
                        <SelectTrigger className="w-full bg-gray-100">
                            <SelectValue placeholder="Choisir Couleur" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="black">Noir</SelectItem>
                            <SelectItem value="white">Blanc</SelectItem>
                            <SelectItem value="red">Rouge</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">kilométrage</label>
                    <Input
                        type="text"
                        placeholder="Écrire Kilométrage"
                        className="w-full bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PUISSANCE MOTEUR</label>
                    <Select>
                        <SelectTrigger className="w-full bg-gray-100">
                            <SelectValue placeholder="Choisir Type Moteur" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="150">150 HP</SelectItem>
                            <SelectItem value="200">200 HP</SelectItem>
                            <SelectItem value="250">250 HP</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">TYPE CARBURANT</label>
                    <Select>
                        <SelectTrigger className="w-full bg-gray-100">
                            <SelectValue placeholder="Choisir Type de Carburant" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="essence">Essence</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="electric">Électrique</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SERVICE</label>
                    <Select>
                        <SelectTrigger className="w-full bg-gray-100">
                            <SelectValue placeholder="Choisir Service" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="repair">Réparation</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CONTROLE TECHNIQUE</label>
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Entrer Date D'assurance"
                            className="w-full bg-gray-100 pr-10"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">DATE D'ASSURANCE</label>
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Écrire Date d'assurance"
                            className="w-full bg-gray-100 pr-10"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const MaintenanceForm = () => {
    return (
        <div className="my-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-600">Partie 02</h3>
                <p className="text-sm text-gray-500">Entretien Véhicule</p>
            </div>

            <div className="space-y-8">
                <div>
                    <h4 className="font-medium text-gray-800 mb-3">Vidange</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">KILOMETRAGE</label>
                            <Input
                                type="text"
                                placeholder="Entrer Kilométrage du dernier vidange"
                                className="w-full bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">DATE</label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Choisir Date"
                                    className="w-full bg-gray-100 pr-10"
                                />
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Entretien Programmé Chaque</label>
                            <Select>
                                <SelectTrigger className="w-full bg-gray-100">
                                    <SelectValue placeholder="Choisir Kilométrage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5000">5000 km</SelectItem>
                                    <SelectItem value="10000">10000 km</SelectItem>
                                    <SelectItem value="15000">15000 km</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-medium text-gray-800 mb-3">Batterie</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">KILOMETRAGE</label>
                            <Input
                                type="text"
                                placeholder="Entrer Kilométrage"
                                className="w-full bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">DATE</label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Choisir Date"
                                    className="w-full bg-gray-100 pr-10"
                                />
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Entretien Programmé Chaque</label>
                            <Select>
                                <SelectTrigger className="w-full bg-gray-100">
                                    <SelectValue placeholder="Choisir Kilométrage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="20000">20000 km</SelectItem>
                                    <SelectItem value="30000">30000 km</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-medium text-gray-800 mb-3">Bougies</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">KILOMETRAGE</label>
                            <Input
                                type="text"
                                placeholder="Entrer Kilométrage"
                                className="w-full bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">DATE</label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Choisir Date"
                                    className="w-full bg-gray-100 pr-10"
                                />
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Entretien Programmé Chaque</label>
                            <Select>
                                <SelectTrigger className="w-full bg-gray-100">
                                    <SelectValue placeholder="Choisir Kilométrage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="40000">40000 km</SelectItem>
                                    <SelectItem value="50000">50000 km</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-medium text-gray-800 mb-3">Penneau</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">KILOMETRAGE</label>
                            <Input
                                type="text"
                                placeholder="Entrer Kilométrage"
                                className="w-full bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">DATE</label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Choisir Date"
                                    className="w-full bg-gray-100 pr-10"
                                />
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Entretien Programmé Chaque</label>
                            <Select>
                                <SelectTrigger className="w-full bg-gray-100">
                                    <SelectValue placeholder="Choisir Kilométrage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="30000">30000 km</SelectItem>
                                    <SelectItem value="40000">40000 km</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BreakdownHistoryForm = () => {
    return (
        <div className="my-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-600">Partie 03</h3>
                <p className="text-sm text-gray-500">Historique Véhicu</p>
            </div>

            <div className="space-y-8">
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-800">Panne mécanique</h4>
                        <Button
                            variant="outline"
                            className="border border-blue-500 text-blue-500 hover:bg-blue-50"
                        >
                            Ajouter une panne <span className="ml-2">+</span>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Select>
                                <SelectTrigger className="w-full bg-gray-100">
                                    <SelectValue placeholder="Choisir Type de Panne" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="engine">Moteur</SelectItem>
                                    <SelectItem value="transmission">Transmission</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Choisir Date de rétablissement"
                                className="w-full bg-gray-100 pr-10"
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                            <textarea
                                placeholder="Description"
                                className="w-full bg-gray-100 border-gray-300 rounded-md p-2 h-20"
                            ></textarea>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-3 mt-3 rounded">
                        {[1, 2, 3, 4].map((_item, i) => (
                            <div key={i} className="text-sm text-gray-600 mb-1">
                                Moteur - 17/12/2022 - (moteur segmenter)
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-800">Panne électrique</h4>
                        <Button
                            variant="outline"
                            className="border border-blue-500 text-blue-500 hover:bg-blue-50"
                        >
                            Ajouter une panne <span className="ml-2">+</span>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Select>
                                <SelectTrigger className="w-full bg-gray-100">
                                    <SelectValue placeholder="Choisir Type de Panne" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="electric">Électrique</SelectItem>
                                    <SelectItem value="battery">Batterie</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Choisir Date de rétablissement"
                                className="w-full bg-gray-100 pr-10"
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <div className="hidden md:block"></div>
                    </div>

                    <div className="bg-gray-100 p-3 mt-3 rounded">
                        {[1, 2, 3, 4].map((_item, i) => (
                            <div key={i} className="text-sm text-gray-600 mb-1">
                                fenetre - 17/12/2022 - (Masse mécanisme)
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default VehicleForm;