<?php

namespace App\Repositories\Eloquent;

use App\Models\Medication_fills;
use App\Models\Medications;

use App\Repositories\Medication_fillsRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class Medication_fillsRepository extends BaseRepository implements Medication_fillsRepositoryInterface
{
    public function __construct(Medication_fills $model)
    {
        parent::__construct($model);
    }

    public function findAll($params) : array
    {
        $limit = 0;
        $offset = 0;
        $orderBy = null;

        $query = $this->model->newModelQuery();
        //$query->select("*", "product as prod_id");

        $query->with('medication_id');

        if (isset($params['filter'])) {
            $filter = $params['filter'];

            if (isset($filter['fill_dateRange'])) {
                [$start, $end] = $filter['fill_dateRange'];

                if (!empty($start)) {
                    $query->where('fill_date', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('fill_date', '<=', $end);
                }
            }

            if (isset($filter['next_fill_dateRange'])) {
                [$start, $end] = $filter['next_fill_dateRange'];

                if (!empty($start)) {
                    $query->where('next_fill_date', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('next_fill_date', '<=', $end);
                }
            }

            if (isset($filter['active'])) {
                $query->where('active', $params['active']);
            }

            if (isset($filter['createdAtRange'])) {
                [$start, $end] = $filter['createdAtRange'];

                if (!empty($start)) {
                    $query->where('created_at', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('created_at', '<=', $end);
                }
            }
        }

        if ($limit) {
            $query->limit($limit);
        }

        $rows = $query->get();

        return [
            'rows' => $rows->toArray(),
            'count' => $rows->count(),
        ];
    }

    public function create(array $attributes, $currentUser)
    {
        try {
            $attributes = $attributes['data'];
            DB::beginTransaction();
            $attributes['created_by_user'] = $currentUser->id;
            $medication_fills = Medication_fills::create([
                    'fill_date' => $attributes['fill_date'] ?? null
,
                    'next_fill_date' => $attributes['next_fill_date'] ?? null
,
                    'fill_completed' => $attributes['fill_completed'] ?? false

,
                    'created_by_user' => $currentUser->id
                ]);

            $medication_id = Medications::find($attributes['medication_id']);
            $medication_fills->medication_id()->sync($medication_id);

            DB::commit();

            return [];
        } catch (Exception $exception) {
            DB::rollback();
        }
    }

    public function update($id, array $attributes, $currentUser)
    {
        try {
            $attributes = $attributes['data'];
            DB::beginTransaction();
            $medication_fills = Medication_fills::find($id);
            $medication_fills->update([
                    'fill_date' => $attributes['fill_date'] ?? null
,
                    'next_fill_date' => $attributes['next_fill_date'] ?? null
,
                    'fill_completed' => $attributes['fill_completed'] ?? false

,
                    'updated_by_user' => $currentUser->id
                ]);

            $medication_id = Medications::find($attributes['medication_id']);
            $medication_fills->medication_id()->sync($medication_id);

            DB::commit();

            return [];
        } catch (Exception $exception) {
            DB::rollback();
        }
    }

    public function destroy($id)
    {
        return $this->model->destroy($id);
    }

    public function findById($id)
    {
        $query = $this->model->newModelQuery();

        $query
            ->with('medication_id')
            ->where('id', $id);

        return $query->get()[0];
    }

    public function findAllAutocomplete(array $params)
    {
        $query = $this->model->newModelQuery();

        $query->select('*', 'medication_id as label');

        if (isset($params['query'])) {
            $query->where('medication_id', 'like', '%'.$params['query'].'%');
        }

        if (isset($params['limit'])) {
            $query->limit($params['limit']);
        }

        $query->orderBy('medication_id', 'ASC');

        return $query->get()
            ->map(fn($item) => ['id' => $item->id, 'label' => $item->label]);
    }
}

