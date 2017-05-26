import React from 'react';

import Scrap from './scrap'


class ScrapList extends React.Component {
  render() {
    const { scraps } = this.props;
    return (
      <section>
        {scraps.map((scrapItem, index) => this._renderScrap(scrapItem, index))}
      </section>
    );
  }

  _renderScrap(scrap, index) {
    return (
      <Scrap scrap={scrap} key={index} index={index} {...this.props} />
    );
  }
}

export default ScrapList;
