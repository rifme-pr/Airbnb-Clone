"use client"
import React, { useState } from 'react';
import useRegisterModal from '../hooks/useRegisterModal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../input/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import useLoginrModal from '../hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LogInModal = () => {
    const router = useRouter();
    const registerModal =useRegisterModal();
    const logInModal = useLoginrModal();
    const [lodaing,  setLoading] = useState(false)

    const {
        register, handleSubmit, formState: {
            errors,
            
        }
    } = useForm <FieldValues>({
        defaultValues: {
           
            email: '',
            password: '', 
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then(res => {
            setLoading(false);
            if(res?.ok){
                toast.success("Logged In");
                router.refresh();
                logInModal.onClose();
            }
            if(res?.error){
                toast.error(res.error);
            }
        })
    };
    const bodyContent = (
        <div className='flex flex-col gap-4'>
                <Heading 
                title='Welcome back'
                subTitle='Log In to your account'
                ></Heading>
                <Input 
                id="email"
                label="Email"
                disabled={lodaing}
                errors={errors}
                register={register}
                required
                ></Input>
                
             
                <Input 
                type='password'
                id="password"
                label="Password"
                disabled={lodaing}
                errors={errors}
                register={register}
                required
                ></Input>
                
        </div>
    )
    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button outline label='Continue with google' Icon={FcGoogle} onClick={() => {}}></Button>

        </div>
    )
    return (
        <Modal 
        disabled={lodaing} 
        isOpen={logInModal.isOpen} 
        title='Log In' 
        actionLabel='Continue' 
        onClose={logInModal.onClose} 
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    );
};

export default LogInModal;