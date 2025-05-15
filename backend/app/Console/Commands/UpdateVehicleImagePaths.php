<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateVehicleImagePaths extends Command
{
    protected $signature = 'vehicles:update-image-paths';
    protected $description = 'Update vehicle brand logos and model photos paths';

    public function handle()
    {
        $this->info('Updating vehicle brand logos...');
        $brands = DB::table('vehicle_brands')->get();
        $brandCount = 0;

        foreach ($brands as $brand) {
            // Use proper casing - first letter uppercase, rest lowercase
            $brandNameFormatted = ucfirst(strtolower($brand->name));
            $logoPath = 'vehicles/brandImg/' . $brandNameFormatted . '.png';
            
            DB::table('vehicle_brands')
                ->where('brandID', $brand->brandID)
                ->update(['logo' => $logoPath]);
                
            $brandCount++;
        }

        $this->info("Updated {$brandCount} brand logos.");

        $this->info('Updating vehicle model photos...');
        $models = DB::table('vehicle_models')->get();
        $modelCount = 0;

        foreach ($models as $model) {
            // Get brand name from brandID
            $brand = DB::table('vehicle_brands')->where('brandID', $model->brandID)->first();

            if ($brand) {
                // Format with proper casing
                $brandNameFormatted = ucfirst(strtolower($brand->name));
                // For models, keep original formatting as filenames might be exact
                $modelNameFormatted = $model->model_name;
                $imagePath = 'vehicles/images/' . $brandNameFormatted . '/' . $modelNameFormatted . '.png';
                
                DB::table('vehicle_models')
                    ->where('modelID', $model->modelID)
                    ->update(['photo' => $imagePath]);
                    
                $modelCount++;
            }
        }

        $this->info("Updated {$modelCount} model photos.");
    }
} 