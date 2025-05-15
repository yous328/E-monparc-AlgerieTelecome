<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VehicleBrand;
use App\Models\VehicleModel;
use App\Models\VehicleType;

class VehicleModelBrandTypeSeeder extends Seeder
{
    public function run(): void
    {
        $vehicleData = [
            'Toyota' => [
                'Sedan' => ['Camry', 'Corolla'],
                'SUV' => ['RAV4', 'Highlander', 'C-HR'],
                'Hatchback' => ['Yaris'],
                'Van' => ['Hiace'],
                'Electric' => ['bZ4X']
            ],
            'Peugeot' => [
                'Hatchback' => ['208', '308'],
                'SUV' => ['2008', '3008', '5008'],
                'Sedan' => ['508'],
                'Van' => ['Partner', 'Expert']
            ],
            'Hyundai' => [
                'Hatchback' => ['i10', 'i20', 'i30'],
                'Sedan' => ['Elantra', 'Sonata'],
                'SUV' => ['Tucson', 'Santa Fe', 'Kona'],
                'Electric' => ['Ioniq 5', 'Kona Electric']
            ],
            'Renault' => [
                'Hatchback' => ['Clio', 'Twingo', 'Megane', '5', '4'],
                'SUV' => ['Captur', 'Kadjar', 'Arkana', 'Austral', 'Rafale'],
                'Sedan' => ['Talisman', 'Laguna'],
                'Van' => ['Kangoo', 'Trafic', 'Master', 'Espace', 'Scenic'],
                'Electric' => ['Zoe', '5 Electric', 'Megane E-Tech']
            ],
            'Ford' => [
                'Hatchback' => ['Fiesta', 'Focus'],
                'SUV' => ['Kuga', 'Puma', 'Edge'],
                'Sedan' => ['Mondeo'],
                'Van' => ['Transit', 'Tourneo'],
                'Electric' => ['Mustang Mach-E']
            ],
            'Nissan' => [
                'Hatchback' => ['Micra'],
                'SUV' => ['Juke', 'Qashqai', 'X-Trail'],
                'Sedan' => ['Altima'],
                'Electric' => ['Leaf', 'Ariya'],
                'Van' => ['NV200']
            ],
            'Volkswagen' => [
                'Hatchback' => ['Golf', 'Polo'],
                'SUV' => ['Tiguan', 'Touareg', 'T-Roc'],
                'Sedan' => ['Passat', 'Arteon'],
                'Electric' => ['ID.3', 'ID.4', 'ID.5'],
                'Van' => ['Transporter', 'Caddy']
            ],
            'Fiat' => [
                'Hatchback' => ['Punto', '500'],
                'SUV' => ['500X'],
                'Van' => ['Ducato', 'Fiorino', 'Doblo'],
                'Electric' => ['500e']
            ],
            'Seat' => [
                'Hatchback' => ['Ibiza', 'Leon'],
                'SUV' => ['Arona', 'Ateca', 'Tarraco'],
                'Electric' => ['Mii Electric'],
                'Sedan' => ['Toledo']
            ],
            'Kia' => [
                'Hatchback' => ['Rio', 'Ceed', 'Picanto'],
                'SUV' => ['Sportage', 'Seltos', 'Sorento'],
                'Sedan' => ['Cerato'],
                'Electric' => ['EV6', 'Niro EV']
            ],
        ];

        foreach ($vehicleData as $brandName => $categories) {
            // Create brand
            $brand = VehicleBrand::firstOrCreate(['name' => $brandName]);

            foreach ($categories as $typeName => $models) {
                // Create type
                $type = VehicleType::firstOrCreate(['name' => $typeName]);

                foreach ($models as $modelName) {
                    VehicleModel::firstOrCreate([
                        'model_name' => $modelName,
                        'brandID' => $brand->brandID,
                        'vehicleTypeID' => $type->vehicleTypeID,
                    ]);
                }
            }
        }
    }
}
