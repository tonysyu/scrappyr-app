import React from 'react';

import Scrap from './scrap';
import { compareDateStrings } from '../../utils/data_utils';


class ScrapList extends React.Component {
  render() {
    const { scraps } = this.props;

    // Technically this violates redux, since this sorts in-place and mutates data.
    scraps.sort((a, b) => compareDateStrings(a.modified, b.modified));

    return (
      <div className="container">
        <div className="row">
          {scraps.map((scrapItem, index) => this._renderScrap(scrapItem, index))}
        </div>
      </div>
    );
  }

  _renderScrap(scrap, index) {
    return (
      <Scrap scrap={scrap} key={index} index={index} {...this.props} />
    );
  }
}

export default ScrapList;
