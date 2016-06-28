export function getRelation(state, entity, relation) {
    const relStore = state[relation]
    if (!entity.get(relation) || !relStore) return []

    return entity.get(relation).map(id => relStore.getIn(['entities', id.toString()]))
}


export function fromArray(array) {
    return array.reduce((acc, item) => {
        return {...acc, [item.id]: item}
    }, {})
}

export function toArray(object) {
    return Object.keys(object).map(id => object[id])
}