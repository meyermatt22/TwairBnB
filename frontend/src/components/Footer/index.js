import "./Footer.css";

export const Footer = () => {
  return (
    <div id="footer">
      <div>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/matthew-meyer-59138588/"
        >
          <img className="mattlink" src="https://i.imgur.com/TNBNGjd.png"></img>
        </a>
      </div>
      <div>
        <a
          target="_blank"
          href="https://github.com/meyermatt22"
        >
          <img className="mattlink" src="https://i.imgur.com/3crBXlp.png"></img>
        </a>
      </div>
      <div>
        <a
          target="_blank"
          href="https://meyermatt22.github.io/"
        >
          <img className="mattlink" src="https://i.imgur.com/fTF4Qbr.png"></img>
        </a>
      </div>
    </div>
  );
};
