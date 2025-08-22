<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use App\Http\Requests\StoreGradeRequest;
use App\Http\Requests\UpdateGradeRequest;
use Illuminate\Http\Request;
use App\Http\Resources\GradeResource;


class GradeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int) $request->get('per_page', 15);

        $query = Grade::with([
            'student',
            'professorSubject.professor',
            'professorSubject.subject',
        ])->latest('grade_id');

        $grades = $query->paginate($perPage);

        return GradeResource::collection($grades);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGradeRequest $request)
    {

        $data = $request->validated();

        $grade = Grade::create([
            'student_id' => $data['student_id'],
            'professor_subject_id' => $data['professor_subject_id'],
            'grade' => round((float)$data['grade'], 2),
            'date' => $data['date'] ?? null,
        ]);

        $grade->load(['student', 'professorSubject.professor', 'professorSubject.subject']);
    
        return GradeResource::make($grade)->response()->setStatusCode(201);
        
    }


    /**
     * Display the specified resource.
     */
    public function show(Grade $grade)
    {
        $grade->load(['student', 'professorSubject.professor', 'professorSubject.subject']);

        return GradeResource::make($grade);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGradeRequest $request, Grade $grade)
    {
        $data = $request->validated();

        if(array_key_exists('student_id', $data)) {
            $grade->student_id = $data['student_id'];
        }
        if(array_key_exists('professor_subject_id', $data)) {
            $grade->professor_subject_id = $data['professor_subject_id'];
        }
        if(array_key_exists('grade', $data)) {
            $grade->grade = round((float)$data['grade'], 2);
        }
        if(array_key_exists('date', $data)) {
            $grade->date = $data['date'];
        }

        $grade->save();

        $grade->load(['student', 'professorSubject.professor', 'professorSubject.subject']);

        return GradeResource::make($grade);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Grade $grade)
    {
        $grade->delete();
        return response()->noContent();
    }
}
