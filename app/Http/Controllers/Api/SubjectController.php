<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SubjectResource;
use App\Models\Subject;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use Illuminate\Support\Facades\Storage;

class SubjectController extends Controller
{
    public function index()
    {
        return SubjectResource::collection(Subject::all());
    }

    public function store(StoreSubjectRequest $request)
    {
        // Accept either 'syllabus_file_path' (new) or 'syllabus_file' (legacy)
        $file = $request->file('syllabus_file_path') ?? $request->file('syllabus_file');

        $path = $file->store('syllabus_files', 'public');

        $subject = Subject::create([
            'name' => $request->validated()['name'],
            'syllabus_file_path' => $path,
        ]);

        return (new SubjectResource($subject))->response()->setStatusCode(201);
    }

    public function show(Subject $subject)
    {
        return new SubjectResource($subject);
    }

    public function update(UpdateSubjectRequest $request, Subject $subject)
    {
        $data = ['name' => $request->validated()['name']];

        // Accept either key on update as well
        $file = $request->file('syllabus_file_path') ?? $request->file('syllabus_file');

        if ($file) {
            if ($subject->syllabus_file_path && Storage::disk('public')->exists($subject->syllabus_file_path)) {
                Storage::disk('public')->delete($subject->syllabus_file_path);
            }
            $data['syllabus_file_path'] = $file->store('syllabus_files', 'public');
        }

        $subject->update($data);

        return new SubjectResource($subject);
    }

    public function destroy(Subject $subject)
    {
        if ($subject->syllabus_file_path && Storage::disk('public')->exists($subject->syllabus_file_path)) {
            Storage::disk('public')->delete($subject->syllabus_file_path);
        }
        $subject->delete();
        return response()->json(null, 204);
    }
}
