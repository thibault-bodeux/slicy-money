export const useAmountStore = defineStore('amount', () => {
  const devises: Ref<Amount.Devise[]> = ref([
    { value: 50000, label: { type: 'billet', value: 500, currency: 'euros' }, limit: { active: false, quantity: 5 } },
    { value: 20000, label: { type: 'billet', value: 200, currency: 'euros' }, limit: { active: false, quantity: 5 } },
    { value: 10000, label: { type: 'billet', value: 100, currency: 'euros' }, limit: { active: false, quantity: 5 } },
    { value: 5000, label: { type: 'billet', value: 50, currency: 'euros' }, limit: { active: false, quantity: 5 } },
    { value: 2000, label: { type: 'billet', value: 20, currency: 'euros' }, limit: { active: false, quantity: 5 } },
    { value: 1000, label: { type: 'billet', value: 10, currency: 'euros' }, limit: { active: false, quantity: 5 } },
    { value: 500, label: { type: 'billet', value: 5, currency: 'euros' }, limit: { active: false, quantity: 5 } },
    { value: 200, label: { type: 'piece', value: 2, currency: 'euros' }, limit: { active: false, quantity: 5 } },
    { value: 100, label: { type: 'piece', value: 1, currency: 'euro' }, limit: { active: false, quantity: 5 } },
    { value: 50, label: { type: 'piece', value: 50, currency: 'centimes' }, limit: { active: false, quantity: 5 } },
    { value: 20, label: { type: 'piece', value: 20, currency: 'centimes' }, limit: { active: false, quantity: 5 } },
    { value: 10, label: { type: 'piece', value: 10, currency: 'centimes' }, limit: { active: false, quantity: 5 } },
    { value: 5, label: { type: 'piece', value: 5, currency: 'centimes' }, limit: { active: false, quantity: 5 } },
    { value: 2, label: { type: 'piece', value: 2, currency: 'centimes' }, limit: { active: false, quantity: 5 } },
    { value: 1, label: { type: 'piece', value: 1, currency: 'centime' }, limit: { active: false, quantity: 5 } },
  ])

  const input: Ref<string> = ref('')

  const value: ComputedRef<number> = computed(() => {
    return isValid.value ? (Number(input.value) * 100) : NaN
  })

  const isValid: ComputedRef<boolean> = computed(() => {
    const regex = /^(?!0\d)\d+(\.\d{1,2})?$/
    return regex.test(input.value) && input.value !== '0'
  })

  function convertToDevise(amount: number, devise: Amount.Devise): Amount.Result {
    const limit = devise.limit.active ? devise.limit.quantity : Infinity
    const quantity = Math.min(Math.floor(amount / devise.value), limit)
    return { value: devise.value, label: devise.label, quantity, total: (quantity * devise.value) }
  }

  function convert() {
    let amountLeft = value.value
    return devises.value.reduce((acc, item) => {
      const devise = convertToDevise(amountLeft, item)
      amountLeft -= devise.total
      return [...acc, devise]
    }, [] as Amount.Result[]).filter(item => item.quantity > 0)
  }

  return { devises, input, value, isValid, convert }
})
