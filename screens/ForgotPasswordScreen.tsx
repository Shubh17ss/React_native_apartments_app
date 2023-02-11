import { Screen } from '../components/Screen'
import {View,StyleSheet} from 'react-native'
import { Text, Input, Button, Modal } from '@ui-kitten/components'
import * as yup from "yup";
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';
import { ModalHeader } from '../components/ModalHeader';

export const ForgotPasswordScreen=()=>{
   
    const navigation=useNavigation();
    const[emailSent, setEmailSent]=useState(false);

    return (
        <>
        <KeyboardAwareScrollView bounces={false}>
            <Screen style={styles.container}>
                <ModalHeader text='Apartio' xShown/>
                {emailSent? (
                <>
                <Text category={'h5'} style={styles.header}>Email Sent!</Text>
                <Text>An email containing instructions on how to change your password
                    has been sent to you. 
                    Please check your spam or junk incase you do not see your email.
                </Text>
                </>):(
                <>
                <Text category={'h5'} style={styles.header}>Forgot your password?</Text>
                <Text>Please enter your email, and we will send you a link to change your password.</Text>
                <Formik
                initialValues={{
                    email:""
                }}
                validationSchema={yup.object().shape({
                    email:yup.string().email().required('Your email is required.'),
                })}
                onSubmit={(values)=>{
                    console.log('submit to the server', values);
                    setEmailSent(true);
                   }}
                >

                   {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    setFieldTouched,
                    setFieldValue
                   })=>{
                        return(
                            <>
                            <Input style={styles.input}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    placeholder='Your Email Address'
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    autoComplete='email'
                                    label='Email'
                                    onBlur={()=>setFieldTouched('email')}
                                    caption={
                                        touched.email && errors.email? errors.email:undefined   
                                    }    
                                    status={
                                        touched.email && errors.email ? 'danger':'basic'
                                    }
                            />
                            <Button style={styles.continueButton} onPress={()=>handleSubmit()}>
                                    Continue
                            </Button>
                            </>
                        )
                   }}

                </Formik>
                </>
                )
                }
            </Screen>
        </KeyboardAwareScrollView>
       
        </>
    );
}

const styles=StyleSheet.create({
    container:{
        marginHorizontal:10,
    },
    header:{
        textAlign:'center',
        marginVertical:20,
    },
    input:{
        marginTop:10,
    },
    continueButton:{
        marginTop:20
    }

})