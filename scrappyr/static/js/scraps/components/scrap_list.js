import React from 'react';

import Scrap from './scrap'


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

export default ScrapList;
