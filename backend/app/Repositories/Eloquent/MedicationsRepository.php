<?php

namespace App\Repositories\Eloquent;

use App\Models\Medications;
use App\Models\Users;
use App\Models\Medication_fills;

use App\Repositories\MedicationsRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class MedicationsRepository extends BaseRepository implements MedicationsRepositoryInterface
{
    public function __construct(Medications $model)
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

        $query->with('medication_owner');
        $query->with('medication_fills');

        if (isset($params['filter'])) {
            $filter = $params['filter'];

            if (isset($filter['medication_name'])) {
                $query->where('medication_name', 'like', '%'.$filter['medication_name'].'%');
            }

            if (isset($filter['quantityRange'])) {
                [$start, $end] = $filter['quantityRange'];

                if (!empty($start)) {
                    $query->where('quantity', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('quantity', '<=', $end);
                }
            }

            if (isset($filter['days_supplyRange'])) {
                [$start, $end] = $filter['days_supplyRange'];

                if (!empty($start)) {
                    $query->where('days_supply', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('days_supply', '<=', $end);
                }
            }

            if (isset($filter['days_before_refillRange'])) {
                [$start, $end] = $filter['days_before_refillRange'];

                if (!empty($start)) {
                    $query->where('days_before_refill', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('days_before_refill', '<=', $end);
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
            $medications = Medications::create([
                    'medication_name' => $attributes['medication_name'] ?? null
,
                    'quantity' => $attributes['quantity'] ?? null
,
                    'days_supply' => $attributes['days_supply'] ?? null
,
                    'days_before_refill' => $attributes['days_before_refill'] ?? null
,
                    'medication_fills' => $attributes['medication_fills'] ?? null
,
                    'created_by_user' => $currentUser->id
                ]);

            $medication_owner = Users::find($attributes['medication_owner']);
            $medications->medication_owner()->sync($medication_owner);

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
            $medications = Medications::find($id);
            $medications->update([
                    'medication_name' => $attributes['medication_name'] ?? null
,
                    'quantity' => $attributes['quantity'] ?? null
,
                    'days_supply' => $attributes['days_supply'] ?? null
,
                    'days_before_refill' => $attributes['days_before_refill'] ?? null
,
                    'medication_fills' => $attributes['medication_fills'] ?? null
,
                    'updated_by_user' => $currentUser->id
                ]);

            $medication_owner = Users::find($attributes['medication_owner']);
            $medications->medication_owner()->sync($medication_owner);

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
            ->with('medication_owner')
            ->with('medication_fills')
            ->where('id', $id);

        return $query->get()[0];
    }

    public function findAllAutocomplete(array $params)
    {
        $query = $this->model->newModelQuery();

        $query->select('*', 'medication_owner as label');

        if (isset($params['query'])) {
            $query->where('medication_owner', 'like', '%'.$params['query'].'%');
        }

        if (isset($params['limit'])) {
            $query->limit($params['limit']);
        }

        $query->orderBy('medication_owner', 'ASC');

        return $query->get()
            ->map(fn($item) => ['id' => $item->id, 'label' => $item->label]);
    }
}

