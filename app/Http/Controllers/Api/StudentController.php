<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::with('user')->get();
        return StudentResource :: collection($students);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        $student = Student::create($request->validated());
        return new StudentResource($student->load('user'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        return new StudentResource($student->load('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $student->update($request->validated());
        return new StudentResource($student->load('user'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student-> delete();
        return response()->json(null, 204);
    }

    public function pending()
{
    $students = Student::with(['user', 'group', 'generation'])
        ->where('status', 'pending')
        ->get();

    return StudentResource::collection($students);
}
 public function getByUserId($user_id)
    {
        // Retrieve the student along with relations like group and generation
        $student = Student::with(['group', 'generation'])
            ->where('user_id', $user_id)
            ->first();

        if (!$student) {
            return response()->json([
                'message' => 'Student not found.'
            ], 404);
        }

    return new StudentResource($student);
    }

public function accept($id)
{
    $student = Student::findOrFail($id);
    $student->status = 'accepted';
    $student->save();

    return new StudentResource($student);
}

public function reject($id)
{
    $student = Student::findOrFail($id);
    $student->status = 'rejected';
    $student->save();

    return new StudentResource($student);
}

public function updateGroup(Request $request, $user_id)
{
    $validated = $request->validate([
        'group_id' => 'required|exists:groups,group_id',
    ]);

    // Find student by user_id
    $student = Student::where('user_id', $user_id)->firstOrFail();

    $student->group_id = $validated['group_id'];
    $student->save();

    return response()->json([
        'message' => 'Group updated successfully',
        'student' => $student->load('group.semester.year'),
    ]);
}
}
