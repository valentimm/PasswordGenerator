import { useState } from 'react';
import './App.css';

function generatePassword(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

function copyText(text: string | null) {
    if (text) {
        navigator.clipboard.writeText(text);
    }
}

export function App() {
    const [password, setPassword] = useState('');
    const [passwordLength, setPasswordLength] = useState<number>(12); // Default length
    const [showPassword, setShowPassword] = useState<boolean>(false); // State for showing/hiding password
    const [isClicked, setIsClicked] = useState<boolean>(false); // State for button click animation
    const [copiedMessageVisible, setCopiedMessageVisible] = useState(false); // State for showing copied message

    const handleGeneratePassword = () => {
        if (passwordLength >= 12) {
            setPassword(generatePassword(passwordLength));
        } else {
            alert("A senha deve ter no mínimo 12 caracteres!");
        }
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordLength(parseInt(e.target.value, 10));
    };

    const handleShowPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowPassword(e.target.checked);
    };

    const handleCopyClick = () => {
        copyText(password);
        setIsClicked(true);
        setCopiedMessageVisible(true); // Show copied message
        setTimeout(() => {
            setIsClicked(false);
            setCopiedMessageVisible(false); // Hide message after 3 seconds
        }, 3000);
    };

    return (
        <div className="max-w-[1216px] mx-auto h-[800px] my-12 py-5 flex flex-col gap-5 border-2 border-cyan-400 rounded-2xl">
            <img src="logo.svg" alt="password generator" className="w-[600px] h-40 mx-auto block px-4 mt-20" />
            <div className="flex flex-col items-center">
                <label htmlFor="password-length" className="text-white mb-2">Número de caracteres da senha:</label>
                <input
                    type="range"
                    id="password-length"
                    min="12"
                    max="100"
                    value={passwordLength}
                    onChange={handleSliderChange}
                    className="w-72 bg-gray-800"
                />
                <span className="text-white mt-2">{passwordLength}</span>
            </div>
            <button onClick={handleGeneratePassword} className="mt-4 p-2 bg-sky-700 text-white rounded mx-auto w-48">RODAR</button>
            {password && (
                <div id="textResponse" className="text-center mt-4 text-white">
                    <p>Sua nova senha:</p>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        readOnly
                        className="bg-gray-800 p-2 text-white text-center"
                    />
                    <div className="mt-2">
                        <label htmlFor="show-password" className="text-white mr-2">Mostrar senha</label>
                        <input
                            type="checkbox"
                            id="show-password"
                            checked={showPassword}
                            onChange={handleShowPasswordChange}
                        />
                    </div>
                    {copiedMessageVisible && (
                        <div className="text-green-600 mt-2">
                            Senha copiada!
                        </div>
                    )}
                    <button
                        className={`mt-4 p-2 bg-sky-700 text-white rounded ${isClicked ? 'clicked' : ''}`}
                        onClick={handleCopyClick}>
                        Copiar Senha
                    </button>
                </div>
            )}
        </div>
    );
}
