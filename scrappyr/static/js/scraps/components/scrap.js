import React from 'react';
import { Card, CardTitle, Button } from 'reactstrap';


class Scrap extends React.Component {
  render() {
    const { scrap, index } = this.props;
    return (
      <Card className="scrap">
        <CardTitle className="scrap-title"
          dangerouslySetInnerHTML={ {__html: scrap.html_title} }>
        </CardTitle>
        <Button className="edit btn-sm btn-secondary"
          onClick={this.props.openScrapEditor.bind(this, scrap, index)}>
          Edit
        </Button>
      </Card>
    );
  }
}

export default Scrap;
