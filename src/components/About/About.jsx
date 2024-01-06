import './About.css'
import Logo from '../../assets/logo2';
const About = () => {
  return (
    <main className="About">
      <h2>About</h2>
      <p style={{ marginTop: "1rem" }}>
        BlogGrame gives you a better way to express your exprience, knowledge or anything in your mind
      </p>
      <Logo/>
    </main>
  );
};

export default About;
