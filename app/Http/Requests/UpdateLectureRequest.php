<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLectureRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'professor_subject_id' => ['sometimes', 'required', 'integer', 'exists:professors_subjects,professor_subject_id'],
            'file_path' => ['sometimes', 'nullable', 'string', 'max:2048'],
        ];
    }
}
