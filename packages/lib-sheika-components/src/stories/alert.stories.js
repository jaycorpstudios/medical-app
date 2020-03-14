import React from 'react';
import { withKnobs, select, text, boolean, number } from "@storybook/addon-knobs";
import Alert from '../components/Alert';

export default {
  title: 'Alert',
  decorators: [withKnobs],
  component: Alert
};

const valuesObj = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error'
}

// TODO: Update highligth font-weigth
export const AllTypes = () => (
  <Alert
    type={select('type', valuesObj, 'info')}
    text={text('text', 'We have news for you')}
    highlight={text('highlight', 'Hey!')}
  />
);

export const Success = () => (
  <Alert
    type="success"
    text={text('text', 'Your account has been created')}
    highlight={text('highlight', 'Hurray!')}
  />
);

export const Warning = () => (
  <Alert
    type="warning"
    text={text('text', 'Your free trial is about to expire')}
    highlight={text('highlight', '')}
  />
);

export const Error = () => (
  <Alert
    type="error"
    text={text('text', 'Your account has been suspended')}
    highlight={text('highlight', 'The horror!')}
  />
);

export const Info = () => (
  <Alert
    type="info"
    text={text('text', 'Have a nice day')}
    highlight={text('highlight', '')}
  />
);
