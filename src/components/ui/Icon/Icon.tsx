import React from 'react';
import ReactSVG from 'react-svg';

import { IMAGES_DIR } from '../../../config';

// Import hashed filenames of image assets to use them as 'src' attribute for images
// This is made possible by the module 'babel-plugin-import-static-files'
import imagePaths from '../../../public';
// const imagePaths: any = images;

import * as styles from './icon.css';

// Creates an inline-svg icon.
// Prop "type" should be the name of the icon file (minus extension) -- so <Icon type='check' /> will get you '/check-[hash].svg'

interface IIconProps {
  type: string;
}

const Icon: React.FunctionComponent<IIconProps> = ({ type }) => {
  return (
    <div className={styles.icon}>
      <ReactSVG src={`${IMAGES_DIR}${imagePaths[type]}`} />
    </div>
  );
};

export default Icon;
