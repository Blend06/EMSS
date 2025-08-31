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
            'user_id'        => 'required|exists:users,id',
            'id_card_number' => [
                'required',
                'string',
                'max:50',
                Rule::unique('students', 'id_card_number')->ignore($this->route('student')->student_id, 'student_id'),
            ],
            'conduct_grade'  => 'nullable|string|size:1',
            'status'  => 'required|string|max:20',
            'group_id'       => 'required|exists:groups,group_id',
            'caretaker_name' => 'sometimes|string|max:255',
            'caretaker_phone'=> 'sometimes|string|max:20',
        ];
    }
}
