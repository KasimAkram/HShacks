export const customStyles = {
    overlay: {
        backgroundColor: 'rgb(20, 20, 20, 0.6)',
        backdropFilter: 'blur(5px)',
        transition: 'backdropFilter 10s ease-in-out'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgb(20, 20, 20, 0.7)',
        border: '0px solid #ccc',
        borderRadius: '20px',
        padding: '15px'
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '1.5em',
        color: '#333'
    }
};