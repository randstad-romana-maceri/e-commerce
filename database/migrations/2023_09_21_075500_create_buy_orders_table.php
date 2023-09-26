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
        Schema::create('buy_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId("product_id")->constrained();
            $table->string("company", 100);
            $table->smallInteger("quantity", false, true);
            $table->decimal("unit_price", 8, 2);
            $table->string("document", 100)->nullable();
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
        Schema::dropIfExists('buy_orders');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
};
