<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuyOrder extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function product() {
        return $this->belongsTo(Product::class);
    }

    public function availableProducts() {
        return $this->hasMany(AvailableProduct::class);
    }

    public function buyOrdersNotavailableProducts() {
        return $this->whereDoesntHave('availableProducts');
    }
}
