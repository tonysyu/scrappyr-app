import React from 'react';
import { render } from 'react-dom';


initializeComponent();

async function initializeComponent() {
    const response = await fetch('/api/scraps');
    const scraps = await response.json();
    console.log(scraps);
    render(<p>Hi</p>, document.getElementById('react'))
}
