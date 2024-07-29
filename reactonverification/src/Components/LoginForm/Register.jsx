import { useRef, useState, useEffect } from "react";
import { IoInformationCircle } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from '../../Api/axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,24}&/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valid1 = USER_REGEX.test(user);
        const valid2 = PWD_REGEX.test(pws);
        if (!valid1 || !valid2) {
            setErrMsg("Invalid entry");
            return;
        }
        try {
            const res = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(res.data);
            console.log(res.accessToken);
            console.log(JSON.stringify(res));
            setSuccess(true);

        } catch (err) {
            if (!err?.res) {
                setErrMsg('No Server Response');
            } else if (err.res?.status === 409) {
                setErrMsg('User taken')
            } else {
                setErrMsg('Registration failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <div>
                    <h2>Success!</h2>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </div>
            ) : (

                <div className='wrapper'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <form onSubmit={handleSubmit}>
                        <h2>Registration</h2>

                        <div className="input-box">

                            <FaUserAstronaut className='icon' />
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                placeholder='Please type your Username'
                                required
                            />
                            <p
                                id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                <IoInformationCircle />
                                da 4 a 24 caratteri.<br />
                                Deve iniziare con una lettera.<br />
                                Sono ammesse lettere, numero,underscores e trattini.<br />
                            </p>
                        </div>

                        <div className="input-box">
                            <RiLockPasswordFill className='icon' />
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                placeholder='Please type your Password'
                                required
                            />
                            <p
                                id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <IoInformationCircle />
                                Deve avere almeno una lettera maiuscola e una minuscola<br />
                                Un numero e un carattere speciale<br />
                                Sono ammessi @, #, $ e !.<br />
                            </p>
                        </div>

                        <div className="input-box">
                            <RiLockPasswordLine className='icon' />
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                placeholder='Please type again your Password'
                                required />
                            <p
                                id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <IoInformationCircle />
                                Le password devono coincidere.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={!validName || !validPwd || !validMarch ? true : false}
                        >
                            Sign Up
                        </button>

                        <div className="register-link">
                            <span>Do you already have an account?</span>
                            <a href="#">Login</a>
                        </div>

                    </form>
                </div>
            )}
        </>
    )
}

export default Register