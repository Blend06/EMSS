<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Only allow if user is admin
        return auth()->user()?->isAdmin ?? false;
    }

    public function rules(): array
    {
        $userId = $this->route('user')->id;


        return [
            'firstname' => 'required|string|max:255',
            'lastname'  => 'required|string|max:255',
            'birthdate' => 'nullable|date',
            'email'     => "required|email|unique:users,email,{$userId}",
            'phone'     => 'nullable|string|max:20',
            'password'  => 'nullable|string|min:6|confirmed',
            'isAdmin'   => 'sometimes|boolean',
        ];
    }
}
