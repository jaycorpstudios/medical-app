import React from 'react';
import { linkTo } from '@storybook/addon-links';

export default {
  title: 'Welcome',
  component: Welcome,
};

const Welcome = () => (
  <main>
    <h1>welcome to Sheika Components</h1>
    <p>Start with the <strong onClick={linkTo('Alert')}>alert component</strong></p>
  </main>
)

export const ToStorybook = () => <Welcome/>;

ToStorybook.story = {
  name: 'to Storybook',
};
