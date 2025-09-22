<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    public function visits()
    {
        return $this->hasMany(Visit::class, 'version_id', 'version_id');
    }
}
