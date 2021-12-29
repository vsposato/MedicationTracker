<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Migration1640802278913 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

                Schema::create('users', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('firstName')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('lastName')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('phoneNumber')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('email')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->enum('role', ['admin','user'])->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->boolean('disabled')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('password')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->boolean('emailVerified')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('emailVerificationToken')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->timestamp('emailVerificationTokenExpiresAt')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('passwordResetToken')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->timestamp('passwordResetTokenExpiresAt')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('provider')->nullable();

                });

                Schema::create('medications', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('medications', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::table('medications', function (Blueprint $table) {
                    $table->string('medication_name')->nullable();

                });

                Schema::table('medications', function (Blueprint $table) {
                    $table->integer('quantity')->nullable();

                });

                Schema::table('medications', function (Blueprint $table) {
                    $table->integer('days_supply')->nullable();

                });

                Schema::table('medications', function (Blueprint $table) {
                    $table->integer('days_before_refill')->nullable();

                });

                Schema::create('medication_fills', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('medication_fills', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::table('medication_fills', function (Blueprint $table) {
                    $table->date('fill_date')->nullable();

                });

                Schema::table('medication_fills', function (Blueprint $table) {
                    $table->date('next_fill_date')->nullable();

                });

                Schema::table('medication_fills', function (Blueprint $table) {
                    $table->boolean('fill_completed')->nullable();

                });

                Schema::table('medications', function (Blueprint $table) {
                    $table->unsignedBigInteger('medication_fills')->nullable();

                    $table->foreign('medication_fills')->references('id')->on('medication_fills');

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->unsignedBigInteger('medications')->nullable();

                    $table->foreign('medications')->references('id')->on('medications');

                });

    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('medications');
                });

                Schema::table('medications', function(Blueprint $table) {
                    $table->dropColumn('medication_fills');
                });

                Schema::table('medication_fills', function(Blueprint $table) {
                    $table->dropColumn('fill_completed');
                });

                Schema::table('medication_fills', function(Blueprint $table) {
                    $table->dropColumn('next_fill_date');
                });

                Schema::table('medication_fills', function(Blueprint $table) {
                    $table->dropColumn('fill_date');
                });

                Schema::table('medication_fills', function(Blueprint $table) {
                    $table->dropColumn('medication_id');
                });

                Schema::drop('medication_fills');

                Schema::table('medications', function(Blueprint $table) {
                    $table->dropColumn('days_before_refill');
                });

                Schema::table('medications', function(Blueprint $table) {
                    $table->dropColumn('days_supply');
                });

                Schema::table('medications', function(Blueprint $table) {
                    $table->dropColumn('quantity');
                });

                Schema::table('medications', function(Blueprint $table) {
                    $table->dropColumn('medication_name');
                });

                Schema::table('medications', function(Blueprint $table) {
                    $table->dropColumn('medication_owner');
                });

                Schema::drop('medications');

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('provider');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('passwordResetTokenExpiresAt');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('passwordResetToken');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('emailVerificationTokenExpiresAt');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('emailVerificationToken');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('emailVerified');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('password');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('avatar');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('disabled');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('role');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('email');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('phoneNumber');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('lastName');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('firstName');
                });

                Schema::drop('users');

    }
}
