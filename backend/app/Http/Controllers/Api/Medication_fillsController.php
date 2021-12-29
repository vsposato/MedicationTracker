<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\Medication_fillsRepositoryInterface;

class Medication_fillsController extends Controller
{
    protected Medication_fillsRepositoryInterface $medication_fillsRepository;
    protected Request $request;

    public function __construct(Medication_fillsRepositoryInterface $medication_fillsRepository, Request $request)
    {
        $this->medication_fillsRepository = $medication_fillsRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->medication_fillsRepository->findAll($this->request->all());

        return response()->json($payload);
    }

    public function show($id)
    {
        $payload = $this->medication_fillsRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->medication_fillsRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->medication_fillsRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->medication_fillsRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->medication_fillsRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

