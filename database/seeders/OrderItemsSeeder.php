<?php

namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $orderItems = [
            [
                "available_product_id" => 1,
                "quantity" => 2
            ],
            [
                "available_product_id" => 2,
                "quantity" => 3
            ]
        ];

        $order = Order::find(1);
        $order->orderItems()->sync($orderItems);
    }
}
