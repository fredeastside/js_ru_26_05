export default {
    getInitialState() {
        return {
            openedId: null
        }
    },

    toggleOpen(id) {
      return (ev) => {
        ev.preventDefault()
        this.setState({
            openedId: (this.state.openedId !== id) ? id : null
        })
      }
    }
}
