import { IDatePickerStrings } from "office-ui-fabric-react/lib/components/DatePicker";
import {Record} from 'immutable'

function randomColorPart() {
    return Math.floor(Math.random() * 255);
  };
  

export function randomColor() {
    const COLOR = {
      R: randomColorPart(),
      G: randomColorPart(),
      B: randomColorPart()
    };
  
    return `rgb(${COLOR.R}, ${COLOR.G}, ${COLOR.B})`;
  };

export const DayPickerStrings: IDatePickerStrings = {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
  
    shortMonths: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
  
    days: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
  
    shortDays: [
      'S',
      'M',
      'T',
      'W',
      'T',
      'F',
      'S'
    ],
  
    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year',
  
    isRequiredErrorMessage: 'Field is required.',
  
    invalidInputErrorMessage: 'Invalid date format.'
  };

export class Car
{

    public Name:string;
    public Marca:string;
    public Targa:string;
    public KM:number;
    public Id:number;
    public image:any;

    constructor(initialData?:any){
            if(initialData)
            {
                this.Name=initialData.Name;
                this.Marca=initialData.Marca;
                this.Targa=initialData.Targa;
                this.KM=initialData.KM;
                this.Id=initialData.Id;
                this.image=initialData.image;
            }
    }
}

export class ItemExample{

  item:number;
  color:string;
  constructor(initialData?:any){
    if(initialData)
    {
      this.item=initialData.item;
      this.color=initialData.color;
    }
  }
}

// Define our record defaults



const itemExampleDefaults  = Record({
  name: '',
  numberOwned: 0,
  best: false,  
});

// Define our record types with a typescript interface 
interface IItemExampleParams {
  name: string;
  numberOwned: number;
  best: boolean;
}

// Create our FruitRecord class
export class ItemExampleRecord extends itemExampleDefaults {    
  
  public name:string;
  // Set the params. This will also typecheck when we instantiate a new FruitRecord
  constructor(params: IItemExampleParams) {
    params ? super(params) : super();
  }

 
}

export const Event:Array<any>=  [
  {
    title: 'Prenotazione Maestroni Andrea',
    allDay: true,
    start: new Date(2018, 0, 1),
    end: new Date(2018, 0, 2),
  },
  {
    title: 'Prenotazione Massari Marco',
    start: new Date(2018, 2, 7),
    end: new Date(2018, 2, 10),
  },

  {
    title: 'Prenotazione Massari Marco',
    start: new Date(2018, 1, 20),
    end: new Date(2018, 1, 25),
  },
  {
    title: 'Prenotazione Sangalli Alberto',
    start: new Date(2018, 2, 13, 0, 0, 0),
    end: new Date(2018, 2, 20, 0, 0, 0),
  },

  {
    title: 'Prenotazione Maestroni Andrea',
    start: new Date(2018, 10, 6, 0, 0, 0),
    end: new Date(2018, 10, 13, 0, 0, 0),
  }
]

