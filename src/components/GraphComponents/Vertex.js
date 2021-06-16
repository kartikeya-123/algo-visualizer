import React, { Component } from "react";

const vertexRadius = 25;
class Vertex extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.uniqueID;
    this.isDragging = false;
    this.state = {
      vertexIndex: this.props.vertexIndex,
      styles: { left: 500, top: 300, backgroundColor: "aqua" },
    };
  }

  dragStart = (e) => {
    this.isDragging = true;
    document.onmousemove = this.dragging;
    document.onmouseup = this.dragEnd;

    this.setState({
      styles: {
        left: this.state.styles.left,
        top: this.state.styles.top,
        backgroundColor: "teal",
      },
    });
  };

  dragEnd = () => {
    this.isDragging = false;
    document.onmousemove = null;
    this.setState({
      styles: {
        left: this.state.styles.left,
        top: this.state.styles.top,
        backgroundColor: "aqua",
      },
    });
  };

  dragging = (e) => {
    if (this.isDragging) {
      const newLeft = e.clientX - vertexRadius;
      const newTop = e.clientY - vertexRadius;
      this.setState({
        styles: {
          left: newLeft,
          top: newTop,
          backgroundColor: this.state.styles.backgroundColor,
        },
      });

      // changing edge position when node moves
      this.props.moveIncidentEdges(
        this.state.vertexIndex,
        newLeft + vertexRadius,
        newTop + vertexRadius
      );
    }
  };

  changeBackgroundColor = (color) => {
    this.setState({
      styles: {
        left: this.state.styles.left,
        top: this.state.styles.top,
        backgroundColor: color,
      },
    });
  };

  changeVertexIndex = (n) => {
    this.setState({
      vertexIndex: n,
    });
  };

  render() {
    return (
      <div
        className="drag"
        style={this.state.styles}
        onMouseDown={this.dragStart}
        onMouseMove={this.dragging}
        onMouseUp={this.dragEnd}
      >
        <h3>{this.state.vertexIndex} </h3>
      </div>
    );
  }
}

export default Vertex;
