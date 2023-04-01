import { Navbar, TextInput } from '@mantine/core';
import { Select } from '@mantine/core';
import { Textarea } from '@mantine/core';
import { FileInput } from '@mantine/core';
import { Button } from '@mantine/core';
import { MultiSelect } from '@mantine/core';
import { Content } from 'next/font/google';
import React, { useState, useEffect } from 'react'
import mystyle from '../styles/NoticeForm.module.css'
import base64 from 'base-64';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoticeForm = () => {
    const [title, settitle] = useState('')
    const [chosenformat, setchosenformat] = useState('text')
    const [locations, setlocations] = useState([])
    const [textnotice, settextnotice] = useState('')
    const [poster, setposter] = useState('')
    // useEffect(() => {
    //     console.log(title)
    // })
    useEffect(() => {
        //   console.log("chosen is locarion")
        //   console.log(locations)
    }, [locations])

    const handleClick = async (e) => {

        e.preventDefault();

        let notice = {
            title: title,
            noticetext: textnotice,
            locations: locations,
            format: chosenformat,
            exptime: 0,
        }

        if (chosenformat === 'image') {
            const posterdata = new FormData();
            posterdata.append("file", poster);
            console.log(poster)
            posterdata.append("upload_preset", "n2e4zxl4")
            posterdata.append("cloud_name", "dipvmrckg")

            let image_upload = await fetch("https://api.cloudinary.com/v1_1/dipvmrckg/image/upload/", {
                method: "POST",
                body: posterdata,
            })

            let image_upload_res = await image_upload.json();

            console.log(image_upload_res.url)
            notice.noticetext = image_upload_res.url;
        }



        console.log(notice)

        // let notice = new Notice(title, textnotice, chosenformat, locations)
        let currUserEmail = localStorage.getItem("current_user_email");
        let data = {
            email: currUserEmail,
            notice: notice
        }

        // console.log(data);

        let res = await fetch('api/addnotice', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        let ok = true;
        let response = await res.json()
        console.log(response)

        if (!response.success)
            ok = false;

        if (!ok) {
            toast.error(response.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            return;
        }

        for (let i = 0; i < data.notice.locations.length; i++) {
            let tempData = {
                location: data.notice.locations[i],
                notice: notice
            }
            let res = await fetch('api/locationnotice', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(tempData)
            })
            let response = await res.json()
            console.log(response);
            if (!response.success)
                ok = false;

            if (!ok) {
                toast.error(response.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                return;
            }
        }

        toast.success('Notice Successfully Added !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        settitle('');
        setchosenformat('text')
        setlocations('')
        settextnotice('')
        setposter('')

        

    }

    const data = [
        { value: 'lbs', label: 'LBS' },
        { value: 'rk', label: 'Radha Krishnan Hall' },
        { value: 'rp', label: 'Rajendra Prasad Hall' },
        { value: 'llr', label: 'Lala Lajpat Rai Hall' },
        { value: 'acad', label: 'Academic Section' },
        { value: 'nalanda', label: 'Nalanda' },
    ];

    return (
        <div className={[mystyle.main_container]}>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div className={mystyle.notice_container}>

                <div className={mystyle.notice_fields}>
                    <form>
                        <TextInput
                            value={title}
                            placeholder="Notice title"
                            label="Title"
                            withAsterisk
                            onChange={(e) => { settitle(e.target.value) }}
                        />
                        <Select
                            label="Format of the notice"
                            placeholder="Pick one"
                            data={[
                                { value: 'image', label: 'Poster/Photo' },
                                { value: 'text', label: 'Text' },
                            ]}
                            value={chosenformat}
                            withAsterisk
                            onChange={setchosenformat}
                        />
                        {chosenformat == 'text' ? <Textarea
                            placeholder="Notice Content"
                            label="Type/Paste the notice in the box below"
                            autosize
                            minRows={8}
                            maxRows={12}
                            value={textnotice}
                            withAsterisk
                            onChange={(event) => settextnotice(event.currentTarget.value)}
                        /> :
                            <FileInput
                                placeholder="Pick file"
                                label="Your notice"
                                withAsterisk
                                value={poster}
                                onChange={setposter}
                            />}

                    </form>
                </div>
                <div className={mystyle.notice_location}>
                    <MultiSelect
                        data={data}
                        label="Locations where you want to display notices"
                        placeholder="Pick all that you like"
                        onChange={setlocations}
                        withAsterisk
                        value={locations}
                    />
                </div>
            </div>
            <div className={mystyle.button_container}>
                <Button key="1234" onClick={handleClick} size="md">
                    Submit
                </Button>
            </div>
        </div>

    )
}

export default NoticeForm