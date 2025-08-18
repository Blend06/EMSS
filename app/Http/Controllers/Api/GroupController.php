<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Http\Resources\GroupResource;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = Group::with('semester')->get();
        return GroupResource::collection($groups);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGroupRequest $request)
    {
        $groups = Group::create($request->validated());
        return new GroupResource($groups);
    }

    /**
     * Display the specified resource.
     */
    public function show(Group $group)
{
    $group = $group->load('semester');
    return new GroupResource($group);
}

public function update(UpdateGroupRequest $request, Group $group)
{
    $group->update($request->validated());
    return new GroupResource($group);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $group)
    {
        $group->delete();
        return response()->json(['message' => 'Group deleted successfully']);
    }
}
