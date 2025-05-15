<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Step 1: General Info
            'vehicleTypeID' => ['required', 'integer', 'exists:vehicle_types,vehicleTypeID'],
            'brandID' => ['required', 'integer', 'exists:vehicle_brands,brandID'],
            'modelID' => ['required', 'integer'],
            'registration_number' => ['required', 'string'],
            'colorID' => ['required', 'integer', 'exists:colors,colorID'],
            'mileage' => ['required', 'integer'],
            'engineTypeID' => ['required', 'integer', 'exists:engine_types,engineTypeID'],
            'fuelTypeID' => ['required', 'integer', 'exists:fuel_types,fuelTypeID'],
            'serviceID' => ['required', 'integer', 'exists:services,serviceID'],
            'technical_control_date' => ['required', 'date'],
            'insurance_date' => ['required', 'date'],
            'status' => ['required', 'in:Available'],

            // Step 2: Maintenance Info (dynamic list)
            'maintenances' => ['required', 'array', 'min:1'],
            'maintenances.*.maintenanceTypeID' => ['required', 'integer', 'exists:maintenance_types,maintenanceTypeID'],
            'maintenances.*.kilometrage' => ['nullable', 'integer', 'min:0'],
            'maintenances.*.date' => ['nullable', 'date'],
            'maintenances.*.interval_km' => ['nullable', 'integer', 'min:0'],

            // Step 3: Breakdown History
            'mechanical_breakdowns' => ['nullable', 'array'],
            'mechanical_breakdowns.*.breakdownTypeID' => ['required_with:mechanical_breakdowns', 'integer'],
            'mechanical_breakdowns.*.type' => ['required_with:mechanical_breakdowns', 'string'],
            'mechanical_breakdowns.*.date' => ['required_with:mechanical_breakdowns', 'date'],
            'mechanical_breakdowns.*.description' => ['nullable', 'string'],

            'electrical_breakdowns' => ['nullable', 'array'],
            'electrical_breakdowns.*.breakdownTypeID' => ['required_with:electrical_breakdowns', 'integer'],
            'electrical_breakdowns.*.type' => ['required_with:electrical_breakdowns', 'string'],
            'electrical_breakdowns.*.date' => ['required_with:electrical_breakdowns', 'date'],
            'electrical_breakdowns.*.description' => ['nullable', 'string'],
        ];
    }
}
