<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('available_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId("buy_order_id")->constrained();
            $table->smallInteger("quantity", false, true);
            $table->tinyInteger("priority", false, true)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::dropIfExists('available_products');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
};
