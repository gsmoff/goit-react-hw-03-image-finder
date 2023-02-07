import MoonLoader from 'react-spinners/MoonLoader';

export const Loader = () => {
    return (
        <MoonLoader
            color="#36d7b7"
            speedMultiplier={0.5}
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '50px',
            }}
        />
    );
};
