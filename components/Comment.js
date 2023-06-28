import styles from "../styles/Comment.module.css";

const Card = ({ comment }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.commentContent}>
        <div className={styles.imageWrap}>
          <img
            alt="avatar"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAEx0lEQVR4Xu2Xf0zUZRzH3ydOIgJjOlwOKtPQURqj+gOHySgdmqaJNQg8AZGCMyjK64QCFG8hNFTkMAgP5AbcCLPNUkNGthystljhckJrYa1Yy0h+3g+Ou/b9bnfjzjvuPsbXP9rn+++9vs/zeV73fj7P85X1GnQ28OOTARnL8smTCLEs312xLIIrlsWyKAYILPcslkUwQEA5WSyLYICAcrJYFsEAAeVksSyCAQLKyWJZBAMElJPFsggGCCgni2URDBBQThbLIhggoJwslkUwQEA5WSyLYICAcrJYFsEAAeVkzaWswYEhqHZVY6DvV7fDRqx5EGW6fXg44gGYjVOoVLWgrbbzNja7KBF7D2wnlOYdvdu1eU3W33+O4IuPe2A2WZyqnxw3oqP9GyyPDMO7mgyELA7CyPA4CtJqELI4GCseC3PiBW7dpijvBgjE3a7Nqyx3tdtsNlzQd0N/8hIO1mVh2aqlIjbY/weUqdVQHZUjOnYVYdlzh0pZ2x3J+unqb1DJq7FH+QI2Ja2FTCYTV9t75TrK39I5tqWvCq71/oL9yVVIzIxHWv7zmOc3D8KiWzUdaD5xEerGbETFRPg03FzXNnNSsiyTwYwPlM0YHR5HoSYDwfcHOsb7rPkKLrb1YJv8GTF1A303sHbDGqTv34qVTzzkkOq6auu0FbqqC2j7sBMVrbmIjF4Gu8CU1xOQrNjo8d2ZY0lR23+S9e2XP6Jgdw1Kta8h5rnVjrGEBdccbIe24hwSXo4RE2cymnG24TIG+4dwqP5VPLnO89b85+YYDiu0CAy6BznFO3FU1QL/gAV4p1KOwOAAn1IlVW32yUnJEpr88cJW3By6dVuqDBMmaEraYbFYkHc4CQGB/uIcYyOTKM9vwuS4CcW1mU5JdDXwfc8ASrI+QujSEIzemsD7pxWOfujNltS1CfOTZP187XcoU6qwK28ztqet91a/4/fz+m7Uqc+ioiUXj64O9/iekM7Gys9RXdSGkrosbE2N9Wn7CQNKXRtZ1qeNX0F/ssNjA7dabbBZrfCb7+ckRGj8mRvU0Ha9N2ujnhg14Eh+E4TetyUllrQFpa6NJMt+4ZyetuLt8hSxn8x87BfEl/Y+K55qM58z9V34RHsZZToFwpcvcZss4fQT+ptw+snf2IymY+chNPcX0+O8pkvq2sg9S2jABbs1iE2IEhfh+gg968ibp8VeU1idgUWhC0VEuDgeyq5H2COhyFMnY4H/fLey7Ed+4p54JOVshL6mA2dOdaGsad+sW1cYTOrayLLsF05F8U6s3xLtdsHffX0dRZm1WPF4OHakx2FqyiJeB4wGs9Pl1fVl+/abGDM6vgaG/xpFac4pBC281+t2lLK2O7o6CCdVRnzprH1H2Er9P9xAQ8U5dF/qQ3DIfYjf9hRScxOwJGyRx+0nfA0cK9BD3ZCNp+MiHVxP51UoX6nCgeNpTpdfd6eoFLW5zkM6DX0+/v6nIMsi/LEsi2URDBBQThbLIhggoJwslkUwQEA5WSyLYICAcrJYFsEAAeVksSyCAQLKyWJZBAMElJPFsggGCCgni2URDBBQThbLIhggoJwslkUwQEA5WSyLYICAcrJYFsEAAeVksSyCAQLKyWJZBAMElJNFkPUvmZNppuqaCWIAAAAASUVORK5CYII="
          />
        </div>
        <div className={styles.commentHead}>
          <p>{comment.email}</p>
          <h4>{comment.name}</h4>
        </div>
      </div>
      <div className={styles.commentBody}>
        <p>{comment.body}</p>
      </div>
    </div>
  );
};

export default Card;
