<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Professor;
use App\Http\Requests\StoreProfessorRequest;
use App\Http\Requests\UpdateProfessorRequest;
use App\Http\Resources\ProfessorResource;

class ProfessorController extends Controller
{
    public function index()
    {
        $professors = Professor::with('user')->get();
        return ProfessorResource::collection($professors);
    }

    public function store(StoreProfessorRequest $request)
    {
        $professor = Professor::create($request->validated());
        return new ProfessorResource($professor->load('user'));
    }

    public function show(Professor $professor)
    {
        return new ProfessorResource($professor->load('user'));
    }

    public function update(UpdateProfessorRequest $request, Professor $professor)
    {
        $professor->update($request->validated());
        return new ProfessorResource($professor->load('user'));
    }

    public function destroy(Professor $professor)
    {
        $professor->delete();
        return response()->json(null, 204);
    }
}
