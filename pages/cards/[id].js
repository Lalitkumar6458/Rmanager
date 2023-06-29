import styles from "../../styles/Card.module.css";
import React, { useState } from "react";

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");
  const data = await res.json();

  const paths = data.map((card) => {
    return {
      params: { id: card.id.toString() }
    };
  });
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("https://jsonplaceholder.typicode.com/photos/" + id);
  const res2 = await fetch(
    "https://jsonplaceholder.typicode.com/comments?_limit=5"
  );
  const data = await res.json();
  const json = await res2.json();

  return {
    props: { card: data, comments: json }
  };
};

const Details = ({ card, comments }) => {
  const [status, setStatus] = useState(false);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.infoField}>
            <img
              src={card.thumbnailUrl}
              className={styles.image}
              alt={card.title}
            />
            <div className={styles.description}>
              <h1>Card</h1>
              <h2>{card.title}</h2>
              <hr className={styles.line}></hr>
              <p>
                Nulla facilisi cras fermentum odio eu feugiat pretium nibh
                ipsum. Dignissim cras tincidunt lobortis feugiat vivamus at
                augue eget. Posuere lorem ipsum dolor sit amet. Integer quis
                auctor elit sed vulputate mi sit amet. Diam maecenas sed enim ut
                sem viverra aliquet. Pulvinar neque laoreet suspendisse interdum
                consectetur libero id. Ac orci phasellus egestas tellus rutrum
                tellus. Fermentum posuere urna nec tincidunt. Morbi tristique
                senectus et netus et malesuada fames ac turpis. Dolor purus non
                enim praesent elementum facilisis. Id eu nisl nunc mi ipsum
                faucibus vitae aliquet. Urna nunc id cursus metus aliquam
                eleifend mi in.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.commentsSection}>
          <div
            onClick={(e) => setStatus(!status)}
            className={styles.commentDropdown}
          >
            <h3>Comments</h3>{" "}
            {status ? (
              <i className="fas fa-caret-up"></i>
            ) : (
              <i className="fas fa-caret-down"></i>
            )}
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Details;
