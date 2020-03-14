import React from 'react';
import Alert from '../components/Alert';
import { withKnobs, select, text, boolean, number } from "@storybook/addon-knobs";


export default {
  title: 'Alert',
  decorators: [withKnobs],
  component: Alert
};

const valuesObj = {
  success: 'success',
  info: 'info'
}

// TODO: Update highligth font-weigth
export const Basic = () => (
  <Alert
    type={select('type', valuesObj, 'info')}
    text={text('text', 'We have news for you')}
    highlight={text('highlight', '')}
  />
);

export const Success = () => (
  <Alert
    type="success"
    text={text('text', 'We have news for you')}
    highlight={text('highlight', 'Success!:')}
  />
);
