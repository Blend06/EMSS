<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLectureRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'professor_subject_id' => ['required', 'integer', 'exists:professors_subjects,professor_subject_id'],
            'file_path' => ['nullable', 'string', 'max:2048'],
        ];
    }
}
