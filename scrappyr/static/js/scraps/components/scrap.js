import React from 'react';


class Scrap extends React.Component {
    render() {
        const { scrap } = this.props;
        return (
            <div className="scrap">
                <span className="scrap-title"
                    dangerouslySetInnerHTML={ {__html: scrap.html_title} }>
                </span>
                <button className="edit btn btn-sm btn-secondary">
                    Edit
                </button>
            </div>
        );
    }
}

export default Scrap;
