import { addParameters } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import centered from '@storybook/addon-centered/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import './globals.scss';

addDecorator(withInfo); 
addDecorator(centered);

addParameters({
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  });