<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function availableProducts() {
        return $this->belongsToMany(AvailableProduct::class, 'order_item');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function orderItems() {
        return $this->belongsToMany(AvailableProduct::class, 'order_item')->withPivot('quantity');
    }
}
