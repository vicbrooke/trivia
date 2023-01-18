import React, { Component } from "react";
import { Question } from "./components";
import { categories } from "./lib";

let category = "";
const TRIVIA_API = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      question: null,
    };
  }

  componentDidMount() {
    fetch(TRIVIA_API)
      .then((res) => res.json())
      .then((data) => this.setState({ question: data.results }));
  }

  handleChange(e) {
    category = e.target.value;
    fetch(
      `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=easy`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ question: data.results }));
  }

  render() {
    return (
      <div className="container l:w-50 p-5">
        <h1 className="display-1">Trivia</h1>
        <h2 className="fw-lighter fs-5 mb-4">
          (we couldn't think of a better name,{" "}
          <span className="fw-bolder">sorry</span>)
        </h2>
        <hr />
        <select onChange={(e) => this.handleChange(e)}>
          <option>Select a category</option>
          {categories.map((category) => {
            return (
              <option value={category.id} key={category.id}>
                {category.value}
              </option>
            );
          })}
        </select>
        <hr />
        <div>
          {this.state.question &&
            this.state.question.map((question) => {
              return <Question question={question} key={question.id} />;
            })}
        </div>
      </div>
    );
  }
}

export { App };
