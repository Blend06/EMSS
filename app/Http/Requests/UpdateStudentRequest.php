<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentRequest extends FormRequest
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
            'user_id'        => 'sometimes|exists:users,id',
            'id_card_number' => [
                'sometimes',
                'string',
                'max:50',
                Rule::unique('students', 'id_card_number')->ignore($this->route('student')->student_id, 'student_id'),
            ],
            'conduct_grade'  => 'nullable|integer|min:1|max:10',
            'group_id'       => 'sometimes|exists:groups,group_id',
            'generation_id'  => 'sometimes|exists:generations,generation_id',
            'caretaker_name' => 'sometimes|string|max:255',
            'caretaker_phone'=> 'sometimes|string|max:20',
        ];
    }
}
