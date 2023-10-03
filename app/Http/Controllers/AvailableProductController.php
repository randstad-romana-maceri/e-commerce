<?php

namespace App\Http\Controllers;

use App\Models\AvailableProduct;
use App\Models\BuyOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AvailableProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $availableProducts = AvailableProduct::with("buyOrder.product")->with("orderItems")->get();

        foreach($availableProducts as $availableProduct) {

            $quantitySold = 0;
            foreach($availableProduct->orderItems as $orderItem){
                $quantitySold += $orderItem->pivot->quantity;
            }

            $availableProduct->quantitySold =  $availableProduct-> quantity - $quantitySold;
        }

        return Inertia::render('AvailableProduct/Index', [
            "products" => $availableProducts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $buyOrder = new BuyOrder();
        $buyOrders = $buyOrder->buyOrdersNotavailableProducts()->get();

        return Inertia::render('AvailableProduct/Create', [
            "buyOrders" => $buyOrders
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newAvailableProduct = new AvailableProduct();
        $newAvailableProduct->fill($request->all());
        $newAvailableProduct->save();

        return redirect()->route("available-products.index");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
