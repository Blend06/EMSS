<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Semester;
use App\Models\Subject;
use App\Http\Resources\SemesterResource;
use App\Http\Resources\SubjectResource;

class SubjectLectureController extends Controller
{
    public function semesterByYear(Request $request, $yearId) {
        $raw = collect(explode(',', (string) $request->query('include', '')))
            ->map(fn($s) => trim($s))
            ->filter();

        $allowed = [
            'subjects',
            'subjects.professors',
            'subjects.professors.user',
        ];

        $includes = $raw->intersect($allowed)->values()->all();

        $q = Semester::where('year_id', $yearId)->orderBy('semester');

        if (!empty($includes)) {
            $q->with($includes);
        }

        $semesters = $q->get();

        return SemesterResource::collection($semesters);

    }

    public function subjectsBySemester(Request $request, $semesterId)
    {
        $raw = collect(explode(',', (string) $request->query('include', '')))
            ->map(fn($s) => trim($s))
            ->filter();

        $allowed = [
            'professors',
            'professors.user',
        ];

        $includes = $raw->intersect($allowed)->values()->all();

        $q = Subject::where('semester_id', $semesterId)->orderBy('name');

        if (!empty($includes)) {
            $q->with($includes);
        }

        $subjects = $q->get();

        return SubjectResource::collection($subjects);
    }
}
