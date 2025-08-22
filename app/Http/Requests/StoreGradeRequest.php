<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGradeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'student_id' => ['required', 'integer', 'exists:students,student_id'],
            'professor_subject_id' => ['required', 'integer', 'exists:professors_subjects,professor_subject_id'],
            'grade' => ['required', 'numeric', 'between:1,5', 'decimal:0,2'],
            'date' => ['nullable','date','date_format:Y-m-d'],
        ];
    }
}
