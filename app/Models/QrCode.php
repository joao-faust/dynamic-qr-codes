<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QrCode extends Model
{
    public function destinations()
    {
        return $this->hasMany(Destination::class, 'qr_code_id');
    }

    public function enabledDestination()
    {
        return $this
            ->hasOne(Destination::class, 'qr_code_id')
            ->where('status', 'enabled');
    }
}
