import React, { PropTypes } from 'react'

function Comment(props) {
    const { comment } = props
    return (
        <div>{comment.get('text')} <b>by {comment.get('user')}</b></div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}

export default Comment