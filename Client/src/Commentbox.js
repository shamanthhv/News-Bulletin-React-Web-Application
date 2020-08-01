import React from 'react';
import commentBox from 'commentbox.io';

class Commentbox extends React.Component {

    componentDidMount() {

        this.removeCommentBox = commentBox('5737928919613440-proj');
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {

        return (
            <div id={this.props.articleid} className="commentbox" style={{margin:'17px 17px'}}/>
        );
    }
}
export default Commentbox