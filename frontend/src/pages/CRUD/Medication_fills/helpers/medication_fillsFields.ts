const medication_fillsFields = {
  id: { type: 'id', label: 'ID' },

  medication_id: { type: 'relation_many', label: 'Medication' },

  fill_date: { type: 'date', label: 'Fill Date' },

  next_fill_date: { type: 'date', label: 'Next Fill Date' },

  fill_completed: { type: 'boolean', label: 'Completed' },
};

export default medication_fillsFields;
