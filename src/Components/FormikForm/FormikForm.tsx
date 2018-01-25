import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as common from '../../Models/common';
import {
    DatePicker,
    DayOfWeek
} from 'office-ui-fabric-react/lib/DatePicker';
import { Formik, FormikProps, Form, Field, FieldProps, FormikActions } from 'formik';
import * as Yup from 'yup'
import { isEmpty } from 'lodash'


export interface FormikFormProps extends RouteComponentProps<any> {
    Id: number
}
export interface FormikFormState {
    car: common.Car,
    firstDayOfWeek?: DayOfWeek;
    Name: string | null,
    Email: string | null,
    isActive: boolean,
    ToDate: Date,
    FromDate: Date
}



export class FormikForm extends React.Component<FormikFormProps, FormikFormState> {


    constructor(prop: FormikFormProps & FormikProps<FormikFormState>, state: FormikFormState) {
        super(prop, state);
        this.state = {
            car: new common.Car(),
            firstDayOfWeek: DayOfWeek.Sunday,
            Name: null,
            Email: null,
            isActive: false,
            ToDate: null,
            FromDate: null,
        };

    }

    SubmitForm(values: FormikFormState, action: FormikActions<FormikFormState>) {

        console.log("Name : " + values.Name);
        console.log("Email : " + values.Email);
        console.log("From Date : " + values.FromDate);
        console.log("EmTo Dateail : " + values.ToDate);

        action.setSubmitting(false);

    }



    render() {

        return (
            <div>
                <h1>Rent Car with Formik</h1>
                <Formik
                    initialValues={{
                        firstDayOfWeek: DayOfWeek.Sunday,
                        Name: '',
                        Email: '',
                        isActive: '',
                        ToDate: '',
                        FromDate: '',
                    }}
                    validationSchema={Yup.object().shape({
                        Name: Yup.string()
                            .min(3, 'Name must be at least 3 characters long.')
                            .required('Name is required.'),
                        Email: Yup.string().email('field is not in valid email format').required('Email is required.'),
                        FromDate:Yup.date().required('From is required'),
                        ToDate:Yup.date().required('To is required')
                    })}
                    onSubmit={(values: FormikFormState, formikActions: FormikActions<FormikFormState>) => this.SubmitForm(values, formikActions)}
                    render={(formikBag: FormikProps<FormikFormState>) =>
                        <Form>
                            <div>
                                <span className="col-md-12">
                                    <Field
                                        name="Name"
                                        render={({ field, form }: FieldProps<FormikFormState>) =>
                                            <span className="form-group col-md-6">
                                                <label >Login Name</label>
                                                <input type="text" {...field} placeholder="Login Name" className={`form-control ${form.errors.Name && form.touched.Name && 'is-invalid'}`} />
                                                {form.errors.Name && <div className="invalid-feedback">{form.errors.Name}</div>}
                                            </span>
                                        } />
                                    <Field
                                        name="Email"
                                        render={({ field, form }: FieldProps<FormikFormState>) =>
                                            <span className="form-group col-md-6">
                                                <label >Email</label>
                                                <input type="text" {...field} placeholder="Email" className={`form-control ${form.errors.Name && form.touched.Name && 'is-invalid'}`} />
                                                {form.errors.Email && <div className="invalid-feedback">{form.errors.Email}</div>}
                                            </span>
                                        } />
                                    <Field
                                        name="FromDate"
                                        render={({ field, form }: FieldProps<FormikFormState>) =>
                                            <span className="form-group col-md-6">
                                                <label >From : </label>
                                                <DatePicker value={form.values.FromDate!} className={`${form.errors.Name && form.touched.Name && 'is-invalid'}`} onSelectDate={(date: Date | null | undefined) => { form.setFieldValue("FromDate",date); }} firstDayOfWeek={this.state.firstDayOfWeek} strings={common.DayPickerStrings} placeholder='Select a date...' />
                                                
                                                {form.errors.FromDate && <div className="invalid-feedback">{form.errors.FromDate}</div>}
                                            </span>
                                        } />

                                    <Field
                                        name="ToDate"
                                        render={({ field, form }: FieldProps<FormikFormState>) =>
                                            <span className="form-group col-md-6">
                                                <label >To : </label>
                                                <DatePicker value={form.values.ToDate} className={` ${form.errors.Name && form.touched.Name && 'is-invalid'}`} onSelectDate={(date: Date | null | undefined) => { form.setFieldValue("ToDate",date); }} firstDayOfWeek={this.state.firstDayOfWeek} strings={common.DayPickerStrings} placeholder='Select a date...' />
                                                
                                                {form.errors.ToDate && <div className="invalid-feedback">{form.errors.ToDate}</div>}
                                            </span>
                                        } />    
                                </span>
                                <span className="col-md-12">
                                    <button type="submit" className="btn btn-primary" disabled={formikBag.isSubmitting || !isEmpty(formikBag.errors)}>
                                        {formikBag.isSubmitting ? 'Wait' : 'Rent a Car'}
                                    </button>
                                </span>
                            </div>


                        </Form>}
                />
            </div>
        )
    }

}