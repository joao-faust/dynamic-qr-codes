<?php

namespace App\Http\Controllers\QrCodes;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Http\Controllers\Controller;
use App\Models\QrCode;

class QrCodeListController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'nameFilter' => ['nullable'],
            'statusFilter' => ['nullable', 'in:enabled,disabled'],
            'visibilityFilter' => ['nullable', 'in:public,private'],
            'contentTypeFilter'=> ['nullable', 'in:text,url,email,phone,whatsapp'],
        ]);

        return Inertia::render('QrCodes/List/index', [
            'page' => QrCode::query()
                ->select(
                    'id',
                    'filename',
                    'name',
                    'status',
                    'visibility',
                    'updated_at'
                )

                ->with([
                    'destinations' => function ($query) {
                        $query
                            ->select(
                                'qr_code_id',
                                'version_id',
                                'content'
                            )

                            ->groupBy('qr_code_id', 'version_id', 'content')
                            ->orderBy('created_at');
                    },

                    'enabledDestination' => function ($query) {
                        $query
                            ->select(
                                'qr_code_id',
                                'type',
                                'content',
                                'version_id',
                                'updated_at'
                            )

                            ->withCount('visits');
                    },
                ])

                ->when($request->input('nameFilter'), function ($query, $name) {
                    $query->where('name', 'like', "%{$name}%");
                })

                ->when($request->input('statusFilter'), function ($query, $status) {
                    $query->where('status', $status);
                })

                ->when($request->input('visibilityFilter'), function ($query, $visibility) {
                    $query->where('visibility', $visibility);
                })

                ->when($request->input('contentTypeFilter'), function ($query, $contentType) {
                    $query->whereHas(
                        'enabledDestination',

                        function ($query) use ($contentType) {
                            $query->where('type', $contentType);
                        }
                    );
                })

                ->orderBy('created_at', 'desc')

                ->paginate(20)
                ->withQueryString(),

            'filters' => $request->input(),
        ]);
    }
}
