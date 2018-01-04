import React from 'react';
import { Async } from 'react-select';
import 'react-select/dist/react-select.css';


export default class RelatedScrapbooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
    };
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
  }

  render() {
    return (
      <div className="related-scrapbooks card">
        <form ref="scrapbookForm" className="scrapbook-form"
          onSubmit={this.addToScrapBook.bind(this)}>
          <div className="form-group">
            <Async
              value={this.state.selectedOption.value}
              onChange={this.handleChange.bind(this)}
              loadOptions={getScrapbookOptions}
            />
          </div>
          <button type="submit" className="btn btn-sm btn-primary">
            Add to scrapbook
          </button>
        </form>
      </div>
    );
  }

  addToScrapBook(e) {
    e.preventDefault();
    const { scrap } = this.props.scrapEditor;
    const scrapbook_id = this.state.selectedOption.value;
    this.props.addToScrapBook(scrap, scrapbook_id);
    this.refs.scrapbookForm.reset();
  }
}

const getScrapbookOptions = (input) => {
  return fetch('/api/scrapbooks/')
    .then((response) => {
      return response.json();
    }).then((json) => {
      return { options: json.map(adaptScrapbookToOption) };
    });
};

const adaptScrapbookToOption = (scrapbook) => {
  return { value: scrapbook.id, label: scrapbook.title };
};
