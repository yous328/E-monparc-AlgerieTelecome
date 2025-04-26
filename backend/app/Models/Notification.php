<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends Model
{
    use HasFactory;

    protected $primaryKey = 'notificationID';

    protected $fillable = [
        'title',
        'message',
        'status',
        'related_type',
        'relatedID',
        'created_by'
    ];

    /**
     * Get the model (Vehicle, Driver, etc.) that this notification is related to.
     */
    public function related()
    {
        return $this->morphTo(__FUNCTION__, 'related_type', 'relatedID');
    }

    /**
     * Get the user who created the notification (Driver or System, not Admin).
     */
    public function sender()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
