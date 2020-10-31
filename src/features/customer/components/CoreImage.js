import { Card, CardContent, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';



const useStyles = makeStyles({
    mainContainer: {
        borderRadius: '8px',
        position: 'relative',
        width: '210px',
        height: '210px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
    },
    imgContainer: {
        width: '200px',
        height: '200px',
    },
    pickImage: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'blue',
        fontSize: '0.8em',
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }
});

const CoreImage = ({record, onUrlChanged}) => {
    const [photoUrl] = useState('https://firebasestorage.googleapis.com/v0/b/hajj-mission-of-cote-de-ivoir.appspot.com/o/' + encodeURIComponent( record.nationality + '/' + record.passportNumber) + '?alt=media' );
    // const [progress, setProgress] = useState('');
    const [isMouseOver, setIsMouseOver] = useState(false);
    const classes = useStyles();

    // const handleFileOnChange = (event) => {
    //     if (event.target.files[0]) {
    //         const selectedFile = event.target.files[0];
    //         setFBUrl('');
    //         const uploadTask = storage.ref(`images/${selectedFile.name}`).put(selectedFile);
    //         uploadTask.on('state_changed',
    //             (snapshot) => {
    //                 const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) + '%';
    //                 setProgress(percentage);
    //                 if (percentage === '100%') {
    //                     setTimeout(() => {
    //                         setProgress('')
    //                     }, 2000);
    //                 }
    //             },
    //             (error) => {
    //                 console.log('error');
    //                 console.log(error);
    //             },
    //             () => {
    //                 storage.ref('images').child(selectedFile.name).getDownloadURL().then(url => {
    //                     setFBUrl(url);
    //                     // onUrlChanged(url);
    //                 })
    //             }
    //         )
    //     }
    // }

    const handleFileOnChange = () => { };
    let _fileInput;
    return (
        <React.Fragment>
            <Card className={classes.mainContainer} onMouseOver={() => setIsMouseOver(true)} onMouseLeave={() => setIsMouseOver(false)} >
                <CardContent>
                    <img src={photoUrl} alt={'Customer'} className={classes.imgContainer} style={{ display: photoUrl ? 'block' : 'none' }}></img>
                    <Link href="#" className={classes.pickImage} style={{ display: isMouseOver ? 'block' : 'none' }} onClick={() => _fileInput.click()}>Change Image</Link>
                    {/* <div className={classes.progress} style={{ display: progress ? 'block' : 'none' }}>{progress}</div> */}

                </CardContent>
            </Card>
            <input
                type="file"
                onChange={handleFileOnChange}
                style={{ display: 'none' }}
                ref={fileInput => _fileInput = fileInput}
            />

        </React.Fragment>
    )
}

export default CoreImage;