<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSubjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // allow all authenticated users for now
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255|unique:subjects,name,' . $this->subject->subject_id . ',subject_id',
            'syllabus_file_path' => 'sometimes|required|string|max:255',
        ];
    }
}
