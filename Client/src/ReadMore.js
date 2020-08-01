import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import {Link, animateScroll} from 'react-scroll'
class ReadMore extends Component {
    constructor() {
        super();
 
        this.state = {
            expanded: false,
            truncated: false
        };
 
        this.handleTruncate = this.handleTruncate.bind(this);
        this.toggleLines = this.toggleLines.bind(this);
    }
 
    handleTruncate(truncated) {
        if (this.state.truncated !== truncated) {
            this.setState({
                truncated
            });
        }
    }
 
    toggleLines(event) {
        event.preventDefault();
        this.setState({
            expanded: !this.state.expanded
        });
        animateScroll.scrollToTop()
    }
 
    render() {
        const {
            children,
            more,
            less,
            lines 
        } = this.props;
 
        const {
            expanded,
            truncated 
        } = this.state;
 
        return (
            <span>
                <section id="less">
                    <Truncate
                        lines={!expanded && lines}
                        ellipsis={(
                            <span>... <Link to="more" smooth={true} duration={1500}><span onClick={this.toggleLines} style={{display:'block',fontWeight:'bold',fontSize:'40px',textAlign:'justify',cursor: "pointer"}}><GoChevronDown style={{float:'right'}}/></span></Link></span>
                        )}
                        onTruncate={this.handleTruncate}
                    >
                        {this.props.text}
                    </Truncate>
                </section>
                <section id="more">
                
                    {!truncated && expanded && (
                        <span><span onClick={this.toggleLines} style={{display:'block',fontWeight:'bold',fontSize:'40px',textAlign:'justify',cursor: "pointer"}}><GoChevronUp style={{float:'right'}}/></span></span>
                    )}
                </section>
            </span>
        );
    }
}
 
ReadMore.defaultProps = {
    lines: 6,
};
 
ReadMore.propTypes = {
    lines: PropTypes.number,
};
 
export default ReadMore;