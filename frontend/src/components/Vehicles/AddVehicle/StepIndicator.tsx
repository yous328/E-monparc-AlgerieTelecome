import { cn } from "../../../lib/utils";

type StepIndicatorProps = {
    currentStep: number;
    totalSteps: number;
};

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
    return (
        <div className="relative mb-10">
            <div className="overflow-hidden flex w-full">
                {Array.from({ length: totalSteps }).map((_, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;

                    return (
                        <div key={stepNumber} className="relative flex-1">
                            <div className="w-full absolute top-1/2 h-0.5 bg-gray-200">
                                <div
                                    className={cn(
                                        "h-full bg-blue-600 transition-all duration-300",
                                        stepNumber <= currentStep ? "w-full" : "w-0"
                                    )}
                                ></div>
                            </div>

                            <div className="flex items-center justify-center relative z-10">
                                <div
                                    className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center border-2",
                                        isActive
                                            ? "bg-blue-600 border-blue-600 text-white"
                                            : isCompleted
                                                ? "bg-blue-600 border-blue-600"
                                                : "bg-white border-gray-200"
                                    )}
                                >
                                    {isCompleted ? (
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    ) : (
                                        <span className={cn(isActive ? "text-white" : "text-gray-500")}></span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-between mt-4">
                <div className={cn("text-sm", currentStep >= 1 ? "font-medium text-blue-600" : "text-gray-500")}>
                    <div>Partie 01</div>
                    <div className="text-xs">Information général</div>
                </div>
                <div className={cn("text-sm", currentStep >= 2 ? "font-medium text-blue-600" : "text-gray-500")}>
                    <div>Partie 02</div>
                    <div className="text-xs">Entretien Véhicule</div>
                </div>
                <div className={cn("text-sm", currentStep >= 3 ? "font-medium text-blue-600" : "text-gray-500")}>
                    <div>Partie 03</div>
                    <div className="text-xs">Historique Véhicu</div>
                </div>
            </div>
        </div>
    );
};

export default StepIndicator;