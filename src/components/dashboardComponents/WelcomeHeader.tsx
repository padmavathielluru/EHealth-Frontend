import Title from "../Title";

const WelcomeHeader = () => {
    return (
        <div className="flex items-start gap-3">
            <img src="/images/hand-1.svg" alt="Welcome" className="w-8 h-8"/>
            <div>
            <Title text="Welcome, Dr.David"
                   subtitle="Wishing you a productive day ahead"/>
        </div>
        </div>
    );
};

export default WelcomeHeader;