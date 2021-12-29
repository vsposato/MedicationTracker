<?php // todo fix tag

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMedication_fillsTable extends Migration
{
    public function up()
    {
        Schema::create('medication_fills', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('created_by_user')->nullable();
            $table->unsignedBigInteger('updated_by_user')->nullable();
            $table->date

("fill_date")->nullable();
            $table->date

("next_fill_date")->nullable();
            $table->boolean

("fill_completed")->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('medication_fills');
    }
}

