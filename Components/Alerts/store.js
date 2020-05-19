export const actions = {
  FIRE: 'FIRE',
  DESTROY: 'DESTROY'
}

const initialState = {
  alerts: [],
  currentId: 0
}

export const reducer = (state = initialState, action) => {
  if (action.type === actions.FIRE) {
    const alerts = [...state.alerts, { ...action.payload, id: state.currentId }]
    const currentId = state.currentId + 1
    return { alerts, currentId }
  }
  if (action.type === actions.DESTROY) {
    const alerts = state.alerts.filter(item => item.id !== action.id)
    return { alerts, currentId: state.currentId }
  }
  return state
}
