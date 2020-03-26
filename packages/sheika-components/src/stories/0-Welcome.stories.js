import React from 'react';
import { linkTo } from '@storybook/addon-links';
import styles from '../styles/welcome.stories.module.scss';

export default {
  title: 'Welcome',
  component: Welcome,
};

const Welcome = () => (
  <main className={styles.container}>
    <h1>Welcome to Sheika Components</h1>
    <info>A Jaycorpstudios module</info>
    <p>To start take a look at the <strong onClick={linkTo('Alert')}>alert component</strong></p>
  </main>
)

export const ToStorybook = () => <Welcome/>;

ToStorybook.story = {
  name: 'to Storybook',
};
