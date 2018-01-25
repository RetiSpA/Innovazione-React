import * as React from 'react';
import { FastItem } from './FastItem';
import { randomColor } from '../../Models/common';

import * as Immutable from 'immutable'

export interface FastItemsProps {
    items: Immutable.List<any>;
}
export interface FastItemsState {
    items: Immutable.List<any>;
}


export class FastItems extends React.Component<FastItemsProps, FastItemsState> {

    private renderCounter:number=0;
    constructor(props: FastItemsProps) {
        super(props);

        this.state = {
            items: props.items
        };
    }

    shouldComponentUpdate(nextProps: FastItemsProps, nextState: FastItemsState) {
        return nextState.items !== this.state.items;
    }

    onChangeItemColor(index: any) {
        const newImmutableItems = this.state.items.set(index,
            this.state.items.get(index).set('color', randomColor())
        );
         
        this.setState({
            items: newImmutableItems
        });
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
            <div>
                <h1>Immutable</h1>
                <div>
          <button className="btn btn-primary" onClick={()=>this.showRendered()}> Render Count</button>
        </div>
                {this.state.items.map((item: number, index: number) => {
                    return <FastItem
                        key={index}
                        item={item}
                        onClick={ () => this.onChangeItemColor( index)} 
                        onRendered={()=>this.childRender()}/>
                })}
            </div>
        )
    }

}

