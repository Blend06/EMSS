<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
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
             'user_id' => [
                'required',
                'exists:users,id',
                'unique:students,user_id', 
            ],
            'id_card_number' => 'required|string|max:50|unique:students,id_card_number',
            'group_id'       => 'nullable|exists:groups,group_id',
            'conduct_grade'  => 'nullable|string|size:1',
            'status'  => 'nullable|string|max:20',
            'generation_id'  => 'nullable|exists:generations,generation_id',
            'caretaker_name' => 'required|string|max:255',
            'caretaker_phone'=> 'required|string|max:20',
        ];
    }
}
