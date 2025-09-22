<?php

namespace App\Http\Controllers\QrCodes;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Generator as QrCodeGenerator;

use App\Http\Controllers\Controller;

class UploadQrCodeDataController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'sqlFile' => ['required', 'file', 'mimetypes:text/plain'],
        ]);

        $key = config('app.key');

        if (str_starts_with($key, 'base64:')) {
            $key = base64_decode(substr($key, 7));
        }

        $sql = $request->file('sqlFile')->getContent();
        $sqlLines = explode("\n", $sql);

        if (count($sqlLines) === 0) return redirect('/');

        if (!preg_match(
            "/VALUES\s*\(\s*([0-9]+)\s*,\s*'[^']*'\s*,\s*'([^']+)'/i",
            $sql,
            $matches
        )) {
            return redirect('/')->withErrors([
                'sqlFile' => __('messages.errors.invalid', ['value' => 'QR Code']),
            ]);
        }

        $sql = str_replace($sqlLines[0] . "\n", '', $sql);

        $signature = str_replace('--', '', $sqlLines[0]);
        $expectedSignature = hash_hmac('sha256', $sql, $key);

        if (!hash_equals($expectedSignature, $signature)) {
            return redirect('/')->withErrors([
                'sqlFile' => __('messages.errors.invalid', ['value' => 'QR Code']),
            ]);
        }

        try {
            DB::unprepared($sql);

            $qrCodePath = "qrcodes/{$matches[2]}.png";

            if (!Storage::disk('public')->exists($qrCodePath)) {
                (new QrCodeGenerator())->format('png')
                    ->size(250)

                    ->generate(
                        url('') . "/qrcodes/{$matches[1]}/destination?visit=yes",
                        storage_path("app/public/{$qrCodePath}")
                );
            }

        } catch (Exception $e) {
            switch ($e->getCode()) {
                case '23000':
                    return redirect('/')->withErrors([
                        'sqlFile' => __(
                            'messages.errors.upload',
                            ['value' => 'QR Code']
                        ),
                    ]);

                default:
                    return redirect('/')->withErrors([
                        'sqlFile' => __('messages.errors.unexpected'),
                    ]);
            }
        }

        return redirect('/');
    }
}
