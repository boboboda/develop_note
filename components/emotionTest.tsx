/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaBeer } from 'react-icons/fa'; // react-icons에서 아이콘 가져오기

const IconComponent = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background-color: #f0f0f0;
        border-radius: 10px;
      `}
    >
      <FaBeer
        css={css`
          color: #ff6347;
          font-size: 50px;
          transition: color 0.3s ease;
          &:hover {
            color: #ffa07a;
          }
        `}
      />
      <span
        css={css`
          margin-left: 10px;
          font-size: 24px;
          color: #333;
        `}
      >
        Cheers!
      </span>
    </div>
  );
};

export default IconComponent;
