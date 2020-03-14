import React from 'react';
import { action } from '@storybook/addon-actions';
import Alert from '../components/Alert';

export default {
  title: 'Alert Component',
  component: Alert
};

export const Basic = () => <Alert text='This is just the initial test, wait for it' highlight="Cool!" type="success" />;
