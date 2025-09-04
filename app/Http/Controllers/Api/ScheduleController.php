<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Http\Requests\StoreScheduleRequest;
use App\Http\Requests\UpdateScheduleRequest;
use App\Http\Resources\ScheduleResource;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $q = Schedule::with([
        'group', 
        'classes',
        'professorSubject.professor.user',
        'professorSubject.subject',
    ]);

    $user = $request->user();
    $gid = $request->query('group_id');

    if ($user && ($user->relationLoaded('student') ? $user->student : $user->student)) {
        $gid = $user->student?->group_id;
    }

    if($gid) {
        $q->where('group_id', $gid);
    }

    return ScheduleResource::collection($q->get());
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
