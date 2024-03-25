import PropType from 'prop-types';
import './Avatar.scss';

const Avatar = ({
  avatarSrc,
  name,
  bgColor = '#f33e58',
  textColor,
  size,
  round = true,
}) => {
  const textSizeRatio = 1.7;
  const fontSize = Math.floor(size / textSizeRatio);
  const firstNameCharacter = name?.charAt(0);

  return (
    <>
      {!avatarSrc && (
        <div
          className="avatar-container"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: `${round ? '50%' : ''}`,
            backgroundColor: `${!avatarSrc ? bgColor : ''}`,
            display: 'flex',
          }}
        >
          {name && (
            <div
              style={{
                color: `${textColor}`,
                fontSize: `${fontSize}`,
                margin: 'auto',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              {firstNameCharacter}
            </div>
          )}
        </div>
      )}

      {avatarSrc && (
        <img
          src={avatarSrc}
          alt=""
          className="avatar-content avatar-container"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: `${round ? '50%' : ''}`,
          }}
        />
      )}
    </>
  );
};

Avatar.propTypes = {
  avatarSrc: PropType.string,
  name: PropType.string,
  bgColor: PropType.string,
  textColor: PropType.string,
  size: PropType.number,
  round: PropType.bool,
};

export default Avatar;
