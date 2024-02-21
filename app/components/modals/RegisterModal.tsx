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

import { signIn } from 'next-auth/react';
import { BsGithub } from 'react-icons/bs';
import { FaSquareGooglePlus } from 'react-icons/fa6';
import useLoginModal from '../hooks/useLoginModal';

const RegisterModal = () => {
    const registerModal =useRegisterModal();
    const loginModal = useLoginModal();
    const [lodaing,  setLoading] = useState(false)

    const {
        register, handleSubmit, formState: {
            errors,
            
        }
    } = useForm <FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '', 
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        axios.post('/api/register', data)
        .then(() => {
            toast.success('Registered')
            registerModal.onClose();
            loginModal.onOpen();
        })
        .catch((error) => {
            toast.error("Something Wrong")
            
        })
        .finally(() => {
           setLoading(false);
        })
    };
    const bodyContent = (
        <div className='flex flex-col gap-4'>
                <Heading 
                title='Welcome to Airbnb'
                subTitle='Create An Account'
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
                id="name"
                label="Name"
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
            <Button outline label='Continue with github' Icon={BsGithub} onClick={() => signIn('github')}></Button>
            <Button outline label='Continue with google' Icon={FaSquareGooglePlus} onClick={() => signIn('google')}></Button>

        </div>
    )
    return (
        <Modal 
        disabled={lodaing} 
        isOpen={registerModal.isOpen} 
        title='Register' 
        actionLabel='Continue' 
        onClose={registerModal.onClose} 
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    );
};

export default RegisterModal;