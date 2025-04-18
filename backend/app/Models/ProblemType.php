<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProblemType extends Model
{
    protected $fillable = ['name'];

    public function reports()
    {
        return $this->hasMany(ProblemReport::class, 'problem_type_id');
    }
}