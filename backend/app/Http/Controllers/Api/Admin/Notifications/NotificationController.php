<?php

namespace App\Http\Controllers\Api\Admin\Notifications;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    // List all notifications with filters
    public function index(Request $request)
    {
        $query = Notification::with('related');

        // Optional filter: read/unread
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->latest()->get());
    }

    // Show one notification
    public function show($id)
    {
        $notification = Notification::with('related')->findOrFail($id);

        return response()->json($notification);
    }

    // Mark as read
    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->status = 'read';
        $notification->save();

        return response()->json(['message' => 'Notification marked as read']);
    }
}
