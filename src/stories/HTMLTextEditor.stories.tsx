import React from 'react';

import { HTMLTextEditor, HTMLTextEditorProps } from '../components/HTMLTextEditor';
import { ComponentMeta, ComponentStory  } from "@storybook/react"

export default {
  component: HTMLTextEditor,
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['light', 'dark']
      }
    },
    primaryKey: {
      control: {
        type: 'color'
      }
    },
    secondaryKey: {
      control: {
        type: 'color'
      }
    },
    square: {
      control: {
        type: 'boolean'
      }
    },
    center: {
      control: {
        type: 'boolean'
      }
    },
    placeholder: {
      control: {
        type: 'text'
      }
    },
    bold: {
      control: {
        type: 'boolean'
      }
    },
    italic: {
      control: {
        type: 'boolean'
      }
    },
    underline: {
      control: {
        type: 'boolean'
      }
    },
    link: {
      control: {
        type: 'boolean'
      }
    },
    orderedList: {
      control: {
        type: 'boolean'
      }
    },
    unorderedList: {
      control: {
        type: 'boolean'
      }
    },
    undo: {
      control: {
        type: 'boolean'
      }
    },
    redo: {
      control: {
        type: 'boolean'
      }
    },
    onChange: {
      action: 'onChange'
    }
  }
} as ComponentMeta<typeof HTMLTextEditor>;

const Template: ComponentStory<typeof HTMLTextEditor> = (args: HTMLTextEditorProps) => <HTMLTextEditor {...args} />;

const defaultArgs: HTMLTextEditorProps = {
  mode: 'light',
  primaryKey: '#4c8bf5',
  secondaryKey: '#4c8bf5',
  square: false,
  center: false,
  placeholder: 'Type something...',
  bold: true,
  italic: true,
  underline: true,
  link: true,
  undo: true,
  redo: true,
  orderedList: true,
  unorderedList: true
}

export const Default = Template.bind({});
Default.args = defaultArgs;

export const Square = Template.bind({});
Square.args = {
  ...defaultArgs,
  square: true
};

export const Dark = Template.bind({});
Dark.args = {
  ...defaultArgs,
  mode: 'dark'
};

export const Center = Template.bind({});
Center.args = {
  ...defaultArgs,
  center: true
};

