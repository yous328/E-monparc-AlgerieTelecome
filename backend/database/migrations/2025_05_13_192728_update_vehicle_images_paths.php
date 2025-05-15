<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // Update each brand logo
        $brands = DB::table('vehicle_brands')->get();

        foreach ($brands as $brand) {
            $logoPath = 'vehicles/brandImg/' . $brand->name . '.png';
            DB::table('vehicle_brands')
                ->where('brandID', $brand->brandID)
                ->update(['logo' => $logoPath]);
        }

        // Update each model photo
        $models = DB::table('vehicle_models')->get();

        foreach ($models as $model) {
            // Get brand name from brandID
            $brand = DB::table('vehicle_brands')->where('brandID', $model->brandID)->first();

            if ($brand) {
                $imagePath = 'vehicles/images/' . $brand->name . '/' . $model->model_name . '.png';
                DB::table('vehicle_models')
                    ->where('modelID', $model->modelID)
                    ->update(['photo' => $imagePath]);
            }
        }
    }

    public function down(): void
    {
        // Revert all image paths to NULL (optional, for rollback)
        DB::table('vehicle_brands')->update(['logo' => null]);
        DB::table('vehicle_models')->update(['photo' => null]);
    }
};
