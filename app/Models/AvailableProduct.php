<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AvailableProduct extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function orders() {
        return $this->belongsToMany(Order::class, 'order_item');
    }

    public function buyOrder() {
        return $this->belongsTo(BuyOrder::class);
    }
}
