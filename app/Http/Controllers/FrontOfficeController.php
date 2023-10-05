<?php

namespace App\Http\Controllers;

use App\Models\AvailableProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class FrontOfficeController extends Controller
{
    public function index() {
        $products = Product::with("buyOrders.availableProducts")->whereHas("buyOrders.availableProducts", function($query) {
            $query->where("quantity", ">", 0);
        })->get();

        foreach( $products as $product) {
            $total = 0;
            foreach( $product->buyOrders as $buyOrder ) {
                foreach($buyOrder->availableProducts as $availableProduct) {
                    $total += $availableProduct->quantity;
                }
            }
            $product->total = $total;
        }

        return Inertia::render('Welcome', [
            "products" => $products,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
