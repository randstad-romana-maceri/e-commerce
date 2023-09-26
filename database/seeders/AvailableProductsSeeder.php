<?php

namespace Database\Seeders;

use App\Models\AvailableProduct;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AvailableProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $available_products = [
            [
                "buy_order_id" => 1,
                "quantity" => 10
            ],
            [
                "buy_order_id" => 2,
                "quantity" => 15
            ],
        ];

        foreach($available_products as $product) {
            $newAvailableProduct = new AvailableProduct();
            $newAvailableProduct->fill($product);
            $newAvailableProduct->save();
        }
    }
}
