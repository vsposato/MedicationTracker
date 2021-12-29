const medicationsFields = {
  id: { type: 'id', label: 'ID' },

  medication_owner: { type: 'relation_many', label: 'Owner' },

  medication_name: { type: 'string', label: 'Medication Name' },

  quantity: { type: 'int', label: 'Quantity' },

  days_supply: { type: 'int', label: 'Days Supply' },

  days_before_refill: { type: 'int', label: 'Days Before Refill' },

  medication_fills: { type: 'relation_one', label: 'Medication Fills' },
};

export default medicationsFields;
