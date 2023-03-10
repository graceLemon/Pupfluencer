import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Delete = ({gray}) => {
  return (
    <>
      {gray ? (
        <Svg width="16" height="18" viewBox="0 0 16 18" fill="none">
          <Path
            d="M2.525 18C2.125 18 1.775 17.85 1.475 17.55C1.175 17.25 1.025 16.9 1.025 16.5V2.25H0.75C0.5375 2.25 0.359375 2.17771 0.215625 2.03313C0.071875 1.88853 0 1.70936 0 1.49563C0 1.28188 0.071875 1.10417 0.215625 0.9625C0.359375 0.820833 0.5375 0.75 0.75 0.75H4.7C4.7 0.533333 4.77187 0.354167 4.91563 0.2125C5.05938 0.0708333 5.2375 0 5.45 0H10.55C10.7625 0 10.9406 0.071875 11.0844 0.215625C11.2281 0.359375 11.3 0.5375 11.3 0.75H15.25C15.4625 0.75 15.6406 0.822292 15.7844 0.966875C15.9281 1.11148 16 1.29064 16 1.50437C16 1.71812 15.9281 1.89583 15.7844 2.0375C15.6406 2.17917 15.4625 2.25 15.25 2.25H14.975V16.5C14.975 16.9 14.825 17.25 14.525 17.55C14.225 17.85 13.875 18 13.475 18H2.525ZM2.525 2.25V16.5H13.475V2.25H2.525ZM5.175 13.6C5.175 13.8125 5.24729 13.9906 5.39187 14.1344C5.53647 14.2781 5.71564 14.35 5.92937 14.35C6.14312 14.35 6.32083 14.2781 6.4625 14.1344C6.60417 13.9906 6.675 13.8125 6.675 13.6V5.125C6.675 4.9125 6.60271 4.73438 6.45813 4.59063C6.31353 4.44688 6.13436 4.375 5.92063 4.375C5.70688 4.375 5.52917 4.44688 5.3875 4.59063C5.24583 4.73438 5.175 4.9125 5.175 5.125V13.6ZM9.325 13.6C9.325 13.8125 9.39729 13.9906 9.54187 14.1344C9.68647 14.2781 9.86564 14.35 10.0794 14.35C10.2931 14.35 10.4708 14.2781 10.6125 14.1344C10.7542 13.9906 10.825 13.8125 10.825 13.6V5.125C10.825 4.9125 10.7527 4.73438 10.6081 4.59063C10.4635 4.44688 10.2844 4.375 10.0706 4.375C9.85688 4.375 9.67917 4.44688 9.5375 4.59063C9.39583 4.73438 9.325 4.9125 9.325 5.125V13.6Z"
            fill="#C8C8C8"
            fill-opacity="0.5"
          />
        </Svg>
      ) : (
        <Svg width="16" height="18" viewBox="0 0 16 18" fill="none">
          <Path
            d="M2.525 18C2.125 18 1.775 17.85 1.475 17.55C1.175 17.25 1.025 16.9 1.025 16.5V2.25H0.75C0.5375 2.25 0.359375 2.17771 0.215625 2.03313C0.071875 1.88853 0 1.70936 0 1.49563C0 1.28188 0.071875 1.10417 0.215625 0.9625C0.359375 0.820833 0.5375 0.75 0.75 0.75H4.7C4.7 0.533333 4.77187 0.354167 4.91563 0.2125C5.05938 0.0708333 5.2375 0 5.45 0H10.55C10.7625 0 10.9406 0.071875 11.0844 0.215625C11.2281 0.359375 11.3 0.5375 11.3 0.75H15.25C15.4625 0.75 15.6406 0.822292 15.7844 0.966875C15.9281 1.11148 16 1.29064 16 1.50437C16 1.71812 15.9281 1.89583 15.7844 2.0375C15.6406 2.17917 15.4625 2.25 15.25 2.25H14.975V16.5C14.975 16.9 14.825 17.25 14.525 17.55C14.225 17.85 13.875 18 13.475 18H2.525ZM2.525 2.25V16.5H13.475V2.25H2.525ZM5.175 13.6C5.175 13.8125 5.24729 13.9906 5.39187 14.1344C5.53647 14.2781 5.71564 14.35 5.92937 14.35C6.14312 14.35 6.32083 14.2781 6.4625 14.1344C6.60417 13.9906 6.675 13.8125 6.675 13.6V5.125C6.675 4.9125 6.60271 4.73438 6.45813 4.59063C6.31353 4.44688 6.13436 4.375 5.92063 4.375C5.70688 4.375 5.52917 4.44688 5.3875 4.59063C5.24583 4.73438 5.175 4.9125 5.175 5.125V13.6ZM9.325 13.6C9.325 13.8125 9.39729 13.9906 9.54187 14.1344C9.68647 14.2781 9.86564 14.35 10.0794 14.35C10.2931 14.35 10.4708 14.2781 10.6125 14.1344C10.7542 13.9906 10.825 13.8125 10.825 13.6V5.125C10.825 4.9125 10.7527 4.73438 10.6081 4.59063C10.4635 4.44688 10.2844 4.375 10.0706 4.375C9.85688 4.375 9.67917 4.44688 9.5375 4.59063C9.39583 4.73438 9.325 4.9125 9.325 5.125V13.6Z"
            fill="#939393"
            fill-opacity="0.5"
          />
        </Svg>
      )}
    </>
  );
};

export default Delete;
