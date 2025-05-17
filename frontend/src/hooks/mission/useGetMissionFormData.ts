import { useState, useEffect } from 'react';
import api from '../../lib/axios';
import { 
  IVehicleOption, 
  IDriverOption, 
  IEmployeeOption, 
  IMissionTypeOption, 
  IMissionObjectiveOption 
} from '../../interfaces/mission/IMissionForm';

interface IMissionFormData {
  vehicles: IVehicleOption[];
  drivers: IDriverOption[];
  employees: IEmployeeOption[];
  missionTypes: IMissionTypeOption[];
  missionObjectives: IMissionObjectiveOption[];
  loading: boolean;
  error: string | null;
}

// Helper function to safely extract model information from vehicle data
const extractVehicleInfo = (vehicle: any) => {
  // Extract model information
  let modelName = '';
  if (vehicle.model) {
    if (typeof vehicle.model === 'string') {
      modelName = vehicle.model;
    } else if (vehicle.model.model_name) {
      // Use model_name from the model object - this is the correct field name from backend
      modelName = vehicle.model.model_name;
    } else if (vehicle.model.name) {
      modelName = vehicle.model.name;
    }
  } else if (vehicle.model_name) {
    modelName = vehicle.model_name;
  }

  // Extract brand information
  let brandName = '';
  if (vehicle.brand) {
    if (typeof vehicle.brand === 'string') {
      brandName = vehicle.brand;
    } else if (vehicle.brand.name) {
      brandName = vehicle.brand.name;
    }
  } else if (vehicle.brand_name) {
    brandName = vehicle.brand_name;
  }

  // Extract registration number
  const regNumber = vehicle.registration_number || '';

  // Format a nice display name
  let displayName;
  if (brandName && modelName) {
    displayName = `${brandName} ${modelName} (${regNumber})`;
  } else if (brandName) {
    displayName = `${brandName} (${regNumber})`;
  } else if (modelName) {
    displayName = `${modelName} (${regNumber})`;
  } else {
    displayName = regNumber ? `Vehicle (${regNumber})` : 'Unknown Vehicle';
  }

  return {
    id: vehicle.vehicleID,
    name: displayName,
    model: modelName,
    brand: brandName,
    status: vehicle.status || 'Unknown'
  };
};

