<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Year;
use App\Http\Requests\StoreYearRequest;
use App\Http\Requests\UpdateYearRequest;
use App\Http\Resources\YearResource;

class YearController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $years = Year::all();
        return YearResource::collection($years);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreYearRequest $request)
    {
        $years = Year::create($request->validated());
        return new YearResource($years);
    }

    /**
     * Display the specified resource.
     */
    public function show(Year $year)
    {
        return new YearResource($year);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateYearRequest $request, Year $year)
    {
        $year->update($request->validated());
        return new YearResource($year);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Year $year)
    {
        $year->delete();
        return response()->json(null, 204);
    }
}