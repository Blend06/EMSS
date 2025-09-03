<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Professor_subject;
use App\Http\Requests\StoreProfessor_subjectRequest;
use App\Http\Requests\UpdateProfessor_subjectRequest;
use App\Http\Resources\Professor_subjectResource;
use Illuminate\Http\Request;

class Professor_SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $professorSubjects = Professor_subject::with(['professor.user', 'subject'])->get();
    return Professor_subjectResource::collection($professorSubjects);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProfessor_subjectRequest $request)
    {
        $professorSubject = Professor_subject::create($request->validated());
        return new Professor_subjectResource($professorSubject);
    }

    /**
     * Display the specified resource.
     */
   public function show($id)
{
    $professor_subject = Professor_subject::with(['professor.user', 'subject'])
        ->find($id);

    if (!$professor_subject) {
        return response()->json(['message' => 'Professor-Subject not found'], 404);
    }

    return new Professor_subjectResource($professor_subject);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProfessor_subjectRequest $request, $id)
{
    $professor_subject = Professor_subject::findOrFail($id);
    $professor_subject->update($request->validated());
    $professor_subject->load(['professor.user', 'subject']);

    return new Professor_subjectResource($professor_subject);
}


    public function destroy($id)
{
    $professor_subject = Professor_subject::findOrFail($id);
    $professor_subject->delete();
    return response()->noContent();
}

public function lectures($professorSubjectId)
    {
        $professorSubject = Professor_subject::with(['lectures'])->find($professorSubjectId);

        if (!$professorSubject) {
            return response()->json(['message' => 'Professor-Subject not found'], 404);
        }

        return response()->json($professorSubject->lectures);
    }

    /**
     * Store a new lecture for a given professor_subject
     */
    public function storeLecture(Request $request, $professorSubjectId)
    {
        $professorSubject = Professor_subject::find($professorSubjectId);

        if (!$professorSubject) {
            return response()->json(['message' => 'Professor-Subject not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'file_path' => 'nullable|string', 
        ]);

        $lecture = $professorSubject->lectures()->create($validated);

        return response()->json($lecture, 201);
    }

    public function bySubjects(Request $request)
{
    $subjectIds = $request->query('subject_ids'); // expects comma-separated IDs
    $subjectIdsArray = explode(',', $subjectIds);

    $professorSubjects = Professor_subject::with(['professor.user', 'subject'])
        ->whereIn('subject_id', $subjectIdsArray)
        ->get();

    return Professor_subjectResource::collection($professorSubjects);
}

}
