import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import Scrap from '../scrappyr/static/js/scraps/components/scrap.js'

import '../scrappyr/static/sass/project.scss'
import '../scrappyr/static/sass/scraps.scss'


storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));


const scrap_list = [
    { raw_title: "hi", html_title: "<h1>hi</h1>" },
];

storiesOf('Scrap', module)
  .add('to Storybook', () => (
      <Scrap scrap={scrap_list[0]}/>
  ));

