import React from 'react';
import { Card, CardBlock, CardTitle, Button } from 'reactstrap';


class Scrap extends React.Component {
  render() {
    const { scrap, index } = this.props;
    return (
      <Card className="scrap col-md-4">
        <CardBlock>
          <CardTitle className="scrap-title"
            dangerouslySetInnerHTML={ {__html: scrap.html_title} }>
          </CardTitle>
          <Button className="edit btn-sm btn-secondary"
            onClick={this.props.openScrapEditor.bind(this, scrap, index)}>
            <span className="fa fa-pencil-square-o" aria-hidden="true"></span>
          </Button>
        </CardBlock>
      </Card>
    );
  }
}

export default Scrap;
