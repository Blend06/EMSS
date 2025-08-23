<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreScheduleRequest extends FormRequest
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
            'group_id' => 'required|exists:groups,group_id',
            'class_id' => 'required|exists:classes,class_id',
            'professor_subject_id' => 'required|exists:professors_subjects,professor_subject_id',
            'time' => 'required|string|max:255',
            'day' => 'required|in:monday,tuesday,wednesday,thursday,friday,saturday',
        ];
    }
}
