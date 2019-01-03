import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        Contacts: state.Contacts.filter(
          Contact => Contact.id !== action.payload
        )
      };

    case "ADD_CONTACT":
      return {
        ...state,
        Contacts: [action.payload, ...state.Contacts]
      };

    case "UPDATE_CONTACT":
      return {
        ...state,
        Contacts: state.Contacts.map(Contact =>
          Contact.id === action.payload.id
            ? (Contact = action.payload)
            : Contact
        )
      };

    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    Contacts: [],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({ Contacts: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
