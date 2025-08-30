<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Semester;
use App\Http\Requests\StoreSemesterRequest;
use App\Http\Requests\UpdateSemesterRequest;
use App\Http\Resources\SemesterResource;

class SemesterController extends Controller
{
    public function index(Request $request)
    {
        $q = Semester::query()
            ->with(['year'])
            ->orderBy('semester');

        if ($request->filled('year_id')) {
            $q->where('year_id', (int) $request->query('year_id'));
        }

        if ($request->boolean('with_subjects')) {
            $q->with(['subjects.professors.user']);
        }

        $semesters = $q->get();

        return SemesterResource::collection($semesters);
    }

    public function store(StoreSemesterRequest $request)
    {
        $semester = Semester::create($request->validated());
        return new SemesterResource($semester);
    }

    public function show(Semester $semester)
    {
        return new SemesterResource($semester);
    }

    public function update(UpdateSemesterRequest $request, Semester $semester)
    {
        $semester->update($request->validated());
        return new SemesterResource($semester);
    }

    public function destroy(Semester $semester)
    {
        $semester->delete();
        return response()->noContent();
    }
}
