<?php

namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrdersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $newOrder = new Order();
        $newOrder->fill([
            "user_id" => 1,
            "amount" => 5.00,
        ]);
        $newOrder->save();
    }
}
