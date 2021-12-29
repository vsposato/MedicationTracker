<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTable extends Migration
{
    public function up()
    {

        Schema::table('users', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('medications')->nullable();
            $table->foreign('medications')->references('id')->on('medications');

        });

        Schema::table('medications', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('medication_fills')->nullable();
            $table->foreign('medication_fills')->references('id')->on('medication_fills');

        });

        Schema::create('medications_medication_owner_users', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('medications_id')->unsigned();
            $table->unsignedBigInteger('medication_owner_id')->unsigned();
            $table->foreign('medications_id')->references('id')->on('medications');
            $table->foreign('medication_owner_id')->references('id')->on('users');
        });

        Schema::table('medication_fills', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::create('medication_fills_medication_id_medications', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('medication_fills_id')->unsigned();
            $table->unsignedBigInteger('medication_id_id')->unsigned();
            $table->foreign('medication_fills_id')->references('id')->on('medication_fills');
            $table->foreign('medication_id_id')->references('id')->on('medications');
        });

        Schema::table('files', function(Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');
        });
    }

    public function down()
    {
        //
    }
}