export const useGetMissionFormData = (): IMissionFormData => {
  const [vehicles, setVehicles] = useState<IVehicleOption[]>([]);
  const [drivers, setDrivers] = useState<IDriverOption[]>([]);
  const [employees, setEmployees] = useState<IEmployeeOption[]>([]);
  const [missionTypes, setMissionTypes] = useState<IMissionTypeOption[]>([]);
  const [missionObjectives, setMissionObjectives] = useState<IMissionObjectiveOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In the real backend, we would fetch from the API
        const response = await api.get('admin/missions/form/data');
        
        // Transform backend data to our frontend format
        if (response.data) {
          // Transform vehicles using our helper function
          if (response.data.vehicles) {
            const transformedVehicles = response.data.vehicles.map(extractVehicleInfo);
            console.log('Transformed vehicles:', transformedVehicles);
            setVehicles(transformedVehicles);
          }
          
          // Transform drivers
          if (response.data.drivers) {
            const transformedDrivers = response.data.drivers.map((driver: any) => {
              // Extract user data correctly
              const user = driver.user || {};
              // Log each driver's user data to debug
              console.log('Driver user data:', user);
              
              return {
                id: driver.driverID,
                // Use first_name and last_name from the user object (Laravel naming convention)
                name: user.name || 
                     `${user.first_name || ''} ${user.last_name || ''}`.trim() || 
                     // Fallback to legacy names if present
                     `${user.firstName || ''} ${user.lastName || ''}`.trim() || 
                     'Unknown Driver',
                status: driver.status // Keep status for potential filtering
              };
            });
            console.log('Transformed drivers:', transformedDrivers);
            setDrivers(transformedDrivers);
          }
          
          // Transform employees
          if (response.data.employees) {
            const transformedEmployees = response.data.employees.map((employee: any) => {
              // Extract user data correctly
              const user = employee.user || {};
              // Log each employee's user data to debug
              console.log('Employee user data:', user);
              
              return {
                id: employee.employeeID,
                // Use first_name and last_name from the user object (Laravel naming convention)
                name: user.name || 
                     `${user.first_name || ''} ${user.last_name || ''}`.trim() || 
                     // Fallback to legacy names if present
                     `${user.firstName || ''} ${user.lastName || ''}`.trim() || 
                     'Unknown Employee',
                position: user.position || employee.position || 'Employee',
                department: user.department || employee.department || 'Department',
                status: employee.status // Keep status for potential filtering
              };
            });
            console.log('Transformed employees:', transformedEmployees);
            setEmployees(transformedEmployees);
          }
          
          // Transform mission types
          if (response.data.missionTypes) {
            const transformedTypes = response.data.missionTypes.map((type: any) => ({
              id: type.missionTypeID,
              name: type.category
            }));
            setMissionTypes(transformedTypes);
          }
          
          // Transform mission objectives
          if (response.data.missionObjectives) {
            console.log('Raw mission objectives data:', response.data.missionObjectives);
            const transformedObjectives = response.data.missionObjectives.map((objective: any) => ({
              id: objective.missionObjectiveID,
              name: objective.name
            }));
            console.log('Transformed mission objectives:', transformedObjectives);
            setMissionObjectives(transformedObjectives);
          } else if (response.data.objectives) {
            // Backend might be using 'objectives' instead of 'missionObjectives'
            console.log('Raw objectives data:', response.data.objectives);
            const transformedObjectives = response.data.objectives.map((objective: any) => {
              console.log('Individual objective:', objective);
              return {
                id: String(objective.missionObjectiveID || objective.id),
                name: objective.name
              };
            });
            console.log('Transformed objectives:', transformedObjectives);
            setMissionObjectives(transformedObjectives);
          } else {
            console.warn('No mission objectives data found in API response');
            // Add fallback mock data
            const mockObjectives = [
              { id: 'network-maintenance', name: 'Maintenance Réseau' },
              { id: 'client-visit', name: 'Visite Client' },
              { id: 'equipment-delivery', name: 'Livraison d\'Équipement' },
              { id: 'technical-support', name: 'Support Technique' },
              { id: 'site-inspection', name: 'Inspection de Site' },
              { id: 'training', name: 'Formation' },
            ];
            console.log('Using mock objectives data:', mockObjectives);
            setMissionObjectives(mockObjectives);
          }
        }
      } catch (err) {
        console.error('Failed to fetch form data:', err);
        setError('Failed to load form data. Please try again later.');
        
        // Use mock data when API is unavailable
        setVehicles([
          { id: 1, name: 'Toyota Corolla', brand: 'Toyota', model: 'Corolla' },
          { id: 2, name: 'Honda Civic', brand: 'Honda', model: 'Civic' },
          { id: 3, name: 'Ford Explorer', brand: 'Ford', model: 'Explorer' },
          { id: 4, name: 'Tesla Model 3', brand: 'Tesla', model: 'Model 3' },
          { id: 5, name: 'Audi A4', brand: 'Audi', model: 'A4' },
        ]);
        
        setDrivers([
          { id: 1, name: 'Ahmed Benali' },
          { id: 2, name: 'Mohammed Riad' },
          { id: 3, name: 'Karim Ziani' },
          { id: 4, name: 'Younes Belhanda' },
          { id: 5, name: 'Riyad Mahrez' },
        ]);
        
        setEmployees([
          { id: 1, name: 'Bouziane Nadir', position: 'Sous Directeur Technique', department: 'DOT BEJAIA' },
          { id: 2, name: 'Merabti Hakim', position: 'Sous Directeur Technique', department: 'DOT BEJAIA' },
          { id: 3, name: 'Mohammed Ali', position: 'Sous Directeur Technique', department: 'DOT BEJAIA' },
          { id: 4, name: 'Karim Ahmed', position: 'Ingénieur', department: 'DOT ALGER' },
          { id: 5, name: 'Omar Khaled', position: 'Directeur', department: 'DOT ORAN' },
        ]);
        
        setMissionTypes([
          { id: 'delivery', name: 'Livraison' },
          { id: 'transport', name: 'Transport' },
          { id: 'maintenance', name: 'Maintenance' },
          { id: 'emergency', name: 'Urgence' },
          { id: 'other', name: 'Autre' },
        ]);
        
        setMissionObjectives([
          { id: 'network-maintenance', name: 'Maintenance Réseau' },
          { id: 'client-visit', name: 'Visite Client' },
          { id: 'equipment-delivery', name: 'Livraison d\'Équipement' },
          { id: 'technical-support', name: 'Support Technique' },
          { id: 'site-inspection', name: 'Inspection de Site' },
          { id: 'training', name: 'Formation' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFormData();
  }, []);
  
  return {
    vehicles,
    drivers,
    employees,
    missionTypes,
    missionObjectives,
    loading,
    error
  };
}; 