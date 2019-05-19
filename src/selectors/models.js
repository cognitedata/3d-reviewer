export const selectComments = (state, nodeId) => state.model.comments[nodeId] || { items: [], loading: false }
