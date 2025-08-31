<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lecture;
use App\Http\Requests\StoreLectureRequest;
use App\Http\Requests\UpdateLectureRequest;
use App\Http\Resources\LectureResource;
use Illuminate\Http\Request;

class LectureController extends Controller
{
    public function index(Request $request)
{
    $q = Lecture::query()->with(['professorSubject.subject', 'professorSubject.professor.user']);

    if ($request->filled('subject_id')) {
        $q->whereHas('professorSubject', function ($query) use ($request) {
            $query->where('subject_id', $request->query('subject_id'));
        });
    }

    $lectures = $q->get();

    return LectureResource::collection($lectures);
}

    public function store(StoreLectureRequest $request)
    {
        $data = $request->validated();

        $lecture = Lecture::create([
            'title' => $data['title'],
            'file_path' => $data['file_path'] ?? null,
            'professor_subject_id' => $data['professor_subject_id'],
        ]);

        return LectureResource::make($lecture->load('professorSubject'))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Lecture $lecture)
    {
        return LectureResource::make($lecture->load('professorSubject'));
    }

    public function update(UpdateLectureRequest $request, Lecture $lecture)
    {
        $data = $request->validated();

        if (array_key_exists('title', $data)) {
            $lecture->title = $data['title'];
        }

        if (array_key_exists('professor_subject_id', $data)) {
            $lecture->professor_subject_id = $data['professor_subject_id'];
        }

        if (array_key_exists('file_path', $data)) {
            $lecture->file_path = $data['file_path'];
        }

        $lecture->save();

        return LectureResource::make($lecture->load('professorSubject'));
    }

    public function destroy(Lecture $lecture)
    {
        $lecture->delete();
        return response()->noContent();
    }
}
