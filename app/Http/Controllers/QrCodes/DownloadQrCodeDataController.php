<?php

namespace App\Http\Controllers\QrCodes;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

use App\Http\Controllers\Controller;
use App\Models\QrCode;

class DownloadQrCodeDataController extends Controller
{
    public function __invoke(Request $request, int $id)
    {
        $qrCode = QrCode::query()->findOrFail($id);

        $key = config('app.key');

        if (str_starts_with($key, 'base64:')) {
            $key = base64_decode(substr($key, 7));
        }

        $name = $qrCode->name;
        $password = $qrCode->password ?? null;

        $sql = "\nINSERT INTO `qr_codes`(`id`,`name`,`filename`,`status`,`visibility`," .
        "`password`,`created_at`,`updated_at`) VALUES({$qrCode->id}," .
        "'{$name}', '{$qrCode->filename}','{$qrCode->status}','{$qrCode->visibility}'," .
        "'{$password}','{$qrCode->created_at}','{$qrCode->updated_at}');" .
        "\n";

        foreach ($qrCode->destinations as $destination) {
            $message = $destination->message ?? null;
            $subject = $destination->subject ?? null;

            $sql .= "\nINSERT INTO `destinations`(`id`,`version_id`,`type`,`content`," .
            "`message`,`subject`,`qr_code_id`,`created_at`,`updated_at`) VALUES({$destination->id}," .
            "'{$destination->version_id}','{$destination->type}','{$destination->content}'," .
            "'{$message}','{$subject}',{$destination->qr_code_id},'{$destination->created_at}'," .
            "'{$destination->updated_at}');";

            foreach ($destination->visits as $visit) {
                $sql .= "\nINSERT INTO `visits`(`id`,`version_id`,`created_at`,`updated_at`)" .
                " VALUES({$visit->id},'{$visit->version_id}','{$visit->created_at}'," .
                "'{$visit->updated_at}');";
            }

            $sql .= "\n";
        }

        $sql = '--' . hash_hmac('sha256', $sql, $key) . "\n" . $sql;
        $sqlPath = 'temp/' . Str::uuid() . '.sql';

        if (Storage::disk('public')->put($sqlPath, $sql)) {
            return response()
                ->download(
                    storage_path("app/public/$sqlPath"),
                    time() . '.sql',
                    ['Content-Type' => 'application/sql']
                )

                ->deleteFileAfterSend(true);
        }

        return redirect('/');
    }
}
