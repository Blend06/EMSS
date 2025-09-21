<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Carbon\Carbon;
class AuthController extends Controller
{
    // Register new user
    public function register (Request $request) {

        $data = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'birthdate' => 'required|date',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:32',
            'password' => 'required|string|confirmed|min:6'
        ]);

       return DB::transaction(function() use ($data) {
        $user = User::create($data);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,], 201);
       });


    }

    // Login user
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Create short-lived access token
        $accessToken = $user->createToken('auth_token')->plainTextToken;

        // Create refresh token
        $refreshToken = Str::random(64);

        // Store hashed refresh token in DB
        DB::table('refresh_tokens')->insert([
            'user_id'    => $user->id,
            'token'      => hash('sha256', $refreshToken),
            'expires_at' => Carbon::now()->addDays(7),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Set refresh token as HttpOnly cookie
        $cookie = cookie(
            'refresh_token',         // cookie name
            $refreshToken,           // raw token
            60 * 24 * 7,             // 7 days in minutes
            '/',                     // path
            null,                    // domain (null = current)
            true,                    // secure (true in production)
            true,                    // httpOnly
            false,                   // raw
            'Strict'                 // SameSite
        );

        return response()->json([
            'user'         => $user,
            'access_token' => $accessToken,
            'token_type'   => 'Bearer'
        ])->cookie($cookie);
    }

    // Logout user (revoke current token)
    public function logout(Request $request)
{
    // Revoke all access tokens for this user
    $request->user()->tokens()->delete();

    // Delete refresh token from DB
    $refreshToken = $request->cookie('refresh_token');
    if ($refreshToken) {
        DB::table('refresh_tokens')->where('token', hash('sha256', $refreshToken))->delete();
    }

    // Remove cookie
    return response()->json(['message' => 'Logged out successfully'])
        ->cookie('refresh_token', '', -1); // delete cookie
}
public function refresh(Request $request)
    {
        $refreshToken = $request->cookie('refresh_token');

        if (!$refreshToken) {
            return response()->json(['message' => 'No refresh token'], 401);
        }

        $hashed = hash('sha256', $refreshToken);

        $record = DB::table('refresh_tokens')->where('token', $hashed)->first();

        if (!$record) {
            return response()->json(['message' => 'Invalid refresh token'], 401);
        }

        if (Carbon::parse($record->expires_at)->isPast()) {
            // delete expired token
            DB::table('refresh_tokens')->where('token', $hashed)->delete();
            return response()->json(['message' => 'Refresh token expired'], 401);
        }

        $user = User::find($record->user_id);

        // Issue new access token
        $accessToken = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $accessToken,
            'token_type'   => 'Bearer'
        ]);
    }
}
