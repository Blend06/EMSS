<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateScheduleRequest extends FormRequest
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
            'group_id' => 'sometimes|exists:groups,group_id',
            'class_id' => 'sometimes|exists:classes,class_id',
            'professor_subject_id' => 'sometimes|exists:professors_subjects,professor_subject_id',
            'time' => 'sometimes|string|max:255',
            'day' => 'sometimes|in:monday,tuesday,wednesday,thursday,friday,saturday',
        ];
    }
}
