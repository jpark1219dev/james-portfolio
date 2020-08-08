// Create our initial value...
import { Value } from 'slate';

export const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'heading-one',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'Title... ',
              },
            ],
          },
        ],
			},
			{
        object: 'block',
        type: 'heading-two',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'Subtitle... ',
              },
            ],
          },
        ],
			},
			{
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'Write your story... ',
              },
            ],
          },
        ],
      },
    ],
  },
});
