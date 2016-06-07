export default {
    getInitialState() {
        return {
            openedItem: null
        }
    },
    openItem(id){
        return ev => {
            if (ev) ev.preventDefault()
            this.setState({
                openedItem: this.state.openedItem == id ? null : id
            })
        }
    },
    isOpen(id) {
        return id == this.state.openedItem
    }
}