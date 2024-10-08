import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MovieAppContext } from '../router/AppRouter'
import { baseFolder } from '../config/config'


const PageRegister = () => {

    const {
        isHomeBtnEnabled,
        setIsHomeBtnEnabled,
        isStorageUnlocked,
        setIsStorageUnlocked,
        state,
        dispatch,
    } = useContext(MovieAppContext)
    
    const navigate = useNavigate()



    // WARNING: POOR SECURITY CHECKING HERE -- INTENTIONAL, FOR DEMONSTRATION PURPOSES ONLY
    function isInputValid() {
        const username  = document.getElementById('username').value
        const email     = document.getElementById('email').value
        const password  = document.getElementById('password').value
        const password2 = document.getElementById('password2').value

        if (username.length < 3)    return {flag: false, failMessage: 'Ensure your username is 3+ alphanumeric characters long'}
        if (!email.includes('@'))   return {flag: false, failMessage: 'Ensure your email address contains a "@" symbol'}
        if (password.length < 8)    return {flag: false, failMessage: 'Ensure your password is at least 8 characters long'}
        if (password !== password2) return {flag: false, failMessage: 'Ensure your password and duplicate password are matching'}

        return {flag: true}
    }


    function handleSubmit(e) {
        e.preventDefault()

        const validatedInput = isInputValid()
        if (validatedInput.flag) {
            dispatch({
                type: 'register',
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            })
            navigate('/login')
        }
        else {
            alert(validatedInput.failMessage)
        }
    }


    // i) Choose correct HomeBtn state
    // ii) Unlock localStorage
    // Run once on boot
    useEffect(() => {
        setIsHomeBtnEnabled(false)
        setIsStorageUnlocked(true)
        return (() => {
            setIsStorageUnlocked(false)
        })
    }, [])


    return (
        <section className='loginBox' id='mainContent'>
            <form action='POST'>
                <div className='loginInputGroup'>
                    <label>
                        Username
                        <input
                            type='text'
                            id='username'
                            name='username'
                            required
                            minLength='3'
                            autoComplete='username'
                        />
                    </label>
                </div>
                
                <div className='loginInputGroup'>
                    <label>
                        Email Address
                        <input
                            type='email'
                            id='email'
                            name='email'
                            autoComplete='email'
                        />
                    </label>
                </div>
                
                <div className='loginInputGroup'>
                    <label>
                        Password
                        <input
                            type='password'
                            id='password'
                            name='password'
                            required
                            minLength='8'
                            autoComplete='new-password webauthn'
                        />
                    </label>
                </div>
                
                <div className='loginInputGroup'>
                    <label>
                        Password (again)
                        <input
                            type='password'
                            id='password2'
                            name='password2'
                            required
                            minLength='8'
                            autoComplete='new-password webauthn'
                        />
                    </label>
                </div>
                
                <button
                    type='submit'
                    className='loginButton'
                    onClick={ handleSubmit }
                >
                    Register
                </button>
            </form>
            
            <p className='caveat'>
                * NOTE: If you have already registered, you may&nbsp;
                <a href={ baseFolder + '/register'}>
                    login
                </a>
                &nbsp;instead
            </p>            
        </section>        
    )
}

export default PageRegister