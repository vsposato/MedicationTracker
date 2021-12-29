<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medications extends Model {
    protected static $unguarded = true;

    public function medication_fills(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Medication_fills::class, 'medication_fills');
    }

    public function medication_owner(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Users::class, 
        'medications_medication_owner_users', 'medications_id', 'medication_owner_id');
    }

}

