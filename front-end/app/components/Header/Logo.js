/**
 *
 * Logo
 *
 */
import styled from 'styled-components';

const Logo = styled.h1`
  line-height: 60px;
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin: 0;
  padding: 0;
  padding-left: 80px;
  background: linear-gradient(
    to right,
    #ccc 60px,
    transparent 60px,
    transparent 100%
  );
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

export default Logo;
