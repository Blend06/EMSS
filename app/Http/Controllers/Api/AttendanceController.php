<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttendanceResource;
use App\Models\Attendance;
use App\Http\Requests\StoreAttendanceRequest;
use App\Http\Requests\UpdateAttendanceRequest;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $query = Attendance::query();

    

    if ($request->has('student_id')) {
        $query->where('student_id', $request->student_id);
    }

    if ($request->has('professor_subject_ids')) {
        $ids = explode(',', $request->professor_subject_ids);
        $query->whereIn('professor_subject_id', $ids);
    }

    $attendances = $query->with([
        'student.user',           
        'professorSubject.professor.user',
        'professorSubject.subject' 
    ])->get();

    return AttendanceResource::collection($attendances);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttendanceRequest $request)
    {
        $attendance = Attendance::create($request->validated());
        return new AttendanceResource($attendance);
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        return new AttendanceResource($attendance);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttendanceRequest $request, Attendance $attendance)
    {
        $attendance->update($request->validated());
        return new AttendanceResource($attendance);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        $attendance->delete();
        return response()->noContent();
    }
}
