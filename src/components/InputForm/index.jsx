import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import * as todoActionCreators from  '../../store/slices/todos';
import { Field, Form, Formik } from 'formik';
import cx from 'classnames';
import CONSTANTS from '../../constants';
import styles from './styles.module.scss'
const { THEMES } = CONSTANTS;

const InputForm = () => {
    const initialState = {
        title : '',
    }; 
    const theme = useSelector((state) => state.theme);
    const className = cx(styles.form,  {
        [styles.darkTheme]: theme === THEMES.DARK,
        [styles.lightTheme]: theme === THEMES.LIGHTL,
    });

    const dispatch = useDispatch();

    const { addOnServer } = bindActionCreators(
        { ...todoActionCreators },
        dispatch
    );

    const handleAddBtn = (values, formikBag) => {
        addOnServer(values.title);
        formikBag.resetForm();
    };

    const TODO_ITEM_SCHEMA = yup.object({
        title: yup
          .string()
          .required('You must enter the title')
      });
                    
    return (
        <Formik 
            initialValues={initialState} 
            onSubmit={handleAddBtn}
            validationSchema={TODO_ITEM_SCHEMA}>
                {({ errors }) => {
                    const inputClassName = cx(styles.todoInput, 
                         {[styles.todoInvalidInput]: errors.title}
                    );
                    return (
                        <Form className={className}>
                            <Field 
                                type="text" 
                                name="title" 
                                className={inputClassName} 
                                placeholder={errors.title ? errors.title : "To do title"}/>
                            <button type="submit" className={styles.todoAddBtn}>Add</button> 
                        </Form>   
                    );
                }}
            
        </Formik>
    );
}

export default InputForm;
