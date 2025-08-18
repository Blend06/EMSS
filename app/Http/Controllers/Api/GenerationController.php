<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GenerationResource;
use App\Models\Generation;
use App\Http\Requests\StoreGenerationRequest;
use App\Http\Requests\UpdateGenerationRequest;

class GenerationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $generations = Generation::all();
        return GenerationResource::collection($generations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGenerationRequest $request)
    {
        $generations = Generation::create($request->validated());
        return new GenerationResource($generations);
    }

    /**
     * Display the specified resource.
     */
    public function show(Generation $generation)
    {
        return new GenerationResource($generation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGenerationRequest $request, Generation $generation)
    {
        $generation->update($request->validated());
        return new GenerationResource($generation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Generation $generation)
    {
        $generation->delete();
        return response()->json(null, 204);
    }
}
