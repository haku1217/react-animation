import React from "react";
import { Form, Formik, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useTransition, animated } from "react-spring";
import "./style.css";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },

  title: {
    fontSize: 14,
    textAlign: "center"
  },
  pos: {
    marginBottom: 12,
    textAlign: "center"
  },
  // なんかうまく機能しない、、、
  simpleTranceMain: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    fontSize: "25em",
    marginTop: "100px"
  }
});
const questions = [
  { num: "Q1", text: "こんにちは" },
  { num: "Q2", text: "Hello" },
  { num: "Q3", text: "こんばんは" },
  { num: "Q4", text: "おやすみ" }
];

const App = () => {
  const [index, set] = React.useState(0);
  const [rb, setRb] = React.useState(false);
  const questionLen = questions.length;
  const onClick = React.useCallback(() => {
    set(state =>
      state === questionLen - 1 ? state : (state + 1) % questionLen
    );
    setRb(false);
  }, []);
  const onClickBack = React.useCallback(() => {
    set(state => (state === 0 ? 0 : (state - 1) % questionLen));
    setRb(true);
  }, []);
  const transitions = useTransition(index, p => p, {
    from: {
      opacity: 0,
      transform: rb ? "translate3d(-100%,0,0)" : "translate3d(100%,0,0)"
    },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: {
      opacity: 0,
      transform: rb ? "translate3d(50%,0,0)" : "translate3d(-50%,0,0)"
    }
  });
  const initialValues = {
    userName: "test"
  };

  const [ans, setAns] = React.useState([])
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          // Submit した時の記述
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        <Form>
          <div className="simple-trans-main">
            {transitions.map(({ item, props, key }) => {
              const question = questions[item];
              return (
                <div key={key}>
                  <Cards
                    style={props}
                    question={question}
                    onClick={onClick}
                    onClickBack={onClickBack}
                    questionLen={questionLen}
                  />
                </div>
              );
            })}
          </div>
        </Form>
      </Formik>
    </>
  );
};
const Cards = ({
  style,
  question,
  onClick,
  onClickBack,
  questionLen
}: any) => {
  const classes = useStyles();
  return (
    <>
      <animated.div style={{ ...style }}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {question.num}/{questionLen}
            </Typography>
            <Typography>{question.text}</Typography>
            <Field type="text" name="userName" placeholder="名前" />
          </CardContent>
          <CardActions className={classes.pos}>
            <Button size="small" onClick={onClickBack}>
              前へ
            </Button>
            <Button size="small" onClick={onClick}>
              次へ
            </Button>
          </CardActions>
        </Card>
      </animated.div>
    </>
  );
};

export default App;
