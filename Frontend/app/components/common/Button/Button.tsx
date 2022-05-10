import Typography from '@theme/Typography';
import { ButtonProps } from './Button.props';
import { ButtonContainer, IconLayOut } from './Button.styled';

const Button: React.FC<ButtonProps> = ({ icon, onPress, title, variant = 'primary' }) => (
  <ButtonContainer onPress={onPress} variant={variant}>
    <IconLayOut>{icon}</IconLayOut>
    <Typography weight="regular" color={variant === 'transparent' ? 'primary' : 'light'}>
      {title}
    </Typography>
  </ButtonContainer>
);

export default Button;
