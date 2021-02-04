import React, { Component } from "react";

export default class Exercise extends Component {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
    this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
    this.endDateChangeHandler = this.endDateChangeHandler.bind(this);
    this.exerciseTwo_A = this.exerciseTwo_A.bind(this);
    this.exerciseTwo_B_a = this.exerciseTwo_B_a.bind(this);
    this.exerciseTwo_B_b = this.exerciseTwo_B_b.bind(this);
    this.exerciseThree = this.exerciseThree.bind(this);

    this.state = {      
      exercisesResult: null,     
      startDate: null,
      endDate: null
    };
  }

  submitHandler(event) {
    console.log("submitnappi",event.target.value);      
  }

  startDateChangeHandler(event) {
    console.log("startDate",event.target.value);    
  }

  endDateChangeHandler(event) {
      console.log("endDate", event.target.value);
  }

  exerciseTwo_A(){
      console.log("click 2A");
  }

  exerciseTwo_B_a(){
      console.log("click 2B a");
  }

  exerciseTwo_B_b(){
      console.log("click 2B b");
  }
  
  exerciseThree(){
      console.log("three");
  }


  render() {
    console.log("tehtävän propsit", this.state);

    return (
      <div>
       <form onSubmit={this.submitHandler}>
           <p>Enter Starting Date</p>
           <input
           type='text'
           name='startDate'
           onChange={this.startDateChangeHandler}
           />
           <br />
           <p>Enter Ending Date</p>
           <input
           type='text'
           name='endDate'
           onChange={this.endDateChangeHandler}
           />
           <br />
           
           <div className="buttonsDiv">
            <button type="button" onClick={this.exerciseTwo_A}>Longest upward trend</button>
            <br/>
            <button type="button" onClick={this.exerciseTwo_B_a}>The highest trading volume</button>
            <br/>
            <button type="button" onClick={this.exerciseTwo_B_b}>Stock price change within day</button>
            <br/>
            <button type="button" onClick={this.exerciseThree}>SMA 5</button>
           </div>
       </form>
      </div>
    );
  }
}
