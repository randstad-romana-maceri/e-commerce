<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = [
           [
            "name" => "Banane",
            "description" => "Banane Boliviane",
            "price" => 1.00,
            "image" => "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/2324px-Banana-Single.jpg",
           ],
           [
            "name" => "Susina",
            "description" => "Susina Peruviana",
            "price" => 0.70,
            "image" => "https://www.latrentina.it/wp-content/uploads/2019/11/susine-3.jpg",
           ],
        ];

        foreach ($products as $product) {
            $newProduct = new Product();
            $newProduct->fill($product);
            $newProduct->save();
        }
    }
}
