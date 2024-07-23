import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/");
        let passwords = await req.json();
        setPasswordArray(passwords);
    };

    useEffect(() => {
        getPasswords();
    }, []);

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    };

    const showPassword = () => {
        passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password";
        ref.current.src = passwordRef.current.type === "password" ? "icons/eye.png" : "icons/eyecross.png";
    };

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPassword = { ...form, id: uuidv4() };

            await fetch("http://localhost:3000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPassword),
            });

            setPasswordArray([...passwordArray, newPassword]);
            setForm({ site: "", username: "", password: "" });

            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast('Error: Password not saved!');
        }
    };

    const deletePassword = async (id) => {
        let confirmDelete = confirm("Do you really want to delete this password?");
        if (confirmDelete) {
            await fetch(`http://localhost:3000/`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            setPasswordArray(passwordArray.filter(item => item.id !== id));

            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(item => item.id === id);
        setForm(passwordToEdit);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#e0f7fa,transparent)]"></div>
            </div>
            <div className="p-3 md:mycontainer min-h-[85vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-teal-700'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-teal-700'>Mang/&gt;</span>
                </h1>
                <p className='text-teal-900 text-lg text-center'>Your own Password Manager</p>
                <div className="flex flex-col gap-7 p-4 justify-center items-center text-black">
                    <input value={form.site} onChange={handleChange} name='site' placeholder='Enter website URL' className='rounded-full border border-teal-500 w-full p-4 py-1' type="text" id='site' />
                    <div className="flex flex-col md:flex-row w-full gap-7 justify-between">
                        <input value={form.username} onChange={handleChange} name='username' placeholder='Enter username' className='rounded-full border border-teal-500 w-full p-4 py-1' type="text" id='username' />
                        <div className="relative">
                            <input ref={passwordRef} type='password' value={form.password} onChange={handleChange} id='password' name='password' placeholder='Enter Password' className='rounded-full border border-teal-500 w-full p-4 py-1' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye icon" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex w-fit hover:bg-teal-400 gap-2 justify-center items-center bg-teal-500 rounded-full px-8 py-2 border border-teal-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-teal-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-teal-100'>
                            {passwordArray.map((item, index) => (
                                <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center'>
                                            <a href={item.site} target='_blank' rel='noopener noreferrer'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center'>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    );
}

export default Manager;
