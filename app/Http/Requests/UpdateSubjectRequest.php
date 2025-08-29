<?php

namespace App\Http\Requests;

use App\Models\Subject;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSubjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $routeParam = $this->route('subject');
        $subjectId  = $routeParam instanceof Subject ? $routeParam->getKey() : $routeParam;

        return [
            'name' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('subjects', 'name')->ignore($subjectId, 'subject_id'),
            ],
            'semester_id' => [
                'required',
                'integer',
                Rule::exists('semester', 'semester_id'),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'        => 'The subject name is required.',
            'name.unique'          => 'This subject name is already taken.',
            'semester_id.required' => 'Please select a semester.',
            'semester_id.exists'   => 'The selected semester does not exist.',
        ];
    }
}
