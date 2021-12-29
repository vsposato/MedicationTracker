<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medication_fills extends Model {
    protected static $unguarded = true;

    public function medication_id(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Medications::class, 
        'medication_fills_medication_id_medications', 'medication_fills_id', 'medication_id_id');
    }

}

