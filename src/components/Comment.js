import React, { PropTypes } from 'react';

function Comment(props) {
    const {comment: { text, name }} = props;
    return (
        <div>{text} <b>by {name}</b></div>
    );
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
};

export default Comment;
