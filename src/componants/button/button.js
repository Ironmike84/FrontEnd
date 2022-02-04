class Button extends React.Component {
/*
Here, a button object with no name or label yet is being declared using React Component class. It’s an empty object, similar to demarcating a space in a room where a button will be placed.
*/

 render() {
/*
The render method is like the builder who will help build this button on that wall in the room. Without the builder, we wouldn’t have any way of building this button.
*/

return <button>{this.props.label}</button>;
/*
A builder relies on their industrial knowledge to build and so does the render method. The accumulated knowledge in this case is the return operator. `return` stops everything, executes (computes), and returns whatever we give it as the end (in our case our //JSX tag <button>).

In the JSX `<button>{this.props.label}</button>`, we are telling the builder(render) to build the button with a label.
*/
  }
}