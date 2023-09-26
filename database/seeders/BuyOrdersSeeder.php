<?php

namespace Database\Seeders;

use App\Models\BuyOrder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BuyOrdersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $buy_orders = [
            [
                "product_id" => 1,
                "company" => "Azienda A",
                "quantity" => 50,
                "unit_price" => 0.60
            ],
            [
                "product_id" => 1,
                "company" => "Azienda B",
                "quantity" => 20,
                "unit_price" => 0.70
            ],
        ];

        foreach ($buy_orders as $order) {
            $newBuyOrder = new BuyOrder();
            $newBuyOrder->fill($order);
            $newBuyOrder->save();
        }
    }
}
