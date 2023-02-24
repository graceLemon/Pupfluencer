import React from 'react';
import Svg, {Path} from 'react-native-svg';

const MailDm = () => {
  return (
    <Svg width="20" height="16" viewBox="0 0 20 16" fill="none">
      <Path
        d="M1.5 16C1.1 16 0.75 15.85 0.45 15.55C0.15 15.25 0 14.9 0 14.5V1.5C0 1.1 0.15 0.75 0.45 0.45C0.75 0.15 1.1 0 1.5 0H18.5C18.9 0 19.25 0.15 19.55 0.45C19.85 0.75 20 1.1 20 1.5V14.5C20 14.9 19.85 15.25 19.55 15.55C19.25 15.85 18.9 16 18.5 16H1.5ZM10 8.45L1.5 2.875V14.5H18.5V2.875L10 8.45ZM10 6.95L18.4 1.5H1.625L10 6.95ZM1.5 2.875V1.5V14.5V2.875Z"
        fill="#F09090"
      />
    </Svg>
  );
};

export default MailDm;
