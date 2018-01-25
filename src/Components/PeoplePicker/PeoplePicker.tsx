import * as React from 'react';
//Office Ui Fabric Import
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IPersonaWithMenu } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.types';

import {
    IBasePickerSuggestionsProps,
    IBasePicker,
    NormalPeoplePicker,
    ValidationState
} from 'office-ui-fabric-react/lib/Pickers';
import {  
    BaseComponent,
    autobind
  } from 'office-ui-fabric-react/lib/Utilities';
import { IPersonaProps} from 'office-ui-fabric-react/lib/Persona';

import './PeoplePicker.css';

const suggestionProps: IBasePickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested People',
    mostRecentlyUsedHeaderText: 'Suggested Contacts',
    noResultsFoundText: 'No results found',
    loadingText: 'Loading',
    showRemoveButtons: true,
    suggestionsAvailableAlertText: 'People Picker Suggestions available',
    suggestionsContainerAriaLabel: 'Suggested contacts'
};

export interface PeoplePickerProps { }
export interface PeoplePickerState {
    currentPicker?: number | string;
    delayResults?: boolean;
    peopleList: IPersonaProps[];
    currentSelectedItems?: IPersonaProps[];
}

export class PeoplePicker extends BaseComponent<PeoplePickerProps, PeoplePickerState> {

    private _picker: IBasePicker<IPersonaProps>;
    constructor(props: PeoplePickerProps) {
        super(props);

        let peopleList: IPersonaWithMenu[] = [];
        /*people.forEach((persona: IPersonaProps) => {
            let target: IPersonaWithMenu = {};

            assign(target, persona);
            peopleList.push(target);
        });*/

        this.state = {
            currentPicker: 1,
            delayResults: false,
            peopleList: peopleList,
            currentSelectedItems: []
        };

    }

    public render() {
        let currentPicker: JSX.Element | undefined = undefined;
        currentPicker = this._renderNormalPicker();

        return (
            <div>
              { currentPicker }
              
              <PrimaryButton
                text='Set focus'
                onClick={ this._onSetFocusButtonClicked }
              />
            </div>
          );
    }

    private _getTextFromItem(persona: IPersonaProps): string {
        return persona.primaryText as string;
      }

    private _renderNormalPicker() {
        return (
          <NormalPeoplePicker
            onResolveSuggestions={ this._onFilterChanged }
            getTextFromItem={ this._getTextFromItem }
            pickerSuggestionsProps={ suggestionProps }
            className={ 'ms-PeoplePicker' }
            key={ 'normal' }
            onRemoveSuggestion={ this._onRemoveSuggestion }
            onValidateInput={ this._validateInput }
            removeButtonAriaLabel={ 'Remove' }
            inputProps={ {
              onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
              onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
              'aria-label': 'People Picker'
            } }
            componentRef={ this._resolveRef('_picker') }
            onInputChange={ this._onInputChange }
          />
        );
      }

  @autobind
  private _onSetFocusButtonClicked() {
    if (this._picker) {
      this._picker.focusInput();
    }
  }

  @autobind
  private _onRemoveSuggestion(item: IPersonaProps): void {
    let { peopleList } = this.state;
    let indexPeopleList: number = peopleList.indexOf(item);
    

    if (indexPeopleList >= 0) {
      let newPeople: IPersonaProps[] = peopleList.slice(0, indexPeopleList).concat(peopleList.slice(indexPeopleList + 1));
      this.setState({ peopleList: newPeople });
    }

  }



  @autobind
  private _onFilterChanged(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = this._filterPersonasByText(filterText);

      filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.splice(0, limitResults) : filteredPersonas;
      return this._filterPromise(filteredPersonas);
    } else {
      return [];
    }
  }

  

  private _filterPromise(personasToReturn: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {
    if (this.state.delayResults) {
      return this._convertResultsToPromise(personasToReturn);
    } else {
      return personasToReturn;
    }
  }

  private _listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter(item => item.primaryText === persona.primaryText).length > 0;
  }

  private _filterPersonasByText(filterText: string): IPersonaProps[] {
    return this.state.peopleList.filter(item => this._doesTextStartWith(item.primaryText as string, filterText));
  }

  private _doesTextStartWith(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }

  private _convertResultsToPromise(results: IPersonaProps[]): Promise<IPersonaProps[]> {
    return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));
  }

  private _removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    return personas.filter(persona => !this._listContainsPersona(persona, possibleDupes));
  }



  @autobind
  private _validateInput(input: string) {
    if (input.indexOf('@') !== -1) {
      return ValidationState.valid;
    } else if (input.length > 1) {
      return ValidationState.warning;
    } else {
      return ValidationState.invalid;
    }
  }

  /**
   * Takes in the picker input and modifies it in whichever way
   * the caller wants, i.e. parsing entries copied from Outlook (sample
   * input: "Aaron Reid <aaron>").
   *
   * @param input The text entered into the picker.
   */
  private _onInputChange(input: string): string {
    const outlookRegEx = /<.*>/g;
    const emailAddress = outlookRegEx.exec(input);

    if (emailAddress && emailAddress[0]) {
      return emailAddress[0].substring(1, emailAddress[0].length - 1);
    }

    return input;
  }
}