import React, { useState } from 'react';

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

    return (
        <div className="max-w-[1216px] h-[800px] mx-auto my-4 py-5 flex flex-col gap-5 bg-gray-700 rounded-2xl">
            <h1 className="text-3xl font-bold text-red-400 text-center bg-black">Gerador de senha</h1>
            <div className="flex flex-col items-center">
                <label htmlFor="password-length" className="text-white mb-2">Enter the length of the password:</label>
                <input
                    type="range"
                    id="password-length"
                    min="12"
                    max="64"
                    value={passwordLength}
                    onChange={handleSliderChange}
                    className="w-96 bg-gray-800"
                />
                <span className="text-white mt-2">{passwordLength}</span>
            </div>
            <button onClick={handleGeneratePassword} className="mt-4 p-2 bg-blue-500 text-white rounded">RODAR</button>
            {password && (
                <div id="textResponse" className="text-center mt-4 text-white">
                    <p>Generated Password:</p>
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
                    <button
                        className="mt-4 p-2 bg-blue-500 text-white rounded"
                        onClick={() => copyText(password)}>
                        Copiar Senha
                    </button>
                </div>
            )}
        </div>
    );
}
