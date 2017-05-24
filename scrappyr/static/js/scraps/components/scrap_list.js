import React from 'react';

import Scrap from './scrap'


class ScrapList extends React.Component {
  render() {
    const { scraps } = this.props;
    return (
      <section>
        {scraps.map((scrapItem, i) => this._renderScrap(scrapItem, i))}
      </section>
    );
  }

  _renderScrap(scrap, i) {
    return (
      <Scrap scrap={scrap} key={i} i={i} {...this.props} />
    );
  }
}

export default ScrapList;
