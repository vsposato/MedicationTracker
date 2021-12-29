<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\MedicationsRepositoryInterface;

class MedicationsController extends Controller
{
    protected MedicationsRepositoryInterface $medicationsRepository;
    protected Request $request;

    public function __construct(MedicationsRepositoryInterface $medicationsRepository, Request $request)
    {
        $this->medicationsRepository = $medicationsRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->medicationsRepository->findAll($this->request->all());

        return response()->json($payload);
    }

    public function show($id)
    {
        $payload = $this->medicationsRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->medicationsRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->medicationsRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->medicationsRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->medicationsRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

