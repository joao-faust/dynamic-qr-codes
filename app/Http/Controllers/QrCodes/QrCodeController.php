<?php

namespace App\Http\Controllers\QrCodes;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\QrCode;
use Illuminate\Support\Facades\Storage;

class QrCodeController extends Controller
{
    public function switchVersion(Request $request, int $id)
    {
        $request->validate([
            'versionId' => 'required|exists:destinations,version_id',
        ]);

        $enabledDestination = QrCode::query()
            ->findOrFail($id)
            ->enabledDestination()
            ->first(['id', 'status']);


        $enabledDestination->timestamps = false;
        $enabledDestination->status = "disabled";
        $enabledDestination->save();

        $newEnabledDestination = Destination::query()
            ->where('version_id', $request->input('versionId'))
            ->first(['id', 'status']);

        $newEnabledDestination->timestamps = false;
        $newEnabledDestination->status = 'enabled';
        $newEnabledDestination->save();

        return redirect('/');
    }

    public function delete(Request $request, int $id)
    {
        $qrCode = QrCode::query()->findOrFail($id);
        $qrCodePath = "qrcodes/{$qrCode->filename}.png";

        $qrCode->delete();

        if (Storage::disk('public')->exists($qrCodePath)) {
            Storage::disk('public')->delete($qrCodePath);
        }

        return redirect('/');
    }
}
