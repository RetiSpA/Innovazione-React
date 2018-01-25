import * as React from 'react';
import { SlowItem } from './SlowItem';
import { randomColor } from '../../Models/common';

export interface SlowItemsProps {
  items: any
}
export interface SlowItemsState {
  items: any
}

export class SlowItems extends React.Component<SlowItemsProps, SlowItemsState>  {

  private renderCounter:number=0;
  constructor(props: SlowItemsProps) {
    super(props);

    this.state = {
      items: props.items
    };
  }

  childRender(){

    this.renderCounter=this.renderCounter+1;
}

showRendered(){

  alert("Count : "+ this.renderCounter);
  this.renderCounter=0;
}

  render() {
    return (
      <div className="left">

        <h1>Mutable</h1>
        <div>
          <button className="btn btn-primary" onClick={()=>this.showRendered()}> Render Count</button>
        </div>
        {this.state.items.map((item: any, index: any) => {
          return <SlowItem
            key={index}
            item={item}
            onClick={this.onChangeItemColor.bind(this, index)} 
            onRendered={()=>this.childRender()}/>
        })}
      </div>
    );
  }

  // This is apparently weird and dirty implementation
  onChangeItemColor(index: any) {
    this.state.items[index].color = randomColor();

    this.setState({
      items: this.state.items
    });
  }
};