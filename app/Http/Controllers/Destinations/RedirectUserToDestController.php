<?php

namespace App\Http\Controllers\Destinations;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

use App\Http\Controllers\Controller;
use App\Models\QrCode;
use App\Models\Visit;

class RedirectUserToDestController extends Controller
{
    private function createVisit(QrCode $qrCode, ?String $visit)
    {
        if ($visit !== 'no') {
            $visit = new Visit();
            $visit->version_id = $qrCode->enabledDestination->version_id;
            $visit->save();
        }
    }

    private function redirectAway(QrCode $qrCode)
    {
        $enabledDestination = $qrCode->enabledDestination;
        $content = $enabledDestination->content;

        switch ($enabledDestination->type) {
            case 'text':
                $target = 'https://google.com/search';
                $content = '?q=' . urlencode($content);
                break;

            case 'url':
                $target = '';
                break;

            case 'email':
                $target = 'mailto:';

                $content =
                    $content .
                    '?subject=' .
                    rawurlencode($enabledDestination->subject) .
                    '&body=' .
                    rawurlencode($enabledDestination->message);

                break;

            case 'phone':
                $target = 'tel:+';
                break;

            case 'whatsapp':
                $target = "https://wa.me/";
                $content .= '?text=' . urlencode($enabledDestination->message);
                break;
        }

        return redirect()
            ->away($target . $content)
            ->withHeaders(['Cache-Control' => 'no-store']);
    }

    public function redirect(Request $request, int $id)
    {
        $qrCode = QrCode::with([
            'enabledDestination' => function ($query) {
                $query->select(
                    'version_id',
                    'content',
                    'type',
                    'subject',
                    'message',
                    'qr_code_id'
                );
            }
        ])
        ->findOrFail($id, ['id', 'status', 'visibility']);

        if ($qrCode->status === 'disabled') {
            return '<h1>' .
                __('messages.warnings.disabled', ['value' => 'QR Code']) .
            '</h1>';
        }

        if ($qrCode->visibility === 'private') {
            return Inertia::render('QrCodes/AskPassword/index', [
                'qrCode' => $qrCode,
            ]);
        }

        $this->createVisit($qrCode, $request->input('visit'));

        return $this->redirectAway($qrCode);
    }

    public function redirectToPrivate(Request $request, int $id)
    {
        $request->validate([
            'password' => ['required'],
        ]);

        $qrCode = QrCode::with([
            'enabledDestination' => function ($query) {
                $query->select(
                    'version_id',
                    'content',
                    'type',
                    'subject',
                    'message',
                    'qr_code_id'
                );
            }
        ])
        ->findOrFail($id, ['id', 'password']);

        $data = $request->all();

        if (!Hash::check($data['password'], $qrCode->password)) {
            return back()->withErrors([
                'password' => __('auth.password'),
            ]);
        }

        $this->createVisit($qrCode, $request->input('visit'));

        return $this->redirectAway($qrCode);
    }
}
