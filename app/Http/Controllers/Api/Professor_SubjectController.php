<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Professor_subject;
use App\Http\Requests\StoreProfessor_subjectRequest;
use App\Http\Requests\UpdateProfessor_subjectRequest;
use App\Http\Resources\Professor_subjectResource;

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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    $professor_subject = Professor_subject::findOrFail($id);
    $professor_subject->delete();
    return response()->noContent();
}
}
