<?php

namespace App\Http\Controllers\QrCodes;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Generator as QrCodeGenerator;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\QrCode;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class CreateQrCodeController extends Controller
{
    public function __invoke(Request $request, ?int $id = null)
    {
        if ($request->isMethod('get')) {
            if ($id) {
                return Inertia::render('QrCodes/Create/index', [
                    'qrCode' => QrCode::with([
                        'enabledDestination' => function ($query) {
                            $query->select(
                                'type',
                                'content',
                                'message',
                                'subject',
                                'qr_code_id'
                            );
                        }
                    ])

                    ->findOrFail($id, ['id', 'name', 'status', 'visibility'])
                ]);
            }

            return Inertia::render('QrCodes/Create/index');
        }

        $rules = [
            'contentType' => ['required', 'in:text,url,email,phone,whatsapp'],
            'visibility' => ['required', 'in:public,private'],
            'status' => ['required', 'in:enabled,disabled'],
            'name' => ['required', 'max:60'],
            'content' => ['required', 'max:255'],
        ];

        $attributes = [];
        $messages = [];

        $data = $request->all();

        switch ($data['contentType']) {
            case 'text':
                $attributes['content'] = __('validation.attributes.text');
                break;

            case 'url':
                $attributes['content'] = __('validation.attributes.url');
                $rules['content'] = 'url';

                $messages['content.url'] = __('messages.errors.invalidAndExample', [
                    'field' => 'URL',
                    'example' => 'https://url.com',
                ]);

                break;

            case 'email':
                $attributes['content'] = __('validation.attributes.email');
                $rules['content'] = 'email';
                $messages['content.email'] = __('messages.errors.invalidAndExample', [
                    'field' => 'e-mail',
                    'example' => 'email@email.com',
                ]);

                $attributes['subject'] = __('validation.attributes.subject');
                $rules['subject'] = 'nullable|max:255';

                $attributes['message'] = __('validation.attributes.body');

                break;

            case 'phone':
            case 'whatsapp':
                $attributes['content'] = __('validation.attributes.phone');
                $rules['content'] = 'regex:/^\d{10,15}$/';

                $messages['content.regex'] = __('messages.errors.invalidAndExample', [
                    'field' => __('validation.attributes.phone'),
                    'example' => '14405551234',
                ]);
                break;
        }

        $qrCode = new QrCode();
        $destination = new Destination();

        if ($data['visibility'] === 'private') {
            $rules['password'] = ['required', Password::min(8), 'confirmed'];
        }

        if ($id) {
            $qrCode = QrCode::with('enabledDestination')->findOrFail($id);

            if ($data['visibility'] === 'private' && $qrCode->visibility === 'private') {
                $rules['password'][0] = 'nullable';
            }
        }

        if ($data['contentType'] === 'whatsapp' || $data['contentType'] === 'email') {
            $rules['message'] = 'nullable|max:255';
        }

        $validator = Validator::make($data, $rules, $messages, $attributes);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $password = null;

        if ($id) {
            $enabledDestination = $qrCode->enabledDestination;

            if ($data['content'] !== $enabledDestination['content']) {
                $destination->version_id = Str::uuid();

                $enabledDestination->status = "disabled";
                $enabledDestination->save();
            } else {
                $destination = $enabledDestination;
            }

            if ($data['visibility'] === 'private') {
                if ($data['password'] && $data['password'] !== $qrCode->password) {
                    $password = Hash::make($data['password']);
                } else {
                    $password = $qrCode->password;
                }
            }
        } else {
            $uniqueId = Str::uuid();
            $qrCode->filename = $uniqueId;
            $destination->version_id = $uniqueId;

            if ($data['visibility'] === 'private') {
                $password = Hash::make($data['password']) ?? null;
            }
        }

        $qrCode->name = $data['name'];
        $qrCode->status = $data['status'];
        $qrCode->visibility = $data['visibility'];
        $qrCode->password = $password;
        $qrCode->save();

        $destination->type = $data['contentType'];
        $destination->content = $data['content'];
        $destination->subject = $data['subject'] ?? null;
        $destination->message = $data['message'] ?? null;
        $destination->qr_code_id = $destination->qr_code_id ?? $qrCode->id;
        $destination->save();

        $qrCodePath = "qrcodes/{$qrCode->filename}.png";

        if (!$id && !Storage::disk('public')->exists($qrCodePath)) {
            (new QrCodeGenerator())->format('png')
                ->size(250)
                ->generate(
                    url('') . "/qrcodes/{$qrCode->id}/destination?visit=yes",
                    storage_path("app/public/{$qrCodePath}")
                );
        }

        return redirect('/');
    }
}
