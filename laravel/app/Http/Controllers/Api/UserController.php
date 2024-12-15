<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json([
            'status'=> 200,
            'users'=>$users,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|confirmed|min:8',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        }
        else
        {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            return response()->json([
                'status'=> 200,
                'message'=>'User Added Successfully',
            ]);
        }

    }

    public function edit($id)
    {
        $user = User::find($id);
        if($user)
        {
            return response()->json([
                'status'=> 200,
                'user' => $user,
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No User ID Found',
            ]);
        }
    }


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required',
            'email'=>'required|email|unique:users,email,'.$id.',id'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validationErrors'=> $validator->messages(),
            ]);
        }
        else
        {
            $user = User::find($id);
            if($user)
            {

                $user->name = $request->input('name');
                $user->email = $request->input('email');
                $user->update();

                return response()->json([
                    'status'=> 200,
                    'message'=>'User Updated Successfully',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=> 404,

                    'message' => 'No User ID Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if($user)
        {
            $user->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'User Deleted Successfully',
            ]);
        }
        else
        {

            return response()->json([
                'status'=> 404,
                'message' => 'No User ID Found',
            ]);
        }
    }
}
