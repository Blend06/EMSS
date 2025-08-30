<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Http\Resources\SubjectResource;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::with('semester')->paginate(15);
        return SubjectResource::collection($subjects);
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
