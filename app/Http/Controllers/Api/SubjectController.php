<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Http\Resources\SubjectResource;

class SubjectController extends Controller
{
    public function index(\Illuminate\Http\Request $request)
{
    $q = \App\Models\Subject::query()
        ->with(['semester.year'])
        ->orderBy('name');

    if ($request->filled('semester_id')) {
        $q->where('semester_id', (int) $request->query('semester_id'));
    }

    if ($request->filled('year_id')) {
        $q->whereHas('semester', fn($qq) => $qq->where('year_id', (int) $request->query('year_id')));
    }

    if ($request->boolean('with_professors')) {
        $q->with(['professors.user']);
    }

    $perPage = (int) $request->query('per_page', 15);

    return \App\Http\Resources\SubjectResource::collection($q->paginate($perPage));
}


    public function store(StoreSubjectRequest $request)
    {
        $subject = Subject::create($request->validated());
        $subject->load('semester');
        return (new SubjectResource($subject))->response()->setStatusCode(201);
    }

    public function show(Subject $subject)
    {
        $subject->load('semester');
        return new SubjectResource($subject);
    }

    public function update(UpdateSubjectRequest $request, Subject $subject)
    {
        $subject->update($request->validated());
        $subject->load('semester');
        return new SubjectResource($subject);
    }

    public function destroy(Subject $subject)
    {
        $subject->delete();
        return response()->noContent();
    }
}
