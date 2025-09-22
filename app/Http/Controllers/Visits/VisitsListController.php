<?php

namespace App\Http\Controllers\Visits;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\QrCode;
use App\Models\Visit;

class VisitsListController extends Controller
{
    public function __invoke(Request $request, int $id)
    {
        $request->validate([
            'versionId' => ['nullable', 'exists:destinations,version_id'],
            'year' => ['nullable', 'integer'],
            'month' => ['nullable', 'integer', 'between:1,12'],
        ]);

        $qrCode = QrCode::query()
            ->with([
                'enabledDestination' => function ($query) {
                    $query->select('qr_code_id', 'version_id');
                },
            ])

            ->findOrFail($id, ['id']);

        $destinations = Destination::query()
            ->select('version_id', 'content')
            ->where('qr_code_id', $qrCode->id)

            ->whereIn('id', function ($query) use ($qrCode) {
                $query->selectRaw('MIN(id)')
                    ->where('qr_code_id', $qrCode->id)
                    ->groupBy('version_id');
            })

            ->orderBy('id', 'asc')
            ->groupBy('version_id', 'content')
            ->get();

        return Inertia::render('QrCodes/Visits/index', [
            'qrCode' => $qrCode,
            'destinations' => $destinations,

            'page' => Visit::query()
                ->selectRaw('DATE(created_at) AS date, COUNT(*) AS total')

                ->when(
                    $request->input('versionId'),

                    function ($query, $versionId) {
                        $query->where('version_id', $versionId);
                    },

                    function ($query) use ($qrCode) {
                        $query->where(
                            'version_id',
                            $qrCode->enabledDestination->version_id
                        );
                    }
                )

                ->when(
                    $request->input('year'),

                    function ($query, $year) {
                        $query->whereYear('created_at', $year);
                    },

                    function ($query) {
                        $query->whereYear('created_at', date('Y'));
                    }
                )

                ->when(
                    $request->input('month'),

                    function ($query, $month) {
                        $query->whereMonth('created_at', $month);
                    },

                    function ($query) {
                        $query->whereMonth('created_at', date('m'));
                    }
                )

                ->groupBy('date')
                ->orderBy('date', 'desc')
                ->paginate(31)
                ->withQueryString(),

            'filters' => $request->input(),
        ]);
    }
}
