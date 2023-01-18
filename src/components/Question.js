import React from "react";
import { AnswerButton } from "./";
import { decodeHTML, randomizeArray } from "../lib";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guessed: false,
      guess: "",
    };

    // convert all answers into a single array, and randomize the array
    // this.answers = randomizeArray([
    //   ...props.question.incorrect_answers,
    //   props.question.correct_answer,
    // ]);
  }

  handleGuess = (answer) => {
    // set guessed to true, and set guess to the selected answer
    this.setState({ guessed: true, guess: answer });
  };

  // returns a new state object with answers, updates on category change, sets guessed state to false and guess state to empty string
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.question !== prevState.question) {
      return {
        answers: randomizeArray([
          ...nextProps.question.incorrect_answers,
          nextProps.question.correct_answer,
        ]),
        question: nextProps.question,
        guessed: false,
        guess: "",
      };
    }
    return null;
  }

  render() {
    return (
      <div className="card p-2 mb-4">
        <h3 className="fw-lighter fs-5 mb-4">{this.props.question.category}</h3>
        <h4 className="fw-light fs-5 mb-4">
          {decodeHTML(this.props.question.question)}
        </h4>

        <div>
          {this.state.answers.map((answer) => (
            <AnswerButton
              key={answer}
              answer={answer}
              handleGuess={this.handleGuess}
            />
          ))}
        </div>

        {/* Dynamically render correct/incorrect here! */}
        {this.state.guessed && (
          <div>
            {this.state.guess === this.props.question.correct_answer ? (
              <p>Correct!</p>
            ) : (
              <p>
                Incorrect! The correct answer is{" "}
                {this.props.question.correct_answer}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export { Question };
