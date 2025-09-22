<?php

namespace App\Http\Controllers\QrCodes;

use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Generator as QrCodeGenerator;

use App\Http\Controllers\Controller;
use App\Models\QrCode;

class DownloadQrCodeImageController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'id' => ['required', 'integer', 'min:1'],
            'color' => ['required', 'color_hex'],
            'backgroundColor' => ['required', 'color_hex'],
            'size' => ['required', 'integer', 'min:250'],
            'format' => ['required', 'in:png,svg,eps'],
            'errorCorrection' => ['required', 'in:L,M,Q,H'],
        ]);

        $data = $request->all();

        $qrCode = QrCode::query()->with('enabledDestination')->findOrFail($data['id']);

        $hexColor = ltrim($data['color'], '#');
        $hexBackgroundColor = ltrim($data['backgroundColor'], '#');

        $qrCodeStoragePath = storage_path("app/public/temp/{$qrCode->filename}" .
            ".{$data['format']}");

        (new QrCodeGenerator())
            ->format($data['format'])
            ->size($data['size'])
            ->errorCorrection($data['errorCorrection'])

            ->color(
                hexdec(substr($hexColor, 0, 2)),
                hexdec(substr($hexColor, 2, 2)),
                hexdec(substr($hexColor, 4, 2))
            )

            ->backgroundColor(
                hexdec(substr($hexBackgroundColor, 0, 2)),
                hexdec(substr($hexBackgroundColor, 2, 2)),
                hexdec(substr($hexBackgroundColor, 4, 2))
            )

            ->generate(
                url('') . "/qrcodes/{$data['id']}/destination?visit=yes",
                $qrCodeStoragePath
            );

        return response()
            ->download($qrCodeStoragePath, time() . ".{$data['format']}")
            ->deleteFileAfterSend(true);
    }
}
