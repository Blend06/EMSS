<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Classes;
use App\Http\Requests\StoreClassesRequest;
use App\Http\Requests\UpdateClassesRequest;

class ClassesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Classes::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClassesRequest $request)
    {
        $Classes = Classes::create($request->validated());
        return response()->json($Classes, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Classes $class)
{
    return response()->json($class, 200);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClassesRequest $request, Classes $class)
{
    $class->update($request->validated());
    return response()->json($class, 200);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classes $class)
{
    $class->delete();
    return response()->json(null, 204);
}
}
