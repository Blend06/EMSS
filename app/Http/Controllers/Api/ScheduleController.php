<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Http\Requests\StoreScheduleRequest;
use App\Http\Requests\UpdateScheduleRequest;
use App\Http\Resources\ScheduleResource;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $schedules = Schedule::with(['group', 'classes', 'professorSubject.professor.user', 'professorSubject.subject'])->get();

    return ScheduleResource::collection($schedules);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScheduleRequest $request)
    {
        $schedule = Schedule::create($request->validated());
        return new ScheduleResource($schedule);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
{
    $schedule = Schedule::with(['group', 'classes', 'professorSubject.professor.user', 'professorSubject.subject'])
                        ->findOrFail($id);

    return new ScheduleResource($schedule);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScheduleRequest $request, Schedule $schedule)
    {
        $schedule->update($request->validated());
        return new ScheduleResource($schedule);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        $schedule->delete();

        return response()->noContent();
    }
}
