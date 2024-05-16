import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = async () => {
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('csvFile', file);

        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'An error occurred.');
        }
    };

    return (
        <div>
            
            <input type="file" accept=".csv" onChange={onFileChange} />
            <button  onClick={onFileUpload} >Upload</button>
            <p>{message}</p>
        </div>
    );
};

export default FileUpload;

    