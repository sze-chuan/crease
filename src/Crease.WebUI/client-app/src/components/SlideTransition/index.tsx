import React from 'react';

import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

const SlideTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<unknown, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default SlideTransition;
