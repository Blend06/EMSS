<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        $data = [
            'id'        => $this->id,
            'firstname' => $this->firstname,
            'lastname'  => $this->lastname,
            'birthdate' => $this->birthdate,
            'email'     => $this->email,
            'phone'     => $this->phone,
            'created_at'   => $this->created_at,
            'updated_at'   => $this->updated_at,
        ];

        // Expose isAdmin only if the authenticated user is admin
        if ($request->user() && $request->user()->isAdmin) {
            $data['isAdmin'] = $this->isAdmin;
        }

        return $data;
    }
}
