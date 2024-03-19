import StyledLogo from "../styled/Logo";

interface Props {
  disableNav?: boolean;
}

const Logo = ({ disableNav = false }: Props) => {
  return (
    <StyledLogo to={"/"} disableNav={disableNav}>
      React<span>WOOC</span>
    </StyledLogo>
  );
};

export default Logo;
