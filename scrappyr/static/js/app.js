import React from 'react';
import { render } from 'react-dom';


initializeComponent();


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


class ScrapList extends React.Component {
    render() {
        const { scraps } = this.props;
        return (
            <section>
                {scraps.map((scrapItem, i) => <Scrap scrap={scrapItem} key={i}></Scrap>)}
            </section>
        );
    }
}

async function initializeComponent() {
    const response = await fetch('/api/scraps');
    const scraps = await response.json();
    render(<ScrapList scraps={scraps}></ScrapList>, document.getElementById('react-scrap-list'))
}
